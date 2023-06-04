import axios from 'axios';

axios.defaults.baseURL = 'https://restcountries.com/v2';

export default function fetchCountries(searchQuery) {
  return axios.get(`/name/${searchQuery}`).then(response => response.data);
}
