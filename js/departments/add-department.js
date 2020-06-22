function addDepartment(connection,add_department) {
    connection.query(`Insert into department set ? `,
       {
        name :add_department 
       },
          function(error,result) {
          if (error) throw error;
            // Table all results of the SELECT statement
            console.table(result);
        });
    }
    module.exports = {addDepartment};
