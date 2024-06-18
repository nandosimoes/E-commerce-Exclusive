function login (){
const form = document.getElementById("form")
const email = document.getElementById("email");
const password = document.getElementById("password")
const mostrarErro = document.getElementById("erro")

form.addEventListener("submit" , async (e)=>{
    e.preventDefault()
    
    const data = JSON.stringify({
        email : email.value,
        password : password.value
    })
    
        let response 
        let json 

        response = await fetch("http://localhost:9090/signin", {
            method: "POST",
            body : data,
            headers : {"Content-type" : "application/json; charset=UTF-8"}
        })
        
        json = await response.json();
        if(json.erro){
        mostrarErro.innerHTML = `<h1>${json.erro}</h1>`
        }else {

            localStorage.setItem("estaLogado" , true)
            localStorage.setItem("user", JSON.stringify({
                id : json.id,
                userName : json.userName,
                carrinho : []
            }))
            window.location.href = "/"
        }
})

}


login()