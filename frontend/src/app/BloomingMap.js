"use client";
import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "./map.css";

// ⚠️ Replace this with your actual Mapbox access token
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
function BloomingMap() {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);

  // Example NDVI data
  const regions = [
    { id: 1, name: "Tokyo", lat: 35.6895, lng: 139.6917, ndvi: 0.75 },
    { id: 2, name: "Paris", lat: 48.8566, lng: 2.3522, ndvi: 0.55 },
    { id: 3, name: "New York", lat: 40.7128, lng: -74.006, ndvi: 0.3 },
  ];

  const getColor = (ndvi) => {
    if (ndvi > 0.7) return "#22c55e"; // green
    if (ndvi > 0.5) return "#eab308"; // yellow
    return "#ef4444"; // red
  };

  useEffect(() => {
    if (mapRef.current || !mapContainer.current) return;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [0, 20],
      zoom: 1.5,
    });

    mapRef.current = map;

    mapRef.current.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        useBrowserFocus: true,
        mapboxgl: mapboxgl,
      }),
      "top-left"
    );

    // Add markers
    regions.forEach((r) => {
      new mapboxgl.Marker({
        element: (() => {
          const el = document.createElement("div");
          el.style.width = "20px";
          el.style.height = "20px";
          el.style.borderRadius = "50%";
          el.style.backgroundColor = getColor(r.ndvi);
          el.style.opacity = "0.6";
          el.style.border = "2px solid white";
          return el;
        })(),
      })
        .setLngLat([r.lng, r.lat])
        .setPopup(
          new mapboxgl.Popup().setHTML(
            `<strong>${r.name}</strong><br/>NDVI: ${r.ndvi}`
          )
        )
        .addTo(map);
    });

    return () => {
      mapRef.current.remove();
    };
  }, []);

  return (
    <div ref={mapContainer} className="w-full h-screen"/>
  );
}

export default BloomingMap;
