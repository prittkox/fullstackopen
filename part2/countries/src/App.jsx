import { useState, useEffect } from 'react'
import axios from 'axios'



const App = () => {
  const [searchText, setSearchText] = useState("")
  const [countries, setCountries] = useState([])


  const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes((searchText.toLowerCase())))



useEffect(() => {
  console.log('effect run')
  axios.get("https://studies.cs.helsinki.fi/restcountries/")
  
  .then(response => {
    console.log('response data', response.data)
    setCountries(response.data)})
    
}, [])


  return (
    <div>find countries
      <input value={searchText} onChange= {(event) => setSearchText(event.target.value)}/>
      {filteredCountries.length > 10 
      ? "Too many matches, specify another filter" 
      : filteredCountries.length ===1
        ? <div>
            <h1>{filteredCountries[0].name.common}</h1>
            <div>Capital {filteredCountries[0].capital}</div>
            <div>Area {filteredCountries[0].area}</div>
            <h2>Languages</h2>
            <ul>{Object.values(filteredCountries[0].languages).map(language => 
              <li key={language}>{language}</li>
            )}
            </ul>
            <img src={filteredCountries[0].flags.png} alt="country flag" width="150"/>
          </div>
        : filteredCountries.map(country => <div key={country.name}>{country.name.common}</div>)}
      
    </div>
  )

}
export default App
