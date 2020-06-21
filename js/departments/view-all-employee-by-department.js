// function for viewing all the employees by department name on the database employee_tracker_db
function viewEmployeeByDepartment(connection, departmentId) {
    connection.query(`select 
    e.id, 
    e.first_name, 
    e.last_name, 
    r.title, 
    r.salary, 
    d.name, 
    d.id,
    m.first_name as manager_first_name, 
    m.last_name as managet_last_name
    from 
    employee e LEFT JOIN employee m ON e.manager_id = m.id, role r, department d where 
    e.role_id = r.id and 
    r.department_id = d.id and d.id=${departmentId};`,
    function(error,result) {
    if (error) throw error;
      // Table all results of the SELECT statement
      console.table(result);
    
  });
}
module.exports = { viewEmployeeByDepartment };