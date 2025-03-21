-- Enable the uuid-ossp extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Insert 5 users
INSERT INTO users (id, name, password) VALUES
(uuid_generate_v4(), 'User 1', 'TEST_PASSWORD'),
(uuid_generate_v4(), 'User 2', 'TEST_PASSWORD'),
(uuid_generate_v4(), 'User 3', 'TEST_PASSWORD'),
(uuid_generate_v4(), 'User 4', 'TEST_PASSWORD'),
(uuid_generate_v4(), 'User 5', 'TEST_PASSWORD');

-- Insert 10 products
INSERT INTO product (id, title, description, price) VALUES
('3d3b5df5-6005-45dd-935c-23bc7455970d', 'Gaming Keyboard K1', 'Mechanical gaming keyboard with RGB lighting', 159),
('8109a904-1c3c-4a6b-a308-4ac054a56ab1', 'Call of Duty: Modern Warfare', 'First-person shooter game for PlayStation 4', 49.99),
('7bd0828c-4e30-4ff4-9827-78cc1bf8dc76', 'Animal Crossing: New Horizons', 'Life simulation game for Nintendo Switch', 59.99),
('9e347891-7056-419e-91d5-d58bfbd35e17', 'The Legend of Zelda: Breath of the Wild', 'Open-world action-adventure game for Nintendo Switch', 59.99);

-- Insert 10 stock entries
INSERT INTO stock (product_id, count) VALUES
((SELECT id FROM product LIMIT 1 OFFSET 0), 100),
((SELECT id FROM product LIMIT 1 OFFSET 1), 200),
((SELECT id FROM product LIMIT 1 OFFSET 2), 300),
((SELECT id FROM product LIMIT 1 OFFSET 3), 400);