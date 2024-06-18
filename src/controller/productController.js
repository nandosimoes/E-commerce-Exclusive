const productModel = require('../models/productModel');

exports.createProduct = async (req, res) => { 
   try {
    const name = req.body.name;
    const price = req.body.price;
    const description = req.body.description;
    const image = req.body.image;
    const type = req.body.type;

    var valName = false;
    var valPrice = false;
    var valDescription = false;
    var valImage = false;
    var valType = false;

    if (!name) {
        return res.send({
            erro: "Erro ao receber dados",
            msg: "Nome inválido / vazio"
        });
    } else {
        valName = true;
    }

    if (!price) {
        return res.send({
            erro: "Erro ao receber dados",
            msg: "Preço inválido / vazio"
        });
    } else {
        valPrice = true;
    }

    if (!description) {
        return res.send({
            erro: "Erro ao receber dados",
            msg: "Descrição inválida / vazia"
        });
    } else {
        valDescription = true;
    }

    if (!type) {
        return res.send({
            erro: "Erro ao receber dados",
            msg: "Tipo inválido / vazio"
        });
    } else {
        valType = true;
    }

    if (!image) {
        return res.send({
            erro: "Erro ao receber dados",
            msg: "Imagem inválida / vazia"
        });
    } else {
        valImage = true;
    }

    if (valName && valPrice && valDescription && valImage && valType) {
        const data = JSON.stringify({
            id: null,
            name: name,
            price: price,
            description: description,
            type: type,
            image: image
        });

        productModel.createProducts(data)
            .then(dados => res.send(dados))
            .catch(error => res.send(error));
    }
   } catch (error) {
    res.status(500).json({
        message: 'Internal Server Error'
    }); 
   }
};

exports.getAllProducts = async (req, res) => {
    try {
        const products = await productModel.getProducts();
        res.send(products)
    } catch (error) {
        console.log(error)
    }
};

exports.deleteProduct = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await productModel.deleteProduct(id);
        res.send(result);
    } catch (error) {
        res.send({
            erro: "Erro ao deletar produto",
            msg: "Digite um Número Valido"
        });
    }
};

exports.updateProduct = async (req, res) => {
 const id = req.params.id;

 try {

    const name = req.body.name;
    const price = req.body.price;
    const description = req.body.description;
    const image = req.body.image;
    const type = req.body.type;

    var valName = false;
    var valPrice = false;
    var valDescription = false;
    var valImage = false;
    var valType = false;

    if (!name) {
        return res.send({
            erro: "Erro ao receber dados",
            msg: "Nome inválido / vazio"
        });
    } else {
        valName = true;
    }

    if (!price) {
        return res.send({
            erro: "Erro ao receber dados",
            msg: "Preço inválido / vazio"
        });
    } else {
        valPrice = true;
    }

    if (!description) {
        return res.send({
            erro: "Erro ao receber dados",
            msg: "Descrição inválida / vazia"
        });
    } else {
        valDescription = true;
    }

    if (!type) {
        return res.send({
            erro: "Erro ao receber dados",
            msg: "Tipo inválido / vazio"
        });
    } else {
        valType = true;
    }

    if (!image) {
        return res.send({
            erro: "Erro ao receber dados",
            msg: "Imagem inválida / vazia"
        });
    } else {
        valImage = true;
    }

    if (valName && valPrice && valDescription && valImage && valType) {
        const data = JSON.stringify({
            id: null,
            name: name,
            price: price,
            description: description,
            type: type,
            image: image
        });

        productModel.updateProduct(id, data )
    .then(dados => res.send(dados))
    .catch(erro => res.send(erro))
    }
    
 } catch (error) {
    res.status(500).json({
        message: 'Internal Server Error'
    }); 
 }
}


exports.getById = async (req, res) => {
    const id = req.params.id
    try {
        const product = await productModel.getProductById(id)
        .then(dados => res.send(dados))
        .catch(erro => res.send(erro));


    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error'
        }); 
    }
}
