USE employee_trackerDB;
 
-- Insert rows in the Employee table --
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Mazel", "Tiger", 1, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Pumpkin Man", "Lion", 2, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ollie", "Tabby", 3, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sara", "Lance", 4, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Gary", "Green", 5, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ava", "Sharpe", 6, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ray", "Palmer", 7, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Gideon", "Machine", 8, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Melanie", "Rogoff", 8, 1);

-- Insert 4 rows in the Department table --
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


