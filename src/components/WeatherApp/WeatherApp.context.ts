import { createContext } from "react";

import type { WeatherAppContextProps } from "./WeatherApp.types";

export const initContext = () => createContext<WeatherAppContextProps>({
    location: undefined,
    isLocationLoading: false,
    isLocationError: false,
    currentWeather: undefined,
    isGeoEnabled: false,
    setLocation: () => {},
    setIsLocationLoading: () => {},
    setIsLocationError: () => {},
    setCurrentWeather: () => {},
    setIsGeoEnabled: () => {},
});
