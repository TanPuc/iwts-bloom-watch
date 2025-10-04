import { useState, useEffect } from 'react';
import { bloomAPI } from '../services/api';

export function useBloomAnimation(region, year) {
    const [frames, setFrames] = useState([]);
    const [currentFrame, setCurrentFrame] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (region && year) {
            loadAnimation();
        }
    }, [region, year]);

    const loadAnimation = async () => {
        const result = await bloomAPI.getAnimation({ region, year });
        setFrames(result.frames);
    };

    return {
        frames,
        currentFrame,
        setCurrentFrame,
        isPlaying,
        setIsPlaying
    };
}