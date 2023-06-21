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
var mongoose = require("mongoose");
var Produto = require("./app/models/produto");
const produto = require("./app/models/produto");

// Conexão local MongoDB:
mongoose.connect("mongodb://127.0.0.1:27017/node-crud-api");

//Configuração da variável app para usar o 'bodyParser':
app.use(bodyParser.urlencoded({ extend: true }));
app.use(bodyParser.json());

//Definindo a porta onde será executada a nossa api:
var port = process.env.port || 8000;

//Criando uma instância das rotas via express:
var router = express.Router();

//Middleware para usar em todos os requests enviados para  a nossa API - Mensagens Padrão
router.use(function (req, res, next) {
  console.log("Algo está acontecendo aqui...");
  next();
});

//Rota de teste para sabermos se tudo está realmente funcionando (acessar através: GET http://localhost:8000/api)
router.get("/", function (req, res) {
  res.json({ message: "Beleza! Bem vindo a nossa Loja XYZ" });
});

// Rotas da API:
// ============================================================
//Rotas que terminarem com '/produtos' (servir: GET ALL & POST)
//Definindo um padrão das rotas prefixidas: '/api':

router
  .route("/produtos")
  /* Método: Criar Produto (acessar através: http://localhost:8000/api/produtos)*/
  .post((req, res) => {
    var produto = new Produto();

    //Aqui vamos setar os campos do produto (via request):
    produto.nome = req.body.nome;
    produto.preco = req.body.preco;
    produto.descricao = req.body.descricao;

    produto
      .save()
      .then(() => {
        res.json({ message: "Produto Cadastrado com Sucesso!" });
      })
      .catch((error) => {
        res.send("Erro ao tentar salvar o Produto..." + error);
      });
  })
  .get((req, res) => {
    produto
      .find()
      .then((produtos) => {
        res.json(produtos);
      })
      .catch((error) => {
        res.send("Erro ao tentar listar todos os produtos!" + error);
      });
  });
app.use("/api", router);

//Iniciando a aplicação (servidor):
app.listen(port);
console.log("Iniciando a app na porta " + port);
