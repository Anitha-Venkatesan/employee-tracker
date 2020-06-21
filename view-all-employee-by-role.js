// function for viewing all the employees by department name on the database employee_tracker_db
function viewEmployeeByRole(connection, roleId) {
    connection.query(`select 
    e.id, 
    e.first_name, 
    e.last_name, 
    r.title, 
    r.id,
    r.salary, 
    d.name, 
    d.id,
    m.first_name as manager_first_name, 
    m.last_name as managet_last_name
    from 
    employee e LEFT JOIN employee m ON e.manager_id = m.id, role r, department d where 
    r.department_id = d.id and 
    e.role_id = r.id and r.id = ${roleId};`,
    function(error,result) {
    if (error) throw error;
      // Table all results of the SELECT statement
      console.table(result);
    
  });
}
module.exports = { viewEmployeeByRole };