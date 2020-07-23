// FILES

// schema.sql -- contains SQL commands to create the database
// index.js -- starts the program, controls the logic
// prompt.js -- promise-based functions to prompt the user for input
// database.js -- promise-based functions to connect to and interact with database

// IMPORTS
const prompt = require("./prompt.js");
const database = require("./database.js");

// FUNCTIONS

// start() -- prompts for one action and implements it, then calls start again
function start(promise) {
  return promise.then(() => {
      // Prompt user to select action
    return prompt();
  }).then(answers => {
    if (answers.action === "exit") {
      // If the action is "exit", close the connection and return
      database.close();
      return;
    } else {
      // Otherwise, execute the action
      const newPromise = answers.action();
      // When finished, start() again
      return start(newPromise);
    }
  });
}

// RUN PROGRAM

// Establish connection and execute start()
start(database.connect());