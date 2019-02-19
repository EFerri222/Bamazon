// Dependencies
var mysql = require('mysql');
var inquirer = require('inquirer');
var chosenID;
var chosenQuantity;

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "2Twenty2",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        for (var i = 0; i < results.length; i++) {
            console.log("Item ID: " + results[i].item_id +
            "\nProduct Name: " + results[i].product_name +
            "\nPrice: " + results[i].price +
            "\n--------------");
        }
        askID();
    });
});

function askID() {
    inquirer
        .prompt({
            name: "id",
            type: "input",
            message: "What is the product ID of the item you'd like to purchase?"
        })
        .then(function(answer) {
            if (answer.id > 10) {
                console.log("Sorry, that number is not valid. Try Again.");
                askID();
            } else {
                chosenID = answer.id;
                askQuantity();
            }
        });
}

function askQuantity() {
    inquirer
        .prompt({
            name: "quantity",
            type: "input",
            message: "How many would you like to buy?"  
        })
        .then(function(answer) {
            chosenQuantity = answer.quantity;
            connection.query("SELECT stock_quantity FROM products WHERE item_id = " + chosenID, function(err, res) {
                if (err) throw err;
                if (res[0].stock_quantity < chosenQuantity) {
                    console.log("Insufficient quantity! Try again.");
                    askQuantity();
                } else {
                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                          {
                            stock_quantity: res[0].stock_quantity - chosenQuantity
                          },
                          {
                            item_id: chosenID
                          }
                        ]
                      );
                    connection.query("SELECT price FROM products WHERE item_id = " + chosenID, function(err, res) {
                        if (err) throw err;
                        console.log("The total price of your purchase is: " + chosenQuantity * res[0].price);
                        connection.end();
                    })
                }
            });
        });
}