const mysql = require("mysql");
const inquirer = require("inquirer");

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
          "View All Departments",
          "View All Roles",
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
  
        case "View All Departments":
            viewDepartment();
            break;
  
        case "View All Roles":
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
      inquirer
          .prompt({
              name: "viewEmployee",
              type: "list",
              message: "Which employee would you like to view?",
              choices: [
                  //Have all employees display here
              ]
          })
          .then(function(answer) {
              //display the employee
              })
  }

  function viewDepartment() {
      inquirer
          .prompt({
              name: "viewDepartment",
              type: "list",
              message: "Which department would you like to view?",
              choices: [
                  "Sales",
                  "Engineering",
                  "Finance",
                  "Legal"
              ]
          })
          .then(function() {
            //display the department
            })
  }

    function viewRoles() {
        inquirer
            .prompt({
                name: "viewRoles",
                type: "list",
                message: "Which Role would you like to view?",
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
            .then(function() {
                //display the role
                })
    }

    function addEmployee() {
        inquirer
            .prompt(
            {
                type: "input",
                message: "What is the employee's first name?",
                name: "firstName", //Right now I can't get past first name
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
            })
            .then(function() {
                //add the employee
                })
    }

    function addDepartment() {
        inquirer
            .prompt({
                name: "addDepartment",
                type: "list",
                message: "Which department would you like to add?",
                choices: [
                    "Sales",
                    "Engineering",
                    "Finance",
                    "Legal"
                ]
            })
            .then(function() {
                //add the department
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
            .then(function() {
                //add the role
                })
    }

    function updateRoles() {
        inquirer
            .prompt({
                type: "list", //Right now I can't get past this
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
             })
            .then(function() {
                //update the role
                })
    }