DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INTEGER AUTO_INCREMENT,
    product_name VARCHAR(100),
    department_name VARCHAR(100),
    price DECIMAL(10,2),
    stock_quantity INTEGER,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('3-in-1 Breakfast Maker', 'Food Prep', 69.99, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('The AB-Hancer', 'Misc', 49.99, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Reef Sandals', 'Clothing', 19.99, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Bacon Bandages', 'Misc', 5.99, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('The Amazing Banana Slicer', 'Food Prep', 8.99, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Bath Mat That Turns Red When Wet', 'Misc', 35.99, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Nicolas Cage Hoodie', 'Clothing', 19.99, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('The Cherry Chomper Pitter', 'Food Prep', 17.99, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('The Corn Kerneler Kitchen Tool', 'Food Prep', 9.99, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Disco Ball Helmet', 'Clothing', 219.99, 50);



SELECT * FROM products;