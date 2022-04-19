import React, { Fragment, useEffect, useState } from 'react';
import { getTheCityWeather } from './../../services/weatherService';

const Weather = () => {
    const [todayWeather, setTodayWeather] = useState(null)
    const [loading, setLoading] = useState(false)
    const [citySelected, setCitySelected] = useState(false);
    const today = new Date().toLocaleDateString('fa-IR');

    useEffect(() => {
        // go to top of the page
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    },[])

    // function for getting selected city weather information
    const getWeather = async (event) => {
        // city (english writing)
        var city = event.target.value;
        // city (persian writing)
        var cityPersianName = event.target.selectedOptions[0].text;
        try {
            // get the city today weather informtion from web service
            const {status, data} = await getTheCityWeather(city);
            if (status === 200) {
                // get response body (JSON)
                var weatherInformation = data;
                // set weather information object properties & values
                var weatherInformationObject = {
                    // english
                    cityName : weatherInformation.location.name,
                    // persian
                    cityPersianName : cityPersianName,
                    weatherStatus : weatherInformation.current.condition.text,
                    weatherSymbolPic : weatherInformation.current.condition.icon,
                    // temp (Celsius | centigrade)
                    tempC : weatherInformation.current.temp_c,
                    // temp (Fahrenheit)
                    tempF : weatherInformation.current.temp_f,
                    // day(1) or night(0)
                    isDay : weatherInformation.current.is_day,
                }
                // set todayWeather state by selected city
                setTodayWeather(weatherInformationObject);
                // stop showing loading spinners
                setLoading(false);
            } 
        } catch (error) {
            setCitySelected(false);
            // stop showing loading spinners
            setLoading(false);
            alert("اطلاعات مورد نظر دریافت نشد.")
            document.getElementById("city-select").value = 0;
        }
    }
    const handleCitySelecting = (event) => {
        // show loading spinners
        setLoading(true);
        setCitySelected(true);
        // function for getting selected city weather information
        getWeather(event);
    }
    return ( 
        <Fragment>
            <div className="border rounded w-100 p-5 text-white weather-container">
                <h1 className="text-center">آب و هوای امروز</h1>
                <div className="text-center">
                    {today}
                </div>
                <div className="px-3 py-1 mt-3 text-justify row justify-content-center">
                        <div className="col-12 col-md-7 col-xl-6 mx-auto">
                            <select className="custom-select font-weight-bold text-center" id="city-select" style={{fontSize: "25px"}} 
                                    defaultValue={0} 
                                    onChange={handleCitySelecting}
                            >
                                <option value={0} disabled hidden>انتخاب شهر</option>
                                <option value='Ardabil'>اردبیل</option>
                                <option value='Esfahan'>اصفهان</option>
                                <option value='ahvaz'>اهواز</option>
                                <option value='arak'>اراک</option>
                                <option value='ilam'>ایلام</option>
                                <option value='bushehr'>بوشهر</option> 
                                <option value='birjand'>بیرجند</option>
                                <option value='Bandar `Abbas'>بندرعباس</option>
                                <option value='bojnurd'>بجنورد</option>
                                <option value='tehran'>تهران</option>
                                <option value='hamedan'>همدان</option>
                                <option value='khorramabad'>خرم‌آباد</option>
                                <option value='rasht'>رشت</option>
                                <option value='zahedan'>زاهدان</option>
                                <option value='zanjan'>زنجان</option>
                                <option value='sanandaj'>سنندج</option>
                                <option value='sari'>ساری</option>
                                <option value='semnan'>سمنان</option>
                                <option value='Shahr Kord'>شهرکرد</option>
                                <option value='shiraz'>شیراز</option>
                                <option value='ghazvin'>قزوین</option>
                                <option value='qom'>قم</option>
                                <option value='kerman'>کرمان</option>
                                <option value='kermanshah'>کرمانشاه</option>
                                <option value='karaj'>کرج</option>
                                <option value='gorgan'>گرگان</option>
                                <option value='mashhad'>مشهد</option>
                                <option value='yasooj'>یاسوج</option>
                                <option value='yazd'>یزد</option>
                            </select>
                        </div>
                        {citySelected ? 
                                (loading ?
                                    <div className="col-12 text-center py-3" style={{height: "262px"}}>
                                        <div className="mt-1 mb-2">
                                            <img src="./images/spinners/loadingSpinner.gif" width="70px" alt="loading"/> 
                                        </div>
                                        <span className="h3" style={{color: "rgb(191, 208, 255)"}}>در حال دریافت اطلاعات ...</span>
                                    </div>
                                :
                                    <div className="col-12 d-flex flex-column">
                                        <div className="text-center py-3">
                                            <img src={`${todayWeather.weatherSymbolPic}`} alt="weather" width='65px'/>
                                        </div>
                                        <div className="d-none d-md-block">
                                            <table className=" w-100 table text-white weather-table">
                                                <thead>
                                                    <tr className="text-right text-md-center">
                                                        <th scope="col">شهر</th>
                                                        <th scope="col">شرایط جوی</th>
                                                        <th scope="col">دمای کنونی(سانتیگراد) </th>
                                                        <th scope="col">دمای کنونی(فارنهایت) </th>
                                                        <th scope="col">
                                                            روشنایی
                                                            {" "}
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr className="text-right text-md-center">
                                                        <td>{todayWeather.cityPersianName}</td>
                                                        <td>{todayWeather.weatherStatus}</td>
                                                        <td dir="ltr">
                                                            {todayWeather.tempC}
                                                            <span className="temperature-unit">°C</span>
                                                        </td>
                                                        <td dir="ltr">
                                                            {todayWeather.tempF}
                                                            <span className="temperature-unit">°F</span>
                                                        </td>
                                                        <td dir="ltr">
                                                            {todayWeather.isDay ? "روز" : "شب"}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="d-block d-md-none">
                                            <table className="table text-white weather-table">
                                                <tbody>
                                                    <tr className="text-right text-md-center">
                                                        <td className="text-center">{todayWeather.cityName}</td>
                                                        <th scope="col">شهر</th>
                                                    </tr>
                                                    <tr className="text-right text-md-center">
                                                        <td className="text-center">{todayWeather.weatherStatus}</td>
                                                        <th scope="col">شرایط جوی</th>
                                                    </tr>
                                                    <tr className="text-right text-md-center">
                                                        <td className="text-center" dir="ltr">
                                                            {todayWeather.tempC}
                                                            <span className="temperature-unit">°C</span>
                                                        </td>
                                                        <th scope="col">دمای کنونی(سانتیگراد) </th>
                                                    </tr>
                                                    <tr className="text-right text-md-center">
                                                        <td className="text-center" dir="ltr">
                                                            {todayWeather.tempF}
                                                            <span className="temperature-unit">°F</span>
                                                        </td>
                                                        <th scope="col">دمای کنونی(فارنهایت) </th>
                                                    </tr>
                                                    <tr className="text-right text-md-center">
                                                        <td className="text-center" dir="ltr">
                                                            {todayWeather.isDay ? "روز" : "شب"}
                                                        </td>
                                                        <th scope="col">
                                                                روشنایی
                                                                {" "}
                                                                <i className="fa fa-long-arrow-down min-temp-icon" aria-hidden="true"></i>
                                                        </th>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )
                            :
                                null
                        }
                </div>
            </div>
        </Fragment>
     );
}
 
export default Weather;