module.exports = [
"[project]/src/app/BloomingMap.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BloomingMap
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mapbox$2f$mapbox$2d$gl$2d$draw$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mapbox/mapbox-gl-draw/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mapbox$2d$gl$2f$dist$2f$mapbox$2d$gl$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/mapbox-gl/dist/mapbox-gl.js [app-ssr] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module 'axios'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
"use client";
;
;
;
;
;
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mapbox$2d$gl$2f$dist$2f$mapbox$2d$gl$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].accessToken = ("TURBOPACK compile-time value", "pk.eyJ1Ijoic3VubnkxNzMiLCJhIjoiY21nOWtwM2h2MDd4bjJpb3B3MGV4bXYyMyJ9.a1NLLN95JZ8EbhL8LJ-2VQ");
const API_BASE_URL = ("TURBOPACK compile-time value", "http://localhost:5000/api");
const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 60000
});
// Generate ~300 random global points
const generateRandomPoints = (count = 300)=>{
    const points = [];
    for(let i = 0; i < count; i++){
        const lat = Math.random() * 180 - 90;
        const lon = Math.random() * 360 - 180;
        points.push([
            lon,
            lat
        ]);
    }
    return points;
};
const globalPoints = generateRandomPoints();
function BloomingMap() {
    const leftMapContainer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const rightMapContainer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const leftMapRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const rightMapRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [ndviData, setNdviData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [frame, setFrame] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [comparisonMode, setComparisonMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // 🔹 Extra states for point/region
    const [selectedRegion, setSelectedRegion] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [regionData, setRegionData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [currentIndex, setCurrentIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [isPlaying, setIsPlaying] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // ✅ Fetch global NDVI
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const fetchNDVI = async ()=>{
            try {
                const res = await api.get("/ndvi/global");
                setNdviData(res.data.data); // [{date, ndvi}]
            } catch (err) {
                console.error("Error fetching NDVI:", err);
            }
        };
        fetchNDVI();
    }, []);
    const generatePulseData = (ndviValue, date)=>({
            type: "FeatureCollection",
            features: globalPoints.map(([lon, lat])=>({
                    type: "Feature",
                    geometry: {
                        type: "Point",
                        coordinates: [
                            lon,
                            lat
                        ]
                    },
                    properties: {
                        ndvi: ndviValue,
                        date,
                        intensity: Math.max(0, Math.min(1, (ndviValue - 0.28) / 0.22))
                    }
                }))
        });
    const addPulseLayer = (map, sourceId, layerId, data)=>{
        if (!map.getSource(sourceId)) {
            map.addSource(sourceId, {
                type: "geojson",
                data
            });
        } else {
            map.getSource(sourceId).setData(data);
        }
        if (!map.getLayer(layerId)) {
            map.addLayer({
                id: layerId,
                type: "circle",
                source: sourceId,
                paint: {
                    "circle-radius": [
                        "interpolate",
                        [
                            "linear"
                        ],
                        [
                            "get",
                            "intensity"
                        ],
                        0,
                        2,
                        1,
                        10
                    ],
                    "circle-color": [
                        "interpolate",
                        [
                            "linear"
                        ],
                        [
                            "get",
                            "intensity"
                        ],
                        0,
                        "#60a5fa",
                        0.3,
                        "#facc15",
                        0.6,
                        "#22c55e",
                        1,
                        "#15803d"
                    ],
                    "circle-opacity": 0.6,
                    "circle-blur": 0.7
                }
            });
        }
    };
    // ✅ Init maps & interactions
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!leftMapContainer.current) return;
        const createMap = (container)=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mapbox$2d$gl$2f$dist$2f$mapbox$2d$gl$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Map({
                container,
                style: "mapbox://styles/mapbox/light-v11",
                center: [
                    0,
                    20
                ],
                zoom: 1.5
            });
        const leftMap = createMap(leftMapContainer.current);
        leftMapRef.current = leftMap;
        if (comparisonMode && rightMapContainer.current) {
            const rightMap = createMap(rightMapContainer.current);
            rightMapRef.current = rightMap;
        }
        // 🔹 Add interactions (click + draw)
        const draw = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mapbox$2f$mapbox$2d$gl$2d$draw$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]({
            displayControlsDefault: false,
            controls: {
                polygon: true,
                trash: true
            }
        });
        leftMap.addControl(draw);
        leftMap.on("click", async (e)=>{
            const { lng, lat } = e.lngLat;
            new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mapbox$2d$gl$2f$dist$2f$mapbox$2d$gl$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Marker({
                color: "lime"
            }).setLngLat([
                lng,
                lat
            ]).addTo(leftMap);
            try {
                const res = await api.get("/ndvi/point", {
                    params: {
                        lat,
                        lng,
                        start: "2024-01-01",
                        end: "2024-12-31"
                    }
                });
                setSelectedRegion({
                    lat,
                    lng
                });
                setRegionData(res.data.data);
                setCurrentIndex(0);
                setIsPlaying(true);
            } catch (err) {
                console.error("Error fetching point NDVI:", err);
            }
        });
        leftMap.on("draw.create", async (e)=>{
            const coords = e.features[0].geometry.coordinates[0];
            const lons = coords.map((c)=>c[0]);
            const lats = coords.map((c)=>c[1]);
            const bbox = [
                Math.min(...lons),
                Math.min(...lats),
                Math.max(...lons),
                Math.max(...lats)
            ];
            try {
                const res = await api.get("/ndvi/regional", {
                    params: {
                        bbox: bbox.join(","),
                        start: "2024-01-01",
                        end: "2024-12-31"
                    }
                });
                setSelectedRegion({
                    bbox
                });
                setRegionData(res.data.data);
                setCurrentIndex(0);
                setIsPlaying(true);
            } catch (err) {
                console.error("Error fetching regional NDVI:", err);
            }
        });
        return ()=>{
            if (leftMapRef.current) leftMapRef.current.remove();
            if (rightMapRef.current) rightMapRef.current.remove();
        };
    }, [
        comparisonMode
    ]);
    // ✅ Animate pulses
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!leftMapRef.current || ndviData.length === 0) return;
        let i = 0;
        const interval = setInterval(()=>{
            i = (i + 1) % ndviData.length;
            setFrame(i);
            const { ndvi, date } = ndviData[i];
            const pulseData = generatePulseData(ndvi, date);
            addPulseLayer(leftMapRef.current, "ndvi-source-left", "ndvi-layer-left", pulseData);
            if (comparisonMode && rightMapRef.current) {
                addPulseLayer(rightMapRef.current, "ndvi-source-right", "ndvi-layer-right", pulseData);
            }
        }, 1500);
        return ()=>clearInterval(interval);
    }, [
        ndviData,
        comparisonMode
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex w-full h-screen relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: leftMapContainer,
                className: "flex-1"
            }, void 0, false, {
                fileName: "[project]/src/app/BloomingMap.js",
                lineNumber: 192,
                columnNumber: 7
            }, this),
            comparisonMode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: rightMapContainer,
                className: "flex-1 border-l border-gray-300"
            }, void 0, false, {
                fileName: "[project]/src/app/BloomingMap.js",
                lineNumber: 194,
                columnNumber: 9
            }, this),
            ndviData.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/80 px-4 py-2 rounded-lg shadow",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-sm font-semibold",
                    children: [
                        ndviData[frame]?.date,
                        " | 🌱 NDVI: ",
                        ndviData[frame]?.ndvi.toFixed(3)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/BloomingMap.js",
                    lineNumber: 200,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/BloomingMap.js",
                lineNumber: 199,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>setComparisonMode(!comparisonMode),
                className: "absolute top-4 right-4 bg-emerald-500 text-white px-4 py-2 rounded-lg shadow-lg",
                children: comparisonMode ? "Exit Comparison" : "Compare"
            }, void 0, false, {
                fileName: "[project]/src/app/BloomingMap.js",
                lineNumber: 206,
                columnNumber: 7
            }, this),
            selectedRegion && regionData.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-20 left-1/2 -translate-x-1/2 w-[80%] max-w-2xl z-20",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-black/80 p-5 rounded-2xl shadow-2xl",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-white text-lg mb-2",
                            children: [
                                "NDVI Timeline •",
                                " ",
                                selectedRegion.lat ? `${selectedRegion.lat.toFixed(2)}°, ${selectedRegion.lng.toFixed(2)}°` : "Region"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/BloomingMap.js",
                            lineNumber: 217,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "range",
                            min: "0",
                            max: regionData.length - 1,
                            value: currentIndex,
                            onChange: (e)=>{
                                setCurrentIndex(parseInt(e.target.value));
                                setIsPlaying(false);
                            },
                            className: "w-full h-2 bg-gray-700 rounded-full appearance-none cursor-pointer"
                        }, void 0, false, {
                            fileName: "[project]/src/app/BloomingMap.js",
                            lineNumber: 224,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-2 text-sm text-gray-400",
                            children: [
                                regionData[currentIndex]?.date,
                                " → NDVI",
                                " ",
                                regionData[currentIndex]?.ndvi.toFixed(3)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/BloomingMap.js",
                            lineNumber: 236,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/BloomingMap.js",
                    lineNumber: 216,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/BloomingMap.js",
                lineNumber: 215,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/BloomingMap.js",
        lineNumber: 191,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=src_app_BloomingMap_57066764.js.map