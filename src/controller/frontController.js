const productModel = require('../models/productModel')

exports.getHome = async (req,res) => {

    const products = await productModel.getProducts()
    

    res.render('home' , {products : products.Products });
}

exports.getEletronicos = async (req,res) => {
    const products = await productModel.getProducts()

    res.render('eletronicos', {products : products.Products})
}

exports.getLivros = async (req,res) => {
    const products = await productModel.getProducts()

    res.render('books', {products : products.Products})
}

exports.getCasa = async (req,res) => {
    const products = await productModel.getProducts()

    res.render('Casa', {products : products.Products})
} 

exports.getRoupas = async (req,res) => {
    const products = await productModel.getProducts()

    res.render('roupas', {products : products.Products})
}

exports.getBeleza = async (req,res) => {
    const products = await productModel.getProducts()

    res.render('beleza', {products : products.Products})
}

exports.getAllProducts = async (req,res) => {
    const products = await productModel.getProducts()

    res.render('todosProdutos', {products : products.Products})
}

exports.getCadastro = async (req,res) => {
    res.render('cadastro')
}

exports.getLogin = async (req,res) => {
    res.render('login')
}

exports.getLoginVendedor = async (req, res) => {
    res.render('vendedorLogin')
    console.log(req.body)
}

exports.getRegistrarProduto = async (req, res) =>{
    res.render('registrarProduto')
}

exports.getProdutoById = async (req, res) => {

    var produtoE
    // const url1 = new URL(window.location.href);
    // const searchParams = url1.searchParams;

    // const id = searchParams.get("id");
    // console.log("oi",id);

    await productModel.getProductById(req.params.id).then(
        produto => produtoE = produto
    ).catch(erro => console.log(erro))

     
    console.log("idTESTE",produtoE);

    res.render('produto' , {produto : produtoE})
}


exports.getCarrinho = async(req,res) => {
    res.render('carrinho')
}

exports.getEditarConta = async (req,res) => {
    res.render('editarLogin')
}

exports.getPagamento = async (req,res)=> {
    res.render('pagamento')
}

exports.getVendedor = async (req, res) => {
    res.render('vendedor')
}