//remove employee from the employee table
function deleteEmployee(connection,employee) {
    connection.query(`DELETE FROM employee WHERE ?`,
        {
          id: employee
        },
        function(error, result) {
          if (error) throw error;
          console.table(result.affectedRows + " Employee deleted from the record!\n");
          
    
        });
    }
    module.exports = {deleteEmployee};
