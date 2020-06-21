let inquirer = require("inquirer");
let mysql = require("mysql");
const lodash = require('lodash');
let { viewAllEmployee } = require("./view-all-employee");
let { viewEmployeeByDepartment } = require("./view-all-employee-by-department");
const { getAllDepartment } = require("./get-all-department");

// created the connection information for the sql database
let connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Eswari@1969",
  database: "employee_tracker_db"
});
// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  console.log("CONNECTED TO MYSQL SERVER SUCCESSFULLY!");
  console.log("---------------------------------------");
  startQuestions();
});

function chooseDepartment(departments) {
  return inquirer.prompt({
    name: "department",
    type: "list",
    message: "Choose Department",
    choices: lodash.map(departments, 'name')
  });
}

// function which prompts the user for what action to do
async function startQuestions() {
  const answer = await inquirer.prompt({
      name: "questionList",
      type: "list",
      message: "What would you like to do for tracking the employee?",
      choices: ["View All Employees",
      "View All Employees by Department",
      "View All Employees by Manager", 
      "View All Employees by Role", 
      "Add Department" ,
      "Add Employee",
      "Add Role",
      "Remove Department",
      "Remove Employee",
      "Remove Role",
      "Update Employee Department",
      "Update Employee Manager",
      "Update Employee Role",
      "Exit" 
    ]
    });
   
  // based on their answer, call that function accordingly
  if (answer.questionList === "View All Employees") {
    viewAllEmployee(connection);
  }
  else if(answer.questionList === "View All Employees by Department") {
    const departments = await getAllDepartment(connection);
    const response = await chooseDepartment(departments);
    const selectedDepartment = lodash.find(departments, { name: response.department });
    viewEmployeeByDepartment(connection, selectedDepartment.id);
  } 
  else if(answer.questionList === "View All Employees by Manager") {
    viewByManager();
  }
  else if(answer.questionList === "View All Employees by Role") {
    viewByRole();
  }
  else if(answer.questionList === "Add Employee") {
    addEmployee();
  }
  else if(answer.questionList === "Add Department"){
      addDepartment(); 
  }
  else if(answer.questionList === "Add Role"){
    addRole(); 
  }
  else if(answer.questionList === "Remove Employee") {
    removeEmployee();
  }
  else if(answer.questionList === "Remove Department"){
      removeDepartment(); 
  }
  else if(answer.questionList === "Remove Role"){
    removeRole(); 
  }
  else if(answer.questionList === "Update Employee Role") {
    updateEmployeeRole();
  }
  else if(answer.questionList === "Update Employee Manager") {
    updateManagerRole();
  }
  else if(answer.questionList === "Update Employee Department") {
    updateDepartmentRole();
  }
  else{
    connection.end();
  }
}


