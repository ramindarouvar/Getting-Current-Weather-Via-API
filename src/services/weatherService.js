// import http from "./httpService";
import config from "./config.json";
import axios from 'axios';

export const getTheCityWeather = city => {
    const apiKey = '30a23f064956499aafa152614221804';
    return axios.get(`${config.weatherapi}`, {
        params:{
            key: apiKey,
            q: city,
            aqi: 'no'
        },
    })
}