//function for viewing employee names 
function allEmployeeList(connection) {
    return new Promise((resolve, reject) => {
    connection.query(`SELECT id,first_name,last_name from employee;`,
    function(error,result) {
        if (error) {
            return reject(error);
        }
        return resolve(result);
    });
  });
}
module.exports = {allEmployeeList};
 

