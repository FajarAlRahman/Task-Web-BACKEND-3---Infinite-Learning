CREATE DATABASE IF NOT EXISTS notes_db;
USE notes_db;
CREATE TABLE IF NOT EXISTS notes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title TEXT NOT NULL,
    datetime DATETIME NOT NULL,
    note LONGTEXT NOT NULL
);
