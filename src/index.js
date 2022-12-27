import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

import { refs } from './refs';
import { fetchCountries } from './api/fetchCountries.js';
import { makeCountriesList, getCountryOnClick } from './markup';

const DEBOUNCE_DELAY = 300;

refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
  const countryName = e.target.value.trim();
  if (!countryName) {
    clearMarkup();
    return;
  }
  return fetchCountries(countryName)
    .then(countries => {
      makeCountriesList(countries);
      getCountryOnClick(countries);
    })
    .catch(() => {
      clearMarkup();
      return Notiflix.Notify.failure(
        'Oops, there is no country with that name'
      );
    });
}

export function clearMarkup() {
  refs.countryInfo.innerHTML = '';
  refs.countryList.innerHTML = '';
}
