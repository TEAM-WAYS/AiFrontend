const BASE_URL = 'http://localhost:8080';

async function fetchFromApi(endpoint, options = {}) {
    const url = `${BASE_URL}/${endpoint}`;
    const response = await fetch(url, options);

    if (!response.ok) {
        throw new Error(`Error fetching data from ${endpoint}`);
    }

    return response.json();
}

async function fetchDishRecommendation(recommendationMessage) {
    const queryParam = `?message=${encodeURIComponent(recommendationMessage)}`;
    return fetchFromApi('chat' + queryParam, { method: 'GET' });
}



export {
    fetchDishRecommendation

};