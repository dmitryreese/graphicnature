export interface IDailyRawData {
    Date: string;
    Temperature: {
        Minimum: { Value: number };
        Maximum: { Value: number };
    };
    Day: { Icon: number };
}

export const mapDailyForecast = (dailyRawData: IDailyRawData[]) => {
    if (dailyRawData === undefined || dailyRawData === null) {
        return {
            dailyForecast: [],
            weeklyRange: [],
        }
    }

    const weeklyRange: number[] = [];
    const dailyForecast = dailyRawData.map((forecast: IDailyRawData, idx: number) => {
        const {
            Date: forecastDate,
            Temperature,
            Day,
        } = forecast;

        const dayName = new Date(forecastDate).toLocaleDateString('en-US', { weekday: 'long' });

        weeklyRange[0] = Math.min(weeklyRange[0], Temperature.Minimum.Value) || Temperature.Minimum.Value;
        weeklyRange[1] = Math.max(weeklyRange[1], Temperature.Maximum.Value) || Temperature.Maximum.Value;

        return {
            dayName: idx === 0 ? 'Today' : dayName.substring(0, 3),
            temp: [Temperature.Minimum.Value, Temperature.Maximum.Value],
            icon: Day.Icon,
        };
    });

    return {
        dailyForecast,
        weeklyRange,
    };
};
