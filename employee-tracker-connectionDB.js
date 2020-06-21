let inquirer = require("inquirer");
let mysql = require("mysql");
let lodash = require('lodash');
let { viewAllEmployee } = require("./js/employee/view-all-employee");
let { viewEmployeeByDepartment } = require("./js/departments/view-all-employee-by-department");
let { getAllDepartment } = require("./js/departments/get-all-department");
let {viewEmployeeByRole} = require("./js/roles/view-all-employee-by-role");
let { getAllRole } = require("./js/roles/get-all-role");
let { viewAllEmployeeByManager } = require("./js/manager/view-all-employee-by-manager");
let { getAllManager } = require("./js/manager/get-all-manager");


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
    message: "Choose Employee By Department ",
    choices: lodash.map(departments, (department) => {
      return {
        name: department.name,
        value: department.id
      };
    })
  });
}
function chooseRole(roles) {
  return inquirer.prompt({
    name: "role",
    type: "list",
    message: "Choose Employee By Role",
    choices: lodash.map(roles, (role) => {
      return {
        name: role.title,
        value: role.id
      };
    })
  });
}
function chooseManager(managers) {
  return inquirer.prompt({
    name: "manager",
    type: "list",
    message: "Choose Employee By Manager",
    choices: lodash.map(managers, (manager) => {
      return {
        name: `${manager.first_name} ${manager.last_name}`,
        value: manager.id
      };
    })
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
    viewEmployeeByDepartment(connection, response.department);
  } 
  else if(answer.questionList === "View All Employees by Role") {
    const roles = await getAllRole(connection);
    const response = await chooseRole(roles);
    viewEmployeeByRole(connection, response.role);
  }
  else if(answer.questionList === "View All Employees by Manager") {
    const managers = await getAllManager(connection);
    const response = await chooseManager(managers);
    viewAllEmployeeByManager(connection, response.manager);
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


