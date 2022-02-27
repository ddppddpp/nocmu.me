import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getFastingAPIResponse } from '../../services/orthodoxFastingAPI';
import { useTranslation } from 'react-i18next';

export default function FastingAPIResponse({ date }) {

    const [fastingAPIResponse, setFastingAPIResponse] = useState({});
    const { t, i18n } = useTranslation();
    function _(inputTxt) {
        return t(inputTxt);
    }

    const fastingStatusMessage = [
        _("No food allowed for this date!"),
        _("raw plant based food"),
        _("cooked plant based food"),
        _("oil and wine"),
        _("fish"),
        _("milk/dairy, eggs"),
        _("meat"),
    ];

    const bodyDayMessage = _("According to the Bulgarian Christian Orthodox norms, on this day you can consume ");
    const andMessage = _(" and ");

    function fastingValue2Msg(inputValue) {

        let returnMessage = "";
        let n = 1;
        if (inputValue === 0) {
            returnMessage = fastingStatusMessage[0];
        } else {
            if (inputValue < 7) {
                while (n < inputValue) {
                    returnMessage = returnMessage + fastingStatusMessage[n] + ", ";
                    n += 1;
                }
                returnMessage = returnMessage.slice(0, (returnMessage.length - 2)) + andMessage + fastingStatusMessage[inputValue] + ".";
            }
        }
        //alert(returnMessage);
        return (bodyDayMessage + returnMessage);
    }

    useEffect(() => {
        let mounted = true;
        getFastingAPIResponse(date)
            .then(data => {
                if (mounted) {
                    setFastingAPIResponse(data)
                }
            }
            );
        return () => {
            mounted = false;
        }
    }, [date])


    return (
        <div className={'status' + fastingAPIResponse?.status}>
            <ul className='Answer'>
                <li>
                    {t('Selected Date')} {fastingAPIResponse?.the_date}
                </li>
                <li >{fastingValue2Msg(fastingAPIResponse?.status)}</li>
            </ul>
        </div >
    )
}

FastingAPIResponse.propTypes = {
    date: PropTypes.string.isRequired
}