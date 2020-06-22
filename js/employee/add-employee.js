function addEmployee(connection,first_name,last_name,role,manager) {
    connection.query(`Insert into employee set ? `,
       {
        first_name :first_name,
        last_name : last_name,
        role_id   : role,
        manager_id : manager 
       },
          function(error,result) {
          if (error) throw error;
            // Table all results of the SELECT statement
            console.table(result);
        });
    }
    module.exports = {addEmployee};
