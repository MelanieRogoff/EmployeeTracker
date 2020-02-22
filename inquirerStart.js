const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
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
    runInquirer();
  });
  
function runInquirer() {
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: ["View All Employees", "View Employees By Departments (Alphabetical)", "View All Employees By Role (Alphabetical)", "Add Employee", "Add Departments", "Add Roles", "Update Employee Roles", "Exit"]
      })
      .then(function(answer) {
        switch (answer.action) {
        case "View All Employees":
            viewEmployee(); 
            break;

        case "View Employees By Departments (Alphabetical)":
            viewDepartment();
            break;
  
        case "View All Employees By Role (Alphabetical)":
            viewRole();
            break;
  
        case "Add Employee":
            addEmployee(); 
            break;

        case "Add Departments":
            addDepartment(); 
            break;

        case "Add Roles":
            addRoles();
            break;

        case "Update Employee Roles":
            updateRoles(); 
            break;  

        case "Exit":
            connection.end();
            break;
        }
      });
  }
//VIEW ALL EMPLOYEES
    function viewEmployee() {
        const query = 'SELECT * FROM ((employee INNER JOIN role ON employee.role_id = role.id) INNER JOIN department ON role.department_id = department.id)';

        let allEmps = []
        
        connection.query(query, function (err, res) {
            for (let i = 0; i < res.length; i++) {
                allEmps.push({ id: res[i].id, first_name: res[i].first_name, last_name: res[i].last_name, title: res[i].title, salary: res[i].salary, manager: res[i].manager, department: res[i].name})
            }
                console.table(allEmps)
                continuer();
        })
    }
//VIEWING EMPLOYEES BY DEPARTMENT
    function viewDepartment() {
      inquirer
          .prompt({
              name: "viewDepartment",
              type: "list",
              message: "Which department would you like to sort employees by?",
              choices: ["Sales", "Engineering", "Finance", "Legal"]
          })
          .then(function(answers) {
            const queryDept = 'SELECT department.name, employee.role_id, employee.first_name, employee.last_name FROM employee INNER JOIN department ON (employee.role_id = department.id) WHERE department.name = ?';

            let deptTable = [];

            connection.query(queryDept, [answers.viewDepartment], function (err, res) {
                console.log(`There are ${res.length} employees in this department.`)
                for (let i = 0; i < res.length; i++) {
                    deptTable.push({first_name: res[i].first_name, last_name: res[i].last_name, department: res[i].name})
                }
                console.table(deptTable);
                continuer();
            })
        })
}
        
//VIEWING EMPLOYEES BY ROLE
    function viewRole() {
        const query = 'SELECT role.title, first_name, last_name FROM employee INNER JOIN role ON employee.role_id = role.id ORDER BY role.title';
        let roleList = [];
        connection.query(query, function (err, res) {
            for (let i = 0; i < res.length; i++) {
                roleList.push({ Roles: res[i].title, First_Name: res[i].first_name, Last_Name: res[i].last_name })
            }
        console.table(roleList);
        continuer()
    })
}

//ADDING EMPLOYEES
function addEmployee() {
    inquirer
        .prompt([
        {
            type: "input",
            message: "What is the employee's first name?",
            name: "firstName"
        },
        {  
            type: "input",
            message: "What is the employee's last name?",
            name: "lastName"
        },
        {
            type: "list",
            message: "What is the employee's role?",
            choices: ["Sales Lead", "Salesperson", "Lead Engineer", "Software Engineer", "Accountant", "Legal Team Lead", "Lawyer"],
            name: "role"
        },
        {
            type: "input",
            message: "What is the first and last name of the employee's manager?",
            name: "manager"
        }
        ])
        .then(function(answers) {
            return new Promise((resolve, reject) => { 
                const [first_name, last_name] = answers.manager.split(" "); //[first, last] creates const of both 
                connection.query("SELECT id FROM employee WHERE first_name = ? AND last_name = ?", [first_name, last_name], function (err, results) {
                if (err) reject (err); //If error, reject
                if (results.length === 0) { //If no results, 
                    resolve({answers, mgmt: null,}) //show that manager_id is null
                    console.log(`Error, ${answers.manager} does not exist.`) 
                    return; 
                }
                    resolve({answers, getManaged: answers.manager, mgmt: results[0].id});  
                })
            });      
        }) 
        .then(function({answers, mgmt, getManaged}) { 
            switch (answers.role) {
                case("Sales Lead"):
                    connection.query('INSERT INTO employee SET ?', {
                        first_name: answers.firstName,
                        last_name: answers.lastName,
                        role_id: 1,
                        manager_id: mgmt,
                        manager: getManaged
                    })
                break;
                case ("Salesperson"):
                    connection.query('INSERT INTO employee SET ?', {
                        first_name: answers.firstName,
                        last_name: answers.lastName,
                        role_id: 2,
                        manager_id: mgmt,
                        manager: getManaged
                    })
                break; 
                case ('Lead Engineer'):
                    connection.query('INSERT INTO employee SET ?', {
                        first_name: answers.firstName,
                        last_name: answers.lastName,
                        role_id: 3,
                        manager_id: mgmt,
                        manager: getManaged
                })
                break;
                case ('Software Engineer'):
                    connection.query('INSERT INTO employee SET ?', {
                        first_name: answers.firstName,
                        last_name: answers.lastName,
                        role_id: 4,
                        manager_id: mgmt,
                        manager: getManaged
                })
                break;
                case ('Accountant'):
                    connection.query('INSERT INTO employee SET ?', {
                        first_name: answers.firstName,
                        last_name: answers.lastName,
                        role_id: 5,
                        manager_id: mgmt,
                        manager: getManaged
                })
                break;
                case ('Legal Team Lead'):
                    connection.query('INSERT INTO employee SET ?', {
                        first_name: answers.firstName,
                        last_name: answers.lastName,
                        role_id: 6,
                        manager_id: mgmt,
                        manager: getManaged
                })
                break;
                case ('Lawyer'):
                    connection.query('INSERT INTO employee SET ?', {
                        first_name: answers.firstName,
                        last_name: answers.lastName,
                        role_id: 7,
                        manager_id: mgmt,
                        manager: getManaged
                    })
                    break;
                }
                continuer();
                }).catch(function(error) {
                    console.error(error);
                })}

//ADD DEPARTMENTS
    function addDepartment() {
        inquirer
            .prompt({
                name: "addDepartment",
                type: "input",
                message: "Which department would you like to add?",              
            })
            .then(function(deptName) {        
                connection.query("INSERT INTO department SET ?",{ name: deptName.addDepartment}, function(err) {
                        if (err) {
                            console.log(err.sqlMessage);
                        } else {
                            console.log("You have added the " + deptName.addDepartment + " department."); 
                        }
                        continuer();
                    })
                })}
//ADD EMPLOYEE ROLES 
    function addRoles() {
        inquirer
            .prompt({
                type: "list",
                message: "Which role would you like to add?",
                choices: ["Sales Lead", "Salesperson", "Lead Engineer", "Software Engineer", "Accountant", "Legal Team Lead", "Lawyer"],
                name: "addRoles"
            })
            .then(function(roles) {
                console.log("You have added the role of " + roles.addRoles + ".");
                switch (roles.addRoles) { 
                    case("Sales Lead"):
                    connection.query('INSERT INTO role SET ?', {
                        title: roles.addRoles,
                        salary: 30000,
                        department_id: 1,
                        id: 1
                    })
                    break;
                    case ("Salesperson"):
                        connection.query(
                        'INSERT INTO role SET ?', {
                            title: roles.addRoles,
                            salary: 31000,
                            department_id: 1,
                            id: 2
                        })
                    break; 
                    case ('Lead Engineer'):
                        connection.query('INSERT INTO role SET ?', {
                            title: roles.addRoles,
                            salary: 90000,
                            department_id: 2,
                            id: 3
                    })
                    break;
                    case ('Software Engineer'):
                        connection.query('INSERT INTO role SET ?', {
                            title: roles.addRoles,
                            salary: 80000,
                            department_id: 2,
                            id: 4
                    })
                    break;
                    case ('Accountant'):
                        connection.query('INSERT INTO role SET ?', {
                            title: roles.addRoles,
                            salary: 60000,
                            department_id: 3,
                            id: 5
                    })
                    break;
                    case ('Legal Team Lead'):
                        connection.query('INSERT INTO role SET ?', {
                            title: roles.addRoles,
                            salary: 70000,
                            department_id: 4,
                            id: 6
                    })
                    break;
                    case ('Lawyer'):
                            connection.query('INSERT INTO role SET ?', {
                                title: roles.addRoles,
                                salary: 100000,
                                department_id: 4,
                                id: 7
                        })
                        break;
                    }
                    continuer();
                })}

//UPDATE EMPLOYEE ROLES
    function updateRoles() {   
        connection.query("SELECT * FROM employee", function (err, res) {
            let updates = [];
            for (let i = 0; i < res.length; i++) {
                const choices = res[i].first_name + " " + res[i].last_name;
                updates.push(choices);
            }
        inquirer
            .prompt([{
                type: "list", 
                message: "Which employee's role would you like to update?",
                choices: updates,
                name: "employeeChoice"
            },
            {
                type: "list",
                message: "What would you like to update the employee's role to?",
                choices: ["Sales Lead", "Salesperson", "Lead Engineer", "Software Engineer", "Accountant", "Legal Team Lead", "Lawyer"],
                name: "addRoles"
             }])
            .then(function(option) {
                switch(option.addRoles) {
                    case("Sales Lead"):
                        console.log(`You have changed ${option.employeeChoice}'s role to: ${option.addRoles}.`);
                        connection.query(`UPDATE employee SET role_id = 1`, {
                    }) 
                    break;
                    case("Salesperson"):
                    console.log(`You have changed ${option.employeeChoice}'s role to: ${option.addRoles}.`);
                    connection.query(`UPDATE employee SET role_id = 2`, {
                }) 
                break;
            }
                continuer();
            })})}

    function continuer() {
        inquirer
                .prompt({
                    name: "continue",
                    type: "list",
                    message: "Would you like to continue?",       
                    choices: ["Yes", "No"]       
                })
                .then(function(choice) {
                    if (choice.continue == "Yes") {
                        runInquirer();
                    }
                    if (choice.continue == "No") {
                        connection.end();
                    }
                })
    }

