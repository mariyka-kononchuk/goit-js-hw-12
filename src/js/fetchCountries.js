
//https://restcountries.eu/rest/v2/name/{name}
//https://restcountries.eu/rest/v2/name/eesti
//https://restcountries.eu/rest/v2/all?fields=name;capital;population;flag;languages

import countryListTpl from '../templates/list-countries.hbs';
import countryCardTpl from '../templates/card_country.hbs';
import API from "./api-service";
import Notiflix from "notiflix";
import refs from "./refs.js";
const { countryList, countryCard, searchForm } = refs;

const DEBOUNCE_DELAY = 300;
const debounce = require('lodash.debounce');

searchForm.addEventListener('input',  debounce(onSearchCountries), DEBOUNCE_DELAY);

function onSearchCountries(e) {
    e.preventDefault();
    //const form = e.currentTarget;
    let query = e.target.value;
    API.fetchCountries(query)
        .then(renderCountry)
        .catch(onFetchError)
        .finally(() => searchForm.reset());
}



function renderCountry(country) {
    if (country.length > 10) {
        return alert('Too many matches found. Please enter a more specific name.');
        //Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    } else if (country.length === 1) {
        const card = countryCardTpl(country);
        countryCard.innerHTML = card;
        return
    } else {
        const list = countryListTpl(country);
        countryList.innerHTML = list;
        }
    //throw alert('Oops, there is no country with that name.');
};



function onFetchError(error) {
    alert('Oops, there is no country with that name.');
    //Notiflix.Notify.failure('Oops, there is no country with that name.');    
};