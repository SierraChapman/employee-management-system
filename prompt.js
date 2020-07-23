// This file contains functions to get and make use of user input.

// Import required modules: inquirer and data.js
const inquirer = require("inquirer");
const database = require("./database.js");
const cTable = require("console.table");

module.exports = {

  // VARIABLES AND CONSTANTS

  // mainMenu -- array of choices for the main menu prompt (values are functions to execute)
  
  // FUNCTIONS

  // selectAction
    // show user the main menu and return a promise with the function corresponding to their choice

  // addDepartment
    // Prompt user for department info
    // Add department to database

  // addRole
    // Get list of departments for use in prompt
    // Prompt user for role info
    // Add role to database

  // addEmployee
    // Get list of roles for use in prompt
    // Get list of employees for use in prompt
    // Prompt user for employee info
    // Add employee to database

  viewDepartments: function() {
    // Get department list
    const promise = database.read("department", ["name"]);
    // Display to user
    return promise.then(data => {
      const table = data.map(row => {
        return {Department: row.name};
      });
      console.table(table);
      return;
    });
  }

  // viewRoles
    // Get role list
    // Display to user

  // viewEmployees
    // Get employee list
    // Display to user

  // updateEmployeeRole
    // Get list of employees
    // Get list of roles
    // Have user choose one employee and role
    // Set chosen employee's role to chosen role
}