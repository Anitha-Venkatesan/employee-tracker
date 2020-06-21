function viewAllEmployeeByManager(connection,managerId) {
    connection.query(`select 
    e.id, 
    e.first_name, 
    e.last_name, 
    r.title, 
    r.salary, 
    d.name, 
    m.first_name as manager_first_name, 
    m.last_name as managet_last_name
    from 
    employee e LEFT JOIN employee m ON e.manager_id = m.id, role r, department d where 
    e.role_id = r.id and 
    r.department_id = d.id and 
    e.manager_id = m.id and m.id =${managerId};`,
          function(error,result) {
          if (error) throw error;
            // Table all results of the SELECT statement
            console.table(result);
        });
    }
    module.exports = {viewAllEmployeeByManager};