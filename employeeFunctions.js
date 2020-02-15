const inquirerStart = require("./inquirerStart");
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "ilovemusic3",
    database: "employee_trackerDB"
  });
  
  connection.connect(function(err) {
      if (err) throw err;
      grabEmployees();
    });





function grabEmployees() {
    return connection.query("SELECT * FROM employee");
  }


  module.exports = grabEmployees; 
  