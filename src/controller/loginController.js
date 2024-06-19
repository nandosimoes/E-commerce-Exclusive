const loginModel = require('../models/loginModel');
const productController = require('../controller/productController')


exports.getUsers = async (req, res) => {
    try {
        const data = await loginModel.getUsers()
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error'
        });
    }
}

exports.getLogin = async (req, res) => {
    try {
        res.render('login')
    } catch (error) {

    }
}

exports.createUser = async (req, res) => {
    try {
        if (!req.body.email) {
            res.render({
                erro: "Erro ao receber dados",
                msg: "O email esta nulo, ou não foi recebido"
            })
        } else {
            if (!req.body.userName) {
                res.send({
                    erro: "Erro ao receber dados",
                    msg: "O nome esta nulo, ou não foi recebido"
                })
            } else {
                if (!req.body.password) {
                    res.send({
                        erro: "Erro ao receber dados",
                        msg: "O password esta nulo, ou não foi recebido"
                    })
                } else {
                    var userName = req.body.userName
                    var email = req.body.email
                    var password = req.body.password

                    const dados = JSON.stringify({
                        id: null,
                        userName: userName,
                        email: email,
                        password: password
                    })

                    var product = await productController.getAllProducts();
                    console.log(product);

                    loginModel.createUser(dados)
                        .then(dados => res.send(dados))
                        .catch(erro => res.send(erro))
                }
            }
        }
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
        });
        console.log(error)
    }

}

exports.signin = async (req, res) => {
    try {

        const dados = JSON.stringify({
            email: req.body.email,
            password: req.body.password
        })
        var valEmail = true
        var valPassword = true;


        if (!req.body.email) {
            valEmail = false
            res.send({
                erro: "Erro ao receber dados",
                msg: "O email esta nulo, ou não foi recebido"
            })
        }

        if (!req.body.password) {
            valPassword = false
            res.send({
                erro: "Erro ao receber dados",
                msg: "O password esta nulo, ou não foi recebido"
            })
        }

        console.log(valEmail, valPassword)

        var product = await productController.getAllProducts();

        if (valEmail && valPassword) {
             loginModel.signin(dados)
                .then(dados => res.send(dados))
                .catch(err => res.send(err))
        }
    } catch (error) {
        console.log(error)
    }
}

exports.deleteUser = async (req, res) => {
    try {
        loginModel.deleteUser(req.params.id).then(data => res.send(data)).catch(erro => res.send(erro));
    } catch (error) {
        console.log(error)
    }
}

exports.updateUser = async (req, res) => {
    try {
        const id = req.params.id;

        const dados = JSON.stringify({
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password
        })

        console.log(dados)

        loginModel.updateUser(id, dados)
            .then(dados => res.send(dados))
            .catch(error => res.send(error));

    } catch (error) {
        console.log(error)
    }
}

exports.getUserById = async (req, res) => {
    try {
        const id = Number(req.params.id)

        if (!id) {
            res.send({
                erro: "Erro ao validar o ID",
                msg: "O parametro passado não e um numero !"
            })
        } else {
            loginModel.getUserById(id)
                .then(dados => res.send(dados))
                .catch(erro => res.send(erro))

        }

    } catch (error) {
        console.log(error)
    }
}