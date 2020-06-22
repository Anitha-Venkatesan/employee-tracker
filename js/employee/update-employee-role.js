function updateEmployeeRole(connection,roles,employee) {
    connection.query("UPDATE employee SET ? WHERE ?",
    [
      {
        role_id : roles
      },
      {
        id: employee
      }
    ],

          function(error,result) {
          if (error) throw error;
            // Table all results of the SELECT statement
            console.table(result.affectedRows +"Updated the role of an employee successfully");
        });
    }
    module.exports = {updateEmployeeRole};
