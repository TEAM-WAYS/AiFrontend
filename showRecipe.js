import {
    getRecipe,
    deleteRecipe
} from './API.js';
document.addEventListener("DOMContentLoaded", function () {
    getRecipe()
        .then(recipes => {
            const recipeListElement = document.getElementById('recipeList');
            recipes.forEach(recipe => {
                const recipeElement = createRecipeElement(recipe);
                recipeListElement.appendChild(recipeElement);
            });
        })
        .catch(error => console.error('Error fetching recipes:', error));

    function createRecipeElement(recipe) {
        const recipeElement = document.createElement('div');
        recipeElement.classList.add('recipe');

        const titleElement = document.createElement('h3');
        titleElement.textContent = recipe.name;
        recipeElement.appendChild(titleElement);

        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = recipe.description;
        recipeElement.appendChild(descriptionElement);

        const ingredientsElement = document.createElement('p');
        ingredientsElement.textContent = 'Ingredients: ' + formatIngredients(recipe.ingredients);
        recipeElement.appendChild(ingredientsElement);

        const instructionsElement = document.createElement('p');
        instructionsElement.textContent = 'Instructions: ' + recipe.instructions;
        recipeElement.appendChild(instructionsElement);

        const buttonsContainer = document.createElement('div');
        buttonsContainer.classList.add('recipe-buttons');

        const editButton = document.createElement('button');
        editButton.classList.add('edit-button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => editRecipe(recipe.id));
        buttonsContainer.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteRecipeButton(recipe.id, recipeElement));
        buttonsContainer.appendChild(deleteButton);

        recipeElement.appendChild(buttonsContainer);

        return recipeElement;
    }

    function editRecipe(recipeId) {
        console.log('PLACEHOLDER:', recipeId);
    }

    function deleteRecipeButton(recipeId, recipeElement) {
        deleteRecipe(recipeId)
            .then(() => {
                recipeElement.remove();
            })
            .catch(error => console.error('Error deleting recipe:', error));
    }
    function formatIngredients(ingredients) {
    const formattedIngredients = JSON.parse(ingredients).map(ingredient => {
    return `${ingredient.INGNAME} (${ingredient.INGAMOUNT} ${ingredient.INGMEASUREMENT})`;
});

    return formattedIngredients.join(', ');
}
});