-- Таблиці
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    user_login VARCHAR(50) UNIQUE
);

CREATE TABLE grades (
    id SERIAL PRIMARY KEY,
    student_id INT REFERENCES students(id),
    course VARCHAR(50),
    grade INT
);

-- Ролі
CREATE ROLE student_role NOINHERIT;
CREATE ROLE teacher_role NOINHERIT;
CREATE ROLE dean_role NOINHERIT;

-- Користувачі
CREATE USER student1 WITH PASSWORD 'pass123';
GRANT student_role TO student1;

CREATE USER student2 WITH PASSWORD 'pass123';
GRANT student_role TO student2;

CREATE USER teacher1 WITH PASSWORD 'pass123';
GRANT teacher_role TO teacher1;

CREATE USER dean1 WITH PASSWORD 'pass123';
GRANT dean_role TO dean1;

-- Привілеї
GRANT SELECT ON students TO student_role;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
CREATE POLICY student_select_policy
    ON students
    FOR SELECT
    USING (user_login = current_user);

GRANT SELECT, UPDATE ON grades TO teacher_role;

GRANT ALL PRIVILEGES ON TABLE students, grades TO dean_role;

-- Права на послідовності для деканату
GRANT ALL PRIVILEGES ON SEQUENCE students_id_seq TO dean_role;
GRANT ALL PRIVILEGES ON SEQUENCE grades_id_seq TO dean_role;

-- Приклади вставки даних
INSERT INTO students(name, user_login) VALUES
('Petro', 'student1'),
('Olena', 'student2');

INSERT INTO grades(student_id, course, grade) VALUES
(1, 'Math', 4),
(2, 'Physics', 5);