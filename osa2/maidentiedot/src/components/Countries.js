import React from 'react';

const Languages = ({ languages }) => {
    const languageList = () => {
        return (
            languages.map((language, i) =>
                <li key={i}>{language.name}</li>
            )
        )
    }

    return (
        <ul>
            {languageList()}
        </ul>
    )
}

const Country = ({ country }) => {
    return (
        <div>
            <h2>{country.name}</h2>
            <p>Capital {country.capital}</p>
            <p>Population {country.population}</p>
            <h3>Languages</h3>
            <Languages languages={country.languages} />
            <img src={country.flag} height="100" alt="" />
        </div>
    )
}

const Countries = ({ countries, setSearch }) => {
    const countriesList = () => {
        if (countries.length === 1) {
            return (
                <Country country={countries[0]} />
            )

        }

        if (countries.length > 10) {
            return (
                <div>Too many matches, specify another filter</div>
            )
        }

        return (
            countries.map(country =>
                <div key={country.numericCode}>
                    {country.name}
                    <button onClick={() => setSearch(country.name.toLowerCase())}>
                        show
                    </button>
                </div>
            )
        )
    }

    return (
        <div>
            {countriesList()}
        </div>
    )

}

export default Countries