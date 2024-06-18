const {
    Console
} = require("console");
const fs = require("fs");
const path = require("path");

const fileName = "users.json";
const filePath = path.join(__dirname, "..", "database", fileName);

class loginModel {
    static async getUsers() {


        return new Promise((resolve, reject) => {
            try {
                fs.readFile(filePath, "utf8", (err, data) => {
                    console.log(err)
                    if (err) {
                        if (err.code === 'ENOENT') return this.writeUser(JSON.parse('{"nextId" : 1, "users":[]}')), resolve(this.getUsers())
                    }
                    resolve(JSON.parse(data));

                });
            } catch (error) {
                console.log("erro paizao");
            }
        });
    }

    static async writeUser(content) {
        try {
            fs.writeFile(filePath, JSON.stringify(content), (err) => {
                if (err) return err;
                console.log("Dados escritos em /src/database/users.txt");
            });
        } catch (error) {
            console.log("erro paizao");
        }
    }

    static async validacaoUserName(userName) {
        try {
            return new Promise((resolve, reject) => {
                var valUserName = false;
                // Validando se no userName possui espaços em brancos
                if (userName.indexOf(" ") >= 0) {
                    valUserName = false;
                    reject({
                        erro: "Erro na validação do userName",
                        msg: "não deixe espaços em branco",
                    });
                    console.log({
                        erro: "Erro na validação do userName",
                        msg: "não deixe espaços em branco",
                    });
                } else {
                    // Validando se possui menos de 8 caracteres
                    if (userName.length < 4) {
                        valUserName = false;
                        reject({
                            validacao: false,
                            erro: "Erro na validação do userName",
                            msg: "Digite no minimo 15 caracteres",
                        });
                        console.log({
                            validacao: false,
                            erro: "Erro na validação do userName",
                            msg: "Digite no minimo 8 caracteres",
                        })
                    } else {
                        resolve(valUserName = true);
                    }
                }


            })



        } catch (error) {
            console.log(error)
        }
    }

    static async validacaoEmail(emailUser) {
        try {
            var valEmail = false;
            return new Promise((resolve, reject) => {
                // Validação do email
                // Validando se possui @
                if (emailUser.indexOf("@") === -1) {
                    valEmail = false;
                } else {
                    valEmail = true;
                }



                if (!valEmail) {
                    reject({
                        erro: "Erro na validacao do email",
                        msg: "Digite um email valido",
                    });
                } else {
                    if (emailUser.indexOf(" ") >= 0) {
                        valEmail = false;
                        console.log("espaços vazios")
                        reject({
                            erro: "Erro na validação do email",
                            msg: "Digite um email sem espaços vazios"
                        });

                    } else {
                        //Fazendo a validação de dominios
                        var email = emailUser.split("@");
                        var dominios = [
                            "gmail.com",
                            "hotmail.com",
                            "yahoo.com",
                            "outlook.com",
                        ];

                        if (dominios.indexOf(email[1]) === -1) {
                            valEmail = false;
                            reject({
                                erro: "Erro na validação do email",
                                msg: "Seu email não possui nenhum dominio",
                            });
                        } else {
                            // Validando se possui menos de 3 caracteres, ou mais de 20
                            if (email[0].length < 3 || email[0].length > 50) {
                                valEmail = false;
                                reject({
                                    erro: "Erro na validação do email",
                                    msg: "Digite um email com no minimo 3 caracteres,e no maximo 20",
                                });
                            } else {

                                resolve(valEmail = true);

                            }
                        }
                    }

                }

            })
        } catch (error) {
            console.log(error)
        }
    }

    static async validacaoPassword(password) {

        try {
            var valPassword = false;
            return new Promise((resolve, reject) => {
                // Validação da senha

                // Validando minimos de caracteres
                if (password.length < 8) {
                    valPassword = false;
                    reject({
                        erro: "Erro na validação da senha",
                        msg: "Digite no minimo 8 caracters",
                    });
                } else {
                    // Validando se tem espaços vazios
                    if (password.indexOf(" ") >= 0) {
                        valPassword = false;
                        reject({
                            erro: "Erro na validação da senha",
                            msg: "Digite uma senha sem espaços vazios",
                        });
                    } else {
                        // Validando se possui caracteres especiais
                        let caracEspecial =
                            /^(?=.*[@!#$%^&*()/\\])[@!#$%^&*()/\\a-zA-Z0-9]/;
                        if (!caracEspecial.test(password)) {
                            valPassword = false;
                            reject({
                                erro: "Erro na Validação da senha !",
                                msg: "Digite no minimo 1 caracteres especial !",
                            });
                        } else {
                            // Validando se tem letra maiuscula
                            if (!/[A-Z]/.test(password)) {
                                valPassword = false;
                                reject({
                                    erro: "Erro na Validação da senha !",
                                    msg: "Digite no minimo 1 letra maiuscula !",
                                });
                            } else {
                                // Validando se tem numeros
                                if (!/[0-9]/.test(password)) {
                                    valPassword = false;
                                    reject({
                                        erro: "Erro na validação da senha !",
                                        msg: "Digite no minimo 1 numero",
                                    });
                                } else {
                                    resolve(valPassword = true);
                                }
                            }
                        }
                    }
                }
            })
        } catch (error) {
            console.log(error)
        }

    }

    static async verificarEmailDuplo(email) {
        try {
            var emailDuplo = false;
            var array = await this.getUsers();

            return new Promise((resolve, reject) => {
                // Importando o banco de dados, para poder manipular


                for (let i = 0; i < array.users.length; i++) {
                    // Validando se ja possui algum user com esse email
                    if (email === array.users[i].email) {
                        emailDuplo = true;
                        console.log("Erro, email duplicado");
                        break
                    } else {
                        console.log(array.users[i].email, "X", email)
                        console.log("Nao")
                    }
                }
                if (emailDuplo) {
                    reject({
                        erro: "Erro na validação do email !",
                        msg: "Esse email ja existe",
                    });
                } else {
                    console.log("tudo certo")
                    resolve(emailDuplo = false)
                }
            })
        } catch (error) {
            console.log(error)
        }

    }

    static async verificarDadosUser(content) {
        try {

            var valUserName
            var valEmail
            var valPassword
            var valEmailDuplo
            var msgErroUser

            //Validando username
            await this.validacaoUserName(content.userName)
                .then(valUser => valUserName = valUser)
                .catch(msgErro => msgErroUser = msgErro)

            await this.validacaoEmail(content.email)
                .then(valUserEmail => valEmail = valUserEmail)
                .catch(msgErro => msgErroUser = msgErro)

            await this.validacaoPassword(content.password)
                .then(valUserPassword => valPassword = valUserPassword)
                .catch(msgErro => msgErroUser = msgErro)

            await this.verificarEmailDuplo(content.email)
                .then(valEmailUser => valEmailDuplo = valEmailUser)
                .catch(erro => msgErroUser = erro)

            return new Promise((resolve, reject) => {

                if (msgErroUser) {
                    reject(msgErroUser)
                }

                if (valUserName && valEmail && valPassword && !valEmailDuplo) {
                    resolve(true);
                }




                console.log(valUserName, valEmail, valPassword, valEmailDuplo)

            })

        } catch (error) {
            console.log(error);
        }
    }

    static async createUser(content) {
        console.log("Estamos no createUser")
        try {


            const dataUser = JSON.parse(content);


            var array = await this.getUsers();

            // Fazendo validações dos dados do user

            var valDataUser
            var msgErro
            await this.verificarDadosUser(dataUser)
                .then(valUser => valDataUser = valUser)
                .catch(erro => msgErro = erro)

            return new Promise((resolve, reject) => {


                if (msgErro) {
                    reject(msgErro)
                }

                console.log("os dados foram recebidos como: ", valDataUser)

                if (valDataUser) {
                    //Declarando id do user
                    dataUser.id = array.nextId;

                    // Atualizando o proximo id
                    array.nextId += 1

                    // Adicionado o user na array
                    array.users.push(dataUser)

                    // Escrevendo o array no database
                    this.writeUser(array)

                    // Devolvendo mensagem para o usuario
                    resolve({
                        msg : "Cadastrado com sucesso",
                        userCreater : true,
                        userName : dataUser.userName,
                        id : dataUser.id
                    })

                }

            })
        } catch (error) {
            console.log(error)
        }
    }

    static async deleteUser(id) {

        // Converte o ID para um número inteiro
        var idInteiro = Number(id);

        // Carrega a lista do banco de dados 
        var array = await this.getUsers();

        return new Promise((resolve, reject) => {

            if (!idInteiro) {
                console.log("oi")
                reject({
                    erro: "Erro na validação do DELETE",
                    msg: "O parametro passado não e um numero"
                })
            }

            // Procurando o ID fornecido
            array.users.forEach(element => {
                // Verifica se o usuario foi encontrado
                if (element.id === idInteiro) {
                    // Deletando o usuario da lista
                    array.users.splice(array.users.indexOf(element), 1)
                    // Enviando mensagem ao usuario
                    resolve({
                        msg: "User deletado",
                    });
                    // Reescreve a lista no banco de dados
                    this.writeUser(array);
                }
            })
            reject({
                erro: "Erro ao deletar Usuario",
                msg: "O ID enviado não foi encontrado",
            });
        });
    }

    static async updateUser(id, dataUser) {
        try {

            // Converte o ID para um número inteiro
            var idInteiro = Number(id);

            // Importando os dados a serem atualizados
            const user = JSON.parse(dataUser);

            // Importando o database
            var array = await this.getUsers();


            var valDataUser
            var msgErro

            await this.verificarDadosUser(user)
                .then(valUser => valDataUser = valUser)
                .catch(erro => msgErro = erro)



            return new Promise((resolve, reject) => {
                if (!idInteiro) {
                    reject({
                        erro: "Erro na validação do UPDATE",
                        msg: "O parametro passado não e um numero"
                    })
                }
                let msgId

                for(let i = 0; i < array.users.length; i++){
                    if(array.users[i].id === idInteiro){
                        msgId = false;
                        break;
                    }else{
                        msgId = true;
                    }
                        
                }

                if(msgId){
                    reject({
                        erro : "Erro ao editar usuario",
                        msg : "O ID não foi encontrado"
                    })
                }

                if (msgErro) {
                    reject(msgErro)
                }

                if (valDataUser) {
                    array.users.forEach(element => {
                        if (element.id === idInteiro) {
                            console.log("achamos")
                            element.userName = user.userName
                            element.email = user.email
                            element.password = user.password
                            resolve({
                                msg: "User atualizado !"
                            })
                            this.writeUser(array)
                        }
                    });
                    

                }
            })


        } catch (error) {
            console.log(error)
        }

    }

   static async signin(data){
        try {
             // Importando o database
             var array = await this.getUsers();

             const user = JSON.parse(data);

             var valLogin

            return new Promise((resolve, reject) =>{
                
            for(let i = 0; i < array.users.length; i++){               
                    if(array.users[i].email === user.email && array.users[i].password === user.password){
                        valLogin = true;
                        resolve({
                            msg : "Acesso liberado",
                            userName : array.users[i].userName,
                            id : array.users[i].id
                        })
                        break;
                    }else {
                       valLogin = false;
                    }
                  
                
            }

            if(!valLogin){
                reject({
                    erro : "Email ou Senha incorretas"
                })
            }


           
            })
        } catch (error) {
            console.log(error)
        }
   }

   static async getUserById(id){
    try {
         // Importando o database
         var array = await this.getUsers();

        return new Promise((resolve, reject)=>{
            var valUser = false;
            array.users.forEach(element => {
                if(element.id === id){
                    valUser = true
                    resolve(element)
                }
            });

            if(!valUser){
                reject({
                    msg : "Não foi encontrado nenhum user com esse id"
                })
            }
        })    
    } catch (error) {
        console.log(error)
    }
   }





}

module.exports = loginModel;