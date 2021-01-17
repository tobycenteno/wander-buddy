import React, { useState, useEffect } from 'react'
import CountrySelect from '../components/CountrySelect.js';
import Map from '../components/Map.js';
import CountryList from '../components/CountryList.js';
import CountryFilter  from '../components/CountryFilter.js';
import LoadDataTask from '../tasks/LoadDataTask.js';
import {withRouter} from 'react-router-dom'

import ReactTooltip from 'react-tooltip';

function Home() {
  const [content, setContent] = useState("");
  const [country, setCountry] = useState({});
  const [allCountries, setAllCountries] = useState([]);
  const [countryFilter, setCountryFilter] = useState([]);

  const load = () => {
    const loadDataTask = new LoadDataTask();
    loadDataTask.load(setAllCountries);
  }

  useEffect(() => {
    load();
  }, []);

  return (
      <div className="container"> 
      {
        allCountries.length === 0 ? (
          <h1>loading</h1>
        ) : (
          <div>
            <CountrySelect setCountry={setCountry} allCountries={allCountries}/>
            <CountryFilter setCountryFilter={setCountryFilter}/>
            <div className="main-container">
              <div className="map-container">
                <Map setTooltipContent={setContent} country={country} countryFilter={countryFilter}/>
                <ReactTooltip>{content}</ReactTooltip>
              </div> 
              {
                Object.entries(country).length === 0 ? (
                  <p>No country selected</p>
                ) : (
                  <div className="countries-container">
                    <CountryList country={country} countryFilter={countryFilter}/>
                  </div>
                )
              }
            </div>
          </div>
        )
      } 
        </div> 
  );
}

export default withRouter(Home);
