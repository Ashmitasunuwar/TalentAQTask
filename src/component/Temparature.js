import React, { useEffect, useState } from 'react'
import { FaStreetView } from "react-icons/fa";
import weathericon from '../images/weathericon.jpeg'
import '../css/style.css';
import shining from '../images/shining.jpeg';
import { MdLocationSearching } from "react-icons/md";
import { WiHumidity } from "react-icons/wi";
import { GiPaperWindmill } from "react-icons/gi";
import ForeCast from './ForeCast';

function Temparature() {

    const [city, setCity] = useState('');
    const [cur, setCur] = useState('');
    const [ipAddress, setIpAddress] = useState('');
    const [background, setBackground] = useState(shining)
    const [searchTerm, setSearchTerm] = useState({
        name: '',
        region: '',
        country: '',
        temparature: '',
        time: '',
        cloud: '',
        text: '',
        aircondition: '',
        humidity: '',
        wind: '',
    });

    useEffect(() => {
        fetch('https://api.ipify.org').then(response => response.text()).then(res => setIpAddress(res));
    }, [])
    const fetchIpinfO = async () => {
        await fetch(`http://ip-api.com/json/${ipAddress}`).then(response => response.json())
            .then(res => {
                setCity(res.city)
                setCur(res.city);
            })
    }
    useEffect(() => {
        if (ipAddress) {
            console.log('ipAddress:', ipAddress)
            fetchIpinfO();
        }
    }, [ipAddress])


    useEffect(() => {
        if (city) {
            getWeatherDetails();
            fetchTemp();
        }

    }, [city])




    //fetch('https://api.ipify.org').then(response => response.text()).then(res => setIpAddress(res))



    const URL = `http://api.weatherapi.com/v1/current.json?key=b9c6c403476b4907888103557240606&q=`
    const FORECAST = `http://api.weatherapi.com/v1/forecast.json?key=b9c6c403476b4907888103557240606&q=`;

    const fetchTemp = async () => {

        if (city) {
            await fetch(FORECAST + `${city}` + `&days=1&aqi=no&alerts=no`).then(response => response.json())
                .then(res => {
                    console.log("result forecast ", res)
                    if (res.forecast) {
                        console.log(res.forecast.forecastday[0].day.maxtemp_c)
                        setSearchTerm({
                            ...searchTerm,
                            mx_temp: res.forecast.forecastday[0].day.maxtemp_c,
                            min_temp: res.forecast.forecastday[0].day.mintemp_c,
                            date: res.forecast.forecastday[0].date,

                        })
                    }
                })
        }
    }

    //entered city name


    const getWeatherDetails = async () => {
        if (city) {
            console.log('get details called! ', city)
            await fetch(URL + `${city}` + `&aqi=yes`)
                .then((response) => response.json())
                .then((result) => {
                    console.log('result', result)
                    console.log('result2', result.current.temp_c,)
                    setSearchTerm({
                        name: result.location.name,
                        region: result.location.region,
                        country: result.location.country,
                        temparature: result.current.temp_c,
                        time: result.location.localtime,
                        cloud: result.current.cloud,
                        text: result.current.condition.text,
                        aircondition: result.current.airquality,
                        humidity: result.current.humidity,
                        wind: result.current.wind_kph,
                    })
                }).catch((error) => `ERROR:${error}`)
        }
    }


    const backGrdStyle = {
        backgroundImage: `url(${background})`,
        height: "100vh",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
    };

    const handleSetCity = (event) => {
        setCity(event.target.value);
    }

    const dayOfWeek = () => {
        const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let forecastDate = new Date(searchTerm.date);
        return dayNames[forecastDate.getDay()]
    }



    return (
        <div style={backGrdStyle}>
            <div className='container outerdiv' >
                <div className='row firstrow' >
                    <input className='col-4 inputfield' type='search' value={city} onChange={(e) => { handleSetCity(e) }} />

                </div>

                <div className=' row information'>
                    <div>
                        <div>
                            <img className='weatherIcon' src={weathericon} height={65} width={65} alt='image not found' />

                            <div className='weatherToday'>
                                <h6>  {searchTerm.date}</h6>
                                {dayOfWeek()}
                            </div>
                        </div>

                        <h2 className='secondh2'>

                            <FaStreetView className='streetIcon' />

                            <span>{city}</span>
                        </h2>

                        <h3 style={{ color: '#70757a' }}>Temparature: {searchTerm.temparature}°C

                        </h3>
                    </div>

                    <div>
                        <h6> <WiHumidity /> humidity: {searchTerm.humidity} %
                        </h6>
                        <h6><GiPaperWindmill />wind: {searchTerm.wind} km/hr
                        </h6>
                        <h6>
                            {searchTerm.text}
                        </h6>
                        <p className='para'>min:{searchTerm.min_temp}°C || max:{searchTerm.mx_temp}°C</p>
                    </div>
                </div>

                <ForeCast city={city} />

            </div>
        </div>
    )
}

export default Temparature