let inquirer = require("inquirer");
let mysql = require("mysql");

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

// function which prompts the user for what action to do
function startQuestions() {
  inquirer
    .prompt({
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
    })
    .then(function(answer) {
      // based on their answer, call that function accordingly
      if (answer.questionList === "View All Employees") {
        viewAllEmployee();
      }
      else if(answer.questionList === "View All Employees by Department") {
        viewByDepartment();
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
    });
}

// function to handle viewing all the employees on the database employee_tracker_db
function viewAllEmployee() {
    connection.query("SELECT * FROM employee", function(error, result) {
        if (error) throw error;
    
        // Log all results of the SELECT statement
        console.log(result);
        connection.end();
    });
}
          