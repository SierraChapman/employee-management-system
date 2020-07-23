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

  // read(table, columns, leftJoins) -- get data in specified columns (array of strings) from table (string)
  //
  // optionally perform leftJoins on other tables by setting leftJoins as an array of objects with keys:
  // * table: name of table to join to (as string)
  // * alias: optional alias for table (to allow self-joining)
  // * on: array of two strings specifying columns to match on
  //
  read: function(table, columns, leftJoins=[]) {
    // construct query string and values
    const options = {};
    options.sql = "SELECT ?? FROM ??";
    options.values = [columns, table];
    // if performing joins, use format tableName_columnName for keys in result
    if (leftJoins.length > 0) {
      options.nestTables = "_";
    }
    // add in any left joins
    for (let i = 0; i < leftJoins.length; i++) {
      if (leftJoins[i].alias) {
        options.sql += " LEFT JOIN ?? AS ?? ON ?? = ??";
        options.values.push(leftJoins[i].table, leftJoins[i].alias, ...leftJoins[i].on);
      } else {
        options.sql += " LEFT JOIN ?? ON ?? = ??";
        options.values.push(leftJoins[i].table, ...leftJoins[i].on);
      }
    }

    // submit query, then execute resolve function on the response
    return new Promise((resolve, reject) => {
      this.connection.query(options, (err, res) => {
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