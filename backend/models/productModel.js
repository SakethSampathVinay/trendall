import connectToDB from "../database/database.js";

const createProductTable = () => {
  connectToDB.run(
    `
        CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        price INTEGER NOT NULL,
        image TEXT NOT NULL,
        category TEXT NOT NULL,
        subCategory TEXT NOT NULL,
        sizes TEXT NOT NULL,
        bestSeller BOOLEAN NOT NULL,
        date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        `,
    (error) => {
      if (error) {
        console.log("Error creating products table", error.message);
      } else {
        console.log("Products table created successfully");
      }
    }
  );
};

export default createProductTable;
