/**
 * Arquivo: server.js
 * Descrição: Responsável por levantar os serviços do node para executar a API através do express.js.
 * Author: Luiz Carlos Bessa de Lima
 * Data da Criação: 21/09/2023
 *
 */

// Configurar o Setup da App:

//Chamadas dos pacotes
var express = require("express");
var app = express();
var bodyParser = require("body-parser");

//Configuração da variável app para usar o 'bodyParser':
app.use(bodyParser.urlencoded({ extend: true }));
app.use(bodyParser.json());

//Definindo a porta onde será executada a nossa api:
var port = process.env.port || 8000;

//Criando uma instância das rotas via express:
var router = express.Router();

//Rota de exemplo
router.get("/", function (req, res) {
  res.json({ message: "Beleza! Bem vindo a nossa Loja XYZ" });
});

//Definindo um padrão das rotas prefixidas: '/api':
app.use("/api", router);

//Iniciando a aplicação (servidor):
app.listen(port);
console.log("Iniciando a app na porta " + port);
