-- Enable the uuid-ossp extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Insert 5 users
INSERT INTO users (id, name, password) VALUES
(uuid_generate_v4(), 'User 1', 'TEST_PASSWORD'),
(uuid_generate_v4(), 'User 2', 'TEST_PASSWORD'),
(uuid_generate_v4(), 'User 3', 'TEST_PASSWORD'),
(uuid_generate_v4(), 'User 4', 'TEST_PASSWORD'),
(uuid_generate_v4(), 'User 5', 'TEST_PASSWORD');

-- Insert 5 carts
INSERT INTO carts (id, user_id, created_at, updated_at, status) VALUES
(uuid_generate_v4(), (SELECT id FROM users LIMIT 1 OFFSET 0), NOW(), NOW(), 'OPEN'),
(uuid_generate_v4(), (SELECT id FROM users LIMIT 1 OFFSET 1), NOW(), NOW(), 'ORDERED'),
(uuid_generate_v4(), (SELECT id FROM users LIMIT 1 OFFSET 2), NOW(), NOW(), 'OPEN'),
(uuid_generate_v4(), (SELECT id FROM users LIMIT 1 OFFSET 3), NOW(), NOW(), 'ORDERED'),
(uuid_generate_v4(), (SELECT id FROM users LIMIT 1 OFFSET 4), NOW(), NOW(), 'OPEN');

-- Insert 10 products
INSERT INTO product (id, title, description, price) VALUES
(uuid_generate_v4(), 'Product 1', 'Description for Product 1', 10.00),
(uuid_generate_v4(), 'Product 2', 'Description for Product 2', 20.00),
(uuid_generate_v4(), 'Product 3', 'Description for Product 3', 30.00),
(uuid_generate_v4(), 'Product 4', 'Description for Product 4', 40.00),
(uuid_generate_v4(), 'Product 5', 'Description for Product 5', 50.00),
(uuid_generate_v4(), 'Product 6', 'Description for Product 6', 60.00),
(uuid_generate_v4(), 'Product 7', 'Description for Product 7', 70.00),
(uuid_generate_v4(), 'Product 8', 'Description for Product 8', 80.00),
(uuid_generate_v4(), 'Product 9', 'Description for Product 9', 90.00),
(uuid_generate_v4(), 'Product 10', 'Description for Product 10', 100.00);

-- Insert 10 stock entries
INSERT INTO stock (product_id, count) VALUES
((SELECT id FROM product LIMIT 1 OFFSET 0), 100),
((SELECT id FROM product LIMIT 1 OFFSET 1), 200),
((SELECT id FROM product LIMIT 1 OFFSET 2), 300),
((SELECT id FROM product LIMIT 1 OFFSET 3), 400),
((SELECT id FROM product LIMIT 1 OFFSET 4), 500),
((SELECT id FROM product LIMIT 1 OFFSET 5), 600),
((SELECT id FROM product LIMIT 1 OFFSET 6), 700),
((SELECT id FROM product LIMIT 1 OFFSET 7), 800),
((SELECT id FROM product LIMIT 1 OFFSET 8), 900),
((SELECT id FROM product LIMIT 1 OFFSET 9), 1000);

-- Insert 10 cart_items
INSERT INTO cart_items (cart_id, product_id, count) VALUES
((SELECT id FROM carts LIMIT 1 OFFSET 0), (SELECT id FROM product LIMIT 1 OFFSET 0), 2),
((SELECT id FROM carts LIMIT 1 OFFSET 0), (SELECT id FROM product LIMIT 1 OFFSET 1), 3),
((SELECT id FROM carts LIMIT 1 OFFSET 1), (SELECT id FROM product LIMIT 1 OFFSET 2), 1),
((SELECT id FROM carts LIMIT 1 OFFSET 1), (SELECT id FROM product LIMIT 1 OFFSET 3), 4),
((SELECT id FROM carts LIMIT 1 OFFSET 2), (SELECT id FROM product LIMIT 1 OFFSET 4), 5),
((SELECT id FROM carts LIMIT 1 OFFSET 2), (SELECT id FROM product LIMIT 1 OFFSET 5), 6),
((SELECT id FROM carts LIMIT 1 OFFSET 3), (SELECT id FROM product LIMIT 1 OFFSET 6), 7),
((SELECT id FROM carts LIMIT 1 OFFSET 3), (SELECT id FROM product LIMIT 1 OFFSET 7), 8),
((SELECT id FROM carts LIMIT 1 OFFSET 4), (SELECT id FROM product LIMIT 1 OFFSET 8), 9),
((SELECT id FROM carts LIMIT 1 OFFSET 4), (SELECT id FROM product LIMIT 1 OFFSET 9), 10);