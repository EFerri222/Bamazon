// Dependencies
var mysql = require('mysql');
var inquirer = require('inquirer');
var chosenID;
var chosenQuantity;
var updatedQuantity;

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "2Twenty2",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    start();
});

function start() {
    inquirer
        .prompt({
            name: "start",
            type: "list",
            message: "Welcome to the Bamazon Manager Portal!",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"]
        })
        .then(function(answer) {
            if (answer.start === "View Products for Sale") {
                viewProducts();
            } else if (answer.start === "View Low Inventory") {
                viewLowInventory();
            } else if (answer.start === "Add to Inventory") {
                askQuantity();
            } else if (answer.start === "Add New Product") {
                addNewProduct();
            } else if (answer.start === "Exit") {
                connection.end();
            }
        });
}

function viewProducts() {
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        for (var i = 0; i < results.length; i++) {
            console.log("Item ID: " + results[i].item_id +
            "\nProduct Name: " + results[i].product_name +
            "\nPrice: " + results[i].price +
            "\nQuantity in Stock: " + results[i].stock_quantity +
            "\n--------------");
        }
        start();
    });
}

function viewLowInventory() {
    console.log("These items are low on inventory:\n");
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(err, results) {
        if (err) throw err;
        for (var i = 0; i < results.length; i++) {
            console.log("\nProduct Name: " + results[i].product_name +
            "\nQuantity in Stock: " + results[i].stock_quantity +
            "\n--------------");
        }
        start();
    });
}

function askQuantity() {
    inquirer
    .prompt({
        name: "id",
        type: "input",
        message: "Enter the product ID of the item you'd like to add to inventory:"
    })
    .then(function(answer) {
            chosenID = answer.id;
            askID();
    });
}

function askID() {
    inquirer
    .prompt({
        name: "quantity",
        type: "input",
        message: "Enter the quantity to add to inventory:"  
    })
    .then(function(answer) {
        chosenQuantity = answer.quantity;
        connection.query("SELECT stock_quantity FROM products WHERE item_id = " + chosenID, function(err, res) {
            if (err) throw err;
            connection.query(
                "UPDATE products SET ? WHERE ?",
                [
                    {
                    stock_quantity: parseInt(res[0].stock_quantity) + parseInt(chosenQuantity)
                    },
                    {
                    item_id: chosenID
                    }
                ]
                );
            updatedQuantity = parseInt(res[0].stock_quantity) + parseInt(chosenQuantity);
            connection.query("SELECT price FROM products WHERE item_id = " + chosenID, function(err, res) {
                if (err) throw err;
                console.log(answer.quantity + " units added to inventory!\n--------------")
                start();
            })
        });
    });
}

function addNewProduct() {
    // prompt for info about the product being added
    inquirer
      .prompt([
        {
          name: "productName",
          type: "input",
          message: "What is the name of the product you'd like to add?"
        },
        {
          name: "department",
          type: "input",
          message: "What department is this product in?"
        },
        {
          name: "price",
          type: "input",
          message: "What is the price of this product?"
        },
        {
          name: "quantity",
          type: "input",
          message: "How many units of the product are available in stores?"
        }
      ])
      .then(function(answer) {
        // when finished prompting, insert a new item into the db with that info
        connection.query(
          "INSERT INTO products SET ?",
          {
            product_name: answer.productName,
            department_name: answer.department,
            price: answer.price,
            stock_quantity: answer.quantity
          },
          function(err) {
            if (err) throw err;
            console.log("Your product was added successfully!");
            start();
          }
        );
      });
  }