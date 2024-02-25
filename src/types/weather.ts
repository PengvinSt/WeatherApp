import ILocation from "./location"

export default interface IWeather {
    location:ILocation,
    timezone:string,
    current_weather_units:{
        time:string,
        interval:string,
        temperature:string,
        windspeed:string,
        winddirection:string,
        is_day:string,
        weathercode:string
    },
    current_weather:{
        time:string,
        interval:number,
        temperature:number,
        windspeed:number,
        winddirection:number,
        is_day:boolean,
        weathercode:number,
        weather_message?:string,
    },
    hourly_units:{
        time:string,
        temperature_2m:string
    },
    hourly:{
        time:string[],
        temperature_2m: number[]
    },
    hourly_modified?:{
        time:string,
        temperature: number
    }[][],
}