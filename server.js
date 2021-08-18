const config = require('./db/connection');
const inquirer = require("inquirer");
const cTable = require('console.table');


config.connect(function (err) {
    if(err) throw err;
    console.log("connected")
    init()
})

function init(){
    inquirer.prompt([
        {
            type: "list",
            choices: ["View Departments", "View Roles", "View Employees", "Add Department", "Add Role", "Add Employee", "Update Employee"],
            message: "What do you want to do?",
            name: "choice"
        }
    ]).then(({choice}) => {
        if(choice == "View Departments"){
            viewDept()
        }else if(choice == "View Roles") {
            viewRole()
            
        }else if(choice == "View Employees") {
            viewEmployees()
        }else if(choice == "Add Department"){
            addDept()
        }else if(choice == "Add Role"){
            addRole()
        }
        else{
            console.log("Bye Felicia")
            config.end()
        }

    })
}

function viewDept(){
    const sqlString = `
    SELECT *
    FROM department`

    config.query(sqlString, (err, data) => {
        if(err) throw err;
        console.log("\n")
        console.table(data)
        console.log("\n")

        init()
    })
}

function viewRole(){
    const sqlStringRole = `
    SELECT * FROM role`

    config.query(sqlStringRole, (err, data) => {
        if(err) throw err;
        console.log("\n")
        console.table(data)
        console.log("\n")

        init()
    })
};

function viewEmployees(){
    const sqlStringEmp = `
    SELECT * FROM employee`
// join tables here
    config.query(sqlStringEmp, (err, data) => {
        if(err) throw err;
        if(err) throw err;
        console.log("\n")
        console.table(data)
        console.log("\n")

        init()
    });
};

function addDept() {
    inquirer.prompt([
        {
            message: "What is the new Department Name?",
            name: "deptName"
        }
    ]).then(({deptName}) => {  
        const sqlString = `
        INSERT INTO department(dept_name)
        VALUES (?)`

        config.query(sqlString, [deptName], err => {
            if(err) throw err;
            console.log("added department");
            init()
        })
    });
};


function addRole() {
    inquirer.prompt([
        {
            name: "title",
            message: "What is the title of the new Role?",
            type: "input"
        },
        {
            name: "salary",
            message: "Salary: ",
            type: "number"
        },
        {
            name: "department_id",
            type: "input",
            message: "Department ID: ",
            
        }
    ]).then(data => {
        config.query('INSERT INTO role SET?', {title: data.title, salary: data.salary, department_id: data.department_id}, (err, res) => {
            if (err) throw (err);
            console.log("New Role Added!")
            init()
        })
    })
}
// create function to find all employees
function addEmployee() {
    config.query('SELECT * FROM employee', (err, data) => {
        console.log(data);
        inquirer.prompt([
            {
                name: 'firstname',
                type: 'input',
                message: 'Enter employee first name: '
            },
            {
                name: 'lastname',
                type: 'input',
                message: 'Enter employee last name: '
            },
            // {
            //     name: 'employeeManager',
            //     type: asrhadhgaharhg
            // }
        ])
    })

}
addEmployee();
// db.connect();
// init();
































// GIVEN a command-line application that accepts user input
// WHEN I start the application
// THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager and that employee is added to the database
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database 