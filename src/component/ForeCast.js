import React from 'react'

function ForeCast({ city }) {
    // key = '5e884bd4af45400d9f640cd01c3feb76';
    /* fetch(
         ` https://pro.openweathermap.org/data/2.5/forecast/hourly?q= ${city}&appid=5e884bd4af45400d9f640cd01c3feb76`)
         .then(response => response.json()).then(res => console.log(res))*/
    const FORECAST = `http://api.weatherapi.com/v1/forecast.json?key=b9c6c403476b4907888103557240606&q=`;
    fetch(FORECAST + `${city}` + `&days=5&aqi=no&alerts=no`).then(response => response.json())
        .then((data) => console.log("forecast ", data))

    return (
        <div>ForeCast</div>
    )
}

export default ForeCast