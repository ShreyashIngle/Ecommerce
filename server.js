const express = require("express");

const mongoose = require("mongoose");

const app = express();

const server_config = require("./configs/server.config");

const db_config = require("./configs/db.config");


const user_model = require("./models/user.model");
const { log } = require("console");

const bcrypt = require("bcryptjs");

/*
create an admin user at the starting of the application
if not present in the database
*/

//Connect to the database

mongoose.connect(db_config.DB_URL);
const db = mongoose.connection;

db.on("error", () => {
  console.log("Error while connecting to the database");
})

db.once("open", () => {
  console.log("Successfully connected to the database");
    init();
})

async function init() {
  const existingAdmin = await user_model.findOne({ usertype: "admin" });

  if (existingAdmin) {
    console.log("Admin already exists");
    return;
  }

  try {
    const admin = await user_model.create({
        name: "Shreyash",
        userId: "admin",
        email: "shreyashwork21@gmail.com",
        usertype: "ADMIN", // Change to uppercase
        password: bcrypt.hashSync("welcome1", 8),
      });
    console.log("Admin created successfully", admin);

  } catch (error) {
    console.error("Error while creating admin", error);
  }
}

app.listen(server_config.PORT, () => {
  console.log("Server is running on port ", server_config.PORT);
});
