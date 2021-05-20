  
USE employeeDB;

INSERT INTO department (name)
VALUES 
('Design'),
('Developer'),
('Accounts'),
('HR');

INSERT INTO role (title, salary, department_id)
VALUES
('Web Developer', 90000, 2),
('Graphic Designer', 70000, 1),
('Creative Director', 40000, 1),
('Accountant', 100000, 3),
('Manager', 100000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('Molly', 'Smith', 1, 5),
('Claire', 'Robertson', 2, 3),
('Amelia', 'Lucas', 5, null),
('Georgia', 'Wilson', 4, 5),
('Isabella', 'James', 2, 3),
('Carly', 'Fawell', 3, null);