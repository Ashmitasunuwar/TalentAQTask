import { render } from '@testing-library/react';
import React, { useEffect, useState } from 'react'
import '../css/style.css'

function ForeCast({ obj }) {
    console.log('comp Fore--Cast', obj)
    return (<div className>
        <div className=''>
            {obj.time}
        </div>
        <div>
            {obj.temp_c}°C

        </div>
        <div>   {obj.humidity}</div>

    </div>)

}




export default ForeCast