// Dependencies
var mysql = require('mysql');
var inquirer = require('inquirer');

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
            message: "What is the ID number of the item you'd like to purchase? (Enter 1-10)"
        })
        .then(function(answer) {
            if (answer.id === "1") {
                console.log("You would like to buy item 1");
            } else if (answer.id==="2") {
                console.log("You would like to buy item 2");
            } else if (answer.id==="3") {
                console.log("You would like to buy item 3");
            } else if (answer.id==="4") {
                console.log("You would like to buy item 4");
            } else if (answer.id==="5") {
                console.log("You would like to buy item 5");
            } else if (answer.id==="6") {
                console.log("You would like to buy item 6");
            } else if (answer.id==="7") {
                console.log("You would like to buy item 7");
            } else if (answer.id==="8") {
                console.log("You would like to buy item 8");
            } else if (answer.id==="9") {
                console.log("You would like to buy item 9");
            } else if (answer.id==="10") {
                console.log("You would like to buy item 10");
            }
            askQuantity();
        });
}

function askQuantity() {
    inquirer
        .prompt({
            name: "quantity",
            type: "input",
            message: "How many would you like to buy?"  
        })
    connection.end();
}