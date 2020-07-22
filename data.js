// This file contains functions access and update the database

// Import required modules: mysql
const mysql = require("mysql");

module.exports = {

  // VARIABLES AND CONSTANTS

  // connection -- the connection to the database
  connection: mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "password",
    database: "employee_management_db"
  }),
  
  // FUNCTIONS

  // connect -- establishes connection with MySQL database
  connect: function() {
    return new Promise((resolve, reject) => {
      this.connection.connect(err => {
        if (err) {
          reject(err);
        } else {
          console.log("Connected to database.");
          resolve();
        }
      });
    });
  }

  // close -- close the connection

  // insert(table, info) -- inserts a new item described by info object into the specified table

  // getChoices(table) -- returns array of objects extracted from the specified table to use as choices in prompt

  // getDepartments() -- gets table of departments

  // getRoles() -- gets table of roles, including each role's department

  // getEmployees() -- gets table of employees, including each employee's role, department, and manager

};