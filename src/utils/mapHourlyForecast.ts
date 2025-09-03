export interface IHourlyRawData {
    DateTime: string;
    PrecipitationProbability: number;
    Temperature: { Value: number };
    IconPhrase: string;
}

export interface IHourlyData {
    hourlyForecast: {
        time: string;
        temp: number;
        precipitation: number;
        icon: string;
    }[];
    dailyRange: number[];
}

export const mapHourlyForecast = (hourlyRawData: IHourlyRawData[]): IHourlyData => {
    if (hourlyRawData === undefined || hourlyRawData === null) {
        return {
            dailyRange: [],
            hourlyForecast: [],
        };
    }

    const dailyRange: number[] = [];
    const hourlyForecast = hourlyRawData.map((forecast: IHourlyRawData, idx: number) => {
        const {
            DateTime,
            PrecipitationProbability,
            Temperature,
            IconPhrase,
        } = forecast;

        dailyRange[0] = Math.min(dailyRange[0], Temperature.Value) || Temperature.Value;
        dailyRange[1] = Math.max(dailyRange[1], Temperature.Value) || Temperature.Value;

        return {
            time: idx === 0 ? 'Now' : `${new Date(DateTime).getHours()}:00`,
            temp: Temperature.Value,
            precipitation: PrecipitationProbability,
            icon: IconPhrase,
        }
    });

    return {
        dailyRange,
        hourlyForecast,
    };
};
