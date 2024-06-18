
async function estaLogado (){
   
    const menu = document.getElementsByClassName("menu")[0]
    var headerNLogado = `  <a href="/"><h1>Exclusive</h1></a>
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="https://chat.whatsapp.com/L6aeRiY2BTd3GWNkRT33I5">Contact</a></li>
          
            <li id="login"><a href="/login">Sign Up</a></li>
            <li id="loginVendedor"><a href="/vendedor/login">seller's area</a></li>
        </ul>
       
        <div class="search-bar">
            <div class="container1">
                <h1> <br> </h1>
               
                  
              </div>
             
          
           
        </div> `

        var headerLogado = ` <a href="/"><h1>Exclusive</h1></a>
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="https://chat.whatsapp.com/L6aeRiY2BTd3GWNkRT33I5">Contact</a></li>
          
        </ul>
       
        <div class="search-bar">
            <div class="container1">
                <h1> <br> </h1>
              
                  <a href="/carrinho"><button id="carrinho" type="submit"><img src= "/img/Design_sem_nome__4_-removebg-preview.png" alt="Search icon"></button></a> 
             <div class="dropdown">
  <button class="dropbtn">Perfil</button>
  <div class="dropdown-content">
  <a href="/conta/editar">Manage my account</a>
  <a href="/carrinho">my order</a>
  <a id = "btnLogOut" href="#">Logout</a>
  </div>
</div>
              </div>
             
          
           
        </div>`
    if(localStorage.getItem("estaLogado") === "true"){
        menu.innerHTML = headerLogado
    }else {
        menu.innerHTML = headerNLogado
    }
    console.log("ta pegand");
}

    function logOut(){
    const btnLogOut = document.getElementById("btnLogOut")


    btnLogOut.addEventListener('click', ()=>{
        localStorage.setItem("estaLogado", false)
        localStorage.removeItem("user")
        window.location.reload()
    })
}


estaLogado()
logOut();