DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS departments;

CREATE TABLE departments (
  dept_id INTEGER AUTO_INCREMENT PRIMARY KEY,
  dept_name VARCHAR(50) NOT NULL
);

CREATE TABLE roles (
  role_id INTEGER AUTO_INCREMENT PRIMARY KEY,
  job_title VARCHAR(30) NOT NULL,
  salary INTEGER,
  dept_id INTEGER,
  CONSTRAINT dept_name
    FOREIGN KEY (dept_id)
    REFERENCES departments(dept_id)
    ON DELETE CASCADE
);

CREATE TABLE employees (
    employ_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    employ_firstname VARCHAR(30) NOT NULL,
    employ_lasttname VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL,
    manager_id INTEGER,
        CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES roles(role_id),
        CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employees(employ_id) ON DELETE SET NULL

);

