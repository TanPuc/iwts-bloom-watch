import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

export default function BloomGlobe3D() {
    const canvasRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [rotation, setRotation] = useState(0);
    const deckRef = useRef(null);

    // Your actual NDVI data
    const ndviData = [
        {"date":"2024-01-01","ndvi":0.328372877845626},
        {"date":"2024-01-17","ndvi":0.3133371984834311},
        {"date":"2024-02-02","ndvi":0.3164387600096921},
        {"date":"2024-02-18","ndvi":0.31208659739892214},
        {"date":"2024-03-05","ndvi":0.31966332975949524},
        {"date":"2024-03-21","ndvi":0.33007922383256183},
        {"date":"2024-04-06","ndvi":0.35177632452720925},
        {"date":"2024-04-22","ndvi":0.37442884545118443},
        {"date":"2024-05-08","ndvi":0.3989218979442026},
        {"date":"2024-05-24","ndvi":0.4314162413513212},
        {"date":"2024-06-09","ndvi":0.45418827669947287},
        {"date":"2024-06-25","ndvi":0.47499360239633026},
        {"date":"2024-07-11","ndvi":0.47279709475136944},
        {"date":"2024-07-27","ndvi":0.48198399499941424},
        {"date":"2024-08-12","ndvi":0.4815237719484111},
        {"date":"2024-08-28","ndvi":0.46748123043769413},
        {"date":"2024-09-13","ndvi":0.44788238171909645},
        {"date":"2024-09-29","ndvi":0.4162884776820417},
        {"date":"2024-10-15","ndvi":0.3905575547898575},
        {"date":"2024-10-31","ndvi":0.3633956063834815},
        {"date":"2024-11-16","ndvi":0.3526573643016067},
        {"date":"2024-12-02","ndvi":0.34495404214567377},
        {"date":"2024-12-18","ndvi":0.3352773682018393}
    ];

    const currentData = ndviData[currentIndex];

    // Determine season and story
    const getSeason = (date) => {
        const month = new Date(date).getMonth();
        if (month >= 2 && month <= 4) return {
        name: "Spring Awakening",
        color: "from-pink-500 to-green-500",
        description: "Earth awakens. Flowers bloom across continents as warmth returns.",
        bgGlow: "shadow-pink-500/20"
        };
        if (month >= 5 && month <= 7) return {
        name: "Summer Peak",
        color: "from-green-400 to-emerald-600",
        description: "Maximum photosynthesis. The planet pulses with life at its zenith.",
        bgGlow: "shadow-green-500/30"
        };
        if (month >= 8 && month <= 10) return {
        name: "Autumn Fade",
        color: "from-amber-500 to-orange-600",
        description: "Vegetation recedes. Nature prepares for winter's rest.",
        bgGlow: "shadow-amber-500/20"
        };
        return {
        name: "Winter Dormancy",
        color: "from-blue-400 to-cyan-600",
        description: "Minimal growth. The planet breathes quietly, waiting for spring.",
        bgGlow: "shadow-blue-500/20"
        };
    };

    const season = getSeason(currentData.date);

    // Color mapping for NDVI (artistic palette)
    const getNDVIColor = (ndvi) => {
        // Normalize NDVI (0.3 - 0.5 range to 0-1)
        const normalized = Math.max(0, Math.min(1, (ndvi - 0.28) / 0.22));
        
        if (normalized < 0.2) return [254, 226, 226, 200]; // Winter - pale pink
        if (normalized < 0.35) return [254, 249, 195, 220]; // Early spring - pale yellow
        if (normalized < 0.5) return [217, 249, 157, 240]; // Spring - light green
        if (normalized < 0.65) return [134, 239, 172, 255]; // Late spring - bright green
        if (normalized < 0.8) return [52, 211, 153, 255]; // Summer - emerald
        return [16, 185, 129, 255]; // Peak summer - deep green
    };

    // Generate globe points with artistic distribution
    const generateGlobePoints = () => {
        const points = [];
        const ndvi = currentData.ndvi;
        const baseColor = getNDVIColor(ndvi);
        
        // Create latitude bands with varying density
        for (let lat = -85; lat <= 85; lat += 3) {
        const densityMultiplier = Math.cos(lat * Math.PI / 180); // More points at equator
        const lonStep = 4 / Math.max(0.3, densityMultiplier);
        
        for (let lon = -180; lon < 180; lon += lonStep) {
            // Add natural variation
            const variation = Math.sin(lat * 0.1) * Math.cos(lon * 0.1) * 0.15;
            const localNDVI = ndvi + variation;
            
            // Pulsing effect based on season
            const pulse = Math.sin(rotation * 0.05 + lat * 0.02) * 0.1 + 1;
            const intensity = (localNDVI / 0.5) * pulse;
            
            points.push({
            position: [lon, lat, 0],
            color: baseColor.map((c, i) => i < 3 ? c * intensity : c),
            size: 20 + intensity * 40
            });
        }
        }
        return points;
    };

    // Initialize Deck.gl
    useEffect(() => {
        if (typeof window === 'undefined' || !window.deck) return;

        const { Deck } = window.deck;
        const { ScatterplotLayer } = window.deck;
        const { _GlobeView } = window.deck;

        const deckInstance = new Deck({
        canvas: canvasRef.current,
        width: '100%',
        height: '100%',
        initialViewState: {
            longitude: rotation,
            latitude: 20,
            zoom: 0.8,
            pitch: 0,
            bearing: 0
        },
        views: [new _GlobeView()],
        controller: true,
        layers: [
            new ScatterplotLayer({
            id: 'globe-bloom',
            data: generateGlobePoints(),
            getPosition: d => d.position,
            getFillColor: d => d.color,
            getRadius: d => d.size,
            radiusUnits: 'pixels',
            opacity: 0.8,
            radiusMinPixels: 1,
            radiusMaxPixels: 8,
            pickable: false
            })
        ],
        parameters: {
            clearColor: [10, 14, 39, 1]
        }
        });

        deckRef.current = deckInstance;

        return () => {
        deckInstance.finalize();
        };
    }, [currentIndex, rotation]);

    // Animation loop
    useEffect(() => {
        if (!isPlaying) return;

        const interval = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % ndviData.length);
        }, 800); // Change frame every 800ms

        return () => clearInterval(interval);
    }, [isPlaying]);

    // Auto-rotate globe
    useEffect(() => {
        const rotateInterval = setInterval(() => {
        setRotation(prev => (prev + 0.5) % 360);
        }, 50);

        return () => clearInterval(rotateInterval);
    }, []);

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString('en-US', { 
        month: 'long', 
        day: 'numeric',
        year: 'numeric'
        });
    };

    return (
        <div className="relative w-full h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
        {/* Deck.gl Canvas */}
        <canvas 
            ref={canvasRef} 
            className="absolute inset-0 w-full h-full"
            style={{ width: '100%', height: '100%' }}
        />

        {/* Ambient glow effect */}
        <div 
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-30 ${season.bgGlow} transition-all duration-1000`}
            style={{ background: `radial-gradient(circle, ${season.color.includes('pink') ? '#ec4899' : season.color.includes('green') ? '#10b981' : season.color.includes('amber') ? '#f59e0b' : '#3b82f6'}, transparent)` }}
        />

        {/* Info Panel */}
        <div className="absolute top-8 left-8 bg-black/80 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl max-w-md">
            <h1 className={`text-4xl font-bold bg-gradient-to-r ${season.color} bg-clip-text text-transparent mb-2`}>
            Earth's Bloom Pulse
            </h1>
            <p className="text-sm text-gray-400 mb-6">Global NDVI Visualization • NASA MODIS</p>

            <div className="space-y-4">
            <div className="text-2xl font-semibold text-white">
                {formatDate(currentData.date)}
            </div>

            <div>
                <div className="text-6xl font-bold bg-gradient-to-br from-emerald-400 via-green-500 to-teal-600 bg-clip-text text-transparent animate-pulse">
                {currentData.ndvi.toFixed(3)}
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">
                Normalized Difference Vegetation Index
                </div>
            </div>

            <div className={`p-4 rounded-2xl bg-gradient-to-r ${season.color} bg-opacity-10 border-l-4 border-emerald-500`}>
                <div className="text-xl font-semibold text-white mb-2">
                {season.name}
                </div>
                <div className="text-sm text-gray-300 leading-relaxed">
                {season.description}
                </div>
            </div>

            {/* Mini trend indicator */}
            <div className="flex items-center gap-2 text-xs text-gray-400">
                <div className="flex-1 h-12 relative">
                {ndviData.map((d, i) => {
                    const height = (d.ndvi - 0.28) / 0.22 * 100;
                    return (
                    <div
                        key={i}
                        className={`absolute bottom-0 transition-all duration-300 ${
                        i === currentIndex 
                            ? 'bg-gradient-to-t from-emerald-500 to-green-400 opacity-100' 
                            : 'bg-gray-700 opacity-40'
                        }`}
                        style={{
                        left: `${(i / ndviData.length) * 100}%`,
                        width: `${100 / ndviData.length}%`,
                        height: `${height}%`
                        }}
                    />
                    );
                })}
                </div>
            </div>
            </div>
        </div>

        {/* Timeline Controls */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[85%] max-w-4xl">
            <div className="bg-black/80 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-2xl">
            {/* Play/Pause */}
            <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="mx-auto mb-6 w-14 h-14 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 shadow-lg shadow-emerald-500/50 flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
                {isPlaying ? (
                <Pause className="w-6 h-6 text-white" fill="white" />
                ) : (
                <Play className="w-6 h-6 text-white ml-1" fill="white" />
                )}
            </button>

            {/* Slider */}
            <input
                type="range"
                min="0"
                max={ndviData.length - 1}
                value={currentIndex}
                onChange={(e) => {
                setCurrentIndex(parseInt(e.target.value));
                setIsPlaying(false);
                }}
                className="w-full h-2 bg-gray-700 rounded-full appearance-none cursor-pointer 
                        [&::-webkit-slider-thumb]:appearance-none 
                        [&::-webkit-slider-thumb]:w-5 
                        [&::-webkit-slider-thumb]:h-5 
                        [&::-webkit-slider-thumb]:rounded-full 
                        [&::-webkit-slider-thumb]:bg-gradient-to-r 
                        [&::-webkit-slider-thumb]:from-emerald-400 
                        [&::-webkit-slider-thumb]:to-green-500
                        [&::-webkit-slider-thumb]:shadow-lg
                        [&::-webkit-slider-thumb]:shadow-emerald-500/50
                        [&::-webkit-slider-thumb]:cursor-pointer
                        [&::-webkit-slider-thumb]:transition-all
                        [&::-webkit-slider-thumb]:hover:scale-125"
            />

            {/* Month labels */}
            <div className="flex justify-between mt-3 text-xs text-gray-500">
                <span>Jan</span>
                <span>Mar</span>
                <span>May</span>
                <span>Jul</span>
                <span>Sep</span>
                <span>Nov</span>
            </div>
            </div>
        </div>

        {/* Legend */}
        <div className="absolute bottom-8 right-8 bg-black/80 backdrop-blur-xl p-5 rounded-2xl border border-white/10 shadow-2xl">
            <div className="text-xs uppercase tracking-widest text-gray-500 mb-3">
            Vegetation Intensity
            </div>
            <div className="w-48 h-6 rounded-full bg-gradient-to-r from-red-200 via-yellow-200 via-lime-300 via-green-400 via-emerald-500 to-green-700 shadow-lg" />
            <div className="flex justify-between mt-2 text-xs text-gray-400">
            <span>Dormant</span>
            <span>Sparse</span>
            <span>Moderate</span>
            <span>Dense</span>
            </div>
        </div>

        {/* Deck.gl script loader */}
        <script src="https://unpkg.com/deck.gl@latest/dist.min.js"></script>
        </div>
    );
}