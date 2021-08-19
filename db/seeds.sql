USE DBemployee_tracker;

-- Department seed --
INSERT INTO department (dept_name)
VALUES
("Sales"),
("Legal"),
("I.T."),
("Accounting");


-- Employee Roles --
INSERT INTO role (title, salary, department_id)
VALUES
("Salesperson", 90000, 1), 
("Lead Sales", 120000, 1),
("IP Attorney", 100000, 2),
("Chief Counsel", 175000, 2),
("Systems Designer", 125000, 3),
("CTO", 200000, 3),
("Web Development Manager", 120000, 3),
("Accounting Manager", 90000, 4),
("CPA", 80000, 4);


-- Employee seed --
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUES
("John", "Hancock", null, 1),
("Frank", "Doe", 1, 2),
("Tommy", "Boy", null, 3),
("Richard", "Gallager", 3, 4),
("Ella", "Fitzgerald", null, 5),
("Jeremy", "Hank", 5, 6),
("Ron", "Swanson", null, 9),
("April", "O'Neil", 5, 8);


-- John Hancock is manager of John Doe because manager_id references "2" which is the first employee id created