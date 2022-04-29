// packages for this application
const inquirer = require('inquirer');
const db = require('./db/connection');
require("console.table")

// how to connect these to seeds????
function viewDepartment() {
    db.query('select * from departments;', function(error, data){
        if(error) throw error;
        console.table(data);
        startPrompt()
    })
};


// function to prompt user
function startPrompt() {
    inquirer.prompt([
      {
        type: "list",
        name: "userselection",
        choices: ["View department", "View roles", "View employees", "Add department", "Add role", "Add employee", "Update an Employee Roles", "Exit App"],
        message: "Welcome, please select an option"
      }
    ]).then(({ userselection }) => {
      switch (userselection) {
        case "Add Department":
          addDepartment();
          break;
        case "Add Roles":
          addInter();
          break;
        case "Add Employee":
          addEngineer();
          break;
        case "Update an Employee Role":
            updateEmployee();
            break;
        case "View department":
            viewDepartment()
            break;
        case "View Roles":
            viewRoles();
            break;
        case "View employees":
            viewEmployees();
            break;
        case "Exit App":
          db.end();
          process.exit(0)
          break;
      }
    })
  }

// Department questions
let departmentQuestion = [
    {
      type: 'input',
      name: 'departmentName',
      message: 'What is the department name? (Required)',
      validate: departmentNameInput => {
        if (departmentNameInput) {
          return true;
        } else {
          console.log('Please enter a department name!');
          return false;
        }
      }
    }
  ]

  // Roles questions
let rolesQuestion = [
    {
      type: 'input',
      name: 'jobTitle',
      message: 'What is the job title? (Required)',
      validate: jobTitleInput => {
        if (jobTitleInput) {
          return true;
        } else {
          console.log('Please enter a job title!');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'salary',
      message: 'Enter the salary(Required)',
      validate: salaryIdInput => {
        if (salaryIdInput) {
          return true;
        } else {
          console.log('Please enter a salary!');
          return false;
        }
      }
    },
    {
        type: "list",
        name: "roleDepartment",
        message: "What department does this role belong to?",
        choices: ["??", "??", ]
    }
  ]


  // functions listed in switch case - how do these then add to sql?
  function addDepartment() {
    inquirer.prompt(DepartmentQuestions)
    .then(response => {
      const newEmployee = new Employee(response.departmentName)
    
      startPrompt()
    })
  }

  startPrompt()