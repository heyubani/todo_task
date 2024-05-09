# Todo list Backend Task

- Todo app sets you up for success by helping you manage, prioritize, and complete your goals and tasks

---

## Requirements

For development, you will only need Node.js (version 14 and above) and a node global package installed in your environment.

### Node

- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
  Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

## Application Project Installation

    $ git clone https://github.com/heyubani/todo_task
    $ cd todo_task
    $ npm install

---

## Configure app

create a `.env` file to the root folder then add url to your db to connect your postgres DBs.
An example of the structure of the `.env` is seen in `.env.example` file.

---

## Start server locally

run this script in your code terminal

    $ npm run start:dev

---

## Project Structure

The folder structure of this app is explained below:

| Name              | Description                                                                       |
| ----------------- | --------------------------------------------------------------------------------- |
| **node_modules**  | Contains all npm dependencies                                                     |
| **src**           | Contains queries, services, middlewares, controllers and routes for all endpoints |
| **config**        | Contains application configurations including environment-specific configurations |
| **services**      | Contains functions connecting to external services being used                     |
| **main.ts**       | Entry point to express app                                                        |
| **tests**         | Contains all integration and unit test codes                                      |
| **eslintrc.json** | Config settings for eslint code style checking                                    |
| **database.json** | Contains databases url                                                            |
| **package.json**  | Contains npm dependencies as well as build scripts                                |
| **README.md**     | Contains details on how to setup the project locally and the codebase overview    |
| **.env.example**  | Contains keys of the necessary environment variables needed in the .env file      |
| **.gitignore**    | Contains files and folders that github should ignore when pushing code to github  |

---

## Running the scripts

All the different build steps are arranged via npm scripts.
Npm scripts basically allow us to call (and chain) terminal commands via npm.

| Npm Script | Description |
| ---------- | ----------- |

|
| `dev` | starts the server in the local development environment. Can be invoked with `npm run start:dev` |
| `prestart` | Runs the up migration if any yet to be run when `npm run start` is invoked |
| `start` | starts the server in the staging or production environment. Can be invoked with `npm run start` |
| `pretest` | Runs a series of scripts that prepared the test DB for the test about to run when `npm run test` is invoked |
| `test` | Runs tests using mocha. Can be invoked with `npm run test` |
| `build` | Runs to generate the build file into a dist folder using babel |

---

## Postman API Documentation

    $ https://documenter.getpostman.com/view/14594801/2sA3JM61CL
---

## Technologies

- NodeJS
- ExpressJS
- TypeScript
- Postman
- NestJs
- MySql

---

## Copyright

Copyright (c) 2024 Miracle

---
