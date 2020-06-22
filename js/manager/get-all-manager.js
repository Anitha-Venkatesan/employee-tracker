//function for getting all the manager from the employee table
function getAllManager(connection) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM employee WHERE manager_id IS NULL;`, function(error,result) {
            if (error) {
                return reject(error);
            }
            return resolve(result);
        });
    });
}
module.exports = { getAllManager };