
function selectDish() {
    const cuisine = document.getElementById("cuisine");

    const spiciness = document.querySelector('input[name="spiciness"]:checked');

    const dietOptions = document.querySelectorAll('input[name="diet"]:checked');
    const diet = Array.from(dietOptions).map(option => option.value);
    const time = document.getSelection().valueOf("time")
    const numberOfPeople = document.querySelector('input[name="people"]:checked')
    const button = document.getElementById("button")


    // Perform some logic to choose the dish based on user preferences
    // You can use if-else statements or a database of recipes here

    // Display the result to the user
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `<p>Your perfect dish is: [Replace with the selected dish]</p>`;

console.log(dietOptions)
    let caloraies = 750 * numberOfPeople


    let question = "Make me a resepy for " + numberOfPeople + ", containing " + caloraies + " calories. " +
        "It should be " + spiciness + " spicey. " +
        //healthyness + " healthy. " +
        "It should be " + cuisine.value + " cuisine." +
        "It should not take more than " + time.value + " minutes to make."


    console.log("question = " + question)

    const url = "http://localhost:8080/chat?message= " + question
    const show = document.getElementById("result")
    console.log(url)
    let answer = fetchAnswer(url).then(()=>{
        show.innerText = answer
    })


    // button.addEventListener('click', goTo())
    /*sessionStorage.setItem("answer",answer )
        window.location.href = "FrontPage.html"*/
}




    function fetchAnswer(url) {
        return fetchAnyUrl(url)
    }

    async function fetchAnyUrl(url) {
        try {
            const response = await fetch(url)
            //debugger
            if(response.ok){
                return response.json()
                console.log("ok")
            }else {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }
        }catch (error){
            console.error('Error fetching data:', error);
            throw error;
        }

    }

