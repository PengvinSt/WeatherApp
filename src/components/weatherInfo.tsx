import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import { useAppContext } from '../utils/context'
import '../styles/WeatherPage.scss'
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import weather_normal from '../assets/images/weather_normal.png';
import weather_mid from '../assets/images/weather_mid.png';
import weather_fog from '../assets/images/weather_fog.png';
import weather_rain from '../assets/images/weather_rain.png';
import weather_snow from '../assets/images/weather_snow.png';
import weather_storm from '../assets/images/weather_storm.png';
import onEveryTick from '../utils/utils';

function WeatherPage() {
  const { api, store } = useAppContext()
  const [day, setDay] = useState<{ index: number; day: string; }>({index:0,day:"0"})
  const [week, setWeek] = useState<{ index: number; day: string; }[]>([]);

  const getWeatherImg = () => {
    let weathercode = 1
    if(store.weather.weather?.current_weather.weathercode !== undefined) {
      weathercode = store.weather.weather?.current_weather.weathercode
    }
    
    if (weathercode < 2 ) {
      return weather_normal;
    } else if (weathercode < 4 ) {
      return weather_mid;
    } else if (weathercode < 46) {
      return weather_fog;
    } else if (weathercode < 71) {
      return weather_rain;
    } else if (weathercode < 80) {
      return weather_snow;
    } else if (weathercode < 85) {
      return weather_rain;
    } else if (weathercode < 95) {
      return weather_snow;
    } else if (weathercode < 95) {
      return weather_storm;
    } else {
      return weather_normal;
    }
  }
  
  useEffect(()=> {
    const weekArray = Array.from({length:7}).map((_, i)=> {
      const currentDate = new Date();
      return {
        index:i,
        day:new Date(currentDate.setDate(currentDate.getDate() + i)).toISOString().split('T')[0].split('-').slice(1).join('.'),
      }
    })
    setWeek([...weekArray])
    setDay(weekArray[0])
    
  }, [])
  
  useEffect(()=> {
    onEveryTick(() => {
      if(store.user.currentUser !== null){
        api.weather.getCurrentWeather(store.user.currentUser)
      }
      console.log('Get weather info (Repeat)')
    }, 3e5);
  }, [api.weather, store.user.currentUser])

  

  
  return (
    <div className='weather_page_container'>
      {/* <button onClick={handleNavigation} className='back_button'>Back</button> */}
        <div className='weather_graph_container'>
        <div className="weather_graph_inner_container">
        <div className="graph">
          <ResponsiveContainer width="98%" height="100%" className="graph_day_weather">
              <LineChart data={store.weather.weather?.hourly_modified?.[day.index]}>
                <XAxis dataKey="time" />
                <YAxis/>
                <Tooltip contentStyle={{background: "#d19e409f", border:"none", borderRadius:'15px'}}/>
                <Line type="monotone" dataKey="temperature" stroke="#4e3912" />
              </LineChart>
          </ResponsiveContainer>
        </div>
        <img className="weather_image" src={getWeatherImg()} alt="weather representation" />
        </div>
        <div className="day_picker_container">
          {week.map((el, i)=> <button className='select_day_button' key={i} onClick={()=> setDay(el)}>{el.day}</button>)}
        </div>
        </div>
        <div className="weather_info_container">
          <h1>Avarage weather info for today:</h1>
          <div className='info_container'>
            <p>Weather condition: {store.weather.weather?.current_weather.weather_message}</p>
            <p>Temperature: {store.weather.weather?.current_weather.temperature} {store.weather.weather?.current_weather_units.temperature}</p>
            <p>Time of forecast: {store.weather.weather?.current_weather.time.split('T')[1]}</p>
            <p>Wind direction: {store.weather.weather?.current_weather.winddirection} {store.weather.weather?.current_weather_units.winddirection}</p>
            <p>Wind speed: {store.weather.weather?.current_weather.windspeed} {store.weather.weather?.current_weather_units.windspeed}</p>
          </div>
        </div>
    </div>
  )
}
/*
<p>Current weather</p>
  <p>is_day: {store.weather.weather?.current_weather.is_day} {store.weather.weather?.current_weather_units.is_day}</p>
*/
export default observer(WeatherPage)
