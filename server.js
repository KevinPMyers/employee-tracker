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
        } else if(choice == "Add Employee"){
            addEmployee()
        } else if(choice == "Update Employee"){
            updateEmployee()
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
    config.query('SELECT role.title AS title, role.salary AS salary, role.department_id AS department_id FROM role', function (err, res) {
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
    ]).then(function(res) {
        config.query(
            'INSERT INTO role SET ?',
            {
                title: res.title,
                salary: res.salary,
                department_id: res.department_id
            },
            function(err) {
                if (err) throw err
                console.table(res);
                init()
            }
        )
    })
});
}

// create function to find all employees and roles
var roleArr = [];
function selectRole() {
    config.query('SELECT * FROM role', function(err, res) {
        if (err) throw err
        for (i = 0;i < res.length; i++) {
            roleArr.push(res[i].title);
        }
    })
    return roleArr;
}

var managersArr = [];
function selectManager() {
    config.query('SELECT first_name, last_name FROM employee WHERE manager_id IS NOT NULL', function(err, res) {
        if (err) throw err
        for (i = 0; i < res.length; i++) {
            managersArr.push(res[i].first_name);
        }
    })
    return managersArr;
}
function addEmployee() {
    inquirer.prompt([
        {
            name: 'firstName',
            type: 'input',
            message: 'Enter their first name: '
        },
        {
            name: 'lastName',
            type: 'input',
            message: 'Enter their last name: '
        },
        {
            name: 'roleId',
            type: 'list',
            message: "What is their role? ",
            choices: selectRole()
        },
        {
            name: 'manager',
            type: 'rawlist',
            message: "Who is their manager? ",
            choices: selectManager()
        }
    ]).then(function (val) {
        var roleId = selectRole().indexOf(val.roleId) + 1
        var managerId = selectManager().indexOf(val.manager) + 1
        config.query("INSERT INTO employee SET ?",
        {
            first_name: val.firstName,
            last_name: val.lastName,
            manager_id: managerId,
            role_id: roleId
        }, function(err){
            if (err) throw err
            console.table(val)
            init()
        });
    });
}


function updateEmployee() {
    config.query("SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee JOIN role ON employee.role_id = role.id;", function(err, res) {
    
     if (err) throw err
     console.log(res)
        const values = res.map((emp) => ({[`${emp.first_name} ${emp.last_name}`]: emp.id}))
    inquirer.prompt([
          {
            name: "name",
            type: "rawlist",
            message: "What is the Employee's last name? ",
            choices: values.map(v => Object.keys(v)[0])
          },
          {
            name: "roleId",
            type: "rawlist",
            message: "What is the Employees new title? ",
            choices: selectRole()
          },
      ]).then(function(val) {
        var roleId = selectRole().indexOf(val.roleId) + 1
        const id = values.find(v => v[val.name])[val.name]
        console.log(roleId, id)
        config.query(`UPDATE employee SET role_id = ${roleId} WHERE id = ${id}`, 
         
        function(err){
            if (err) throw err
            console.table(val)
            init()
        })
  
    });
  });

  }


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