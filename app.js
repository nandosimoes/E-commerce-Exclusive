const express = require('express');
const app = express();
const porta = 9090;
const rotas = require("./src/routes/router")

app.use(express.urlencoded({extended:false}))
app.use(express.json()) 

app.use(express.static('public'))
        
app.use(express.urlencoded({extended:false}))

    // Rotas
    app.use('/', rotas);

    // EJS
    app.set('view engine', 'ejs');
    app.set('views', 'src/view/');

    app.listen(porta, ()=> {
        console.log(`Servidor rodando, http://localhost:${porta}`)
    })
