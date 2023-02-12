export  function fetchCountries(country) {
  return fetch(`https://restcountries.com/v2/name/${country}?fields=capital,name,population,flags,languages`)
      .then(response => {
        if(response.status === 404){
          throw new Error(response.status)
          //return Promise.reject(new Error());
        }
      return response.json();
    });
};