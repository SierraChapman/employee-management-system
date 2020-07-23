// FILES

// schema.sql -- contains SQL commands to create the database
// index.js -- starts the program, controls the logic
// prompt.js -- promise-based functions to prompt the user for input
// database.js -- promise-based functions to connect to and interact with database

// imports
const database = require("./database.js");

// FUNCTIONS

// start()

  // Prompt user to select action

  // If the action is "exit", close the connection and return

  // Otherwise, execute the action

  // When finished, start() again

// RUN PROGRAM

// Establish connection

// For testing purposes:
database.connect()
.then(() => {
  return database.read("employee", ["employee.first_name", "employee.last_name", "role.title", "department.name", "manager.first_name", "manager.last_name"], [
    {table: "role", on: ["employee.role_id", "role.id"]}, 
    {table: "department", on: ["role.department_id", "department.id"]},
    {table: "employee", alias: "manager", on: ["employee.manager_id", "manager.id"]},
  ]);
})
.then(data => {
  console.table(data);
  return database.read("department", ["name"]);
})
.then(data => {
  console.table(data);
  database.close();
})
.catch(err => {
  console.log(err);
  database.close();
});

// Execute start()