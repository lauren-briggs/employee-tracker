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

const readEmployeeRole = () => {
    connection.query(
        'SELECT role.id, role.title, employee.first_name, employee.last_name, employee.role_id FROM role INNER JOIN employee ON role.id=employee.role_id;',
        (err, res) => {
            if (err) throw err;
            console.table(res);
            connection.end();
        })
}

connection.connect((err) => {
    if (err) throw err;
    console.log(`Connected as id ${connection.threadId}`);
    readEmployeeRole();
});