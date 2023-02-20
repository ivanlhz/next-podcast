## About the project
This project gets the podcast trends from itunes and allow to the user to browse and play the episodes.

There is not paginations so only displays the fist page of each results.
## About Frameworks and libraries
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

For the style I use style-components and in the next steps I will add ChakraUI.

Jest and Testing library to unit and integration tests.

TS, ESLINT and prettier for the code formatter

## About Localstorage cahce
I implement the fist aproach to cache the api response data into the localstorage for 1 day, but because of time I could not refactor and test it.

## About architecture
In project I implement my own version of clean architecure for frontend to remove the boilerplate code that is very common in this kind of project architecture. 

From more external layer into deeper one we have:
- **Presentation Layer** - UI: Here we have the pages and components that consume use cases. Folders `src/pages` and `src/components`
- **Presentation Layer - Adapters**: I don't use any pattern here but we could do I we like to control the state changes. 
- **Data Layer**: Here I create the repository implementations and to do it less boilerplate calling the adapter after the request. It make the adapters acopled to the services(repositories) but I think it is totally logic because the main goal is transform the services response into a more readable response.
- **Domain Layer**: Here I use custom hooks to reprenset the useCases, folder `src/hooks`. On the other hand I create the `src/adapters` folder to create the services adapters. Here I use the adapters as a json object that implements all methods that is needed to run the service that it addapt. 

Also I create the `core` folder where I put the **entities**, the r**epositories interfaces** and **adapters interfaces**.

## About CORS
In order to allow CORS requests, I use an external service, https://github.com/Rob--W/cors-anywhere. All request URLs are mounted using this service, If you have errors and the podcast data is not displayed rightly, may you need to request access to the demo throw the url https://cors-anywhere.herokuapp.com/corsdemo.
## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Other commands

Run unit test
```bash
npm run test
# or
yarn test
# or
pnpm test
```

Test with coverage
```bash
npm run test:coverage
# or
yarn test:coverage
# or
pnpm test:coverage
```