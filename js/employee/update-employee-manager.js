//function for updating employee role
function updateEmployeeManager(connection,manager,employee) {
    connection.query("UPDATE employee SET ? WHERE ?",
    [
      {
        manager_id : manager
      },
      {
        id: employee
      }
    ],

          function(error,result) {
          if (error) throw error;
            // Table all results of the SELECT statement
            console.table(result.affectedRows + "Updated the manager of an employee successfully");
        });
    }
    module.exports = {updateEmployeeManager};