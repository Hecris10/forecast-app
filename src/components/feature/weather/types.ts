export interface WeatherPeriod {
  number: number;
  name: string;
  temperature: number;
  temperatureUnit: string;
  shortForecast: string;
  windSpeed: string;
  windDirection: string;
  icon: string;
}

export interface WeatherForecastData {
  success: boolean;
  data?: {
    properties?: {
      periods?: WeatherPeriod[];
    };
  };
}

export type TemperatureUnit = "F" | "C";
