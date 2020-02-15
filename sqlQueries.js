const mysql = require("mysql");
const consoleTable = require("console.table");

//SQL JOINS FOR THE 3 TABLES
  
tableJoin();
function tableJoin() {
const query = "SELECT employee.first_name, employee.last_name, employee.role_id, employee.manager_id, department.name, role.title, role.salary, role.department_id ";

query += "FROM employee INNER JOIN department INNER JOIN role ON id";
//getting assignment to constant variable error from +=
console.log(query);
}


