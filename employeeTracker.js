const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'employeeDB',
});


const askQuestion = () => {
    inquirer.prompt({
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'Add a department',
            'Add a role',
            'Add an employee',
            'View a table',
            'Update an employee',
            'Delete a department',
            'Delete a role',
            'Delete an employee',
            'Exit',
        ]
    })
        .then((answer) => {
            switch (answer.action) {
                case 'Add a department':
                    addDepartment();
                    break;
                case 'Add a role':
                    addRole();
                    break;
                case 'Add an employee':
                    addEmployee();
                    break;
                case 'View a table':
                    viewTable();
                    break;
                case 'Update an employee':
                    updateEmployee();
                    break;
                case 'Delete a department':
                    deleteDepartment();
                    break;
                case 'Delete a role':
                    deleteRole();
                    break;
                case 'Delete an employee':
                    deleteEmployee();
                    break;
                case 'View employees by manager':
                    viewByManager();
                    break;
                case 'Exit':
                    connection.end();
                    break;
                default:
                    console.log(`Invalid action ${answer.action}`);
                    break;
            }
        });
}

const addDepartment = () => {
    inquirer.prompt({
        name: 'name',
        type: 'input',
        message: 'What department would you like to add?',
    }).then((departmentData) => {
        const query = connection.query(
            `INSERT INTO department SET ?`, departmentData, (err, res) => {
                if (err) throw err;
                console.log(`\nInserting ${departmentData.name} into department...`)
                console.log(`${res.affectedRows} inserted into department table`);
                askQuestion();
            }
        )
    });
}

const addRole = () => {
    inquirer.prompt([
        {
            name: 'title',
            type: 'input',
            message: 'What role would you like to add?',
        },
        {
            name: 'salary',
            type: 'input',
            message: 'What is the salary?',
        }
    ]).then((roleData) => {
        const query = connection.query(
            `INSERT INTO role SET ?`, roleData, (err, res) => {
                if (err) throw err;
                console.log(`\nInserting ${roleData.name} into role...`)
                console.log(`${res.affectedRows} inserted into role table`);
                askQuestion();
            }
        )
    });
}

const addEmployee = () => {
    inquirer.prompt([
        {
            name: 'firstname',
            type: 'input',
            message: 'What is the employees first name?',
        },
        {
            name: 'lastname',
            type: 'input',
            message: 'What is their last name?',
        },
        {
            name: 'role',
            type: 'list',
            message: 'What is their role?',
            choices: [
                'Web Developer',
                'Graphic Designer',
                'Creative Director',
                'Accountant',
                'Manager',
            ]
        }
    ]).then((employeeData) => {
        let roleId
        if (employeeData.role === 'Web Developer') {
            roleId = 1;
        } else if (employeeData.role === 'Graphic Designer') {
            roleId = 2;
        } else if (employeeData.role === 'Creative Director') {
            roleId = 3;
        } else if (employeeData.role === 'Accountant') {
            roleId = 4;
        } else if (employeeData.role === 'Manager') {
            roleId = 5;
        };
        const query = connection.query(
            `INSERT INTO employee (first_name, last_name, role_id) VALUES ('${employeeData.firstname}', '${employeeData.lastname}', '${roleId}')`, (err, res) => {
                if (err) throw err;
                console.log(`\nInserting ${employeeData.firstname} ${employeeData.lastname} into employee...`)
                console.log(`${res.affectedRows} inserted into employee table`);
                askQuestion();
            }
        )
    });
}

const viewTable = () => {
    inquirer.prompt({
        name: 'table',
        type: 'list',
        message: 'Which table would you like to view?',
        choices: [
            'department',
            'role',
            'employee',
        ]
    }).then((table) => {
        connection.query(
            `SELECT * FROM ${table.table}`, (err, res) => {
                if (err) throw err;
                console.log(`------------\nShowing ${table.table} table\n------------`);
                console.table(res);
                askQuestion();
            }
        );
    });

}

const updateEmployee = () => {
    inquirer.prompt([
        {
            name: 'firstname',
            type: 'input',
            message: 'What is the employees first name?',
        },
        {
            name: 'lastname',
            type: 'input',
            message: 'What is their last name?',
        },
        {
            name: 'role',
            type: 'rawlist',
            message: 'What is their new role?',
            choices: [
                'Web Developer',
                'Graphic Designer',
                'Creative Director',
                'Accountant',
                'Manager',
            ]
        }
    ]).then((newRoleData) => {
        console.log(newRoleData.role)
        let newRoleId
        if (newRoleData.role === 'Web Developer') {
            newRoleId = 1;
        } else if (newRoleData.role === 'Graphic Designer') {
            newRoleId = 2;
        } else if (newRoleData.role === 'Creative Director') {
            newRoleId = 3;
        } else if (newRoleData.role === 'Accountant') {
            newRoleId = 4;
        } else if (newRoleData.role === 'Manager') {
            newRoleId = 5;
        };
        console.log(newRoleId);
        const query = connection.query(
            `UPDATE employee SET role_id = '${newRoleId}' WHERE first_name = '${newRoleData.firstname}' AND last_name = '${newRoleData.lastname}'`, (err, res) => {
                if (err) throw err;
                console.log(`\nUpdating ${newRoleData.firstname} ${newRoleData.lastname}'s new role as ${newRoleData.role} into employee...`)
                console.log(`${res.affectedRows} inserted into employee table`);
                askQuestion();
            }
        )
    })
}

const deleteDepartment = () => {
    // connection.query(
    //     `SELECT * FROM department`, (err, res) => {
    //         if (err) throw err;
    //         console.log(res);
    //         let depArr = [];
    //         for (i = 0; i < res.length; i++) {
    //             console.log(res[i].name);
    //             depArr.push(res[i].name);
    //         }
    //         console.log(`Department Array: ${depArr}`)
    //     }
    // ).then((depArr) => {
    inquirer.prompt(
        {
            name: 'name',
            type: 'list',
            message: 'Which department would you like to delete?',
            choices: [
                'Design',
                'Developer',
                'Accounts',
                'HR',
            ],
        }
    ).then((department) => {
        const query = connection.query(
            `DELETE FROM department WHERE ?`, department, (err, res) => {
                if (err) throw err;
                console.log(`\nDeleting ${department.name} from department...`)
                console.log(`${res.affectedRows} deleted from table`);
                askQuestion();
            }
        )
    })
}

const deleteRole = () => {
    inquirer.prompt(
        {
            name: 'title',
            type: 'list',
            message: 'Which role would you like to delete?',
            choices: [
                'Web Developer',
                'Graphic Designer',
                'Creative Director',
                'Accountant',
                'Manager',
            ],
        }
    ).then((title) => {
        const query = connection.query(
            `DELETE FROM role WHERE ?`, title, (err, res) => {
                if (err) throw err;
                console.log(`\nDeleting ${title.title} from role...`)
                console.log(`${res.affectedRows} deleted from table`);
                askQuestion();
            }
        )
    })
}


const deleteEmployee = () => {
    inquirer.prompt([
        {
            name: 'first_name',
            type: 'input',
            message: 'What is the first name of the employee you would like to delete?',
        },
        {
            name: 'last_name',
            type: 'input',
            message: 'What is their last name?',
        },
    ]).then((employee) => {
        const query = connection.query(
            `DELETE FROM employee WHERE first_name = '${employee.first_name}' AND last_name = '${employee.last_name}'`, (err, res) => {
                if (err) throw err;
                console.log(`\nDeleting ${employee.first_name} ${employee.last_name} from employee...`)
                console.log(`${res.affectedRows} deleted from employee`);
                askQuestion();
            }
        )
    })
}






connection.connect((err) => {
    if (err) throw err;
    console.log(`Connected as id ${connection.threadId}`);
    askQuestion();
});