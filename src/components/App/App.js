
import React, { lazy, Suspense, useReducer, useState, useEffect } from 'react';
import logo from '../../logo.svg';
import './App.css';

import "react-modern-calendar-datepicker/lib/DatePicker.css";
import "./App.css";
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import { locale_en_custom } from "./locales/en/locale_en_custom.js";
import { locale_bg } from "./locales/bg/locale_bg.js";
import { Calendar } from "react-modern-calendar-datepicker";
import { utils } from 'react-modern-calendar-datepicker';
import { getFastingAPIMonthResponse } from '../../services/orthodoxFastingAPI';

const FastingAPIResponse = lazy(() => import(/* webpackChunkName: "FastingAPIResponse"*/'../FastingAPIResponse/FastingAPIResponse'));
const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value
  }
}
function customDatesTransformation(statusArray) {
  let daysArray = [];
  console.log('customDatesTransformation has just been called');
  for (var i = 0; i < statusArray.length; i++) {
    let dayStatus = {
      "year": parseInt(statusArray[i].the_date.slice(0, 4)),
      "month": parseInt(statusArray[i].the_date.slice(5, 7)),
      "day": parseInt(statusArray[i].the_date.slice(-2)),
      "className": 'status' + statusArray[i].status
    }
    daysArray.push(dayStatus);
  }
  return daysArray;
}



function App() {

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const setCustomLocale = (lng) => {
    if (lng == 'bg') {
      return locale_bg;
    }
    else {
      return locale_en_custom;
    }
  };

  const [show, toggle] = useReducer(state => !state, true);

  const defaultValue = utils().getToday();

  const [selectedDay, setSelectedDay] = useState(defaultValue);

  const minimumDate = {
    year: 1582,
    month: 1,
    day: 1
  };

  const maximumDate = {
    year: 2199,
    month: 12,
    day: 31
  }

  const { t, i18n } = useTranslation();

  // why is this valid??
  const customDate = new Date(selectedDay.year, selectedDay.month - 1, selectedDay.day + 1).toISOString().slice(0, 10);

  const [fastingAPIMonthResponse, setFastingAPIMonthResponse] = useState({});

  useEffect(() => {
    let mounted = true;
    getFastingAPIMonthResponse(customDate)
      .then(data => {
        if (mounted) {
          setFastingAPIMonthResponse(data)
        }
      }
      );
    return () => {
      mounted = false;
    }
  }, [selectedDay])



  const customDaysArray = customDatesTransformation(fastingAPIMonthResponse);

  // loading component for suspense fallback
  const Loader = () => (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <div>loading...</div>
    </div>
  );

  return (
    <Suspense fallback={<Loader />}>
      <div className='App'>
        <header className="App-header">
          <div className="wrapper">
            <h3>{t('Fasting Diet')}</h3>
            <h4>{t('Pick a Date')}</h4>
            <Calendar
              value={selectedDay}
              onChange={setSelectedDay}
              minimumDate={minimumDate}
              maximumDate={maximumDate}
              colorPrimary="#0fbcf9" // added this
              colorPrimaryLight="rgba(75, 207, 250, 0.4)" // and this
              calendarClassName="fasting-calendar" // and this
              calendarTodayClassName="custom-today-day" // also this
              shouldHighlightWeekends
              locale={setCustomLocale(i18n.language)} // custom locale object
              customDaysClassName={customDaysArray}
            />

          </div>
          <div className='App-statusMessage' style={{ display: 'flex', justifyContent: 'center', padding: '1rem 2rem' }}>
            <Suspense fallback={<div>Calculating...</div>}>
              {
                <FastingAPIResponse date={selectedDay.year + '-' + selectedDay.month + '-' + selectedDay.day} />
              }
            </Suspense></div>
        </header>
        <footer className='App-footer'>
          <button type="button" onClick={() => changeLanguage('bg')}>
            bg
          </button>
          <button type="button" onClick={() => changeLanguage('en')}>
            en
          </button>
          <a href='https://github.com/ddppddpp/bgchof'>{t('Read more')} </a>
        </footer>
      </div>
    </Suspense>

  )
}

export default App;