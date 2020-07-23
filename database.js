// This file contains functions access and modify the database

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

  // connect() -- establish connection with MySQL database
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
  },

  // create(table, data) -- insert a new row described by data (object) into the specified table (string)
  create: function(table, data) {
    return new Promise((resolve, reject) => {
      this.connection.query("INSERT INTO ?? SET ?", [table, data], (err, res) => {
        if (err) {
          reject(err);
        } else {
          console.log(`New ${table} saved to database.`);
          resolve();
        }
      });
    });
  },

  // read(table, columns) -- get data in specified columns (array of strings) from table (string)
  read: function(table, columns) {
    return new Promise((resolve, reject) => {
      this.connection.query("SELECT ?? FROM ??", [columns, table], (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  },

  // update(table, id, newData) -- update item with specified id (int) in table (string) with newData (newData)
  update: function(table, id, newData) {
    return new Promise((resolve, reject) => {
      this.connection.query("UPDATE ?? SET ? WHERE id = ?", [table, newData, id], (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  },

  // close() -- close the connection
  close: function() {
    this.connection.end();
    console.log("Connection to database closed.")
  },
};