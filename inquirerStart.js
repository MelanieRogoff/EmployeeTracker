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
        choices: ["View All Employees", "View Employees By Departments", "View All Employees By Role", "Add Employee", "Add Departments", "Add Roles", "Update Employee Roles", "Exit"]
      })
      .then(function(answer) {
        switch (answer.action) {
        case "View All Employees":
            viewEmployee(); 
            break;

        case "View Employees By Departments":
            viewDepartment();
            break;
  
        case "View All Employees By Manager":
            viewManagers();
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
    function viewEmployee() {
        connection.query("SELECT first_name, last_name FROM employee INNER JOIN role ON role.department_id = department_id", function (err, results) {
            const choices = results.map(result => `${result.first_name} ${result.last_name}`); //f(x) looks at  results array,turns it into string of first & last name FOR EACH ITEM IN ARRAY. Result = arbitrary param. 
            inquirer
             .prompt({
              name: "viewEmployee",
              type: "list",
              message: "Which employee would you like to view?",
              choices //call the choices const here
          })
          .then(function(employee) {
              console.log(employee); //this does {viewEmployee: the employee's name}
              //Need to go thru list of results and display the specific info from that employee
              continuer();
              })
  }
        )}

      

    function viewDepartment() {
      inquirer
          .prompt({
              name: "viewDepartment",
              type: "list",
              message: "Which department would you like to sort employees by?",
              choices: ["Sales", "Engineering", "Finance", "Legal"]
          })
          .then(function() {
            //PROBABLY DO SELECT * FROM employees WHERE department = ? THEN DISPLAY IT
            continuer();
          })
        }

    function viewManagers() {
        inquirer
            .prompt({
                name: "viewManager",
                type: "list",
                message: "Which manager would you like to have the employees sorted by?",
                choices: [] //have f(x) that displays the managers?
                
            })
            .then(function() {
                //PROBABLY DO SELECT * FROM employees WHERE manager_id = ? THEN DISPLAY IT
                continuer();
              })
            }

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
                return new Promise((resolve, reject) => { //this is a JS function that is a promise
                //QUERY FOR MANAGER BEFORE EVERYTHING BECAUSE WE WANT TO GRAB MANAGER FOR EACH 
                 const [first_name, last_name] = answers.manager.split(" "); //[first, last] means we want to create new const of first and last -- deliminates the need to make const first and const last
                 connection.query("SELECT id FROM employee WHERE first_name = ? AND last_name = ?", [first_name, last_name], function (err, results) {
                     if (err) reject (err); //If error, reject
                     if (results.length === 0) { //If no results 
                        resolve({answers, manager_id: null,}) //show that manager_id is null
                        console.log(`Error, ${answers.manager} does not exist.`) //This lets the user know that manager cannot exist UNLESS they've been added as employee
                        return; 
                     }
                     resolve({answers, manager_id: results[0].id}); //this returns manager's ID. Resolve is part of the syntax. Calling resolve ends up with the next .then function executing. We can .then off this promise, and it will ONLY work once this has been resolved. 
                 })
                });      
            }) 
            .then(function({answers, manager_id}) { 
            //grab manager's ID
                switch (answers.role) {
                    case("Sales Lead"):
                        connection.query('INSERT INTO employee SET ?', {
                            first_name: answers.firstName,
                            last_name: answers.lastName,
                            role_id: 1,
                            manager_id //don't need to add specific value because it's going to assign a manager id
                        })
                    break;
                    case ("Salesperson"):
                        connection.query('INSERT INTO employee SET ?', {
                            first_name: answers.firstName,
                            last_name: answers.lastName,
                            role_id: 2,
                            manager_id
                        })
                    break; 
                    case ('Lead Engineer'):
                        connection.query('INSERT INTO employee SET ?', {
                            first_name: answers.firstName,
                            last_name: answers.lastName,
                            role_id: 3,
                            manager_id
                    })
                    break;
                    case ('Software Engineer'):
                        connection.query('INSERT INTO employee SET ?', {
                            first_name: answers.firstName,
                            last_name: answers.lastName,
                            role_id: 4,
                            manager_id
                    })
                    break;
                    case ('Accountant'):
                        connection.query('INSERT INTO employee SET ?', {
                            first_name: answers.firstName,
                            last_name: answers.lastName,
                            role_id: 5,
                            manager_id
                    })
                    break;
                    case ('Legal Team Lead'):
                        connection.query('INSERT INTO employee SET ?', {
                            first_name: answers.firstName,
                            last_name: answers.lastName,
                            role_id: 6,
                            manager_id
                    })
                    break;
                    case ('Lawyer'):
                        connection.query('INSERT INTO employee SET ?', {
                            first_name: answers.firstName,
                            last_name: answers.lastName,
                            role_id: 7,
                            manager_id
                        })
                        break;
                }
                    continuer();
                }).catch(function(error) {
                    console.error(error);
            })}
   
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
    
    function updateRoles() {
        inquirer
            .prompt([{
                type: "list", 
                message: "Which employee's role would you like to update?",
                choices: [], //f(x) for getting employee names to display here
                name: "employeeChoice"
            },
            {
                type: "list",
                message: "What would you like to update the employee's role to?",
                choices: ["Sales Lead", "Salesperson", "Lead Engineer", "Software Engineer", "Accountant", "Legal Team Lead", "Lawyer"],
                name: "addRoles"
             }])
            .then(function(option) {
                if (option.addRoles == "Sales Lead") {
                    console.log ("INSERT EMPLOYEE NAME HERE is now a " + option.addRoles)
                    //return view of employee with the new option
                }
                if (option.addRoles == "Salesperson") {
                    console.log ("INSERT EMPLOYEE NAME HERE is now a " + option.addRoles)
                    //return view of employee with the new option
                }
                if (option.addRoles == "Lead Engineer") {
                    console.log ("INSERT EMPLOYEE NAME HERE is now a " + option.addRoles)
                    //return view of employee with the new option
                }
                if (option.addRoles == "Software Engineer") {
                    console.log ("INSERT EMPLOYEE NAME HERE is now a " + option.addRoles)
                    //return view of employee with the new option
                }
                if (option.addRoles == "Accountant") {
                    console.log ("INSERT EMPLOYEE NAME HERE is now a " + option.addRoles)
                    //return view of employee with the new option
                }
                if (option.addRoles == "Legal Team Lead") {
                    console.log ("INSERT EMPLOYEE NAME HERE is now a " + option.addRoles)
                    //return view of employee with the new option
                }
                if (option.addRoles == "Lawyer") {
                    console.log ("INSERT EMPLOYEE NAME HERE is now a " + option.addRoles)
                    //return view of employee with the new option
                }
                continuer();
                })
    }
  

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