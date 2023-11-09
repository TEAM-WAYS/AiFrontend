
    function userLogin() {

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const email = document.getElementById("email").value;

    // for test purposes
    const thisUsername = "vic";
    const thisPassword = "123";
    const thisEmail = "yz@smartbuyers.dk";

    if (username === thisUsername && password === thisPassword && email === thisEmail) {
    //document.getElementById("loginMessage").textContent = "Log in successful!";
        window.location.href ="Ai.html"
} else {
    document.getElementById("loginMessage").textContent = "Log in failed. Please provide the correct user name and password.";
}
}
    function redirectToCreate() {
        window.location.href = "creatUser.html";
    }
