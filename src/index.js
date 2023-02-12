import './css/styles.css';
import Notiflix from 'notiflix';
let debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;
import { fetchCountries } from "./js/fetchCountries";

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryCard = document.querySelector('.country-info');

input.addEventListener("input", debounce(onInputChange, DEBOUNCE_DELAY));

function onInputChange(e) {
  countryList.innerHTML = "";
  countryCard.innerHTML = "";
  let inputValue = e.target.value;
  if (!inputValue.trim()) {
    return
  }
  fetchCountries(inputValue.trim())
    .then(showResult)
    .catch(() =>
      Notiflix.Notify.failure("Oops, there is no country with that name")
    );
};

function showResult(data) {
  if (data.length > 10) {
    Notiflix.Notify.info(
      "Too many matches found. Please enter a more specific name."
    );
    return;
  } else if (data.length > 1) {
    countryList.innerHTML = createCountryList(data);
  } else {
    countryCard.innerHTML = createCountryCard(...data);
  }
};

function createCountryList(countries) {
  return countries
    .map((item) => {
      return `
<li class="country-list__item">
  <img class="country-list__img" src='${item.flags.png}' alt='${item.name}'>
  <span>${item.name}</span>
</li>`;
    })
    .join("");
}

function createCountryCard(country) {
  return `
<div class="country-card">
  <img class="country-card__img" src="${country.flags.png}" alt="${country.name}">
  <div class="country-card__info">
    <h2 class="country-card__title">${country.name}</h2>
    <p><span class="country-card__info-title">Capital:</span> ${country.capital}</p>
    <p><span class="country-card__info-title">Population:</span> ${
    country.population
  }</p>
    <p><span class="country-card__info-title">Languages:</span> ${country.languages
    .map((lang) => lang.name)
    .join(", ")}</p>
  </div>
</div>`;
}
