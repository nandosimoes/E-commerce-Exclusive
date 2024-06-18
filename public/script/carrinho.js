const menos = document.getElementById("menos")
const mais = document.getElementById("mais")

const valor = document.getElementById("valor")

const btnCarrinho = document.getElementById("addCart")

var valorQuantidade = 1;

var user = JSON.parse(localStorage.getItem("user"))


function carrinho() {


    mais.addEventListener('click', () => {
        valorQuantidade++
        valor.innerText = valorQuantidade
    })

    menos.addEventListener('click', () => {
        if (valorQuantidade == 1) {
            valor.innerText = 1
        } else {
            valorQuantidade--
            valor.innerText = valorQuantidade
        }
    })

    btnCarrinho.addEventListener('click', (e) => {
        e.preventDefault()
        if(!user){
            window.location.href = '/login'
        }
        const url = new URL(window.location.href)
        const searchParams = url.searchParams;
        const id = searchParams.get("id")
        
        var carrinhoN = user.carrinho
        
        
        const name = document.getElementById("name").textContent
        
        const price = document.getElementById("price").textContent
        const desc = document.getElementById("desc").textContent
        
        const image = document.getElementById("image").getAttribute('src')
        

        const product = {
            id : id,
            name : name,
            price : price,
            desc : desc,
            quantidade : valorQuantidade,
            image : image
        }


        if(carrinhoN.length === 0){
            carrinhoN.push(product)
        }else {
            let valProdutoDuplicado
            for (let i = 0; i < carrinhoN.length; i++) {
                const element = carrinhoN[i];
                if(element.id === id){
                    element.quantidade += valorQuantidade
                    valProdutoDuplicado = true
                    break;
                }else {
                    console.log("teste?");
                    valProdutoDuplicado = false
                }
            }

            if(valProdutoDuplicado === false){
                carrinhoN.push(product)
                
            }


            // carrinhoN.forEach(element => {
            //     console.log("caiu no for");
            //     if(element.id === id){
            //         element.quantidade += valorQuantidade
            //     }
            // });
        }
        

        console.log(carrinhoN);
        console.log("teste?", carrinhoN);
        
           user.carrinho = carrinhoN 
           
        localStorage.setItem("user", JSON.stringify(user))  
        window.location.href = '/carrinho'
        // console.log("carrinho antes de tudo",carrinhoN);
      

        // product = {
        //     id: id,
        //                 quantidade: valorQuantidade
        // }
        // // carrinhoN.push({
        // //                 id: id,
        // //                 quantidade: valorQuantidade
        // //             })
                    
        //             console.log("carrinho dps",carrinhoN);
        
    
        //             carrinhoN.forEach(element => {
        //                 if(element.id === product.id){
        //                     console.log("ja tem um igual")
        //                     element.quantidade += valorQuantidade
        //                 }else {
        //                     console.log("nao tem igual")
        //                     carrinhoN.push(product)
        //                 }
                        
        //             });
        //             console.log(carrinhoN);
        //             user.carrinho = carrinhoN 
        //             localStorage.setItem("user", JSON.stringify(user))

        // // carrinhoN.forEach(element => {
            
        // //     if (element.id === id) {
        // //         console.log("ja tem esse objeto");
        // //         element.quantidade += valorQuantidade
        // //     } else {
        // //         carrinhoN.push({
        // //             id: id,
        // //             quantidade: valorQuantidade
        // //         })
        // //     }
        // //     console.log("element do array",element);
        // // });


        // //    user.carrinho = carrinhoN 
        // //    console.log(user);
        // //localStorage.setItem("user", JSON.stringify(user))
    })



}


carrinho()