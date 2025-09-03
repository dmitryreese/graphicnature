import { useState, useMemo } from 'react';

import { WeatherApp as Component } from "./WeatherApp";

import { initContext } from "./WeatherApp.context";
import { mapCurrentWeather } from '../../utils/mapCurrentWeather';
import { useOfflineData } from '../../hooks/useOfflineData';
import { HOURLY_OFFLINE_DATAKEY } from '../Hourly/Hourly.const';

import type { ICurrentWeather, ILocation, WeatherAppContextProps } from './WeatherApp.types';
import { LOCATION_OFFLINE_DATAKEY } from './WeatherApp.const';

export const WeatherAppContext = initContext();

export const WeatherApp = (): React.JSX.Element => {
    const { getOfflineData } = useOfflineData();
    const locationOfflineData = getOfflineData(LOCATION_OFFLINE_DATAKEY);
    const hourlyOfflineData = getOfflineData(HOURLY_OFFLINE_DATAKEY);
    const offlineWeather = hourlyOfflineData && mapCurrentWeather(hourlyOfflineData);

    const [location, setLocation] = useState<ILocation>(locationOfflineData);
    const [isLocationError, setIsLocationError] = useState(false);
    const [isLocationLoading, setIsLocationLoading] = useState(false);
    const [currentWeather, setCurrentWeather] = useState<ICurrentWeather>(offlineWeather);
    const [isGeoEnabled, setIsGeoEnabled] = useState(false);

    const contextValue: WeatherAppContextProps = useMemo(() => {
        return {
            location,
            isLocationError,
            isLocationLoading,
            currentWeather,
            isGeoEnabled,
            setLocation,
            setIsLocationLoading,
            setIsLocationError,
            setCurrentWeather,
            setIsGeoEnabled,
        };
    }, [location, isLocationError, isLocationLoading, currentWeather, isGeoEnabled]);

    return (
        <WeatherAppContext.Provider value={contextValue}>
            <Component />
        </WeatherAppContext.Provider>
    );
}
