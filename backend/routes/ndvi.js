import express from 'express';
import NDVIService from '../services/ndviService.js';

const router = express.Router();

// GET /api/ndvi/global for global NDVI time series
router.get('/global', async (req, res) => {
    try {
        const start = req.query.start || "2024-01-01";
        const end = req.query.end || "2024-12-31";

        console.log(`Fetching global NDVI from ${start} to ${end}`);

        const data = await NDVIService.getGlobalNDVITimeSeries(start, end);

        res.status(200).json({
            succes: true,
            data: data,
            metadata: {
                source: 'MODIS/061/MOD13Q1',
                startDate: start,
                endDate: end,
                dataPoints: data.length
            }
        });
    } catch(error) {
        console.error('Error fetching global NDVI: ', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// GET /api/ndvi/regional for regional NDVI time series
router.get('/regional', async (req, res) => {
    try {
        const { minLon, minLat, maxLon, maxLat, start, end } = req.query

        if (!minLon || !minLat || !maxLon || !maxLat) {
            return res.status(400).json({
                success: false,
                error: 'Missing parameters: minLon, minLat, maxLon, maxLat'
            });
        }

        const bbox = [
            parseFloat(minLon),
            parseFloat(minLat),
            parseFloat(maxLon),
            parseFloat(maxLat)
        ];

        const startDate = start || "2024-01-01";
        const endDate = end || "2024-12-31";

        console.log(`Fetching regional NDVI for bbox: ${bbox}`);

        const data = await NDVIService.getRegionalNDVITimeSeries(bbox, startDate, endDate);

        res.status(200).json({
            success: true,
            data: data,
            metadata: {
                bbox: bbox,
                startDate: startDate,
                endDate: endDate
            }
        });
    } catch(error) {
        console.error('Error fetching regional NDVI: ', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// GET /api/ndvi/points for point NDVI time series
router.get('/point', async (req, res) => {
    try {
        const { lat, lon, start, end, buffer } = req.query;

        if (!lat || !lon) {
            return res.status(400).json({
                success: false,
                error: 'Missing required parameters: lat, lon'
            });
        }

        const startDate = start || "2024-03-01";
        const endDate = end || "2024-05-31";
        const bufferMeters = buffer ? parseInt(buffer) : 1000;

        console.log(`Fetching Landsat NDVI for point: ${lat}, ${lon}`);

        const data = await NDVIService.getLandsatNDVI(
            parseFloat(lat),
            parseFloat(lon),
            startDate,
            endDate,
            bufferMeters
        );

        res.json({
            success: true,
            data: data,
            metadata: {
                lat: parseFloat(lat),
                lon: parseFloat(lon),
                startDate: startDate,
                endDate: endDate,
                source: 'Landsat 9',
                resolution: '30m'
            }
        });
    } catch(error) {
        console.log('Error fetching point NDVI: ', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

export default router;