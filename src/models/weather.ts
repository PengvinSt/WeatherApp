import ILocation from "../types/location";
import IWeather from "../types/weather";

const weatherCodeInfo:{ [key: number]: string } = {
    "0":'Clear sky',
    "1":'Mainly clear',
    "2":'Partly cloudy',
    "3":'Overcast',
    "45":'Fog',
    "48":'Depositing rime fog',
    "51":'Drizzle: Light intensity',
    "53":'Drizzle: Moderate intensity',
    "55":'Drizzle: Dense intensity',
    "56":'Freezing Drizzle: Light intensity',
    "57":'Freezing Drizzle: Dense intensity',
    "61":'Rain: Slight intensity',
    "63":'Rain: Moderate intensity',
    "65":'Rain: Heavy intensity',
    "66":'Freezing Rain: Light intensity',
    "67":'Freezing Rain: Heavy intensity',
    "71":'Snow fall: Slight intensity',
    "73":'Snow fall: Moderate intensity',
    "75":'Snow fall: Heavy intensity',
    "77":'Snow grains',
    "80":'Rain showers: Slight',
    "81":'Rain showers: Moderate',
    "82":'Rain showers: Violent',
    "85":'Snow showers slight',
    "86":'Snow showers heavy',
    "95":'Thunderstorm: Slight or moderate',
    "96":'Thunderstorm with slight hail',
    "99":'Thunderstorm with heavy hail',
  }


export default class Weather implements IWeather{
    current_weather: { time: string; interval: number; temperature: number; windspeed: number; winddirection: number; is_day: boolean; weathercode: number; weather_message?: string | undefined; };
    current_weather_units: { time: string; interval: string; temperature: string; windspeed: string; winddirection: string; is_day: string; weathercode: string; };
    hourly: { time: string[]; temperature_2m: number[]; };
    hourly_units: { time: string; temperature_2m: string; };
    hourly_modified?: { time: string; temperature: number; }[][] | undefined;
    timezone: string;
    location: ILocation;
    

    setObjectFromArrays({hourly}:{ hourly: { time: string[]; temperature_2m: number[] } }){
        const combinedArray: { time: string; temperature: number }[] = hourly.time.map((time, i) => ({
            time:time.split('T')[1],
            temperature: hourly.temperature_2m[i]
          }));
        const dailyArray = Array.from({ length: 7}, (_, i) =>
            combinedArray.slice(i * 24, i * 24 + 24)
        );
        return dailyArray
    }

    constructor(weather: IWeather, location: ILocation) {
        this.current_weather = {
            ...weather.current_weather,
            weather_message: weatherCodeInfo[weather.current_weather.weathercode]
        }
        this.current_weather_units = weather.current_weather_units
        this.hourly = weather.hourly
        this.hourly_units = weather.hourly_units
        this.timezone = weather.timezone
        this.location = location
        this.hourly_modified = this.setObjectFromArrays({ hourly: weather.hourly })
    }

}