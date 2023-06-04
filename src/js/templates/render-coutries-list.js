import getRefs from '../references/get-refs';

const refs = getRefs();

export default function renderCountriesList(countries) {
  const markup = countries
    .map(({ name }) => {
      return `<li class="countries-list__item">${name}</li>`;
    })
    .join('');

  refs.countriesList.innerHTML = markup;
}
