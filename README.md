# Task Tracker

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Project Tech Stack

1. React.js
2. Material UI
3. Styled components
4. Redux Toolkit
5. React-router version 6
6. Ajax

## Available Scripts

In the project directory, you can run:

### `npm install`

It installs all required dependencies included in package.json file

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

# Project rules and Style guides

### Folder structure

#### `src/api`

This folder is for ajax or axios request configs.

#### `src/assets`

This folder contains subfolders: `styles`, `icons` and `images`.

#### `src/components`

This folder contains reusable stateless and stateful components. It has following sub folders:

#### |---`src/components/UI`

     This folder containes common presentational components(eg. Button, Input, etc.)

#### |---`src/components`

     Inside `src/components` we may have also other domain specific components like `src/components/Post/PostCard.jsx`

#### `src/containers`

Each page includes many small components. This folder is similar to src/components, but it contains our large components which is literally our app pages.

#### `src/utils/constants`

This folder to define some objects or arrays and import them anywhere we want to use. These constants could be list items or some text or some words. This is a good practice to keep them separate from components.

#### `src/utils/helpers`

We can define helper functions in this folder. There are some functions that we might need across application which generate some certain data or do something special. It’s better to keep them separate from components in order to make them reusable and make code cleaner.

#### `src/layout`

It contains the layout components\*.
Layout is the common top wrapper component usually will contain Navbar , Sidebar and Children components

#### `src/index`

All type definitions, actions, reducers and the redux index belong to this folder.

#### `src/routes`

We’ll need this folder for react-router configs and route related components.

#### `src/config`

It contains the config files using the env and others

## Style Guide

#### Linters

We are using Eslint and prettier linter tools to find bugs and errors before they happen.
We'll spend less time testing new features and team's code will be more consistent.
We are following [AirBnB JavaScript style guide](https://github.com/songhee24/VS-CODE__ReactJs-with-ESLint-Prettier-and-Airbnb)

## How to work with Git?

### How to name a branch?

##### `feature/branch-name`

If you are working on a new feature, you should checkout from `development` branch and name the branch as `feature/branch-name`.\
After finishing your task, merge your current branch into the `development` branch by creating `pull request`

##### `bugfix/branch-name`

If you are fixing a bug on a development environment, you should checkout from `development` and name the branch as `bugfix/branch-name`.\
After finishing your bugfix, merge your current branch into the `development` branch

##### `hotfix/branch-name`

If you are fixing a urgent bug on a production, you should chekout from `master` branch and name the branch as `hotfix/branch-name`\
After finishing your hotfix, merge your current branch into the `staging` branche by creating `pull request`.\
Then test your changes on the `staging` environment, if it's OK, then you must merge changes with `development` and `master` branches.
