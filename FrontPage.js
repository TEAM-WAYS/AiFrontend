
    function selectDish() {
    const cuisine = document.getElementById("cuisine").value;
    const spiciness = document.querySelector('input[name="spiciness"]:checked').value;
    const dietOptions = document.querySelectorAll('input[name="diet"]:checked');
    const diet = Array.from(dietOptions).map(option => option.value);
    const time=document.getSelection().valueOf("time")


    // Perform some logic to choose the dish based on user preferences
    // You can use if-else statements or a database of recipes here

    // Display the result to the user
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `<p>Your perfect dish is: [Replace with the selected dish]</p>`;
}


    document.addEventListener("DOMContentLoaded", function() {
        var cuisineDropdown = document.getElementById("cuisine");
        var customCuisineInput = document.getElementById("customCuisine");

        cuisineDropdown.addEventListener("change", function() {
            if (cuisineDropdown.value === "other") {
                customCuisineInput.style.display = "block";
                customCuisineInput.required = true;
            } else {
                customCuisineInput.style.display = "none";
                customCuisineInput.required = false;
            }
        });

        var dishSelectorForm = document.getElementById("dishSelectorForm");
        dishSelectorForm.addEventListener("submit", function(event) {
            if (cuisineDropdown.value === "other" && customCuisineInput.value.trim() === "") {
                event.preventDefault();
                alert("Please enter your custom cuisine choice.");
            }
        });
    });
