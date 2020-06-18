INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES ('Anitha','Venkatesan',1,23);

SELECT * FROM employee;
INSERT INTO department (name) VALUES 
('Sales'),
('Engineering'),
('Finance'),
('Legal');

SELECT * FROM department;

INSERT INTO role (title,salary,department_id) VALUES 
('Sales Lead',100000,1),
("Sales Person",50000,2),
("Lead Engineer",100000,3),
("Software Engineer",80000,4),
("Accountant",60000,5),
("Legal Team Lead",120000,6),
("Lawyer",75000,7);

SELECT * FROM role;


