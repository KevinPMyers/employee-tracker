USE DBemployee_tracker;

-- Department seed --
INSERT INTO department (dept_name)
VALUES
(1"Sales"),
(2"Legal"),
(3"I.T."),
(4"Accounting");


-- Employee Roles --
INSERT INTO role (title, salary, department_id)
VALUES 
(1"Lead Sales", 120000, 1),
(2"Salesperson", 90000, 1),
(3"Chief Counsel", 175000, 2),
(4"IP Attorney", 100000, 2),
(5"CTO", 200000, 3),
(6"Systems Designer", 125000, 3),
(7"Web Development Manager", 120000, 3),
(8"Accounting Manager", 90000, 4),
(9"CPA", 80000, 4);


-- Employee seed --
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUES
1("John", "Hancock", 2, 1),
2("Frank", "Doe", null, 2),
3("Tommy", "Boy", 4, 3),
4("Richard", "Gallager", null, 4);


-- John Doe is manager of John Hancock because manager_id references "1" which is the first employee id created