import { render } from '@testing-library/react';
import React, { useState } from 'react'

function ForeCast({ city, hour, time }) {
    const date = new Date(time)
    console.log(date);
    const totalsHours = Math.floor(date.getHours() + (date.getMinutes() / 60) + (date.getSeconds() / 3600))
    console.log('totalHors', totalsHours);

    const [hourCard, setCard] = useState({
        temperature: '',
        humidity: '',
        wind: '',
        description: '',
    }
    );
    const renderedCard = () => {
        console.log('renderedCard')

        if (hour) {
            return hour.map((obj) => console.log('map', obj))
        }
        return 0
    }

    return (
        <div>

            cloud:  {renderedCard()}

        </div>
    )
}

export default ForeCast