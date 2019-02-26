var should = require("should");
var request = require("request");
var chai = require("chai");
var expect = chai.expect;

// Criamos nosso primeiro caso de teste e fornecemos uma descricao utilizando describe
describe("Teste novo usuario na base",function(){
    // a funcao it eh o que vamos testar realmente, neste caso o endpoint /users, que deve retornar statusCode 200 se sucesso
    it("Deve postar um usuario.",function(done){
      request.post({
        url: '/users',
        form: { name: "Renan Alves", 
                email: "asd@gmail.com",
                password: "sadad"
              }
      }, function(error, response, body){
          if (!error) {
              expect(response.statusCode).to.equal(200);
          }
      });
    });
  });