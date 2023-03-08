# frontleft

## Intro

With sometimes endless music festival lineups it can be a bit daunting choosing what stages to be at and when, knowing that you may be missing some of your favourite acts or running back and forth and not actually seeing any! This is where frontleft comes in. 

Frontleft will help you plan out your days at a festival and catch every moment of your favourite artists.

Since finishing the Makers Academy coding bootcamp I have setout to learn TypeScript and have created this app using it.

## Technologies

This is a MERN stack application but instead of writing in JavaScript I have used TypeScript. The styling has been done using CSS. 

The backend was test driven using Jest, as well as testing calls using Postman. The frontend was tested via user interaction, with the intention to add tests as I develop it.

## Future goals

This is a work in progress. This is the first version of the app and there are several additional features I intend to add. The main ones are:

- adding in tests to the frontend. So far the frontend has been tested through using the app in the browser
- format the saved acts into a gantt chart style, so that a timeline of your acts can be easily visualised and clashes are easily detected
- add the distances between stages so that a user can make a more informed decision about who to see (it could take the best part of 30 mins to get to one from the other!)
- deploy the app
- add styling for bigger screens so that it can be used on laptops etc too

## Screenshots

### Homepage

![Homepage](./images/frontleft_act_form.png)

### Signup

![Signup](./images/frontleft_signup.png)

## Using the app

The intention is for the app to be used on a mobile phone. The styling to date has only been implemented with a smaller screen in mind.

### Installation

To download and initialise the project follow the below steps. Note that the JavaScript files are included in the repo and do not need to be compiled from TypeScript:

```js
$ git clone https://github.com/rkirkbride13/frontleft.git
$ cd frontleft
$ cd app
$ npm install
$ cd ..
$ cd api
$ npm install
```

Create a new .env file in the api folder:

```js
$ cd api
$ touch  .env
```

Copy the below code into the .env file and update:

```js
# .env

JWT_SECRET = "add any random string here"
```

### Using the App

From the main project directory...

Start running the front-end server:

```js
$ cd app
$ npm run start
```

Open a new terminal and start running the back-end server:

```js
$ cd api
$ npm run start
```

Open http://localhost:3000 and use frontleft in your browser.

### Testing the App

From the main project directory...

#### Back-end

```js
$ cd api
$ npm run test
```