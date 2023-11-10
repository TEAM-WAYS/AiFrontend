const BASE_URL = 'http://localhost:8080';

async function fetchFromApi(endpoint, options = {}) {
    const url = `${BASE_URL}/${endpoint}`;
    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`Error fetching data from ${endpoint}. Status: ${response.status}, ${response.statusText}`);
        }

        return response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

async function fetchDishRecommendation(recommendationMessage) {
    const queryParam = `?message=${encodeURIComponent(recommendationMessage)}`;
    return fetchFromApi('chat' + queryParam, { method: 'GET' });
}

//Recipe
async function getRecipe() {
    return fetchFromApi('recipes');
}

async function createRecipe(recipeData) {
    return fetchFromApi('recipes',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(recipeData),
        });
}

async function updateRecipe(recipeData) {
    return fetchFromApi('recipes', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipeData),
    });
}

async function deleteRecipe(id) {
    return fetchFromApi(`recipes/delete/${id}`, {
        method: 'DELETE',
    });
}

export {
    fetchDishRecommendation,
    createRecipe,
    getRecipe,
    deleteRecipe
};