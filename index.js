// packages for this application
const inquirer = require("inquirer");
const db = require("./db/connection");
require("console.table");

// how to connect these to seeds????
function viewDepartment() {
  db.query("select * from departments;", function (error, data) {
    if (error) throw error;
    console.table(data);
    startPrompt();
  });
}

function viewRoles() {
  db.query("select * from roles;", function (error, data) {
    if (error) throw error;
    console.table(data);
    startPrompt();
  });
}

function viewEmployees() {
  db.query("select * from employees;", function (error, data) {
    if (error) throw error;
    console.table(data);
    startPrompt();
  });
}

function addDepartment() {
  console.log("Add Department");
  inquirer
    .prompt([
      {
        type: "input",
        name: "departmentName",
        message: "Enter Department Name",
      },
    ])
    .then(({ departmentName }) => {
      db.query(
        "INSERT INTO departments (dept_name) values(?)",
        departmentName,
        function (error, data) {
          if (error) throw error;
          console.table(data);
          startPrompt();
        }
      );
    });
}

// function to add role
function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "jobTitle",
        message: "What is the job title? (Required)",
      },
      {
        type: "input",
        name: "salary",
        message: "Enter the salary(Required)",
      },
      {
        type: "list",
        name: "roleDepartment",
        message: "What department does this role belong to?",
        choices: ["1", "2", "3"],
      },
    ])
    .then(({ jobTitle, salary, roleDepartment }) => {
      console.log(jobTitle, salary, roleDepartment);

      db.query(
        "INSERT INTO roles (job_title, salary, dept_id) VALUES (?, ?, ?);",
        [jobTitle, salary, roleDepartment],
        function (error, data) {
          if (error) throw error;
          console.table(data);

          startPrompt();
        }
      );
    });
}

// function to add employee
function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "employeeFirstName",
        message: "What is the employee's first name? (Required)",
      },
      {
        type: "input",
        name: "employeeLastName",
        message: "What is the employee's last name? (Required)",
      },
      {
        type: "list",
        name: "roleId",
        message: "What role ID is associated with this employee? (Required)",
        choices: ["1", "2", "3"],
      },
      {
        type: "list",
        name: "managerId",
        message: "What manager ID is associated with this employee? (Required)",
        choices: ["1", "2", "3"],
      },
    ])
    .then(({ employeeFirstName, employeeLastName, roleId, managerId }) => {
      db.query(
        "INSERT INTO employees (employ_firstname, employ_lasttname, role_id, manager_id) VALUES (?, ?, ?, ?);",
        [employeeFirstName, employeeLastName, roleId, managerId],
        function (error, data) {
          if (error) throw error;
          console.table(data);

          startPrompt();
        }
      );
    });
}

// update an employee
function updateEmployee() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "employeeSelect",
        message: "Which employee would you like to update? (Required)",
        choices: ["Joe", "Sarah", "Jack", "Flint"],
      },
      {
        type: "list",
        name: "roleId",
        message:
          "What role would you like to assign to this employee? (Required)",
        choices: ["1", "2", "3"],
      },
    ])
    .then(({ employeeSelect, roleId }) => {
      db.query(
        "UPDATE employees SET role_id = ? WHERE employ_firstname = ?;",
        [roleId, employeeSelect],
        function (error, data) {
          if (error) throw error;
          console.table(data);

          startPrompt();
        }
      );
    });
}

function viewDepartmentSalary() {
    inquirer
      .prompt([
        {
            type: "list",
            name: "deptSalary",
            message: "Which departments combined salaries would you like to view? (Required)",
            choices: ["1", "2", "3"],
          }
      ])
      .then(({ deptSalary }) => {
        db.query("SELECT SUM(roles.salary) FROM roles INNER JOIN employees ON employees.role_id=roles.role_id WHERE roles.role_id = ?;", 
        deptSalary,
        function (error, data) {
            if (error) throw error;
            console.table(data);
            startPrompt();
          }
        );
      });
}



// function to prompt user
function startPrompt() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "userselection",
        choices: [
          "Update an Employee Role",
          "Add department",
          "Add role",
          "Add employee",
          "View department",
          "View roles",
          "View employees",
          "View department salary",
          "Exit App",
        ],
        message: "Welcome, please select an option",
      },
    ])
    .then(({ userselection }) => {
      switch (userselection) {
        case "Update an Employee Role":
          updateEmployee();
          break;
        case "Add department":
          addDepartment();
          break;
        case "Add role":
          addRole();
          break;
        case "Add employee":
          addEmployee();
          break;
        case "View department":
          viewDepartment();
          break;
        case "View roles":
          viewRoles();
          break;
        case "View employees":
          viewEmployees();
          break;
        case "View department salary":
            viewDepartmentSalary();
            break;
        case "Exit App":
          db.end();
          process.exit(0);
          break;
      }
    });
}

startPrompt();
