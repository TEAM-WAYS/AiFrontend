import {
    fetchDishRecommendation,
    createRecipe
} from './API.js';

document.getElementById("dishSelectorForm").addEventListener("submit", function (event) {
    event.preventDefault();
    try {
        document.getElementById("loading-message").style.display = "block";
    }catch (lazyError){
        console.error("i am stupid")
    }
    const cuisine = document.getElementById("cuisine").value;
    const spiciness = document.querySelector('input[name="spiciness"]:checked').value;
    const dietaryPreferences = [...document.querySelectorAll('input[name="diet"]:checked')].map(input => input.value);
    const time = document.getElementById("time").value;
    const people = document.getElementById("people").value;
    const otherCuisine = document.getElementById("otherCuisine").value;
    const otherPeople = document.getElementById("otherPeople").value;
    const heightInput = document.getElementById("height");
    const weightInput = document.getElementById("weight");
    const height = parseFloat(heightInput.value) || 170; // Default højde centimeter
    const weight = parseFloat(weightInput.value) || 70; // Default vægt kilogram


    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
        document.getElementById("bmiResult").textContent = "Invalid input. Please enter valid height and weight.";
        return;
    }



    const bmi = calculateBMI(height, weight);
    const bmiCategory = getBMICategory(bmi);


    let recommendation = "response must be formatted in JSON ";
    recommendation += `Create a JSON object with field names ‘NAME’, ‘DESCRIPTION’, ‘INGREDIENTS’ and ‘INSTRUCTIONS’’`;
    recommendation += `assign dish name to ‘NAME’, assign a recipe description to ‘DESCRIPTION’, `;
    recommendation += `create a JSON object with field names ‘INGNAME’, ‘INGAMOUNT’ and ‘INGMEASUREMENT’ assign ingredient name to ‘INGNAME’, assign ingredient amount without measurement unit to ‘INGAMOUNT’, assign ingredient measurement unit to ‘INGMEASUREMENT’ assign the JSON object with ingredients for the dish to ‘INGREDIENTS’ and cooking instructions to ‘INSTRUCTIONS’`;
    recommendation += `recommend a dish based on following criteria`;
    recommendation += `1. Cuisine: ${cuisine} `;
    recommendation += `2. Spiciness: ${spiciness} `;
    recommendation += `3. Dietary Preferences: ${dietaryPreferences.join(", ")} `;
    recommendation += `4. Cooking Time: ${time} `;
    recommendation += `5. Number of People: ${otherPeople || people} `;
    recommendation += `6. BMI Category: ${bmiCategory}`;
    if (bmiCategory === "Overweight" || bmiCategory === "Obese") {
        recommendation += ` (Healthy Food)`;
    }
    console.log(recommendation)
    console.log("-----------")
    fetchDishRecommendation(recommendation)
        .then(data => {
            console.log(data)
            const saveRecipeButton = document.getElementById("saveRecipeButton");

            saveRecipeButton.removeAttribute('hidden');
            let jsonString = data[0].message.content;
            let jsonObject;
            try {
                jsonObject = JSON.parse(jsonString);
                document.getElementById("loading-message").style.display = "none";
            } catch (error) {
                console.error("Error parsing JSON:", error);

                let startIndex = jsonString.indexOf('{');
                let endIndex = jsonString.lastIndexOf('}');

                if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
                    jsonString = jsonString.substring(startIndex, endIndex + 1);
                    try {
                        jsonObject = JSON.parse(jsonString);
                    } catch (newError) {
                        console.error("Error parsing cleaned JSON:", newError);
                    }
                } else {
                    console.error("Unable to find JSON in the string.");
                }
            }
            console.log(jsonObject);

            const dishName = jsonObject.NAME;
            const descriptiondata = jsonObject.DESCRIPTION;
            const ingredientdata = jsonObject.INGREDIENTS;
            const instructiondata = jsonObject.INSTRUCTIONS;
            let formattedIngredients;
            try {
                formattedIngredients = ingredientdata.map(ingredient => `
             ${ingredient.INGNAME} ${ingredient.INGAMOUNT} ${ingredient.INGMEASUREMENT}
             `).join('<br>');
            } catch (newError){
                console.error("ingredients format fail")
            }

            let formattedInstructions
            try {
                formattedInstructions = instructiondata.replace(/\n/g, '<br>');
            } catch (newError){
                console.error("instructions format fail")
            }

            const resultElement = document.getElementById("result");

            resultElement.innerHTML = `
                <strong>${dishName}</strong><br>
                ${descriptiondata}<br><br>
                Ingredients:<br>
                ${formattedIngredients}<br><br>
                Cooking instructions:<br> ${formattedInstructions}<br>
            `;

            const Recipe= {
                name: dishName,
                description: descriptiondata,
                ingredients: JSON.stringify(ingredientdata),
                instructions: instructiondata,
            };
            saveRecipeButton.addEventListener('click', () => {
                console.log(JSON.stringify(Recipe))
                createRecipe(Recipe)
                    .then(data => {
                    console.log('Recipe data sent successfully:', data);
                })
                    .catch(error => {
                        console.error('Error sending recipe data:', error);
                    });
            });
        })
        .catch(error => {
            document.getElementById("loading-message").style.display = "none";

            const resultElement = document.getElementById("result");
            resultElement.textContent = "Error: " + error.message;
        }

        );
});


//cuisine when selecting other
document.getElementById("cuisine").addEventListener("change", function() {
    let otherCuisineInput = document.getElementById("otherCuisine");
    if (this.value === "other") {
        otherCuisineInput.style.display = "block";
    } else {
        otherCuisineInput.style.display = "none";
        otherCuisineInput.value = "";
    }
});
//people when selecting more
document.getElementById("people").addEventListener("change", function() {
    let otherPeopleInput = document.getElementById("otherPeople");
    if (this.value === "more") {
        otherPeopleInput.style.display = "block";
    } else {
        otherPeopleInput.style.display = "none";
        otherPeopleInput.value = "";
    }
});


document.getElementById("bmiCalculatorForm").addEventListener("submit", function(event) {
    event.preventDefault();


    const bmiResultElement = document.getElementById("bmiResult");

    const heightInput = document.getElementById("height");
    const weightInput = document.getElementById("weight");

    const height = parseFloat(heightInput.value) || 170; // Default højde centimeter
    const weight = parseFloat(weightInput.value) || 70; // Default vægt kilogram

    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
        bmiResultElement.textContent = "Invalid input. Please enter valid height and weight.";
        return;
    }



    const bmi = calculateBMI(height, weight);
    const bmiCategory = getBMICategory(bmi);





    bmiResultElement.textContent = `Your BMI: ${bmi.toFixed(2)} (${bmiCategory})`;
});

function calculateBMI(height, weight) {
    // BMI formula: weight (kg) / (height (m) * height (m))
    return weight / ((height / 100) * (height / 100));
}

function getBMICategory(bmi) {
    if (bmi < 18.5) {
        return "Underweight";
    } else if (bmi < 24.9) {
        return "Normal Weight";
    } else if (bmi < 29.9) {
        return "Overweight";
    } else {
        return "Obese";
    }
}


