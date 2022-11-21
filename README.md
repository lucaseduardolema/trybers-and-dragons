# Boas vindas ao repositório do projeto Trybers and Dragons!

Esse projeto trata-se de uma simulação de um jogo de RPG, onde é possível criar personagens de Raças e Classes diferentes (gerados de forma aleatória), também iniciar batalhas entre personagens ou contra o ambiente, incluindo um poderoso dragão. Aplicando os princípios da arquitetura SOLID e POO.

## Tecnologias e ferramentas usadas

* Node.js
* Express
* TypeScript
* Docker

## Instruções

1. Rode os serviços:
  * `docker-compose up -d`
    - Obs: É possível rodar localmente com o Node.js V16 instalado

2. Acesse o container:
  * `docker exec -it trybers_and_dragons bash`

3. Instale as dependências:
  * `npm install`

4. Rode os testes:
  * `npm test`

5. Divirta-se:
  * Utilize o aquivo index.ts para criar Personagens e batalhas
