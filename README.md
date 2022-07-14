# text-paste
- [text-paste](#text-paste)
  - [1. Description](#1-description)
  - [2. Features](#2-features)
  - [3. Technologies Used](#3-technologies-used)
  - [4. License](#4-license)
  - [5. Installation and Testing](#5-installation-and-testing)
  - [6. Additional Information](#6-additional-information)

## 1. Description
A simple web application to store text data and preview it with syntax highlighting. You can use it to store and share code snippets, notes, or anything else. Additionally, you can protect pastes with passwords and set expire time after which they will be deleted.

## 2. Features
- Store and preview text data
- Set expire time for each paste
- Optionally set password
- Syntax highlighting for different languages
- For now it supports syntax highlighting for cpp, java, python and javascript codes
- Download the paste as a file
- Number of views for each paste

## 3. Technologies Used
- [node.js](https://nodejs.org/)
- [express.js](https://expressjs.com/)
- [ejs](https://ejs.co/)
- [mongodb atlas](https://www.mongodb.com/)
- [mongoose](https://mongoosejs.com/)
- [bootstrap](https://getbootstrap.com/)
- [prism.js](https://prismjs.com/)
- [nanoid](https://www.npmjs.com/package/nanoid)

Please go through the package.json file for more information.

Prism.js was used in the client side in paste.ejs file. You can find it in the views folder.

## 4. License
[MIT](https://opensource.org/licenses/MIT)

## 5. Installation and Testing
You can skip step 2, 3 if you set MONGO_URI environment variable in you machine.

1. First you need to install the dependencies. To install the dependencies, run the following command:
```
npm install
```
2. Then you need to create a file named 'env.js' in the root directory of the project. The contents of the file should be:
```
process.env.MONGO_URI="<mongodb connection string>";
```
replace ```<mongodb connection string>``` with the connection string for your mongodb database.

3. Now you needd to uncomment the [line](https://github.com/pz1971/text-paste/blob/ff90c6367265fd2f9f795145d8d96aa5edc9706f/app.js#L4) in the file 'app.js'.
4. To start the application, run the following command:
```
npm start
```
or you can run the following command to start the application in development mode:
```
npm run dev
```
5. Create an issue [here](https://github.com/pz1971/text-paste/issues) if you face any problem or have any suggestion.

## 6. Additional Information
- 'app.js' file is the controller of the application.
- 'views' folder contains all the views of the application.
- 'models' folder contains database models.
- 'public' folder contains all the static files used in client side.