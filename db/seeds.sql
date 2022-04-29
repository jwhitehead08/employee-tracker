INSERT INTO departments (
    dept_name) values('IT'),('HR'), ('Sales');

INSERT INTO roles (
    job_title,
    salary,
    dept_id
) values 
    ('manager IT',27862,1),
    ('manager HR', 34345, 2),
    ('manager Sales', 99999, 3);

INSERT INTO employees (
    employ_firstname,
    employ_lasttname,
    role_id
) values
    ('Joe', 'Smith', 1),
    ('Sarah', 'Thompson', 2),
    ('Jack', 'Johnson', 3);