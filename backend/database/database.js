import sqlite3 from "sqlite3";
sqlite3.verbose();

const connectToDB = new sqlite3.Database("database.db", (error) => {
  if (error) {
    console.log("Error connecting to the database", error.message);
  } else {
    console.log("Connected to the database successfully");
  }
});

export default connectToDB;
