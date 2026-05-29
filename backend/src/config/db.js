import dotenv from 'dotenv'
import pg from 'pg'

dotenv.config()

const{Pool} = pg
pg.types.setTypeParser(1082, val => val)
const pool =new Pool({
user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
})
//database table
//users
// CREATE TABLE users (
//     id SERIAL PRIMARY KEY,
//     name VARCHAR(100) NOT NULL,
//     email VARCHAR(255) UNIQUE NOT NULL,
//     hashPassword TEXT NOT NULL,
//     createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );
//refresh_tokens
// CREATE TABLE refresh_tokens (
//   id SERIAL PRIMARY KEY,
//   user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
//   token TEXT NOT NULL,
//   expires_at TIMESTAMP NOT NULL,
//   created_at TIMESTAMP DEFAULT NOW()
// );
//habits
// CREATE TABLE habits (
//     id SERIAL PRIMARY KEY,

//     user_id INT NOT NULL,

//     title VARCHAR(150) NOT NULL,

//     category VARCHAR(50) NOT NULL CHECK (
//         category IN (
//             'Health',
//             'Fitness',
//             'Study',
//             'Work',
//             'Meditation',
//             'Reading',
//             'Finance',
//             'Social',
//             'Other'
//         )
//     ),

//     description TEXT,

//     icon VARCHAR(100),

//     color VARCHAR(50),

//     frequency VARCHAR(20) NOT NULL CHECK (
//         frequency IN ('Daily', 'Weekly')
//     ),

//     targetDaysPerWeek INT DEFAULT 1 CHECK (
//         targetDaysPerWeek >= 1
//         AND targetDaysPerWeek <= 7
//     ),

//     isArchived BOOLEAN DEFAULT FALSE,

//     createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

//     CONSTRAINT fk_user
//         FOREIGN KEY(user_id)
//         REFERENCES users(id)
//         ON DELETE CASCADE
// );
//habits_logs
// CREATE TABLE habit_logs (
//     id SERIAL PRIMARY KEY,

//     user_id INT NOT NULL,

//     habit_id INT NOT NULL,

//     log_date DATE NOT NULL DEFAULT CURRENT_DATE,

//     completed BOOLEAN DEFAULT TRUE,

//     note TEXT,

//     createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

//     CONSTRAINT fk_habit
//         FOREIGN KEY (habit_id)
//         REFERENCES habits(id)
//         ON DELETE CASCADE,

//     CONSTRAINT fk_user
//         FOREIGN KEY (user_id)
//         REFERENCES users(id)
//         ON DELETE CASCADE,

//     -- prevent duplicate logs for same habit on same day
//     CONSTRAINT unique_habit_log UNIQUE (habit_id, log_date)
// );

pool.connect((err, client, release) => {
  if (err) {
    console.error('Database connection error:', err.message);
  } else {
    console.log('Database connected successfully.');
    release();
  }
});

export default pool