if(localStorage.getItem("estaLogado") === "false"){
    console.log("caiu aqui");
    window.location.href = ("/login")
}

const user = JSON.parse(localStorage.getItem("user"));
const carrinho = user.carrinho;
const container = document.getElementById("containerPay");

var total = 0;



for (let index = 0; index < carrinho.length; index++) {
    const card = document.createElement("div");
    var price = parseFloat(carrinho[index].price.replace("R$", "").replace(",", ".").trim());
    var qtd = carrinho[index].quantidade;
    
    total += price * qtd;
    console.log("esse é o total", total);
    
    card.innerHTML = `<div class="linhaConteudo">
                    <div class="image">
                        <img src="${carrinho[index].image}" alt="">
                        <h2 id="nomeP">${carrinho[index].name}</h2>
                    </div>
                    <div class="preco">
                        <h2>R$${(price * qtd).toFixed(2)}</h2>
                    </div>`;
    container.appendChild(card);
    console.log("teste");
}

document.getElementById("subTotal").innerText = `R$${total.toFixed(2)}`;
document.getElementById("valorTotal").innerText = `R$${total.toFixed(2)}`;


// const btnPagamento = document.getElementById("space")

// btnPagamento.addEventListener("click", ()=> {
//     alert("teste")
// })


document.getElementById("form1").addEventListener("submit", (e)=> {
    e.preventDefault()
    console.log(user.carrinho);

    user.carrinho.splice(0 , user.carrinho.length)
    
    console.log(user.carrinho);

    localStorage.setItem("user", JSON.stringify(user))

    console.log("apagado");
    window.location.href = '/sucesso'
    
})