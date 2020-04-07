USE employees_db;

INSERT INTO department (name) VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');
​
INSERT INTO `role` (title, salary, department_id) VALUES 
('Sales Lead', 100000, 1),
('Salesperson', 80000, 1),
('Lead Engineer', 150000, 2),
('Software Engineer', 120000, 2),
('Account Manager', 160000, 3),
('Accountant', 125000, 3),
('Legal Team Lead', 250000, 4),
('Lawyer', 190000, 4);
​
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
('Jean', 'Li', 1, NULL),
('Laura', 'Aydelotte', 2, 1),
('Jenny', 'Lam', 3, NULL),
('Kiara', 'Wu', 4, 3),
('Jie', 'Yan', 5, NULL),
('Nok', 'S', 6, 5),
('Sulu', 'B', 7, NULL),
('Tanya', 'Kim', 8, 7);