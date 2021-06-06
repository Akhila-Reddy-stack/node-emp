var express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

var app = express();
var mysql = require('mysql');
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());
var connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'password',
  database: 'empdatabase',
  port: 3306
})


var poolPromise = connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log("Node Connected to mysql server")
  console.log('connected as id ' + connection.threadId);
  return connection;
});

const port = 3001;

app.post("/empregistration", async (req, res) => {
  try {

    console.log("try")
    var connection  = mysql.createPool({
      host: '127.0.0.1',
      user: 'root',
      password: 'password',
      database: 'empdatabase',
      port: 3306
    });
 
    connection.getConnection(function(err, db) {
  console.log(db)
      if (err) throw err; // not connected!
      console.log(req.body,"req")
      // Use the connection
      db.query(`INSERT INTO EmpTable (EmpName,Age,Gender,Phone) VALUES
      ("${req.body.EmpName}", ${req.body.Age},"${req.body.Gender}", ${req.body.Phone})`, function (error, results, fields) {
        if(err){
          res.json({ status: false, message: error });
        }
        else{
          res.json({ status: true, message: "Success!" });
        }
        // When done with the connection, release it.
        db.release();
     
      
      });
    });

   
} 
catch (error) {
  res.json({ status: false, message: error });

}
});




app.get("/getres", async (req, res) => {
  try {

    console.log("try")
    var connection  = mysql.createPool({
      host: '127.0.0.1',
      user: 'root',
      password: 'password',
      database: 'empdatabase',
      port: 3306
    });
 
    connection.getConnection(function(err, db) {
  console.log(db)
      if (err) throw err; // not connected!
      console.log(req.body,"req")
      // Use the connection
      db.query(`SELECT * FROM   EmpTable`, function (error, results, fields) {
        if(err){
          res.json({ status: false, message: error });
        }
        else{
          res.json({ status: true, data:results  });
        }
        // When done with the connection, release it.
        db.release();
      });
    });
} 
catch (error) {
  res.json({ status: false, message: error });

}
});




// app.post("/res", async (req, res) => {
//   try {

//     console.log("try")
//     connection.connect(async function (err,name) {
   
//       if (err) {
//         console.error('error connecting: ' + err.stack);
//         return;
//       }
//       else {
//         console.log("Node Connected to mysql server")
//         console.log('connected as idddd ' + connection);
//         console.log(req.body)
//         let pool = await connection;
//      var db =   connection.query(`INSERT INTO EmpTable (EmpName,Age,Gender,Phone) VALUES
//          (${req.body.EmpName}, ${req.body.Age}, ${req.body.Gender}, ${req.body.Phone})`)
//        console.log(db)
//        res.json({ status: true, message: "Success!" });
//       }
//     })

   
// } 
// catch (error) {
//   res.json({ status: false, message: error });

// }
// });





// app.use(router);

var server = app.listen(port, function (err) {
  if (err) {
    console.log("Server creation error..");
  } else {
    console.log("Server is running on.." + port);
  }
});

