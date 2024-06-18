function login() {
    const login = document.getElementById("login")
    const password = document.getElementById("password")
    const form = document.getElementById("form")


    form.addEventListener('submit', (e)=> {
        e.preventDefault()

        if(login.value === "admin" && password.value === "admin"){
            console.log("entrou");
            window.location.href= '/vendedor'
        }
    })

}

login()