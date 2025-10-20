const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

// Conexão com o banco MySQL
const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
};

const connection = mysql.createConnection(config);

const createTable = `CREATE TABLE IF NOT EXISTS people (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255))`;
connection.query(createTable);

app.get('/', (req, res) => {
  const name = 'Eric Pandolfo';
  connection.query(`INSERT INTO people(name) VALUES ('${name}')`);

  connection.query(`SELECT name FROM people`, (err, results) => {
    if (err) {
      res.status(500).send('Erro ao consultar o banco.');
      return;
    }

    let html = '<h1>Full Cycle Rocks!</h1>';
    html += '<ul>';
    results.forEach(person => {
      html += `<li>${person.name}</li>`;
    });
    html += '</ul>';
    res.send(html);
  });
});

app.listen(port, () => {
  console.log(`Rodando na porta ${port}`);
});
