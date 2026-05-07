/* eslint-disable react-hooks/set-state-in-effect, react-hooks/exhaustive-deps */
import { useState, useEffect, useRef, useCallback } from 'react';

export const useApi = (apiCall, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const apiCallRef = useRef(apiCall);

  useEffect(() => {
    apiCallRef.current = apiCall;
  }, [apiCall]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiCallRef.current();
      setData(result);
    } catch (err) {
      const isTimeout = err?.code === 'ECONNABORTED' || err?.message?.toLowerCase().includes('timeout');
      const message = isTimeout
        ? 'Request timed out. Please make sure the backend is running and try again.'
        : err.response?.data?.message || err.message || 'An error occurred';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, dependencies);

  const refetch = () => fetchData();

  return { data, loading, error, refetch };
};
