//function for viewing the total utilized budget of a department
function sumOfDepartment(connection) {
    connection.query(`select sum(r.salary) as TotalUtilizedBudget, d.id, d.name as department from 
    employee e, role r, department d where 
    e.role_id = r.id and 
    r.department_id = d.id
    group by d.id; `,
          function(error,result) {
          if (error) throw error;
            console.table(result);
        });
    }
    module.exports = {sumOfDepartment};


