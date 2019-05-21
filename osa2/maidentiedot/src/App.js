import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Countries from './components/Countries';

function App() {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const countriesToShow = countries.filter(country =>
    country.name.toLowerCase().indexOf(search.toLowerCase()) !== -1) 
  

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  return (
    <div>
      find countries <input value={search} onChange={handleSearchChange} />
      <Countries countries={countriesToShow} setSearch={setSearch}/>
    </div>
  );
}

export default App;