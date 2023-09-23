import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_zgrBRHJPoOskAz19LDGmRBL8gH23xZ6nhRobMoU5ML5jbT82vMktYFIz1pij94iq';

import { fetchBreeds, fetchCatByBreed } from './cat-api';
import '../css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const selectorEl = document.querySelector('.breed-select');
const infoEl = document.querySelector('.cat-info');

loader.classList.replace('loader', 'is-hidden');
error.classList.add('is-hidden');
infoEl.classList.add('is-hidden');

fetchBreeds()
  .then(data => {
    data.forEach(element => {
      const option = document.createElement('option');
      option.value = element.id;
      option.textContent = element.name;
      selectorEl.appendChild(option);
    });

    new SlimSelect({
      select: selectorEl,
    });
  })

  .catch(error => {
    return messageError(error);
  });

selectorEl.addEventListener('change', onSelectBreed);

function onSelectBreed(event) {
  loader.classList.replace('is-hidden', 'loader');
  selectorEl.classList.add('is-hidden');
  infoEl.classList.add('is-hidden');

  const breedId = event.currentTarget.value;
  fetchCatByBreed(breedId)
    .then(data => {
      loader.classList.replace('loader', 'is-hidden');
      selectorEl.classList.remove('is-hidden');
      const { url, breeds } = data[0];

      infoEl.innerHTML = `
      <div>
      <img src="${url}" alt="${breeds[0].name}" width="500"/>
      </div>
      <div>
      <h1>${breeds[0].name}</h1>
      <p>Description: ${breeds[0].description}</p>
      <p>Temperament: 
      ${breeds[0].temperament}</p>
      </div>`;
      infoEl.classList.remove('is-hidden');
    })

    .catch(error => {
      return messageError(error);
    });
}

function messageError(error) {
  selectorEl.classList.add('is-hidden');
  loader.classList.replace('loader', 'is-hidden');

  Notify.failure(
    'Oops! Something went wrong! Try reloading the page or select another cat breed!',
    {
      position: 'center-center',
      timeout: 5000,
    }
  );
}
