# Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## header-footer-ui

To install the latest header and footer,

- Create a `.npmrc` file in the root of the project and the following to the file:

  
```BASH
@sleep-sage:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NPMRC_AUTH_TOKEN}
```

- Create a `.env` file in the root of the project
- Copy the env variables from Railway

- Run the following commands in your terminal
  
```BASH
npm install -g dotenv-cli
dotenv -e .env -- npm i @sleep-sage/header-footer
```
