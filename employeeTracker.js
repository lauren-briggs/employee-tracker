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
            'Add to a table',
            'View a table',
            'Update an employee',
            'Exit',
        ]
    })
        .then((answer) => {
            switch (answer.action) {
                case 'Add to a table':
                    addToTable();
                    break;
                case 'View a table':
                    viewTable();
                    break;
                case 'Update an employee':
                    updateEmployee();
                    break;
                case 'Exit':
                    connection.end();
                    break;
                default:
                    console.log(`Invalid action ${answer.action}`);
                    break;
            }
        })
}

const addToTable = () => {
    inquirer.prompt(
        {
            name: 'addTo',
            type: 'list',
            message: 'Which table would you like to add to?',
            choices: [
                'department',
                'role',
                'employee',
            ]
        })
        .then((answer) => {
            switch (answer.addTo) {
                case 'department':
                    inquirer.prompt({
                        name: 'depName',
                        type: 'input',
                        message: 'What department would you like to add?',
                    }).then((departmentData) => {
                        console.table(departmentData);
                        return departmentData;
                    })
                    break;
                case 'role':
                    inquirer.prompt([
                        {
                            name: 'roleName',
                            type: 'input',
                            message: 'What role would you like to add?',
                        },
                        {
                            name: 'salary',
                            type: 'input',
                            message: 'What is the salary?',
                        }
                    ]).then((roleData) => {
                        console.table(roleData);
                        return roleData;
                    })
                    break;
                case 'employee':
                    inquirer.prompt([
                        {
                            name: 'firstName',
                            type: 'input',
                            message: 'What is the employees first name?',
                        },
                        {
                            name: 'lastName',
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
                                'Digital Designer',
                                'Creative Director',
                                'Copywriter',
                                'Social Media Manager',
                                'Accountant',
                                'Manager',
                            ]
                        }
                    ]).then((employeeData) => {
                        console.table(employeeData);
                        return employeeData;
                    })
                    break;
                default:
                    console.log(`Invalid action ${answer.addTo}`);
                    break;
            }
        })

    // .then(askQuestion);

    // connection.query(
    //     `INSERT INTO ${answer.addTo} SET.....`
    //  )
}


// const readEmployeeRole = () => {
//     connection.query(
//         'SELECT role.id, role.title, employee.first_name, employee.last_name, employee.role_id FROM role INNER JOIN employee ON role.id=employee.role_id;',
//         (err, res) => {
//             if (err) throw err;
//             console.table(res);
//             connection.end();
//         })
// }

connection.connect((err) => {
    if (err) throw err;
    console.log(`Connected as id ${connection.threadId}`);
    // readEmployeeRole();
    askQuestion();
});