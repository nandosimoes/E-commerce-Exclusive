const form = document.getElementById("form")
const userName = document.getElementById("userName")
const email = document.getElementById("email")
//const myPassWord = document.getElementById("myPassWord")
const newPassword = document.getElementById("newPassWord")
const newPassword2 = document.getElementById("newPassWord2")
const msgErro = document.getElementById("erro")

const user = JSON.parse(localStorage.getItem("user"))

function changeProfile() {


    form.addEventListener('submit', async (e)=> {
        e.preventDefault()

        console.log("id do user: ",user.id);
        let pass
        if(newPassword.value === newPassword2.value){
           
            pass = true
        }else{
            pass = false
            msgErro.innerHTML = `<h1>Suas senhas não são iguais</h1>`
        }


        if(pass){
            const userData = JSON.stringify({
                userName : userName.value,
                email : email.value,
                password : newPassword.value
            })
            response = await fetch(`http://localhost:9090/users/${user.id}`, {
                method: "PUT",
                body : userData,
                headers : {"Content-type" : "application/json; charset=UTF-8"}
            })
            
            json = await response.json();
            console.log(json);
            if(json.erro){
            msgErro.innerHTML = `<h1>${json.erro}</h1> <h2> ${json.msg}</h2>`
            }else {
                 msgErro.innerHTML = `<h1>Atualizado com sucesso !</h1>`
                localStorage.setItem("estaLogado" , true)
                localStorage.setItem("user", JSON.stringify({
                    id : user.id,
                    userName : userName,
                    carrinho : []
                }))
                
            }
        }

    })
}

document.getElementById("nomeUsuario").innerText = user.userName;

changeProfile()