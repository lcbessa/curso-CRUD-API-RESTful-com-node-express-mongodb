/**
 * Arquivo: produto.js
 * Author: Luiz Carlos Bessa de Lima
 * Descrição: arquivo responsável onde trataremos o modelo da classe 'Produto'
 * Data: 19/06/2023
 */

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

/**
 * Produto:
 *
 * -> Id: int
 * -> Nome: String
 * -> Preco: Number
 * -> Descricao: String
 *
 */

var ProdutoSchema = new Schema({
  nome: String,
  preco: Number,
  descricao: String,
});

module.exports = mongoose.model("Produto", ProdutoSchema);
