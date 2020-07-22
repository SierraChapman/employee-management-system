// This file contains functions access and update the database

// Import required modules: mysql

// VARIABLES AND CONSTANTS

// connection -- the connection to the database

// FUNCTIONS

// connect -- establishes connection with MySQL database

// close -- close the connection

// insert(table, info) -- inserts a new item described by info object into the specified table

// getChoices(table) -- returns array of objects extracted from the specified table to use as choices in prompt

// getDepartments() -- gets table of departments

// getRoles() -- gets table of roles, including each role's department

// getEmployees() -- gets table of employees, including each employee's role, department, and manager