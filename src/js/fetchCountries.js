const BASE_URL = 'https://restcountries.eu/rest/v2/name/';
function fetchCountries(name) {
    const SEARCH_PARAMS = 'fields=name;capital;population;flag;languages';
    return fetch(`${BASE_URL}${name}?${SEARCH_PARAMS}`).then(response => {
        if (response.ok) {
            return response.json();
        }
        //пробрасываем ошибку, так как catch не всегда ловит ошибку 404
        throw new onFetchError();
    })
};

export default { fetchCountries };



    
