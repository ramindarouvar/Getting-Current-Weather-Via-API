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
            alert("?????????????? ???????? ?????? ???????????? ??????.")
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
                <h1 className="text-center">???? ?? ???????? ??????????</h1>
                <div className="text-center">
                    {today}
                </div>
                <div className="px-3 py-1 mt-3 text-justify row justify-content-center">
                        <div className="col-12 col-md-7 col-xl-6 mx-auto">
                            <select className="custom-select font-weight-bold text-center" id="city-select" style={{fontSize: "25px"}} 
                                    defaultValue={0} 
                                    onChange={handleCitySelecting}
                            >
                                <option value={0} disabled hidden>???????????? ??????</option>
                                <option value='Ardabil'>????????????</option>
                                <option value='Esfahan'>????????????</option>
                                <option value='ahvaz'>??????????</option>
                                <option value='arak'>????????</option>
                                <option value='ilam'>??????????</option>
                                <option value='bushehr'>??????????</option> 
                                <option value='birjand'>????????????</option>
                                <option value='Bandar `Abbas'>????????????????</option>
                                <option value='bojnurd'>????????????</option>
                                <option value='tehran'>??????????</option>
                                <option value='hamedan'>??????????</option>
                                <option value='khorramabad'>?????????????????</option>
                                <option value='rasht'>??????</option>
                                <option value='zahedan'>????????????</option>
                                <option value='zanjan'>??????????</option>
                                <option value='sanandaj'>??????????</option>
                                <option value='sari'>????????</option>
                                <option value='semnan'>??????????</option>
                                <option value='Shahr Kord'>????????????</option>
                                <option value='shiraz'>??????????</option>
                                <option value='ghazvin'>??????????</option>
                                <option value='qom'>????</option>
                                <option value='kerman'>??????????</option>
                                <option value='kermanshah'>????????????????</option>
                                <option value='karaj'>??????</option>
                                <option value='gorgan'>??????????</option>
                                <option value='mashhad'>????????</option>
                                <option value='yasooj'>??????????</option>
                                <option value='yazd'>??????</option>
                            </select>
                        </div>
                        {citySelected ? 
                                (loading ?
                                    <div className="col-12 text-center py-3" style={{height: "262px"}}>
                                        <div className="mt-1 mb-2">
                                            <img src="./images/spinners/loadingSpinner.gif" width="70px" alt="loading"/> 
                                        </div>
                                        <span className="h3" style={{color: "rgb(191, 208, 255)"}}>???? ?????? ???????????? ?????????????? ...</span>
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
                                                        <th scope="col">??????</th>
                                                        <th scope="col">?????????? ??????</th>
                                                        <th scope="col">???????? ??????????(??????????????????) </th>
                                                        <th scope="col">???????? ??????????(????????????????) </th>
                                                        <th scope="col">
                                                            ??????????????
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
                                                            <span className="temperature-unit">??C</span>
                                                        </td>
                                                        <td dir="ltr">
                                                            {todayWeather.tempF}
                                                            <span className="temperature-unit">??F</span>
                                                        </td>
                                                        <td dir="ltr">
                                                            {todayWeather.isDay ? "??????" : "????"}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="d-block d-md-none">
                                            <table className="table text-white weather-table">
                                                <tbody>
                                                    <tr className="text-right text-md-center">
                                                        <th scope="col">??????</th>
                                                        <td className="text-center">{todayWeather.cityPersianName}</td>
                                                    </tr>
                                                    <tr className="text-right text-md-center">
                                                        <th scope="col">?????????? ??????</th>
                                                        <td className="text-center">{todayWeather.weatherStatus}</td>
                                                    </tr>
                                                    <tr className="text-right text-md-center">
                                                        <th scope="col">???????? ??????????(??????????????????) </th>
                                                        <td className="text-center" dir="ltr">
                                                            {todayWeather.tempC}
                                                            <span className="temperature-unit">??C</span>
                                                        </td>
                                                    </tr>
                                                    <tr className="text-right text-md-center">
                                                        <th scope="col">???????? ??????????(????????????????) </th>
                                                        <td className="text-center" dir="ltr">
                                                            {todayWeather.tempF}
                                                            <span className="temperature-unit">??F</span>
                                                        </td>
                                                    </tr>
                                                    <tr className="text-right text-md-center">
                                                        <th scope="col">
                                                                ??????????????
                                                                {" "}
                                                                <i className="fa fa-long-arrow-down min-temp-icon" aria-hidden="true"></i>
                                                        </th>
                                                        <td className="text-center" dir="ltr">
                                                            {todayWeather.isDay ? "??????" : "????"}
                                                        </td>
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