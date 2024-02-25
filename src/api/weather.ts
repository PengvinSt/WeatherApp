import AppStore from "../store/app";
import IUser from "../types/user";
import AppApi from "./app";

export default class WeatherApi {
    constructor(private api: AppApi, private store: AppStore) {}

    async getCurrentWeather(user: IUser){
        const { location } = user

        const params = {
            latitude:location.coordinates.latitude,
            longitude:location.coordinates.longitude,
            current_weather:'true',
            hourly:'temperature_2m'
        }
        
        try {
            const {data} = await this.api.weatherConnection.get(`/forecast/`, { params })
            this.store.weather.setWeather(data, location)
        } catch (error) {
            console.error(error);
        }
    }
}