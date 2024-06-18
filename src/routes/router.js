const express = require('express')
const router = express.Router()
const loginController = require('../controller/loginController')
const productController = require('../controller/productController') 
const frontController = require('../controller/frontController')

//ROTAS DE LOGIN

//cadastrar users
router.post('/signup', loginController.createUser)

//deletar user
router.delete('/users/:id', loginController.deleteUser)

//update
router.put('/users/:id', loginController.updateUser)

//login
router.post('/signin', loginController.signin)

//mostrar lista de users
router.get('/users', loginController.getUsers)

//mostrar user por id
router.get("/users/:id", loginController.getUserById)

// router.get("/teste", (req,res)=>{
//     res.render('partials/header')
// })


//ROTAS DE PRODUTO
router.post('/products', productController.createProduct); //OK
router.get('/products', productController.getAllProducts); //OK
router.get('/products/:id', productController.getById); //OK
router.put('/products/:id', productController.updateProduct); //OK
router.delete('/products/:id', productController.deleteProduct); //OK
module.exports = router


//ROTAS FRONT

//ROTAS PRODUTO
router.get('/', frontController.getHome)
router.get('/Produtos/Eletronicos', frontController.getEletronicos)
router.get('/Produtos/Livros', frontController.getLivros)
router.get('/Produtos/Casa', frontController.getCasa)
router.get('/Produtos/Roupas', frontController.getRoupas)
router.get('/Produtos/Beleza', frontController.getBeleza)
router.get('/Produtos', frontController.getAllProducts)


router.get('/vendedor/registrarproduto', frontController.getRegistrarProduto)
router.get('/product/:id', frontController.getProdutoById)
router.get("/carrinho", frontController.getCarrinho)

//ROTAS USER

router.get('/Cadastro', frontController.getCadastro)
router.get('/login', frontController.getLogin)
router.get('/vendedor/login', frontController.getLoginVendedor)
router.get("/conta/editar", frontController.getEditarConta)
router.get("/pagamento", frontController.getPagamento)

router.get('/vendedor', frontController.getVendedor)