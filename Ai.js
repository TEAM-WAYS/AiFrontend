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
    const heightInput = document.getElementById("height");
    const weightInput = document.getElementById("weight");
    const height = parseFloat(heightInput.value);
    const weight = parseFloat(weightInput.value);


    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
        document.getElementById("bmiResult").textContent = "Invalid input. Please enter valid height and weight.";
        return;
    }



    const bmi = calculateBMI(height, weight);
    const bmiCategory = getBMICategory(bmi);





    let recommendation = "Create a JSON object with field names ‘NAME’, ‘INGREDIENTS’ and ‘INSTRUCTIONS’";
    recommendation += `assign dish name to ‘NAME’, assign ingredients for the dish to ‘INGREDIENTS’ and cooking instructions to ‘INSTRUCTIONS’`;
    recommendation += `recommend a dish based on following criteria’`;
    recommendation += `1. Cuisine: ${cuisine}`;
    recommendation += `2. Spiciness: ${spiciness}`;
    recommendation += `3. Dietary Preferences: ${dietaryPreferences.join(", ")}`;
    recommendation += `4. Cooking Time: ${time}`;
    recommendation += `5. Number of People: ${otherPeople || people}`;
    recommendation += `6. BMI Category: ${bmiCategory}`;
    if (bmiCategory === "Overweight" || bmiCategory === "Obese") {
        recommendation += ` (Healthy Food)`;
    }

    console.log(recommendation)
    console.log("-----------")
    fetchDishRecommendation(recommendation)
        .then(data => {
            console.log(data)
            const assistantContent = data[0].message.content;
            var jsonString = data[0].message.content;
            var jsonObject = JSON.parse(jsonString);
            console.log("-------------")
            console.log(assistantContent)
            document.getElementById("loading-message").style.display = "none";

            const resultElement = document.getElementById("result");
            resultElement.textContent = "INGREDIENTS: " + jsonObject.INGREDIENTS;
            /*
            resultElement.textContent = "Dish Recommendation: " + assistantContent;
             */
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



document.getElementById("bmiCalculatorForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const heightInput = document.getElementById("height");
    const weightInput = document.getElementById("weight");
    const bmiResultElement = document.getElementById("bmiResult");


    const height = parseFloat(heightInput.value);
    const weight = parseFloat(weightInput.value);

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
