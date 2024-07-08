const express = require("express");

const mongoose = require("mongoose");

const app = express();

const server_config = require("./configs/server.config");

const db_config = require("./configs/db.config");


const user_model = require("./models/user.model");


const bcrypt = require("bcryptjs");

app.use(express.json()); ///middleware

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
  try{
    let user  = await user_model.findOne({userId : "admin"})

   if(user){
      console.log("Admin is already present")
      return
    }

}catch(err){
    console.log("Error while reading the data", err)
}


try{
  user = await user_model.create({
    name : "Shreyashingle",
    userId : "admin",
    email : "shreyashwork21@gmail.com",
    userType : "ADMIN",
    password : bcrypt.hashSync("Welcome1",8)
  })
  console.log("Admin created ", user)


}catch(err){
    console.log("Error while create admin", err)
}
}


require("./routes/auth.routes")(app);

app.listen(server_config.PORT, () => {
  console.log("Server is running on port ", server_config.PORT);
});
