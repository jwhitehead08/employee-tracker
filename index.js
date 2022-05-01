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
    console.log("Add Department")
  inquirer
    .prompt([
      {
        type: "input",
        name: "departmentName",
        message: "Enter Department Name",
      }
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
        message: "Enter the salary(Required)"
      },
      {
        type: "list",
        name: "roleDepartment",
        message: "What department does this role belong to?",
        choices: ["1", "2", "3"]
      },
    ])
    .then(({ jobTitle, salary, roleDepartment }) => {
        console.log( jobTitle, salary, roleDepartment)

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

// add employee function

// update employee role function

// function to prompt user
function startPrompt() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "userselection",
        choices: [
          "View department",
          "View roles",
          "View employees",
          "Add department",
          "Add role",
          "Add employee",
          "Update an Employee Roles",
          "Exit App",
        ],
        message: "Welcome, please select an option",
      },
    ])
    .then(({ userselection }) => {
      switch (userselection) {
        case "Add department":
          addDepartment();
          break;
        case "Add role":
          addRole();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Update an Employee Role":
          updateEmployee();
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
        case "Exit App":
          db.end();
          process.exit(0);
          break;
      }
    });
}

// // Department questions
// let departmentQuestion = [
//   {
//     type: "input",
//     name: "departmentName",
//     message: "What is the department name? (Required)",
//     validate: (departmentNameInput) => {
//       if (departmentNameInput) {
//         return true;
//       } else {
//         console.log("Please enter a department name!");
//         return false;
//       }
//     },
//   },
// ];

// Roles questions
let rolesQuestion = [
  {
    type: "input",
    name: "jobTitle",
    message: "What is the job title? (Required)",
    validate: (jobTitleInput) => {
      if (jobTitleInput) {
        return true;
      } else {
        console.log("Please enter a job title!");
        return false;
      }
    },
  },
  {
    type: "input",
    name: "salary",
    message: "Enter the salary(Required)",
    validate: (salaryIdInput) => {
      if (salaryIdInput) {
        return true;
      } else {
        console.log("Please enter a salary!");
        return false;
      }
    },
  },
  {
    type: "list",
    name: "roleDepartment",
    message: "What department does this role belong to?",
    choices: ["IT", "HR", "Sales", "Marketing"]
  },
];




startPrompt();
