function sumOfDepartment(connection,departmnet) {
    connection.query(`select sum(r.salary) as TotalUtilizedBudget, d.id, d.name as departmentfrom 
    employee e, role r, department d where 
    e.role_id = r.id and 
    r.department_id = d.id
    group by d.id; `,
          function(error,result) {
          if (error) throw error;
            // Table all results of the SELECT statement
            console.table(result);
        });
    }
    module.exports = {sumOfDepartment};


