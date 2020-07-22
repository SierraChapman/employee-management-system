// FILES

// schema.sql -- contains SQL commands to create the database
// index.js -- starts the program, controls the logic
// prompt.js -- promise-based functions to prompt the user for input
// data.js -- promise-based functions to connect to and interact with database

// imports
const data = require("./data.js");

// FUNCTIONS

// start()

  // Prompt user to select action

  // If the action is "exit", close the connection and return

  // Otherwise, execute the action

  // When finished, start() again

// RUN PROGRAM

// Establish connection

data.connect()
.then(() => {
  data.close()
})
.catch(err => {
  console.log(err);
});

// Execute start()