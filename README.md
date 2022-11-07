# Boas vindas ao repositório do projeto Trybesmith!

Projeto de uma API, utilizando Typescript de uma loja de itens medievais, desenvolvido todas as camadas da aplicação na arquitetura MSC (Models, Service e Controllers), por meio dessa aplicação, é possível realizar as operações básicas que se pode fazer em um determinado banco de dados: Criação, Leitura, Atualização e Exclusão (ou CRUD, para as pessoas mais íntimas Create, Read, Update e Delete). Foi criado alguns endpoints que irão ler e escrever em um banco de dados, utilizando o MySQL.

## Instruções

1. Clone o repositório:
  * `git@github.com:lucaseduardolema/CRUD-project-trybesmith.git`

2. Rode os serviços node e db com o comando:
  * `docker-compose up -d`
  * Obs: Também é possível rodar localmente no MySql, basta criar e popular o banco de dados com o arquivo Trybesmith.sql, neste caso deve-se configurar as variáveis de ambiente como no arquivo exemplo .env.exemple

3. Acesse o terminal interativo do container:
  * `docker exec -it trybesmith bash`

4. Instale as dependências:
  * `npm install`

5. Suba o servidor da Api:
  * `npm start`
  * Obs: O projeto rodará na porta 3000

6. Rode os testes:
  * `npm test`

7. Consuma os endpoints:
  * POST `/products`
    - Ex body: 
    ```json
    {
      "name": "Poção de cura",
      "amount": "20 gold",
    }
    ```
  * GET `/products`
  * POST `/users`
    - Ex body:
    ```json
    { 
      "username": "MAX",
      "classe": "swordsman",
      "level": 10,
      "password": "SavingPeople"
    }
    ```
  * GET `/orders`
  * POST `/login`
    - Ex body:
    ```json
    {
      "username": "MAX",
      "password": "SavingPeople"
    }
    ```
    - Será retornado um token JWT, necessário para a próxima requisição.
  * POST `orders`
    - Ex body:
    ```json
    {
      "productsIds": [1, 2]
    }
    ```

8. O body de todas as requisições é validado pela biblioteca Joi, todas as chaves e valores são necessários e com os tipos corretos, como nos exemplos acima.