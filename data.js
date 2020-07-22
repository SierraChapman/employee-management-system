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

  // read(table, columns) -- get data in specified columns (array of strings) from table (string)

  // update(table, item, newInfo) -- update item (object) in table (string) with newInfo (object)

  // close() -- close the connection
  close: function() {
    this.connection.end();
  },
};