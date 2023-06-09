import * as PNotify from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import debounce from 'lodash.debounce';
import getRefs from './js/references/get-refs';
import fetchCountries from './js/services/async-fetchCountries';
import renderCountryCard from './js/templates/render-country-card';
import renderCountriesList from './js/templates/render-coutries-list';
import clearSearchResults from './js/clear-search-results';

const refs = getRefs();

refs.searchInput.addEventListener('input', debounce(onSearch, 500));

async function onSearch(evt) {
  const searchQuery = evt.target.value;

  clearSearchResults();

  if (searchQuery === '') {
    return;
  }

  try {
    const countries = await fetchCountries(searchQuery);
    const countriesQuantity = countries.length;

    if (countriesQuantity > 10) {
      PNotify.error({
        text: 'Too many matches found. Please enter a more specific query!',
        closer: false,
        sticker: false,
        delay: 3000,
        animation: 'fade',
        animateSpeed: 'normal',
      });
    } else if (countriesQuantity >= 2 && countriesQuantity <= 10) {
      renderCountriesList(countries);
    } else {
      renderCountryCard(countries);
    }
  } catch (error) {
    console.log('Error', error);
  }
}
