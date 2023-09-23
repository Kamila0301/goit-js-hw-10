const url = 'https://api.thecatapi.com/v1';
const API_KEY =
  'live_zgrBRHJPoOskAz19LDGmRBL8gH23xZ6nhRobMoU5ML5jbT82vMktYFIz1pij94iq';

export function fetchBreeds() {
  return fetch(`${url}/breeds?api_key=${API_KEY}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

export function fetchCatByBreed(breedId) {
  return fetch(
    `${url}/images/seafvffcrch?api_key=${API_KEY}&breed_ids=${breedId}`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
