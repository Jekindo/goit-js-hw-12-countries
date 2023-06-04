import getRefs from './references/get-refs';

const refs = getRefs();

export default function clearSearchResults() {
  refs.countriesList.innerHTML = '';
  refs.countryCard.innerHTML = '';
}
