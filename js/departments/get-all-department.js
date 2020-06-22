//function for getting all the depratments
function getAllDepartment(connection) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM department;`, function(error,result) {
            if (error) {
                return reject(error);
            }
            return resolve(result);
        });
    });
}


module.exports = { getAllDepartment };