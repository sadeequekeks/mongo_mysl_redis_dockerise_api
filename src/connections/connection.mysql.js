const mysql = require('mysql');
const { host, user, password } = require('../configs').mysqlDb
module.exports = () => {
    const connection = mysql.createConnection({
    host,
    user,
    password
    });
 
    connection.connect(err => {
        if(err)     {
            console.log("Error connecting to mysql", err)
        }
        else{
            console.log("We are connected to mysql")
        }
    })
}