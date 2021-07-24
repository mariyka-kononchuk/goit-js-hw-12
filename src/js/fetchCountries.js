const BASE_URL = 'https://restcountries.eu/rest/v2';
function fetchCountries(name) {
    return fetch(`${BASE_URL}/name/${name}`).then(response => {
        if (response.ok) {
            return response.json();
        }
        //пробрасываем ошибку, так как catch не всегда ловит ошибку 404
        throw new onFetchError();
    })
};

export default { fetchCountries };