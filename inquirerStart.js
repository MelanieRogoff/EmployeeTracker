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
      inquirer
          .prompt({
              name: "viewEmployee",
              type: "list",
              message: "Which employee would you like to view?",
              choices: [] //Enter employees (in form of a function, maybe?) in the brackets
          })
          .then(function() {
              //display employee & info
              continuer();
              })
  }

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

// function addEmployee() {
//     inquirer
//             .prompt([
//             {
//                 type: "input",
//                 message: "What is the employee's first name?",
//                 name: "firstName"
//             },
//             {  
//                 type: "input",
//                 message: "What is the employee's last name?",
//                 name: "lastName"
//             },
//             {
//                 type: "list",
//                 message: "What is the employee's role?",
//                 choices: ["Sales Lead", "Salesperson", "Lead Engineer", "Software Engineer", "Accountant", "Legal Team Lead", "Lawyer"],
//                 name: "role"
//             },
//             {
//                 type: "input",
//                 message: "What is the first and last name of the employee's manager?",
//                 name: "manager"
//             }])
//             .then(function(answers) { 
//                 switch (answers.role) {
//                     case("Sales Lead"):
//                         connection.query('INSERT INTO employee SET ?', {
//                             first_name: answers.firstName,
//                             last_name: answers.lastName,
//                         })
//                         connection.query("SELECT manager_id FROM employee WHERE role_id = 8")
//                     break;
//                     case ("Salesperson"):
//                         connection.query('INSERT INTO employee SET ?', {
//                             first_name: answers.firstName,
//                             last_name: answers.lastName,
//                             role_id: 2
//                         })
//                     break; 
//                     case ('Lead Engineer'):
//                         connection.query('INSERT INTO employee SET ?', {
//                             first_name: answers.firstName,
//                             last_name: answers.lastName,
//                             role_id: 3
//                     })
//                     break;
//                     case ('Software Engineer'):
//                         connection.query('INSERT INTO employee SET ?', {
//                             first_name: answers.firstName,
//                             last_name: answers.lastName,
//                             role_id: 4
//                     })
//                     break;
//                     case ('Accountant'):
//                         connection.query('INSERT INTO employee SET ?', {
//                             first_name: answers.firstName,
//                             last_name: answers.lastName,
//                             role_id: 5
//                     })
//                     break;
//                     case ('Legal Team Lead'):
//                         connection.query('INSERT INTO employee SET ?', {
//                             first_name: answers.firstName,
//                             last_name: answers.lastName,
//                             role_id: 6
//                     })
//                     break;
//                     case ('Lawyer'):
//                         connection.query('INSERT INTO employee SET ?', {
//                             first_name: answers.firstName,
//                             last_name: answers.lastName,
//                             role_id: 7
//                         })
//                         break;
//                     }
//                     continuer();
//                 })}
   
//     function addDepartment() {
//         inquirer
//             .prompt({
//                 name: "addDepartment",
//                 type: "input",
//                 message: "Which department would you like to add?",              
//             })
//             .then(function(deptName) {
//                 if (deptName.addDepartment === deptName.addDepartment) {
//                     console.log("You cannot have a duplicate.")
//                     continuer();
//                 } else {
//                 connection.query("INSERT INTO department SET ?",
//                   { 
//                      name: deptName.addDepartment
//                   },
//                 )
//                 console.log("You have added the " + deptName.addDepartment + " department."); 
//                 continuer();
//             }})
//     }

//     function addRoles() {
//         inquirer
//             .prompt({
//                 type: "list",
//                 message: "Which role would you like to add?",
//                 choices: ["Sales Lead", "Salesperson", "Lead Engineer", "Software Engineer", "Accountant", "Legal Team Lead", "Lawyer"],
//                 name: "addRoles"
//             })
//             .then(function(roles) {
//                 console.log("You have added the role of " + roles.addRoles + ".");
//                 switch (roles.addRoles) { 
//                     case("Sales Lead"):
//                     connection.query('INSERT INTO role SET ?', {
//                         title: roles.addRoles,
//                         salary: 30000,
//                         department_id: 1,
//                         id: 1
//                     })
//                     break;
//                     case ("Salesperson"):
//                         connection.query(
//                         'INSERT INTO role SET ?', {
//                             title: roles.addRoles,
//                             salary: 31000,
//                             department_id: 1,
//                             id: 2
//                         })
//                     break; 
//                     case ('Lead Engineer'):
//                         connection.query('INSERT INTO role SET ?', {
//                             title: roles.addRoles,
//                             salary: 90000,
//                             department_id: 2,
//                             id: 3
//                     })
//                     break;
//                     case ('Software Engineer'):
//                         connection.query('INSERT INTO role SET ?', {
//                             title: roles.addRoles,
//                             salary: 80000,
//                             department_id: 2,
//                             id: 4
//                     })
//                     break;
//                     case ('Accountant'):
//                         connection.query('INSERT INTO role SET ?', {
//                             title: roles.addRoles,
//                             salary: 60000,
//                             department_id: 3,
//                             id: 5
//                     })
//                     break;
//                     case ('Legal Team Lead'):
//                         connection.query('INSERT INTO role SET ?', {
//                             title: roles.addRoles,
//                             salary: 70000,
//                             department_id: 4,
//                             id: 6
//                     })
//                     break;
//                     case ('Lawyer'):
//                             connection.query('INSERT INTO role SET ?', {
//                                 title: roles.addRoles,
//                                 salary: 100000,
//                                 department_id: 4,
//                                 id: 7
//                         })
//                         break;
//                     }
//                     continuer();
//                 })}
    
//     function updateRoles() {
//         inquirer
//             .prompt([{
//                 type: "list", 
//                 message: "Which employee's role would you like to update?",
//                 choices: [], //f(x) for getting employee names to display here
//                 name: "employeeChoice"
//             },
//             {
//                 type: "list",
//                 message: "What would you like to update the employee's role to?",
//                 choices: ["Sales Lead", "Salesperson", "Lead Engineer", "Software Engineer", "Accountant", "Legal Team Lead", "Lawyer"],
//                 name: "addRoles"
//              }])
//             .then(function(option) {
//                 if (option.addRoles == "Sales Lead") {
//                     console.log ("INSERT EMPLOYEE NAME HERE is now a " + option.addRoles)
//                     //return view of employee with the new option
//                 }
//                 if (option.addRoles == "Salesperson") {
//                     console.log ("INSERT EMPLOYEE NAME HERE is now a " + option.addRoles)
//                     //return view of employee with the new option
//                 }
//                 if (option.addRoles == "Lead Engineer") {
//                     console.log ("INSERT EMPLOYEE NAME HERE is now a " + option.addRoles)
//                     //return view of employee with the new option
//                 }
//                 if (option.addRoles == "Software Engineer") {
//                     console.log ("INSERT EMPLOYEE NAME HERE is now a " + option.addRoles)
//                     //return view of employee with the new option
//                 }
//                 if (option.addRoles == "Accountant") {
//                     console.log ("INSERT EMPLOYEE NAME HERE is now a " + option.addRoles)
//                     //return view of employee with the new option
//                 }
//                 if (option.addRoles == "Legal Team Lead") {
//                     console.log ("INSERT EMPLOYEE NAME HERE is now a " + option.addRoles)
//                     //return view of employee with the new option
//                 }
//                 if (option.addRoles == "Lawyer") {
//                     console.log ("INSERT EMPLOYEE NAME HERE is now a " + option.addRoles)
//                     //return view of employee with the new option
//                 }
//                 continuer();
//                 })
//     }
  

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