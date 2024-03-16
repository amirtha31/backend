const express = require("express");
var mysql = require("mysql");
var cors = require('cors')
const bodyParser = require("body-parser"); 
const app = express();
app.use(cors({origin: true, credentials: true}))
app.use(bodyParser.json());
var connection = mysql.createConnection({
  host: "sql6.freemysqlhosting.net",
  user: "sql6691912",
  password: "Z8dFLGW8pc",
  database: "sql6691912",
});

app.post("/add-user", (req, res) => {
    connection.connect(function (err) {
        if (err) {
          console.log(err.code);
          console.log(err.fatal);
        }
      });
    const userData = req.body.value; 
    console.log(req.body.value)
    
    const query = "INSERT INTO users (name, email, password, confirmpassword) VALUES ?";
    const values = [
      [
        userData.name,
        userData.email,
        userData.password,
        userData.confirmPassword
      ],
    ];
  
    
    connection.query(query, [values], (err, result) => {
      if (err) {
        console.error("Error inserting user data into MySQL database: ", err);
        res.status(500).json({ error: "An error occurred while saving user data" });
        return;
      }
  
      console.log("User data inserted successfully");
      res.status(200).json({ success: true, message: "User data saved successfully" });
    });
  });



//   appointment
app.post("/add-appointment", (req, res) => {
    connection.connect(function (err) {
        if (err) {
          console.log(err.code);
          console.log(err.fatal);
        }
      });
    const userData = req.body; 
    console.log(req.body)
    
    const query = "INSERT INTO appointment (name,mobileNumber, email, selectedDate, selectedTime) VALUES ?";
    const values = [
      [
        userData.name,
        userData.mobileNumber,
        userData.email,
        userData.selectedDate,
        userData.selectedTime
      ],
    ];
  
    
    connection.query(query, [values], (err, result) => {
      if (err) {
        console.error("Error inserting user data into MySQL database: ", err);
        res.status(500).json({ error: "An error occurred while saving user data" });
        return;
      }
  
      console.log("User data inserted successfully");
      res.status(200).json({ success: true, message: "User data saved successfully" });
    });
  });

  // subscriber
  app.post("/add-subscriber", (req, res) => {
    connection.connect(function (err) {
        if (err) {
          console.log(err.code);
          console.log(err.fatal);
        }
      });
    const userData = req.body; 
    console.log(req.body)
    
    const query = "INSERT INTO subscriber (email) VALUES ?";
    const values = [
      [
        userData.email,
      ],
    ];
  
    
    connection.query(query, [values], (err, result) => {
      if (err) {
        console.error("Error inserting user data into MySQL database: ", err);
        res.status(500).json({ error: "An error occurred while saving user data" });
        return;
      }
  
      console.log("User data inserted successfully");
      res.status(200).json({ success: true, message: "User data saved successfully" });
    });
  });

  // contact 
  app.post("/add-contact", (req, res) => {
    connection.connect(function (err) {
        if (err) {
          console.log(err.code);
          console.log(err.fatal);
        }
      });
    const userData = req.body.value; 
    console.log(req.body.value)
    
    const query = "INSERT INTO contact (name,email, subject, message) VALUES ?";
    const values = [
      [
        userData.name,
        userData.email,
        userData.subject,
        userData.message,
      ],
    ];
  
    
    connection.query(query, [values], (err, result) => {
      if (err) {
        console.error("Error inserting user data into MySQL database: ", err);
        res.status(500).json({ error: "An error occurred while saving user data" });
        return;
      }
  
      console.log("User data inserted successfully");
      res.status(200).json({ success: true, message: "User data saved successfully" });
    });
  });


  // login
 
  app.post("/login", (req, res) => {
    const { email, password } = req.body.value; 

    
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    
    connection.query("SELECT * FROM users WHERE email = ? AND password = ?", [email, password], (err, results) => {
        if (err) {
            console.error("Error querying database:", err);
            return res.status(500).json({ error: "An error occurred while logging in" });
        }

        
        if (results.length === 0) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

      
        res.status(200).json({ success: true, message: "Login successful" });
    });
});

// admin

app.post("/admin", (req, res) => {
  const { email, password } = req.body.value; 

  
  if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
  }

  
  connection.query("SELECT * FROM admin WHERE email = ? AND password = ?", [email, password], (err, results) => {
      if (err) {
          console.error("Error querying database:", err);
          return res.status(500).json({ error: "An error occurred while logging in" });
      }

      
      if (results.length === 0) {
      
          return res.status(401).json({ error: "Invalid email or password" });
      }
console.log(results);
    
      res.status(200).json({ success: true, message: "Admin Login successful" });
  });
});

  app.get("/all-booking", (req, res) => { 
    connection.connect(function (err) {
      if (err) {
        console.log(err.code);
        console.log(err.fatal);
      }
    });
    let UserData = connection.query(
      "SELECT * FROM appointment",
      function (err, rows, fields) {
        if (err) {
          console.log("An error occurred with the query");
          return;
        }
        console.log("All User Rows successfully executed");
        res.json(rows); 
      }
    );
    
  });

  app.get("/all-subscribers", (req, res) => { 
    connection.connect(function (err) {
      if (err) {
        console.log(err.code);
        console.log(err.fatal);
      }
    });
    let UserData = connection.query(
      "SELECT * FROM subscriber",
      function (err, rows, fields) {
        if (err) {
          console.log("An error occurred with the query");
          return;
        }
        console.log("All User Rows successfully executed");
        res.json(rows); 
      }
    );
    
  });


  
  

app.listen(3001)
