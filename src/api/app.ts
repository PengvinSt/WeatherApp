import axios from "axios";
import AppStore from "../store/app";
import UserApi from "./user";
import WeatherApi from "./weather";

export default class AppApi {

    user: UserApi;

    weather: WeatherApi;

    userConnection = axios.create({
        baseURL:'https://randomuser.me'
    });

    weatherConnection = axios.create({
        baseURL:'https://api.open-meteo.com/v1'
    })

    constructor(store: AppStore) {
        this.user = new UserApi(this, store);
        this.weather = new WeatherApi(this, store);
    }
}