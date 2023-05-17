# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Dev comments

You may have to 'npm install axios' to run this

You will need to pass the legacy-peer-deps flag to the install command:

npm install --save-exact @monaco-editor/react@3.7.5 --legacy-peer-deps

IMPORTANT - You will now need to pass the --legacy-peer-deps flag to every npm install command

You may have to install prettier as well:
npm install prettier @types/prettier --legacy-peer-deps

###important
Find the package.json file of your jbook project and edit the entry for react-scripts to be 4.0.1:

    "react-scripts": "4.0.1",

An additional change is required to the start script as Node LTS is now on the 18 version.

    "start": "react-scripts --openssl-legacy-provider start",

If you do not make this change, then, you will see a "digital envelope routines::unsupported" error.

Then, in the root of your project directory, run the following in your terminal:

rm package-lock.json
windows: del package-lock.json

rm -r node_modules
windows: del /s /q node_modules
rmdir /s /q node_modules

npm install --legacy-peer-deps

To install bulma.css:

npm install bulmaswatch --legacy-peer-deps

Need to install:
npm install --save-exact react-resizable@3.0.4 @types/react-resizable@3.0.2 --legacy-peer-deps

npm install --save-exact react-resizable@1.11.0 @types/react-resizable@1.7.2 --legacy-peer-deps

npm install --save-exact @uiw/react-md-editor@2.1.1 --legacy-peer-deps

npm install --save-exact react-redux redux @types/react-redux redux-thunk@2.3.0 --legacy-peer-deps

npm install immer --legacy-peer-deps

npm install @fortawesome/fontawesome-free@5.15.1 --legacy-peer-deps
