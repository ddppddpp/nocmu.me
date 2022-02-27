
import React, { lazy, Suspense, useReducer, useState } from 'react';
import './App.css';

/* To Do:
- move text message functions in a service
- include a new component for calendar view
- setup functionality that allows the selection of a date in the calendar view
 and shows the message in the tex view
- show color codes in the calndar view (as a user setting)
- handle errors on the api request
*/
const FastingAPIResponse = lazy(() => import(/* webpackChunkName: "FastingAPIResponse"*/'../FastingAPIResponse/FastingAPIResponse'));
const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value
  }
}

function App() {
  const [formData, setFormData] = useReducer(formReducer, { date: new Date().toISOString().slice(0, 10), });
  const [submitting, setSubmitting] = useState(false);
  const [show, toggle] = useReducer(state => !state, true);


  const handleSubmit = event => {
    event.preventDefault();

  }
  const handleChange = event => {
    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
  }

  return (
    <div className='App'>
      <header className="App-header">
        <div className="wrapper">
          <h3> Fasting Diet</h3>
          <form onSubmit={handleSubmit}>
            <fieldset>
              <label>
                <p>What is the allowed food for date: (YYYY-MM-DD):</p>
                <input name="date" onChange={handleChange} value={formData.date || ''} />
              </label>
              <button type="submit">Submit</button>

            </fieldset>
          </form>
          <Suspense fallback={<div>Calculating...</div>}>
            {show && <FastingAPIResponse date={formData.date} />}
          </Suspense>
        </div>
      </header>
      <footer>
        Read more <a href='https://github.com/ddppddpp/bgchof'>here</a>.
      </footer>
    </div>
  )
}

export default App;