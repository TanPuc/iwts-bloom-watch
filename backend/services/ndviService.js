import ee from '@google/earthengine';
import { initEE } from '../config/earthEngine.js'

// Get NDVI data
class NDVIService {
    async getGlobalNDVITimeSeries(startDate, endDate){
        await initEE();

        const dataset = ee.ImageCollection("MODIS/061/MOD13Q1")
            .filterDate(startDate, endDate)
            .select("NDVI");

        const computeMean = (image) =>
            ee.Feature(null, {
            date: ee.Date(image.get("system:time_start")).format("YYYY-MM-dd"),
            ndvi: image
                .reduceRegion({
                reducer: ee.Reducer.mean(),
                geometry: ee.Geometry.Rectangle([-180, -90, 180, 90]),
                scale: 5000,
                maxPixels: 1e13,
                })
                .get("NDVI"),
            });
        
        const features = dataset.map(computeMean);

        return new Promise((resolve, reject) => {
            features.evaluate((result, error) => {
                if (error) {
                    reject(error);
                } else {
                    const data = result.features.map((f) => ({
                        date: f.properties.date,
                        ndvi: f.properties.ndvi / 10000,
                    }));
                    resolve(data);
                }             
            });
        });
    }

    async getRegionalNDVITimeSeries(bbox, startDate, endDate) {
        await initEE();
        
        const geometry = ee.Geometry.Rectangle(bbox);

        const dataset = ee.ImageCollection("MODIS/061/MOD13Q1")
            .filterDate(startDate, endDate)
            .filterBounds(geometry)
            .select("NDVI");

        const computeMean = (image) =>
            ee.Feature(null, {
            date: ee.Date(image.get("system:time_start")).format("YYYY-MM-dd"),
            ndvi: image
                .reduceRegion({
                reducer: ee.Reducer.mean(),
                geometry: geometry,
                scale: 250,
                maxPixels: 1e9,
                })
                .get("NDVI"),
            });
        
        const features = dataset.map(computeMean);

        return new Promise((resolve, reject) => {
            features.evaluate((result, error) => {
                if (error) {
                    reject(error);
                } else {
                    const data = result.features.map((f) => ({
                        date: f.properties.date,
                        ndvi: f.properties.ndvi / 10000,
                    }));
                    resolve(data);
                }             
            });
        });
    }

    // High-res LANDSAT NDVI for specific point
    async getLandsatNDVI(lat, lon, startDate, endDate, bufferMeters = 1000) {
        await initEE();

        const point = ee.Geometry.Point([lon, lat]).buffer(bufferMeters);

        // Extract NDVI
        const collection = ee.ImageCollection('LANDSAT/LC09/C02/T1_L2')
                            .filterBounds(point)
                            .filterDate(startDate, endDate)
                            .filter(ee.Filter.lt('CLOUD_COVER', 20))
                            .map((image) => {
                                const optical = image.select('SR_B.').multiply(0.0000275).add(-0.2);
                                const scaled = image.addBands(optical, null, true);
                                const ndvi = scaled.normalizedDifference(['SR_B5', 'SR_B4']).rename('NDVI');
                                const evi = scaled.expression(
                                    '2.5 * ((NIR - RED) / (NIR + 6 * RED - 7.5 * BLUE + 1))',
                                    {
                                        'NIR': scaled.select('SR_B5'),
                                        'RED': scaled.select('SR_B4'),
                                        'BLUE': scaled.select('SR_B2')
                                    }
                                ).rename('EVI');
                                const ndmi = scaled.normalizedDifference(['SR_B5', 'SR_B6']).rename('NDMI');

                                return image.addBands([ndvi, evi, ndmi])
                                    .set('system:time_start', image.get('system:time_start'));
                            });
        
        const features = collection.map((image) => {
            const stats = image.select(['NDVI', 'EVI', 'NDMI']).reduceRegion({
                reducer: ee.Reducer.mean(),
                geometry: point,
                scale: 30,
                maxPixels: 1e9
            });

            return ee.Feature(null, {
                date: ee.Date(image.get('system:time_start')).format('YYYY-MM-dd'),
                ndvi: stats.get('NDVI'),
                evi: stats.get('EVI'),
                ndmi: stats.get('NDMI')
            });
        });

        return new Promise((resolve, reject) => {
            features.evaluate((result, error) => {
                if (error) {
                    reject(error);
                } else {
                    const data = result.features.map((f) =>  f.properties);
                    resolve(data);
                }             
            });
        });
    }
}

export default new NDVIService();