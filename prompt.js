// This file contains functions to get and make use of user input.

// Import required modules: inquirer and data.js
const inquirer = require("inquirer");
const database = require("./database.js");
const cTable = require("console.table");

// FUNCTIONS

function addDepartment() {
  // Prompt user for department info
  return inquirer.prompt({
    type: "input",
    name: "name",
    message: "What is the department's name?"
  }).then(answers => {
    // Add department to database
    return database.create("department", {
      name: answers.name
    });
  });
}

function addRole() {
  // Get list of departments for use in prompt
  return database.read("department", ["id", "name"]).then(data => {
    // Prompt user for role info
    return inquirer.prompt([
      {
        type: "input",
        name: "title",
        message: "What is the role title?"
      },
      {
        type: "number",
        name: "salary",
        message: "What is the role's salary?"
      },
      {
        type: "list",
        name: "department",
        message: "Which department does the role belong to?",
        choices: data.map(row => {
          return {name: row.name, value: row.id}
        })
      }
    ]);
  }).then(answers => {
    // Add role to database
    return database.create("role", {
      title: answers.title,
      salary: answers.salary,
      department_id: answers.department
    });
  });
}

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
  {
    name: "Add Role",
    value: addRole
  },
  {
    name: "Add Department",
    value: addDepartment
  },
];

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