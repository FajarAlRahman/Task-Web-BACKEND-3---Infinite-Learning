const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
require('dotenv').config();

const initDB = async () => {
  const connection = await mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    multipleStatements: true // Penting untuk mengizinkan beberapa pernyataan dalam satu query
  });

  try {
    const schemaPath = path.resolve(__dirname, 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf-8');

    await connection.query(schema);
    console.log('Database dan tabel berhasil dibuat.');
  } catch (err) {
    console.error('Error pembuatan database:', err);
  } finally {
    await connection.end();
  }
};

initDB().catch((err) => {
  console.error('Error pembuatan database:', err);
});
