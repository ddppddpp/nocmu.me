import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getFastingAPIMonthResponse } from '../../services/orthodoxFastingAPI';


export default function FastingAPIMonthResponse({ date }) {

    const [fastingAPIMonthResponse, setFastingMonthAPIResponse] = useState({});


    useEffect(() => {
        let mounted = true;
        getFastingAPIMonthResponse(date)
            .then(data => {
                if (mounted) {
                    setFastingAPIMonthResponse(data)
                }
            }
            );
        return () => {
            mounted = false;
        }
    }, [date])

    //try to return an array of objects
    return (
        <div className={'status' + fastingAPIResponse?.status}>
            <ul className='Answer'>
                <li>
                    Selected Date: {fastingAPIResponse?.the_date}
                </li>
                <li >{fastingValue2Msg(fastingAPIResponse?.status)}</li>
            </ul>
        </div >
    )
}

FastingAPIMonthResponse.propTypes = {
    date: PropTypes.string.isRequired
}