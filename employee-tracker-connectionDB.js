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
let { addEmployee } = require("./js/employee/add-employee");
let { addDepartment } = require("./js/departments/add-department");
let { addRole } = require("./js/roles/add-role");
let { updateEmployeeRole } = require("./js/employee/update-employee-role");
let { updateEmployeeManager } = require("./js/employee/update-employee-manager");
let { allEmployeeList } = require("./js/employee/employeeList");
let { deleteEmployee } = require("./js/employee/delete-employee");
let { deleteRole } = require("./js/roles/delete-role");
let { sumOfDepartment } = require("./js/departments/sum-salary-department")


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
    message: "Choose the department for employee ",
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
    message: "Choose Role for employee",
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
    message: "Choose Manager for employee",
    choices: lodash.map(managers, (manager) => {
      return {
        name: `${manager.first_name} ${manager.last_name}`,
        value: manager.id
      };
    })
  });
}
function chooseEmployee(employees) {
  return inquirer.prompt({
    name: "employee",
    type: "list",
    message: "Choose the employee from the list to update the role or manager ",
    choices: lodash.map(employees, (employee) => {
      return {
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id
      };
    })
  });
}
function addingEmployee() {
  return inquirer.prompt([
    {
      name: "first_name",
      type: "input",
      message: "Enter the employee first name?",
      validate: (input) => {
        // lodash validation method for validating user input
        if (lodash.isEmpty(input)) {
          return "Employee first name is required.";
        }
        return true;
      }
    },
    {
      name: "last_name",
      type: "input",
      message: "Enter the employee last name?",
      validate: (input) => {
        // lodash validation method for validating user input
        if (lodash.isEmpty(input)) {
          return "Employee last name is required.";
        }
        return true;
      }   
    }
  ]);

}
function addingDepartment() {
  return inquirer.prompt([
    {
      name :"add_department",
      type: "input",
      message : "Enter department name for the employee?"
    }
  ]);
}
function addingRole() {
  return inquirer.prompt([
    {
      name :"add_role",
      type: "input",
      message : "Enter the role of the employee?"
    },
    {
      name :"salary",
      type: "input",
      message : "Enter the employee salary for the role?"
    }
  ]);
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
      "Update Employee Role",
      "Update Employee Manager",
      "Remove Employee",
      "Remove Role",
      "View the total utilized budget of a department",
      "Exit" 
    ]
    });
   
  // based on their answer, call that function accordingly
  if (answer.questionList === "View All Employees") {
    viewAllEmployee(connection);
    startQuestions();
  }
  else if(answer.questionList === "View All Employees by Department") {
    const departments = await getAllDepartment(connection);
    const response = await chooseDepartment(departments);
    viewEmployeeByDepartment(connection, response.department);
    startQuestions();
  } 
  else if(answer.questionList === "View All Employees by Role") {
    const roles = await getAllRole(connection);
    const response = await chooseRole(roles);
    viewEmployeeByRole(connection, response.role);
    startQuestions();
  }
  else if(answer.questionList === "View All Employees by Manager") {
    const managers = await getAllManager(connection);
    const response = await chooseManager(managers);
    viewAllEmployeeByManager(connection, response.manager);
    startQuestions();
  }
  else if(answer.questionList === "Add Employee") {
    const response = await addingEmployee();
    const roles = await getAllRole(connection);
    const roleResponse = await chooseRole(roles);
    const managers = await getAllManager(connection);
    //Adding none manager to the manager list
    const noneManager = {
      first_name: 'None',
      last_name: '',
      id: null
    };
    const managerResponse = await chooseManager([noneManager,...managers]);
    addEmployee(connection,response.first_name,response.last_name,roleResponse.role, managerResponse.manager);
    viewAllEmployee(connection);
    startQuestions();
  }
  else if(answer.questionList === "Add Department"){
    const response = await addingDepartment();
    addDepartment(connection,response.add_department); 
    startQuestions();
  }
  else if(answer.questionList === "Add Role"){
    const response = await addingRole();
    const departments = await getAllDepartment(connection);
    const departmentResponse = await chooseDepartment(departments);
    addRole(connection,response.add_role,response.salary,departmentResponse.department);
    startQuestions(); 
  }
  else if(answer.questionList === "Update Employee Role") {
    const allEmployee = await allEmployeeList(connection);
    const employeeResponse = await chooseEmployee(allEmployee);
    const roles = await getAllRole(connection);
    const roleResponse = await chooseRole(roles);
    updateEmployeeRole(connection,roleResponse.role,employeeResponse.employee);
    viewAllEmployee(connection);
    startQuestions();
  }
  else if(answer.questionList === "Update Employee Manager") {
    const allEmployee = await allEmployeeList(connection);
    const employeeResponse = await chooseEmployee(allEmployee);
    const managers = await getAllManager(connection);
    const managerResponse = await chooseManager(managers);
    updateEmployeeManager(connection,managerResponse.manager,employeeResponse.employee);
    viewAllEmployee(connection);
    startQuestions();
  }
  else if(answer.questionList === "Remove Employee") {
    const allEmployee = await allEmployeeList(connection);
    const employeeResponse = await chooseEmployee(allEmployee);
    deleteEmployee(connection,employeeResponse.employee);
    viewAllEmployee(connection);
    startQuestions();
  }
  else if(answer.questionList === "Remove Role") {
    const roles = await getAllRole(connection);
    const roleResponse = await chooseRole(roles);
    deleteRole(connection,roleResponse.role);
    viewAllEmployee(connection);
    startQuestions();
  }

  else if(answer.questionList === "View the total utilized budget of a department") {
    sumOfDepartment(connection);
    startQuestions();
  }
  else{
    connection.end();
  }
}


