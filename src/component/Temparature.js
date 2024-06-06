import React, { useEffect, useState } from 'react'
import { FaStreetView } from "react-icons/fa";
import weathericon from '../images/weathericon.jpeg'
import '../css/style.css';
import shining from '../images/shining.jpeg';

function Temparature() {

    const [city, setCity] = useState('');
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
        aircondition: ''
    });


    function getLocation() {
        navigator.geolocation.getCurrentPosition(
            function (location) {
                console.log(location.coords.latitude);
                console.log(location.coords.longitude);
                console.log(location.coords.accuracy);

            })
    }

    useEffect(() => {
        fetch('https://api.ipify.org').then(response => response.text()).then(res => setIpAddress(res));

        console.log('current ', city);
    }, [])
    useEffect(() => {
        console.log('ipAddress ', ipAddress);
        fetchIpinfO();
    }, [ipAddress])
    useEffect(() => {
        console.log('setCity ', city);
        getWeatherDetails();
    }, [city])


    // fetch('https://api.ipify.org').then(response => response.text()).then(res => setIpAddress(res))


    const fetchIpinfO = () => {
        fetch(`http://ip-api.com/json/${ipAddress}`).then(response => response.json())
            .then(res => setCity(res.city))
    }



    //entered city name
    const URL = `http://api.weatherapi.com/v1/current.json?key=b9c6c403476b4907888103557240606&q=`



    const getWeatherDetails = (e) => {
        if (city) {
            fetch(URL + `${city}` + `&aqi=yes`)
                .then((response) => response.json())
                .then((result) => {
                    console.log('result', result)
                    setSearchTerm({
                        name: result.location.name,
                        region: result.location.region,
                        country: result.location.country,
                        temparature: result.current.temp_c,
                        time: result.location.localtime,
                        cloud: result.current.cloud,
                        text: result.current.condition.text,
                        aircondition: result.current.airquality,

                    })
                }).catch((error) => `ERROR:${error}`)
        }
    }



    const handleSetCity = (event) => {
        setCity(event.target.value);
    }


    const backGrdStyle = {
        backgroundImage: `url(${background})`,
        height: "100vh",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
    };

    return (
        <div style={backGrdStyle}>
            <div className='container outerdiv' >
                <div className='row firstrow' >

                    <input className='col-4 inputfield' type='search' value={city} onChange={(e) => { handleSetCity(e) }} />
                    <button className='col-1 btnOne' onClick={(e) => getWeatherDetails(e)}>click</button>
                </div>

                <div className=' row information'>
                    <h2 className='location'>
                        <img className='weatherIcon' src={weathericon} height={65} width={65} alt='image not found' />
                    </h2>
                    <h2 className='secondh2'>
                        <FaStreetView className='streetIcon' />

                        <span>{city}</span> </h2>

                    <h3 style={{ color: '#70757a' }}>Temparature: {searchTerm.temparature}°C</h3>
                    <h6> {searchTerm.text}
                    </h6>
                    <p className='para'>Min:26°C || max:30°C</p>

                </div>


            </div>
        </div>
    )
}

export default Temparature