import { makeAutoObservable } from 'mobx'
import AppStore from './app';
import Weather from '../models/weather';
import IWeather from '../types/weather';
import ILocation from '../types/location';

export default class WeatherStore {
    constructor(private store: AppStore) {
        makeAutoObservable(this);
    }

    weather:IWeather | null = null

    setWeather(weather:IWeather, location:ILocation) {
        this.weather = new Weather(weather, location)
    }
}