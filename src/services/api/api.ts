import { useCallback, useContext } from 'react';

import {
    API_KEY,
    DAILY_FORECAST_URL,
    GEOPOSITION_URL,
    HOURLY_FORECAST_URL,
} from './api.const';
import { WeatherAppContext } from '../../components/WeatherApp';
import { useOfflineData } from '../../hooks/useOfflineData';
import { mapCurrentWeather } from '../../utils/mapCurrentWeather';

import { LOCATION_OFFLINE_DATAKEY } from '../../components/WeatherApp/WeatherApp.const';

export const useApi = () => {
    const { setOfflineData } = useOfflineData();
    const {
        location,
        isLocationLoading,
        isLocationError,
        setLocation,
        setIsLocationLoading,
        setIsLocationError,
        setCurrentWeather,
    } = useContext(WeatherAppContext);

    const fetchLocation = useCallback(async (lat: number, lon: number) => {
        try {
            setIsLocationError(false);
            setIsLocationLoading(true);

            const res = await fetch(`${GEOPOSITION_URL}?apikey=${API_KEY}&q=${lat},${lon}`);
            const location = await res.json();

            setLocation(location);
            setOfflineData(LOCATION_OFFLINE_DATAKEY, location);
        } catch (err) {
            setIsLocationError(true);
        } finally {
            setIsLocationLoading(false);
        }
    }, [setIsLocationError, setIsLocationLoading, setLocation, setOfflineData]);

    const fetchHourly = useCallback(async () => {
        if (location?.Key && !isLocationLoading && !isLocationError) {
            const res = await fetch(`${HOURLY_FORECAST_URL}${location.Key}?apikey=${API_KEY}`);
            const hourly = await res.json();

            if (hourly !== undefined && hourly !== null) {
                setCurrentWeather(mapCurrentWeather(hourly));
            }

            return hourly;
        };
    }, [location, isLocationLoading, isLocationError, setCurrentWeather, mapCurrentWeather]);

    const fetchDaily = useCallback(async () => {
        if (location?.Key && !isLocationLoading && !isLocationError) {
            const res = await fetch(`${DAILY_FORECAST_URL}${location.Key}?apikey=${API_KEY}`);
            const daily = await res.json();

            return daily;
        };
    }, [location, isLocationLoading, isLocationError]);

    return {
        fetchLocation,
        fetchHourly,
        fetchDaily,
    };
};
