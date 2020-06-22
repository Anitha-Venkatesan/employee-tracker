function addRole(connection,add_role,salary,departmentId) {
    connection.query(`Insert into role set ? `,
       {
        title :add_role ,
        salary: salary,
        department_id : departmentId
       },
          function(error,result) {
          if (error) throw error;
            // Table all results of the SELECT statement
            console.table(result);
        });
    }
    module.exports = {addRole};
