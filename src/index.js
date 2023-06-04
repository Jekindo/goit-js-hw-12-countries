import debounce from 'lodash.debounce';
import { error, defaultModules } from '@pnotify/core';
import * as PNotifyMobile from '@pnotify/mobile';
import '@pnotify/core/dist/BrightTheme.css';

defaultModules.set(PNotifyMobile, {});

const refs = {
  searchInput: document.querySelector('.js-search-input'),
  countriesSection: document.querySelector('.js-countries-section'),
};

refs.searchInput.addEventListener('input', debounce(onSearch, 500));

function onSearch(evt) {
  const searchQuery = evt.target.value;

  if (searchQuery === '') {
    clearCountriesSection();
  }

  fetch(`https://restcountries.com/v3.1/name/${searchQuery}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(response.statusText);
    })
    .then(countries => {
      const countriesLength = countries.length;

      if (countriesLength > 10) {
        error({
          text: 'Too many matches found. Please enter a more specific query!',
          animation: 'fade',
          animateSpeed: 'normal',
          delay: 3000,
          closer: false,
          sticker: false,
        });
      } else if (countriesLength >= 2 && countriesLength <= 10) {
        renderCountriesList(countries);
      } else {
        renderCountry(countries);
      }
    })
    .catch(console.log);
}

function renderCountriesList(countries) {
  const markup = countries
    .map(({ name: { common } }) => {
      return `<li class="countries-list__item">${common}</li>`;
    })
    .join('');

  const countriesList = document.createElement('ul');
  countriesList.classList.add('countries-list');

  countriesList.innerHTML = markup;

  clearCountriesSection();
  refs.countriesSection.appendChild(countriesList);
}

function renderCountry(countries) {
  const { name, capital, population, languages, flags } = countries[0];

  const languagesMarkup = Object.values(languages)
    .map(language => `<li class="country-card__language">${language}</li>`)
    .join('');

  const markup = `
	<div class="country-card">
            <h2 class="country-card__title">${name.common}</h2>

            <div class="country-card__body">
              <div class="country-card__content">
                <p class="country-card__text"><b>Capital:</b> ${capital}</p>
                <p class="country-card__text"></p><b>Population:</b> ${population}</p>
                <p class="country-card__text"></p><b>Languages:</b></p>

				
				
                <ul class="country-card__languages">
                  ${languagesMarkup}
                </ul>
              </div>

              <img
			  	class="img"
                src="${flags.png}"
                alt="${name.common}"
                width="400"
              />
            </div>
          </div>
        </div>
	`;

  refs.countriesSection.innerHTML = markup;
}

function clearCountriesSection() {
  refs.countriesSection.innerHTML = '';
}
