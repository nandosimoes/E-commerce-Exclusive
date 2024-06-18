const fs = require('fs');
const path = require('path');
const fileName = "products.json";
const filePath = path.join(__dirname, "..", "database", fileName);

class productModel {
    static async getProducts() {
        return new Promise((resolve, reject) => {
            try {
                fs.readFile(filePath, "utf-8", (err, data) => {
                    if (err) {
                        if (err.code === 'ENOENT') {
                            this.writeProducts({
                                nextId: 1,
                                Products: []
                            }).then(() => resolve(this.getProducts()));
                        } else {
                            reject({
                                erro: "Erro ao ler o arquivo",
                                msg: "Não foi possível ler o arquivo de produtos"
                            });
                        }
                    } else {
                        resolve(JSON.parse(data));
                    }
                });
            } catch (error) {
                reject({
                    erro: "Erro ao buscar produtos",
                    msg: "Não foi possível buscar os produtos"
                });
            }
        });
    }

    static async writeProducts(content) {
        return new Promise((resolve, reject) => {
            fs.writeFile(filePath, JSON.stringify(content, null, 2), (err) => {
                if (err) {
                    return reject({
                        erro: "Erro ao escrever no arquivo",
                        msg: "Não foi possível salvar os produtos"
                    });
                }
                resolve();
            });
        });
    }

    static async validationName(name) {
        return new Promise((resolve, reject) => {
            if (!/[a-z]/i.test(name) || name.length < 2 || name.length > 100) {
                reject({
                    erro: "Erro na validação do nome",
                    msg: "O nome do produto deve ter entre 2 e 30 caracteres e conter letras"
                });
            } else {
                resolve(true);
            }
        });
    }

    static async validationPrice(price) {
        const newPrice = Number(price);

        return new Promise((resolve, reject) => {
            if (isNaN(newPrice) || newPrice <= 0) {
                reject({
                    erro: "Erro na validação do preço",
                    msg: "Digite um preço numérico válido"
                });
            } else {
                resolve(true);
            }
        });
    }

    static async validarDesc(description) {
        return new Promise((resolve, reject) => {
            if (!/[a-z]/i.test(description) || description.length < 10 || description.length > 200) {
                reject({
                    erro: "Erro na validação da descrição",
                    msg: "A descrição deve ter entre 10 e 200 caracteres e conter letras"
                });
            } else {
                resolve(true);
            }
        });
    }

    static async validarType(type) {
        const newType = type.toLowerCase();
        const types = ["casa e jardim", "livros", "beleza", "eletronicos", "roupas"];

        return new Promise((resolve, reject) => {
            if (!types.includes(newType)) {
                reject({
                    erro: "Erro na validação do tipo",
                    msg: `Escreva um tipo válido (${types.join(', ')})`
                });
            } else {
                resolve(true);
            }
        });
    }

    static async validarImage(image) {
        const validExtensions = [".jpg", ".png", ".svg", ".jpeg", ".webp"];
        const extension = path.extname(image);

        return new Promise((resolve, reject) => {
            if (!validExtensions.includes(extension)) {
                reject({
                    erro: "Erro na validação da imagem",
                    msg: "A imagem deve ter um formato válido (.jpg, .png, .svg, .jpeg, .webp)"
                });
            } else {
                resolve(true);
            }
        });
    }

    static async validarProduto(data) {
        try {
            var valName;
            var valPrice;
            var valDescription;
            var valImage;
            var valType;
            var msgErro;

            await this.validationName(data.name)
                .then(dados => valName = dados)
                .catch(erro => msgErro = erro);

            await this.validationPrice(data.price)
                .then(dados => valPrice = dados)
                .catch(erro => msgErro = erro);

            await this.validarDesc(data.description)
                .then(dados => valDescription = dados)
                .catch(erro => msgErro = erro);

            await this.validarType(data.type)
                .then(dados => valType = dados)
                .catch(erro => msgErro = erro);

            await this.validarImage(data.image)
                .then(dados => valImage = dados)
                .catch(erro => msgErro = erro);

            return new Promise((resolve, reject) => {
                if (msgErro) {
                    reject(msgErro);
                }
                if (valName && valPrice && valDescription && valImage && valType) {
                    resolve(true);
                }
            });
        } catch (error) {
            throw error;
        }
    }

    static async createProducts(data) {
        try {
            const dataProduct = JSON.parse(data);
            var valProduct;
            var msg;

            await this.validarProduto(dataProduct)
                .then(dados => valProduct = dados)
                .catch(erro => msg = erro);

            return new Promise((resolve, reject) => {
                if (msg) {
                    reject(msg);
                }
                if (valProduct) {
                    this.getProducts()
                        .then(products => {
                            const nextId = products.nextId;
                            dataProduct.id = nextId;
                            products.Products.push(dataProduct);
                            products.nextId = nextId + 1;

                            this.writeProducts(products)
                                .then(() => resolve({
                                    msg : "Produto Cadastrado com sucesso !"
                                }))
                            
                                .catch(error => reject({
                                    erro: "Erro ao salvar produto",
                                    msg: "Não foi possível salvar o produto"
                                }));
                        })
                        .catch(error => reject({
                            erro: "Erro ao obter produtos",
                            msg: "Não foi possível obter a lista de produtos"
                        }));
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    static deleteProduct(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const products = await this.getProducts();
                const productIndex = products.Products.findIndex(prod => prod.id === Number(id));

                if (productIndex === -1) {
                    reject({
                        erro: "Erro ao deletar produto",
                        msg: "Produto não encontrado"
                    });
                } else {

                    products.Products.splice(productIndex, 1);
                    await this.writeProducts(products);
                    resolve("Produto deletado com sucesso");

                }
            } catch (error) {
                reject(error);
            }
        });
    }


    static async updateProduct(id, data) {
        try {

            const newProduct = JSON.parse(data)
            var newId = Number(id)

            var msg
            var valProduct

            var products = await this.getProducts();

          





            await this.validarProduto(newProduct)
                .then(dados => valProduct = dados)
                .catch(erro => msg = erro);

            return new Promise((resolve, reject) => {
                if (isNaN(newId)) {
                    reject({
                        erro: "Erro na validação do id",
                        msg: "Digite um id valido"
                    })
                }
                if (msg) {
                    reject(msg)
                }
                var valIdAchado

                if (valProduct) {

                    for (let i = 0; i < products.Products.length; i++) {
                        if (products.Products[i].id === newId) {
                            valIdAchado = true



                            products.Products[i].name = newProduct.name;
                            products.Products[i].price = newProduct.price;
                            products.Products[i].description = newProduct.description;
                            products.Products[i].type = newProduct.type;
                            products.Products[i].image = newProduct.image;

                        
                            this.writeProducts(products)
                       
                            resolve(
                                "Produto modificado com sucesso !"
                            )
                            break;
                        } else {
                            valIdAchado = false;
                        }

                    }
                    if (!valIdAchado) {
                        reject({
                            erro: "Erro na validação do id",
                            msg: "Não foi achado o produto"
                        })
                    }
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    static getProductById(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const products = await this.getProducts();
                const product = products.Products.find(prod => prod.id === Number(id));

                console.log(product)
                if (!product) {
                    reject({
                        erro: "Erro ao buscar produto",
                        msg: "Produto não encontrado"
                    });
                } else {
                    resolve(product);
                }

            } catch (error) {
                reject(error);
            }
        });
    }
}

module.exports = productModel;