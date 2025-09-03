import type { ICurrentWeather } from "../components/WeatherApp/WeatherApp.types";
import type { IHourlyRawData } from "./mapHourlyForecast";

export const mapCurrentWeather = (currentWeatherRawData: IHourlyRawData[]): ICurrentWeather => {
    if (currentWeatherRawData === undefined || currentWeatherRawData === null) {
        return {
            highestTemp: 0,
            lowestTemp: 0,
            currentTemp: 0,
            description: '',
        };
    }

    const dailyRange: number[] = [];

    currentWeatherRawData.forEach(({ Temperature }) => {
        dailyRange[0] = Math.min(dailyRange[0], Temperature.Value) || Temperature.Value;
        dailyRange[1] = Math.max(dailyRange[1], Temperature.Value) || Temperature.Value;
    });

    return {
        highestTemp: dailyRange[1],
        lowestTemp: dailyRange[0],
        currentTemp: currentWeatherRawData[0].Temperature.Value,
        description: currentWeatherRawData[0].IconPhrase,
    };
};
