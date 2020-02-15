const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const grabEmployees = require("./employeeFunctions");
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
        choices: [
          "View All Employees",
          "View Employees By Departments",
          "View All Employees By Role",
          "Add Employee",
          "Add Departments",
          "Add Roles", 
          "Update Exmployee Roles",
          "Exit"
        ]
      })
      .then(function(answer) {
        switch (answer.action) {
        case "View All Employees":
            viewEmployee(); 
            break;
  
        case "View Employees By Departments":
            viewDepartment();
            break;
  
        case "View All Employees By Role":
            viewRoles();
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
        const date = grabEmployees();
        console.log(date);
      inquirer
          .prompt({
              name: "viewEmployee",
              type: "list",
              message: "Which employee would you like to view?",
              choices: [
                  date
              ]
          })
          .then(function(answer) {
              //display the employee & info
              continuer();
              })
  }

    function viewDepartment() {
      inquirer
          .prompt({
              name: "viewDepartment",
              type: "list",
              message: "Which department would you like to sort employees by?",
              choices: [
                  "Sales",
                  "Engineering",
                  "Finance",
                  "Legal"
              ]
          })
          .then(function(answer) {
            //PROBABLY DO SELECT * FROM employees WHERE department = ? or something like that
            //DISPLAY THE ABOVE
            //Then run continuer
            continuer();
          })
        }

    function viewRoles() {
        inquirer
            .prompt({
                name: "viewRoles",
                type: "list",
                message: "Which role would you like to have the employees sorted by?",
                choices: [
                    "Sales Lead",
                    "Salesperson",
                    "Lead Engineer",
                    "Software Engineer",
                    "Accountant",
                    "Legal Team Lead", 
                    "Lawyer"
                ]
            })
            .then(function(viewer) {
                //PROBABLY DO SELECT * FROM employees WHERE titles = ? or something like that
                //DISPLAY THE ABOVE
                //Then run continuer
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
                choices: [
                    "Sales Lead",
                    "Salesperson",
                    "Lead Engineer",
                    "Software Engineer",
                    "Accountant",
                    "Legal Team Lead",
                    "Lawyer"
                ],
                name: "role"
            },
            {
                type: "input",
                message: "What is the first and last name of the employee's manager?",
                name: "manager"
            }])
            .then(function(answers) {
                // Search for manager, grab manager's corresponding ID, then return it 
                // connection.query("SELECT * FROM top5000 WHERE ?", { song: answer.song }, function(err, res) {

                
                connection.query("INSERT INTO employee SET ?", //put in other file
                 {
                    first_name: answers.firstName,
                    last_name: answers.lastName,
                    role_id: answers.role,
                    manager_id: answers.manager
                 },
                 
             )
             continuer();
            })
    }

    function addDepartment() {
        inquirer
            .prompt({
                name: "addDepartment",
                type: "input",
                message: "Which department would you like to add?",              
            })
            .then(function(deptName) {
                if (addDepartment == deptName.addDepartment) {
                    console.log("You cannot have a duplicate.")
                    continuer();
                }

                connection.query("INSERT INTO department SET ?",
                 { //add the department
                    name: deptName.addDepartment
                 },
                )
                //DISPLAY THE DEPARTMENT NAME
                 console.log("You have added the " + deptName.addDepartment + " department."); 
                //ASK IF THEY WANT TO CONTINUE
                 continuer();
            
            })
    }

    function addRoles() {
        inquirer
            .prompt({
                type: "list",
                message: "Which role would you like to add?",
                choices: [
                    "Sales Lead",
                    "Salesperson",
                    "Lead Engineer",
                    "Software Engineer",
                    "Accountant",
                    "Legal Team Lead",
                    "Lawyer"
                ],
                name: "addRoles"
            })
            .then(function(roles) {
                console.log("You have added the role of " + roles.addRoles + ".");
                //add the role
                continuer();
                })
    }

    function updateRoles() {
        inquirer
            .prompt([{
                type: "list", 
                message: "Which employee's role would you like to update?",
                choices: [
                    //employee name here
                ],
                name: "employeeChoice"
            },
            {
                type: "list",
                message: "What would you like to update the employee's role to?",
                choices: [
                    "Sales Lead",
                    "Salesperson",
                    "Lead Engineer",
                    "Software Engineer",
                    "Accountant",
                    "Legal Team Lead",
                    "Lawyer"
                    ],
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
                    choices: [
                        "Yes", "No"
                    ]       
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