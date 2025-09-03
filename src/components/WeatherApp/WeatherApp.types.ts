export interface WeatherAppContextProps {
    location?: ILocation;
    isLocationLoading: boolean;
    isLocationError: boolean;
    currentWeather?: ICurrentWeather;
    isGeoEnabled: boolean;
    setLocation: (location: ILocation) => void;
    setIsLocationLoading: (isLocationLoading: boolean) => void;
    setIsLocationError: (isLocationError: boolean) => void;
    setCurrentWeather: (currentWeather: ICurrentWeather) => void;
    setIsGeoEnabled: (isGeoEnabled: boolean) => void;
}

export interface ICurrentWeather {
    highestTemp: number;
    lowestTemp: number;
    currentTemp: number;
    description: string;
}

export interface ILocation {
    Key: number;
    EnglishName: string;
}
