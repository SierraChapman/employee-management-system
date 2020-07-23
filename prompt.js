// This file contains functions to get and make use of user input.

// Import required modules: inquirer and data.js
const inquirer = require("inquirer");
const database = require("./database.js");
const cTable = require("console.table");

// VARIABLES AND CONSTANTS

// mainMenu -- array of choices for the main menu prompt (values are functions to execute)
const mainMenu = [
  {
    name: "View Employees",
    value: viewEmployees
  },
  {
    name: "View Roles",
    value: viewRoles
  },
  {
    name: "View Departments",
    value: viewDepartments
  },
];

// FUNCTIONS

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

function viewDepartments() {
  // Get department list
  const promise = database.read("department", ["name"]);
  // Display to user
  return promise.then(data => {
    const table = data.map(row => {
      return {Department: row.name};
    });
    console.log("");
    console.table(table);
    return;
  });
}

function viewRoles() {
  // Get role list
  const promise = database.read("role", ["role.title", "department.name"], [
    {table: "department", on: ["role.department_id", "department.id"]}
  ]);
  // Display to user
  return promise.then(data => {
    const table = data.map(row => {
      return {Role: row.role_title, Department: row.department_name};
    });
    console.log("");
    console.table(table);
    return;
  });
}

function viewEmployees() {
  // Get Employee list
  const promise = database.read("employee", ["employee.first_name", "employee.last_name", "role.title", "department.name", "manager.first_name", "manager.last_name"], [
    {table: "role", on: ["employee.role_id", "role.id"]}, 
    {table: "department", on: ["role.department_id", "department.id"]},
    {table: "employee", alias: "manager", on: ["employee.manager_id", "manager.id"]},
  ]);
  // Display to user
  return promise.then(data => {
    const table = data.map(row => {
      return {
        "First Name": row.employee_first_name,
        "Last Name": row.employee_last_name,
        Role: row.role_title, 
        Department: row.department_name,
        Manager: row.manager_first_name ? row.manager_first_name + " " + row.manager_last_name : "None"
      };
    });
    console.log("");
    console.table(table);
    return;
  });
}

// updateEmployeeRole
  // Get list of employees
  // Get list of roles
  // Have user choose one employee and role
  // Set chosen employee's role to chosen role

// EXPORTS

module.exports = function() {
  // show user the main menu and return a promise with the function corresponding to their choice
  return inquirer.prompt({
    type: "list",
    name: "action",
    message: "What would you like to do?",
    choices: mainMenu
  });
}