import {
    fetchDishRecommendation
} from './API.js';

document.getElementById("dishSelectorForm").addEventListener("submit", function (event) {
    event.preventDefault();

    document.getElementById("loading-message").style.display = "block";

    const cuisine = document.getElementById("cuisine").value;
    const spiciness = document.querySelector('input[name="spiciness"]:checked').value;
    const dietaryPreferences = [...document.querySelectorAll('input[name="diet"]:checked')].map(input => input.value);
    const time = document.getElementById("time").value;
    const people = document.getElementById("people").value;
    const otherCuisine = document.getElementById("otherCuisine").value;
    const otherPeople = document.getElementById("otherPeople").value;

    let recommendation = "Based on your preferences:\n";
    recommendation += `1. Cuisine: ${cuisine}\n`;
    recommendation += `2. Spiciness: ${spiciness}\n`;
    recommendation += `3. Dietary Preferences: ${dietaryPreferences.join(", ")}\n`;
    recommendation += `4. Cooking Time: ${time}\n`;
    recommendation += `5. Number of People: ${otherPeople || people}\n`;

    fetchDishRecommendation(recommendation)
        .then(data => {
            const assistantContent = data[0].message.content;

            document.getElementById("loading-message").style.display = "none";

            const resultElement = document.getElementById("result");
            resultElement.textContent = "Dish Recommendation: " + assistantContent;
        })
        .catch(error => {
            document.getElementById("loading-message").style.display = "none";

            const resultElement = document.getElementById("result");
            resultElement.textContent = "Error: " + error.message;
        });
});


//cuisine when selecting other
document.getElementById("cuisine").addEventListener("change", function() {
    var otherCuisineInput = document.getElementById("otherCuisine");
    if (this.value === "other") {
        otherCuisineInput.style.display = "block";
    } else {
        otherCuisineInput.style.display = "none";
        otherCuisineInput.value = "";
    }
});
//people when selecting more
document.getElementById("people").addEventListener("change", function() {
    var otherPeopleInput = document.getElementById("otherPeople");
    if (this.value === "more") {
        otherPeopleInput.style.display = "block";
    } else {
        otherPeopleInput.style.display = "none";
        otherPeopleInput.value = "";
    }
});

