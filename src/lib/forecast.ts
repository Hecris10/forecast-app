interface WeatherPeriod {
  number: number;
  name: string;
  startTime: string;
  endTime: string;
  isDaytime: boolean;
  temperature: number;
  temperatureUnit: string;
  windSpeed: string;
  windDirection: string;
  icon: string;
  shortForecast: string;
  detailedForecast: string;
}
export const getSevenDayForecast = (periods: WeatherPeriod[]) => {
  const dailyForecasts = [];
  for (let i = 0; i < Math.min(14, periods.length); i += 2) {
    const dayPeriod = periods[i];
    const nightPeriod = periods[i + 1];
    if (dayPeriod && nightPeriod) {
      dailyForecasts.push({
        day: dayPeriod,
        night: nightPeriod,
        date: new Date(dayPeriod.startTime).toLocaleDateString("en-US", {
          weekday: "long",
          month: "short",
          day: "numeric",
        }),
      });
    }
  }
  return dailyForecasts;
};
