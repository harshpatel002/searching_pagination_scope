const express = require("express");
const app = express();
const mysql = require("mysql2");
app.set("view-engine", "ejs");
const cors = require("cors");
app.use(express.static("assets"));

// app.use(cors())

const { Model } = require("sequelize");

const port = 3002;

const search = require("./controller/searching");
const page = require("./controller/pagination");

app.get("/products/:id", cors(), function (req, res, next) {
  res.json({ msg: "This is CORS-enabled for single route!" });
});
// async function myfun(){
//   const data = await users.bulkCreate([
//     {firstName:"Sagar",lastName:"Khatri",email:"sagar@gmail.com"},
//     {firstName:"Nandani",lastName:"Gajjar",email:"nandani@gmail.com"},
//     {firstName:"Meet",lastName:"Vaghasiya",email:"meet@gmail.com"},
//     {firstName:"Nihar",lastName:"Gajjera",email:"nihar@gmail.com"},
//     {firstName:"Niyati",lastName:"Patel",email:"niyati@gmail.com"},
//     {firstName:"Bhavin",lastName:"Khandelval",email:"bhavin@gmail.com"},
//     {firstName:"Rashid",lastName:"Khan",email:"rashid@gmail.com"},
//     {firstName:"Saloni",lastName:"Patel",email:"saloni@gmail.com"},
//     {firstName:"Khushi",lastName:"Racchh",email:"khushi23@gmail.com"},
//     {firstName:"Himani",lastName:"Prajapati",email:"himani@gmail.com"},
//     {firstName:"Milan",lastName:"Chudasama",email:"milan@gmail.com"},
//     {firstName:"Jaini",lastName:"Mehta",email:"jaini@gmail.com"},
//   ])
// }

// myfun()

app.use("/page", page.pages);
app.use("/form", search.search);

app.listen(port, function () {
  console.log("Server is Listening");
  console.log("CORS-enabled web server listening on port" + port);
});
