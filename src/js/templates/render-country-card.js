import getRefs from '../references/get-refs';

const refs = getRefs();

export default function renderCountryCard(countries) {
  const { name, capital, population, languages, flags } = countries[0];

  const languagesMarkup = Object.values(languages)
    .map(language => `<li class="country-card__language">${language.name}</li>`)
    .join('');

  const markup = `
		<div class="country-card">
				<h2 class="country-card__title">${name}</h2>
	
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

  refs.countryCard.innerHTML = markup;
}
