import { refs } from '../refs';
import { clearMarkup } from '../index';
import Notiflix from 'notiflix';

export function makeCountriesList(countries) {
  switch (countries.length) {
    case 1:
      refs.countryList.innerHTML = '';
      refs.countryInfo.innerHTML = countries.map(country =>
        markupInfo(country)
      );
      break;
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
      refs.countryInfo.innerHTML = '';
      refs.countryList.innerHTML = countries
        .map(country => markupList(country))
        .join('');
      break;
    default:
      clearMarkup();
      return Notiflix.Notify.info(
        'Too many matches found. Please enter a more specific name.'
      );
  }
}

function markupInfo({ name, flags, capital, population, languages }) {
  return `<h2>${name['official']}</h2>
          <img src='${flags['svg']}' alt='${name}' width='500'>
          <p><b>Capital</b>: ${capital}</p>
          <p><b>Population</b>: ${population}</p>
          <p><b>Languages</b>: ${Object.values(languages).join(', ')}</p>`;
}

function markupList({ name, flags }) {
  return `<li class='country-li' data-country-name='${name['official']}'>
                 <img src='${flags['svg']}' alt='${name['official']}' width='50'>
                 <p >${name['official']}</p>
               </li>`;
}

export function getCountryOnClick(countries) {
  refs.countryList.addEventListener('click', e => {
    const filterValue =
      e.target.dataset.countryName || e.target.innerHTML || e.target.alt;
    const filteredCountry = countries.filter(
      country => filterValue === country.name['official']
    )[0];
    refs.countryList.innerHTML = '';
    return (refs.countryInfo.innerHTML = markupInfo(filteredCountry));
  });
}
