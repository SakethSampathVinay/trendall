import connectToDB from "../database/database.js";

const createCartTable = () => {
  connectToDB.run(`
        CREATE TABLE IF NOT EXISTS cart (
            user_id INTEGER,
            product_id INTEGER,
            quantity INTEGER NOT NULL DEFAULT 1,
            PRIMARY KEY (user_id, product_id),
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
            FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
        )
        `),
    (error) => {
      if (error) {
        console.log("Error creating Table", error);
      } else {
        console.log("Cart Table created successfully");
      }
    };
};

export default createCartTable;
