import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_zgrBRHJPoOskAz19LDGmRBL8gH23xZ6nhRobMoU5ML5jbT82vMktYFIz1pij94iq';

import { fetchBreeds, fetchCatByBreed } from './cat-api';
import './styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const selector = document.querySelector('.breed-select');
const divCatInfo = document.querySelector('.cat-info');

loader.classList.replace('loader', 'is-hidden');
error.classList.add('is-hidden');
divCatInfo.classList.add('is-hidden');

let arrBrId = [];
fetchBreeds()
  .then(data => {
    data.forEach(element => {
      arrBrId.push({ text: element.name, value: element.id });
    });

    new SlimSelect({
      select: selector,
      data: arrBrId,
    });
  })
  .catch(onFetchError);

selector.addEventListener('change', onSelectBreed);

function onSelectBreed(event) {
  loader.classList.replace('is-hidden', 'loader');
  selector.classList.add('is-hidden');
  divCatInfo.classList.add('is-hidden');

  const breedId = event.currentTarget.value;
  fetchCatByBreed(breedId)
    .then(data => {
      loader.classList.replace('loader', 'is-hidden');
      selector.classList.remove('is-hidden');
      const { url, breeds } = data[0];

      divCatInfo.innerHTML = `
      <div class="box-img">
      <img src="${url}" alt="${breeds[0].name}" width="400"/>
      </div>
      <div class="box">
      <h1>${breeds[0].name}</h1>
      <p>${breeds[0].description}</p>
      <p>
      <b>Temperament:</b>
      ${breeds[0].temperament}</p>
      </div>`;
      divCatInfo.classList.remove('is-hidden');
    })
    .catch(onFetchError);
}

function onFetchError(error) {
  selector.classList.remove('is-hidden');
  loader.classList.replace('loader', 'is-hidden');

  Notify.failure(
    'Oops! Something went wrong! Try reloading the page or select another cat breed!',
    {
      position: 'center-center',
      timeout: 5000,
    }
  );
}
