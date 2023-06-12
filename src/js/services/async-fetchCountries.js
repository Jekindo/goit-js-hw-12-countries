import axios from 'axios';

axios.defaults.baseURL = 'https://restcountries.com/v2';

export default async function fetchCountries(searchQuery) {
  const response = await axios.get(`/name/${searchQuery}`);
  const countries = await response.data;

  return countries;
}
