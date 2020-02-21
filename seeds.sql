USE employee_trackerDB;

INSERT INTO department (name)
VALUES ("Sales"), ("Engineering"), ("Finance"), ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 12000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Salesperson", 13000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Lead Engineer", 107000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 80000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 60000, 3);

INSERT INTO role (title, salary, department_id)
VALUES ("Legal Team Lead", 64000, 4);

INSERT INTO role (title, salary, department_id)
VALUES ("Lawyer", 150000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id, manager)
VALUES ("Gary", "Green", 5, 2, "John Constantine");

INSERT INTO employee (first_name, last_name, role_id, manager_id, manager)
VALUES ("Sara", "Lance", 6, 5, "Ava Sharpe");

SELECT * FROM employee; 
