const db = require('./config/db.js');
const prompt = require('inquirer').createPromptModule();

const initChoices = [
  "View all employees",
  "View all departments",
  "View all roles",
  "Add employee",
  "Add department",
  "Add role",
  "Update employee role",
  "Exit"
];

function viewAllEmp() {
  db.query(`SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, employee.manager_id FROM employee`, (err, employees) => {
    if (err) throw err;
    console.log('');
    console.table(employees);
    init();
  })
}
function viewAllDep() {
  db.query('SELECT department.name FROM department', (err, dep) => {
    if (err) throw err;
    console.log('');
    console.table(dep);
    init();
  })
}

function viewAllRoles() {
  db.query(`SELECT * FROM role`, (err, role) => {
    if (err) throw err;
    console.log('');
    console.table(role);
    role.forEach(elem => { roles.push(elem) });
    init();
  })
}
function addEmp() {
  prompt([
    {
      type: 'input',
      name: 'empFN',
      message: "What is the Employee's first name?"
    },
    {
      type: 'input',
      name: 'empLN',
      message: "What is the Employee's last name?"
    },
    {
      type: 'number',
      name: 'empRole',
      message: "What is the Employee's Role ID#?"
    },
    {
      type: 'number',
      name: 'empMan',
      message: "Who is the Employee's manager ID#?"
    }
  ])
    .then(({ empFN, empLN, empRole, empMan }) => {
      db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
            ('${empFN}','${empLN}','${empRole}','${empMan}')`, (err) => {
        if (err) throw err;
        console.log('Successfully Added!');
        init();
      })
    })
    .catch(e => console.error(e));
}

function addDep() {
  prompt([
    {
      type: 'input',
      name: 'newDep',
      message: 'What is the name of the department?'
    }
  ])
    .then(({ newDep }) => {
      db.query(`INSERT INTO department (name) VALUES ('${newDep}')`, (err) => {
        if (err) throw err;
        console.log('Department Created!');
        init();
      })
    })
    .catch(e => console.error(e));
}

function addRole() {
  prompt([
    {
      type: 'input',
      name: 'newRole',
      message: 'What is the name of the role?'
    },
    {
      type: 'input',
      name: 'newSalary',
      message: 'What is the salary for this role?'
    }
  ])
    .then(({ newRole, newSalary, newRoleId }) => {
      db.query(`INSERT INTO role (title, salary, department_id) VALUES 
            ('${newRole}','${newSalary}','${newRoleId}')`, (err) => {
        if (err) throw err;
        console.log('New Role Successfully Created!');
        init();
      })
    })
    .catch(e => console.error(e));
}



function updateEmpRole() {
  db.query(`SELECT * FROM employee`, (err, emp) => {

    const empChoices = emp.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id
    }));

    prompt([
      {
        type: "list",
        name: "empId",
        message: "Which employee's role do you want to update?",
        choices: empChoices
      }
    ]).then((response) => {
      db.query('SELECT * FROM role', (err, role) => {
        const roleChoice = role.map(({ id, title }) => ({
          name: title,
          value: id
        }));

        prompt([
          {
            type: "list",
            name: "roleId",
            message: "Which role do you want to assign the employee?",
            choices: roleChoice
          }
        ]).then(resp => {

          db.query("UPDATE employee SET role_id = ? WHERE id = ?", [resp.roleId, response.empId], (err) => {
            if (err) throw err;
            console.log('Employee role updated!');
            init();
          })
        });
      });
    })
  })

}


function init() {
  prompt([
    {
      type: 'list',
      name: 'listlist',
      message: 'What would you like to do?',
      choices: initChoices
    }
  ]).then(({ listlist }) => {

    switch (listlist) {
      case "View all employees":
        viewAllEmp();
        break;
      case "View all departments":
        viewAllDep();
        break;
      case "View all roles":
        viewAllRoles();
        break;
      case "Add employee":
        addEmp();
        break;
      case "Add department":
        addDep();
        break;
      case "Add role":
        addRole();
        break;
      case "Update employee role":
        updateEmpRole();
        break;
      case "Exit":
        process.exit();
        break;

      default:
        process.exit();
        break;
    }


  }).catch(e => console.log(e))
}

init();