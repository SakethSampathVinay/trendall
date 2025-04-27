import connectToDB from "../database/database.js";

const createUserTable = () => {
    connectToDB.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            password TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            cartData TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`,
        (error) => {
            if(error) {
                console.log("Error creating users table", error.message);
            } else {
                console.log("Users table created successfully");
            }
        }
    );
}

export default createUserTable;