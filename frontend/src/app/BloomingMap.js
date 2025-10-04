"use client";
import { useEffect, useRef, useState } from "react";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import mapboxgl from "mapbox-gl";
import axios from 'axios';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000,
});

// Generate ~300 random global points
const generateRandomPoints = (count = 300) => {
  const points = [];
  for (let i = 0; i < count; i++) {
    const lat = Math.random() * 180 - 90;
    const lon = Math.random() * 360 - 180;
    points.push([lon, lat]);
  }
  return points;
};
const globalPoints = generateRandomPoints();

export default function BloomingMap() {
  const leftMapContainer = useRef(null);
  const rightMapContainer = useRef(null);
  const leftMapRef = useRef(null);
  const rightMapRef = useRef(null);

  const [ndviData, setNdviData] = useState([]);
  const [frame, setFrame] = useState(0);
  const [comparisonMode, setComparisonMode] = useState(false);

  // 🔹 Extra states for point/region
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [regionData, setRegionData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // ✅ Fetch global NDVI
  useEffect(() => {
    const fetchNDVI = async () => {
      try {
        const res = await api.get("/ndvi/global");
        setNdviData(res.data.data); // [{date, ndvi}]
      } catch (err) {
        console.error("Error fetching NDVI:", err);
      }
    };
    fetchNDVI();
  }, []);

  const generatePulseData = (ndviValue, date) => ({
    type: "FeatureCollection",
    features: globalPoints.map(([lon, lat]) => ({
      type: "Feature",
      geometry: { type: "Point", coordinates: [lon, lat] },
      properties: {
        ndvi: ndviValue,
        date,
        intensity: Math.max(0, Math.min(1, (ndviValue - 0.28) / 0.22)),
      },
    })),
  });

  const addPulseLayer = (map, sourceId, layerId, data) => {
    if (!map.getSource(sourceId)) {
      map.addSource(sourceId, { type: "geojson", data });
    } else {
      map.getSource(sourceId).setData(data);
    }

    if (!map.getLayer(layerId)) {
      map.addLayer({
        id: layerId,
        type: "circle",
        source: sourceId,
        paint: {
          "circle-radius": ["interpolate", ["linear"], ["get", "intensity"], 0, 2, 1, 10],
          "circle-color": [
            "interpolate",
            ["linear"],
            ["get", "intensity"],
            0, "#60a5fa",
            0.3, "#facc15",
            0.6, "#22c55e",
            1, "#15803d",
          ],
          "circle-opacity": 0.6,
          "circle-blur": 0.7,
        },
      });
    }
  };

  // ✅ Init maps & interactions
  useEffect(() => {
    if (!leftMapContainer.current) return;

    const createMap = (container) =>
      new mapboxgl.Map({
        container,
        style: "mapbox://styles/mapbox/light-v11",
        center: [0, 20],
        zoom: 1.5,
      });

    const leftMap = createMap(leftMapContainer.current);
    leftMapRef.current = leftMap;

    if (comparisonMode && rightMapContainer.current) {
      const rightMap = createMap(rightMapContainer.current);
      rightMapRef.current = rightMap;
    }

    // 🔹 Add interactions (click + draw)
    const draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: { polygon: true, trash: true },
    });
    leftMap.addControl(draw);

    leftMap.on("click", async (e) => {
      const { lng, lat } = e.lngLat;

      new mapboxgl.Marker({ color: "lime" }).setLngLat([lng, lat]).addTo(leftMap);

      try {
        const res = await api.get("/ndvi/point", {
          params: { 
            lat, 
            lon: lng, 
            start: "2024-03-01", 
            end: "2024-05-31", 
            buffer: 1000 
          },
        });
        setSelectedRegion({ lat, lon: lng });
        setRegionData(res.data.data);
        setCurrentIndex(0);
        setIsPlaying(true);
      } catch (err) {
        console.error("Error fetching point NDVI:", err);
      }
    });

    leftMap.on("draw.create", async (e) => {
      const coords = e.features[0].geometry.coordinates[0];
      const lons = coords.map((c) => c[0]);
      const lats = coords.map((c) => c[1]);
      const bbox = [Math.min(...lons), Math.min(...lats), Math.max(...lons), Math.max(...lats)];

      try {
        const res = await api.get("/ndvi/regional", {
          params: { bbox: bbox.join(","), start: "2024-03-01", end: "2024-05-31" },
        });
        setSelectedRegion({ bbox });
        setRegionData(res.data.data);
        setCurrentIndex(0);
        setIsPlaying(true);
      } catch (err) {
        console.error("Error fetching regional NDVI:", err);
      }
    });

    return () => {
      if (leftMapRef.current) leftMapRef.current.remove();
      if (rightMapRef.current) rightMapRef.current.remove();
    };
  }, [comparisonMode]);

  // ✅ Animate pulses
  useEffect(() => {
    if (!leftMapRef.current || ndviData.length === 0) return;

    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % ndviData.length;
      setFrame(i);

      const { ndvi, date } = ndviData[i];
      const pulseData = generatePulseData(ndvi, date);

      addPulseLayer(leftMapRef.current, "ndvi-source-left", "ndvi-layer-left", pulseData);
      if (comparisonMode && rightMapRef.current) {
        addPulseLayer(rightMapRef.current, "ndvi-source-right", "ndvi-layer-right", pulseData);
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [ndviData, comparisonMode]);

  return (
    <div className="flex w-full h-screen relative">
      <div ref={leftMapContainer} className="flex-1" />
      {comparisonMode && (
        <div ref={rightMapContainer} className="flex-1 border-l border-gray-300" />
      )}

      {/* HUD */}
      {ndviData.length > 0 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/80 px-4 py-2 rounded-lg shadow">
          <p className="text-sm font-semibold">
            📅 {ndviData[frame]?.date} | 🌱 NDVI: {ndviData[frame]?.ndvi.toFixed(3)}
          </p>
        </div>
      )}

      <button
        onClick={() => setComparisonMode(!comparisonMode)}
        className="absolute top-4 right-4 bg-emerald-500 text-white px-4 py-2 rounded-lg shadow-lg"
      >
        {comparisonMode ? "Exit Comparison" : "Compare"}
      </button>

      {/* Point/Region NDVI slider */}
      {selectedRegion && regionData.length > 0 && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-[80%] max-w-2xl z-20">
          <div className="bg-black/80 p-5 rounded-2xl shadow-2xl">
            <h3 className="text-white text-lg mb-2">
              NDVI Timeline •{" "}
              {selectedRegion.lat
                ? `${selectedRegion.lat.toFixed(2)}°, ${selectedRegion.lon.toFixed(2)}°`
                : "Region"}
            </h3>

            <input
              type="range"
              min="0"
              max={regionData.length - 1}
              value={currentIndex}
              onChange={(e) => {
                setCurrentIndex(parseInt(e.target.value));
                setIsPlaying(false);
              }}
              className="w-full h-2 bg-gray-700 rounded-full appearance-none cursor-pointer"
            />

            <div className="mt-2 text-sm text-gray-400">
              {regionData[currentIndex]?.date} → NDVI{" "}
              {regionData[currentIndex]?.ndvi.toFixed(3)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
