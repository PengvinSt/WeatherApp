import UserStore from "./user";
import WeatherStore from "./weather";

export default class AppStore {
    user = new UserStore(this);
    weather = new WeatherStore(this);
}