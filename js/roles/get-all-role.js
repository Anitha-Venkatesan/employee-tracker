function getAllRole(connection) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM role;`, function(error,result) {
            if (error) {
                return reject(error);
            }
            return resolve(result);
        });
    });
}


module.exports = { getAllRole };