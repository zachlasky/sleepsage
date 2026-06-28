# Header + Footer App

## Prepare to Publish Package

- Create a `.npmrc` file in the root of the project and the following to the file:

  - `@sleep-sage:registry=https://npm.pkg.github.com
  //npm.pkg.github.com/:_authToken=<NPMRC_AUTH_TOKEN>`
- Create a `.env` file in the root of the project
- Copy the env variables from Railway
- Run `npm install -g dotenv-cli` in your terminal

## Build and publish a new Package Version

- Bump the patch version of the app in package.json
- Commit & Push to the repository
- Run `dotenv -e .env -- npm publish` in your terminal
