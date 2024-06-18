const user = JSON.parse(localStorage.getItem("user"))
const carrinho = user.carrinho
const container = document.getElementById("containerPay")
console.log(container);

var total =0

for (let index = 0; index < carrinho.length; index++) {
    const card = document.createElement("div")
    var price = carrinho[index].price.replace("R$", "")
    var qtd = carrinho[index].quantidade
    
    total += price * qtd
    console.log("esse e o total", total);
    card.innerHTML = `<div class="linhaConteudo">
                    <div class="image">
                        <img src="${carrinho[index].image}" alt="">
                        <h2 id="nomeP">${carrinho[index].name}</h2>
                    </div>
                    <div class="preco">
                        <h2 >R$${price * qtd}</h2>
                    </div>`
                    container.appendChild(card)
    console.log("teste");
    
}

subTotal = document.getElementById("subTotal").innerText = total
valorTotal = document.getElementById("valorTotal").innerText = total