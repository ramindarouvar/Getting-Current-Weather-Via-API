// import http from "./httpService";
import config from "./config.json";
import axios from 'axios';

export const getTheCityWeather = city => {
    return axios.get(`${config.weatherapi}`, {
        params:{
            q: city,
            aqi: 'no'
        }
    })
}