const BASE_URL = 'https://restcountries.com/v3.1/name/';

export const fetchCountries = value => {
  return fetch(
    BASE_URL + `${value}?fields=name,capital,population,flags,languages`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  });
};
