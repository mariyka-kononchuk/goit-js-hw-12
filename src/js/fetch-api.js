
import countryListTpl from '../templates/list-countries.hbs';
import countryCardTpl from '../templates/card_country.hbs';
import API from "./fetchCountries";
import Notiflix from "notiflix";
import refs from "./refs.js";
const { countryList, countryCard, searchForm } = refs;

const DEBOUNCE_DELAY = 300;
const debounce = require('lodash.debounce');

searchForm.addEventListener('input', debounce(onSearchCountries,DEBOUNCE_DELAY));

function onSearchCountries(e) {
    e.preventDefault();

      if (!e.target.value.trim()) {
        clearRenderCountry();
       return;
    }

    let query = e.target.value.trim();
    API.fetchCountries(query)
        .then(renderCountry)
        .catch(onFetchError)
}

function renderCountry(country) {
    clearRenderCountry();
    if (country.length > 10) {
        return Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    } else if (country.length === 1) {
        createCountryCard(country);
        return
    } else {
        createCountryList(country);
        }
};

function createCountryCard(country) {
    countryCard.innerHTML = countryCardTpl(country);
}

function createCountryList(country) {
    countryList.innerHTML = countryListTpl(country);
}

function clearRenderCountry() {
    countryList.innerHTML = '';
    countryCard.innerHTML = '';
}

function onFetchError(error) {
    Notiflix.Notify.failure('Oops, there is no country with that name.');   
};