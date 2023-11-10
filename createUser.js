document.getElementById("registration-form").addEventListener("submit", function (event) {
    event.preventDefault();

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let email = document.getElementById("email").value;

    let user = {
        username: username,
        password: password,
        email: email
    };

    fetch('http://localhost:8080/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            if (response.ok) {
                // User registration was successful
                document.getElementById("error-message").style.display = "none";
                alert("User registered successfully!");
                setTimeout(()=> {
                    window.location.href = "Ai.html";
                },1000 )
            } else {
                // Handle registration errors
                response.json().then(data => {
                    document.getElementById("error-message").innerText = data.message;
                    document.getElementById("error-message").style.display = "block";
                });
            }
        })
})

