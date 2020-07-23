# Employee Management System

![MIT license](https://img.shields.io/badge/license-MIT-blue.svg)

## Description

This application is a command line interface for viewing, adding to, and updating a MySQL database of employee information. The database contains three tables: departments, employees, and roles. Each role is associated with a department via a foreign key, and each employee is associated with a role and optionally with another employee who is their manager.

## Table of Contents

* [Installation](#installation)

* [Usage](#usage)

* [Demonstration](#demonstration)

* [Code Explanation](#code-explanation)

* [Technologies Used](#technologies-used)

* [License](#license)

* [Acknowledgements](#acknowledgements)

* [Questions](#questions)

## Installation

After downloading this repository, run the following command inside the repository to install the necessary dependencies:

```
npm install
```

## Usage

Before using the product for the first time, run the commands in the `schema.sql` file to initialize the database. After this is done, you can run `node index.js` to start the command line interface select from options to add or view departments, employees, and roles, or to update the the role belonging to an employee.

## Demonstration

Adding a department:

![Department creation demo](add-department.gif)

Adding a role:

![Role creation demo](add-role.gif)

Adding an employee:

![Employee creation demo](add-employee.gif)

Updating an employee's role:

![Employee role update demo](update-employee.gif)

## Code Explanation

This program uses the mysql package for Node.js to submit queries to the database. For example, the following `create` function from the `database.js` file inserts data into one of the tables using `connection.query()` and returns a promise.

```javascript
// create(table, data) -- insert a new row described by data (object) into the specified table (string)
module.exports.create = function(table, data) {
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
}
```

## Technologies Used

* [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
* [SQL](https://developer.mozilla.org/en-US/docs/Glossary/SQL)
* [Git](https://git-scm.com/)
* [GitHub](https://github.com/)
* [MySQL](https://www.mysql.com/)
* [Node.js](https://nodejs.org/en/)
* [Node Package Manager](https://www.npmjs.com/)
* [console.log (NPM module)](https://www.npmjs.com/package/console.log)
* [Inquirer.js](https://www.npmjs.com/package/inquirer)
* [mysql (NPM module)](https://www.npmjs.com/package/mysql)


## License

This project is licensed under the MIT license.

## Acknowledgements

* This application was created for an assignment for the UC Berkeley Coding Bootcamp.

## Questions

If you have any questions about the repo, open an issue or contact me directly at siechap@gmail.com. You can find more of my work at [SierraChapman](https://github.com/SierraChapman/).

