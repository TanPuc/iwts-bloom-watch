import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import ndviRoutes from './routes/ndvi.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Request logging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Routes
app.use('/api/ndvi', ndviRoutes);

// Health check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        service: 'BloomWatch'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Endpoint not found'
    });
});

// Error handling
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({
        success: false,
        error: 'Internal server error',
        message: err.message
    });
});

app.listen(PORT, () => {
    console.log(`BloomWatch Backend running on http://localhost:${PORT}`);
    console.log(`NDVI endpoints:`);
    console.log(`   - Health: http://localhost:${PORT}/api/health`);
    console.log(`   - Global NDVI: http://localhost:${PORT}/api/ndvi/global`);
    console.log(`   - Regional NDVI: http://localhost:${PORT}/api/ndvi/regional`);
    console.log(`   - Point NDVI: http://localhost:${PORT}/api/ndvi/point`);
});