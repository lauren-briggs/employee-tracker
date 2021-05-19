  
USE employeeDB;

INSERT INTO department (name)
VALUES 
('Design'),
('Developer'),
('Marketing'),
('Accounts'),
('HR'),

INSERT INTO role (title, salary, department_id)
VALUES
('Web Developer', 90000, 2),
('Graphic Designer', 70000, 1),
('Digital Designer', 75000, 1),
('Creative Director', 40000, 1);
('Copywriter', 40000, 3);
('Social Media Manager', 40000, 3);
('Accountant', 100000, 4)
('Manager', 100000, 5)

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('Molly', 'Smtih', 1, 123),
('Claire', 'Robertson', 3, 456),
('Amelia', 'Lucas', 8, 789),
('Georgia', 'Wilson', 7, 234),
('Isabella', 'James', 2, 567),
('Carly', 'Fawell', 5, 890);
('Alice', 'Lane', 4, 012);