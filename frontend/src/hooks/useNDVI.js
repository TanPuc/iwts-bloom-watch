import { useState, useEffect } from 'react';
import { ndviAPI } from '../services/api.js';

export function useNDVI(lat, lon, startDate, endDate) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (lat && lon && startDate && endDate) {
      fetchNDVI();
    }
  }, [lat, lon, startDate, endDate]);

  const fetchNDVI = async () => {
    setLoading(true);
    try {
      const result = await ndviAPI.getPoint(lat, lon, startDate, endDate);
      setData(result.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch: fetchNDVI };
}