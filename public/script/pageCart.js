
//  if(document.readyState === "loading"){
//     document.addEventListener("DOMContentLoaded", ready)
//  }else {
//     ready()
//  }   
    
//  function ready(){

//  }
    
    const user = JSON.parse(localStorage.getItem("user"))
        var container = document.getElementById("allProducts")

        for (let index = 0; index < user.carrinho.length; index++) {
            const element = user.carrinho[index];
            const name = element.name
            const price = element.price.replace("R$", "")
            const desc = element.desc
            const qtd = element.quantidade
            const image = element.image
            const precoTotal = price * qtd

            console.log(precoTotal);
            var response
            var json
    

    
            var product = document.createElement("div")
            product.innerHTML = ` <div class="container">
            <div class="linhaConteudo" value = ${index}>
                <div class="image">
                    <img src="${element.image}" alt="">
                    <h2 id="nomeP">${element.name}</h2>
                </div>
                <div  class="preco">
                    <h2 class ="price" value = "10">${element.price}</h2>
                </div>
                <div class="quanti">
                    <input type="number" id = "input" class = "input" min="1" value ="${element.quantidade}">
                   
                    <button type = "button" ;" class = "remove-product">deletar</button>
                    </div>
                    
                <div class="preco">
                    <h2 class = "precoTotal">R$${precoTotal}</h2>
                </div>      
            </div>
        </div>`
    
    
            container.appendChild(product)
            
            
        }

        const removeProductButton = document.getElementsByClassName("remove-product")
        console.log(removeProductButton);

for (var i = 0; i < removeProductButton.length; i++) {
    console.log(i);
    removeProductButton[i].addEventListener("click", function async(event){

        var indexDelete = event.target.parentElement.parentElement.getAttribute('value');
        console.log("id a ser deletado",indexDelete);
        

        console.log("user", user);

        var carrinho = user.carrinho


        console.log("carrinho item",carrinho[indexDelete]);

        
        console.log("carrinho antes de remover",carrinho);
        carrinho.splice(indexDelete, 1)
        console.log("carrinho depois",carrinho);

        user.carrinho = carrinho
        localStorage.setItem("user", JSON.stringify(user))
        console.log("user", user);
        updateTotal()
        location.reload()
    })
}
 function updateTotal(){
    const precoProduto = document.getElementsByClassName("price")
    const quantidadeProduto = document.getElementsByClassName("input")
var total = 0
for(var i = 0; i < precoProduto.length; i++){     
    const productPrice = precoProduto[i].textContent.replace("R$", "")

    console.log(productPrice);

    const quantidade = document.getElementsByClassName("input")[i].value
    console.log(productPrice ,"*",quantidade)
    document.getElementsByClassName("precoTotal")[i].innerText= "R$"+productPrice * quantidade
    total += productPrice * quantidade
}

console.log("total" , total);
document.getElementById("subTotal").innerText= "R$" +total
document.getElementById("valorTotal").innerText= "R$" +total
document.getElementById


 }

 updateTotal()



 const quantidadeInput = document.getElementsByClassName("input")
 for (let i = 0; i < quantidadeInput.length; i++) {
    quantidadeInput[i].addEventListener("change", ()=>{
        updateTotal()

        console.log(quantidadeInput[i].value);
        var carrinho = user.carrinho
        carrinho[0].quantidade = quantidadeInput[i].value
        user.carrinho = carrinho
        localStorage.setItem("user", JSON.stringify(user))

    } )
    
 }
// async function updatePrice() {
//     const user = JSON.parse(localStorage.getItem("user"))
//     const valorTotal = document.getElementById("valorTotal")
//     const productQuantidade = document.querySelectorAll("#input")

    
//     console.log(valorTotal);
//     let precoTotal = 0
//     for (let index = 0; index < user.carrinho.length; index++) {

//         const element = user.carrinho[index];

//         let response
//         response = await getProductById(element.id)
//         precoTotal += response.price * element.quantidade

//     }
//     valorTotal.innerText = precoTotal
//     return ({
//         precoTotal : precoTotal
//     })
   
// }

// updatePrice()











// // async function getProductById(id) {

// //     let response
// //     let json

// //     response = await fetch(`http://localhost:9090/products/${id}`)
// //     json = await response.json()
// //     return (json)
// // }

// // async function getProducts() {
// //     document.addEventListener('DOMContentLoaded',async function (){
// //         const user = JSON.parse(localStorage.getItem("user"))

// //         var container = document.getElementById("allProducts")
    
    
    
// //         for (let index = 0; index < user.carrinho.length; index++) {
// //             const element = user.carrinho[index];
    
// //             var response
// //             var json
    
// //             response = await getProductById(element.id)
    
// //             var product = document.createElement("div")
// //             product.innerHTML = ` <div class="container">
// //             <div class="linhaConteudo">
// //                 <div class="image">
// //                     <img src="${response.image}" alt="">
// //                     <h2 id="nomeP">${response.name}</h2>
// //                 </div>
// //                 <div  class="preco">
// //                     <h2 id ="price" value = "10">R$${response.price}</h2>
// //                 </div>
// //                 <div class="quanti">
// //                     <input type="number" id = "input${index}" class = "input${index}" minlength="1" value ="${element.quantidade}">

// //                     </div>
// //                 <div class="preco">
// //                     <h2 id : "precoTotal${index}">R$${response.price * element.quantidade}</h2>
// //                 </div>      
// //             </div>
// //         </div>`
    
    
// //             container.appendChild(product)
            
            
// //         }
// //         somarSubTotal()
// //     })
    
// // }

// // getProducts()

// // async function updatePrice() {
// //     const user = JSON.parse(localStorage.getItem("user"))
// //     const valorTotal = document.getElementById("valorTotal")
    
// //     console.log(valorTotal);
// //     let precoTotal = 0
// //     for (let index = 0; index < user.carrinho.length; index++) {

// //         const element = user.carrinho[index];

// //         let response
// //         response = await getProductById(element.id)
// //         precoTotal += response.price * element.quantidade

// //     }
// //     valorTotal.innerText = precoTotal
// //     return ({
// //         precoTotal : precoTotal
// //     })
   
// // }

// // updatePrice()


// //   function somarSubTotal(){
    
// //     const input = document.getElementById("input0")
    
    
// //     input.addEventListener('click', ()=>{
// //         const valor = document.getElementById("price")
// //         console.log(valor.value);
// //         console.log(input.value);

// //     })
// //     console.log(input.value);
    
// // }

// // somarSubTotal()
// // // async function getProduct() {


// // //     var user = JSON.parse(localStorage.getItem("user"))

// // //     var container = document.getElementById("allProducts")

// // //     for (let i = 0; i < user.carrinho.length; i++) {



// // //         const element = user.carrinho[i];

// // //         var response
// // //         var json

// // //         response = await fetch(`http://localhost:9090/products/${element.id}`, {
// // //             method: "GET",
// // //             headers: {
// // //                 "Content-type": "application/json; charset=UTF-8"
// // //             }
// // //         })

// // //         json = await response.json();
// // //         if (json.erro) {
// // //             // mostrarErro.innerHTML = `<h1>${json.erro}</h1>`
// // //             console.log(json.erro);
// // //         } else {
// // //             console.log("quantidade", element.quantidade);
// // //             var card = document.createElement("div")
// // //             card.innerHTML =`
// // //     <div class="container">

// // //         <div class="linhaConteudo">
// // //             <div class="image">
// // //                 <img src="${json.image}" alt="">
// // //                 <h2 id="nomeP">${json.name}</h2>
// // //             </div>
// // //             <div  class="preco">
// // //                 <h2 id ="price${i}">R$${json.price}</h2>
// // //             </div>
// // //             <div class="quanti">
// // //                 <input type="number" id = "number${i}" minlength="1" value ="${element.quantidade}">
// // //             </div>
// // //             <div class="preco">
// // //                 <h2 id : "precoTotal${i}">R$${json.price * element.quantidade}</h2>
// // //             </div>
// // //         </div>

// // //     </div>
// // //     `
// // //             container.appendChild(card)
// // //             console.log(json.image);
// // //         }



// // //     }

// // // function updateTotal(){
// // //     let total = 0
// // //     for (let i = 0; i < user.carrinho.length; i++) {
// // //         const element = user.carrinho[i];
// // //         const productPrice = element.
// // //         const productQuantidade = element.quantidade

// // //         total += productPrice * productQuantidade;
// // //         console.log(productPrice);
// // //     }
// // //     const valorTotal = document.getElementById("valorTotal").innerText = `R$${valor}`
// // // }

// // // updateTotal()

// // // }


// // // getProduct()

