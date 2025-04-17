<h1 align="center">
   <img src="./.github/icon.png" alt="NLW Spacetime" width="300"/>
</h1>
<h1 align="center">
   NLW Spacetime - Cápsula do Tempo
</h1>

<p align="center">
  <img alt="Last commit on GitHub" src="https://img.shields.io/github/last-commit/tavareshenrique/nlw-spacetime?color=6c4ad0">
  <img alt="Made by Henrique Tavares" src="https://img.shields.io/badge/made%20by-Henrique Tavares-%20?color=6c4ad0">
  <img alt="Project top programing language" src="https://img.shields.io/github/languages/top/tavareshenrique/nlw-spacetime?color=6c4ad0">
  <img alt="Repository size" src="https://img.shields.io/github/repo-size/tavareshenrique/nlw-spacetime?color=6c4ad0">
  <img alt="GitHub license" src="https://img.shields.io/github/license/tavareshenrique/nlw-spacetime?color=6c4ad0">
</p>

<p align="center">
  <a href="#information_source-como-executar">ℹ️ Como Executar?</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#rocket-tecnologias">🚀 Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-licença">📝 Licença</a>
</p>

<p align="center">
  O <b>NLW Spacetime - Cápsula do Tempo</b> é o projeto desenvolvido durante a <b>NLW Spacetime da Rocketseat</b>, utilizando <b>NodeJS</b> com <b>Fastify</b> e <b>React</b> com <b>NextJS 13</b>.
</p>

<p align="center">
  <table>
    <tr>
      <td>
        <img alt="Demonstration" src="./.github/NLW-Spacetime.gif" width="800px" />
      </td>
    </tr>
  </table>
</p>

---

> 🧪 Essa aplicação não possuirá **Testes Unitários**, **Integração** e **E2E** por não ser o foco do estudo, mas está pronta para ser executada. 🧪

# :information_source: Como Executar?

> Clone o Repositório:

```bash
git clone https://github.com/matheusburey/spacetime
```

## Server

> Acesse o Server

```bash
cd server
```

> Instale as dependências:

```bash
npm install
```

> Informe as variáveis de ambiente
```bash
cp .env.example .env
```

```bash
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""
```

> Execute o Prisma para criar as tabelas

```bash
npx prisma migrate dev
```

> Inicie o Serviço:

```bash
pnpm dev
```

## Web

> Com o Server Iniciado, acesse o projeto Web:

```bash
cd .. && cd web
```

> Instale as dependências:

```bash
pnpm install
```

> Informe a variável de ambiente
```bash
cp .env.example .env
```

```bash
NEXT_PUBLIC_GITHUB_CLIENT_ID=
```

> Inicie o Projeto:

```bash
npm dev
```

> ➡️ Acesse [http://localhost:3000](http://localhost:3000) para acessar a aplicação web.


# :rocket: Tecnologias

- [React](https://reactjs.org/)
- [NodeJS](https://nodejs.org/en/)
- [Typescript](https://www.typescriptlang.org/)
- [Axios](https://axios-http.com/ptbr/docs/intro)
- [Fastify](https://www.fastify.io/)
- [Prisma](https://www.prisma.io/)
- [Zod](https://zod.dev/)
- [NextJS](https://nextjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [DayJS](https://day.js.org/)
- [JS Cookie](https://github.com/js-cookie/js-cookie)
- [JWT Decode](https://github.com/auth0/jwt-decode#readme)

# :memo: Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo de [licença](./LICENSE) para mais detalhes.
