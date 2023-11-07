
    function selectDish() {
    const cuisine = document.getElementById("cuisine").value;
    const spiciness = document.querySelector('input[name="spiciness"]:checked').value;
    const dietOptions = document.querySelectorAll('input[name="diet"]:checked');
    const diet = Array.from(dietOptions).map(option => option.value);
    const time=document.getSelection().valueOf("time")
        const persons = document.getElementById("persons").value;


    // Perform some logic to choose the dish based on user preferences
    // You can use if-else statements or a database of recipes here

    // Display the result to the user
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `<p>Your perfect dish is: [Replace with the selected dish]</p>`;
}
