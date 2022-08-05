// import http from "./httpService";
import config from "./config.json";
import axios from 'axios';

export const getTheCityWeather = city => {
    return axios.get(`${config.weatherapi}`, {
        params:{
            key: '30a23f064956499aafa152614221804',
            q: city,
            aqi: 'no'
        },
    })
}