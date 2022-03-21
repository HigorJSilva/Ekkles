# Ekkles

# Variáveis de ambiente
Esse projeto usa as seguintes varáveis de ambiente:

| Nome                          | Descrição                           |
| ----------------------------- | ------------------------------------|
|SECRET                         | Usado para encriptação do token JWT |
|USUARIO                        | Usuário de acesso ao Mongo Atlas    |
|SENHA                          | Senha do usuário Mongo Atlas        |
|CLUSTER                        | Código do cluster do banco de dados |
|DATABASE                       | Nome do banco de dados              |
|ADMIN_CODE                     | Código para válidar usuários ADMIN  |



# Pré-requisitos
- Instale [Node.js](https://nodejs.org/en/) versão 8.0.0


# Instalação
- Clone o repositório
```
git clone https://github.com/HigorJSilva/Ekkles.git
```
- Instale as dependências
```
cd Ekkles
npm install
```
- Execute o projeto
```
npm start
```

#Endpoints da API 

  swagger Spec Endpoint : http://localhost:8001/api-docs 



# Objetivo Principal 
O objetivo principal desse projeto é criar enquetes para serem votadas. O usuário administrador do sistema cadastra grupos e adiciona os
participantes, enquetes são atribuidas a um grupo e seus participantes podem votar até a data limite.


## Getting TypeScript
Adicione Typescript ao projeto `npm`.
```
npm install -D typescript
```

## Estrutura do projeto
A extrutura da aplicação é explicada a seguir:

| Nome                     | Descrição |
| ------------------------ | --------------------------------------------------------------------------------------------------- |
| **src/@types**           | Contém as especializações de tipos usadados no projeto para adequação ao Typescript.                |
| **src/config**           | Configurações de acesso ao banco de dados e de acesso as rotas.                                     |
| **src/controllers**      | Controllers recebem as requisições, filtram os dados enviados e retornam o resultado da requisição. | 
| **src/helpers**          | Componentes que não se encaixam em outros diretórios.                                               | 
| **src/middleware**       | Middlewares para Express, os quais validam a autenticação do usuário e os dados enviados às rotas.  |
| **src/models**           | Models são os schemas que serão usados para salvar e obter informações do banco de dados.           |
| **src/routes**           | Contém todas as rotas, separadas por caso de uso da aplicação.                                      |
| **src/services**         | Contém as lógicas e operações da aplicação.                                                         |
| **src**/server.ts        | Entry point da aplicação.                                                                           |
| package.json             | Dependências npm.                                                                                   | 
| tsconfig.json            | Configurações para compilar código-fonte escritos em TypeScript    

