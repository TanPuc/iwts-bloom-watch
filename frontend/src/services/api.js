import axios from 'axios'

// API call to backend
const API_BASE_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 60000,
});

export const ndviAPI = {
    getGlobal: async(startDate, endDate) => {
        const response = await api.get('/ndvi/global', {
            params: { start: startDate, end: endDate }
        });
        return response.data;
    },

    getRegional: async(bbox, startDate, endDate) => {
        const response = await api.get('/ndvi/regional', {
            params: {
                minLon: bbox[0],
                minLat: bbox[1],
                maxLon: bbox[2],
                maxLat: bbox[3],
                start: startDate,
                end: endDate
            }
        });
        return response.data;
    },

    getPoint: async(lat, lon, startDate, endDate, buffer = 1000) => {
        const response = await api.get('/ndvi/point', {
            params: {lat, lon, start: startDate, end: endDate, buffer}
        });
        return response.data;
    }
};

export const bloomAPI = {
    /*
    detect: async (data) => {
        const response = await api.post('/blooms/detect', data);
        return response.data;
    },
    */
    getAnimation: async (params) => {
        const response = await api.get('/blooms/animation', { params });
        return response.data;
    }
};

export default api;