# employee-tracker
![badmath](https://img.shields.io/github/languages/top/nielsenjared/badmath)
![npm version](https://badge.fury.io/js/cli.svg)](https://badge.fury.io/js/cli)
![npm version](https://badge.fury.io/js/lodash.svg)](https://badge.fury.io/js/lodash)
![mysql](https://badge.fury.io/js/mysql.svg)
### Description
* A command line application that allows the user to view, add, update, remove the employee, role and department of the company that uses MySQl database
* Database schema containing three tables: 

      1. employee
      2. role
      3. department
* Use the Inquirer npm package to prompt the user for CRUD(CREATE,READ,UPDATE,DELETE)the employee roles. 
* For instance, an employee should have firstname,lastname,role of the employee,department of the employee,manager of the employee and salary
### Table Schema
![Schema](screenshots/Schema.png)
### Installation
Steps to install the node npm packages

* npm i
### Dependencies
* lodash
* inquirer
* mysql

Note: They already included in npm package.json
### Usage
`git clone git@https://github.com/Anitha-Venkatesan/employee-tracker.git`

`cd employee-tracker`

Open employee-tracker-connectionDB.js in Command Line Terminal using the command `node employee-tracker-connectionDB.js`

### Screenshots
* View All employee 
* ![ViewAllEmployee](screenshots/viewEmployee.gif)
* Add Role Department
* ![AddRoleDepartment](screenshots/addRoleDepartment.gif)
* Update/Remove Employee
* ![UpdateRemoveEmployee](screenshots/update:removeEmployee.gif)




### References
* https://lodash.com/docs/4.17.15#map
* https://sqlbolt.com/lesson/select_queries_introduction
* https://www.w3schools.com/sql/sql_join.asp
* https://javascript.info/async-await
