-- Insert 6 carts into the `carts` table
INSERT INTO carts (id, user_id, created_at, updated_at, status) VALUES
('1e6d2b5d-9f4f-4d27-8b1e-7d8c7a2f1a3e', '8a2f9d6e-3f4c-4b27-9e1d-7c8a9b2f1a3f', '2023-10-01', '2023-10-02', 'OPEN'),
('2c5d3b6e-8f4c-4d27-9e2d-7d8a9c2f1a4e', '7b1e9d6e-2f4c-4b27-9e1d-7c8a8b2f1a4f', '2023-10-03', '2023-10-04', 'ORDERED'),
('3d6b2c5e-7f4c-4d27-9e3d-7e8b9c2f1a5e', '6c2e8d7e-1f4c-4b27-9e1d-7d8a7b2f1a5f', '2023-10-05', '2023-10-06', 'OPEN'),
('4e7c3d6b-6f4c-4d27-9e4d-7f8a9c2f1a6e', '5d3e7c8e-0f4c-4b27-9e1d-7e8a6b2f1a6f', '2023-10-07', '2023-10-08', 'ORDERED'),
('5f8d4e7c-5f4c-4d27-9e5d-8a9b7c2f1a7e', '4e2f6d7e-9f4c-4b27-8e1d-6c7a5b2f1a7f', '2023-10-09', '2023-10-10', 'OPEN'),
('6a9e5f8d-4f4c-4d27-9e6d-9b8c7a2f1a8e', '3f1e5d6e-8f4c-4b27-7e1d-5b6a4c2f1a8f', '2023-10-11', '2023-10-12', 'ORDERED');

-- Insert 20 cart items into the `cart_items` table
INSERT INTO cart_items (cart_id, product_id, count) VALUES
-- Items for cart 1
('1e6d2b5d-9f4f-4d27-8b1e-7d8c7a2f1a3e', 'b1e6d2f4-3c4b-4d27-9e1d-7c8a9b2f1a3f', 2),
('1e6d2b5d-9f4f-4d27-8b1e-7d8c7a2f1a3e', 'c2f5d3e4-4c4b-4d27-9e2d-7d8a9c2f1a4e', 5),
('1e6d2b5d-9f4f-4d27-8b1e-7d8c7a2f1a3e', 'd3e6c4f5-5c4b-4d27-9e3d-7e8b9c2f1a5e', 1),
-- Items for cart 2
('2c5d3b6e-8f4c-4d27-9e2d-7d8a9c2f1a4e', 'e4f7d5b6-6c4b-4d27-9e4d-7f8a9c2f1a6e', 3),
('2c5d3b6e-8f4c-4d27-9e2d-7d8a9c2f1a4e', 'f5e8c6d7-7c4b-4d27-9e5d-8a9b7c2f1a7e', 4),
('2c5d3b6e-8f4c-4d27-9e2d-7d8a9c2f1a4e', 'a6f9d7e8-8c4b-4d27-9e6d-9b8c7a2f1a8e', 6),
-- Items for cart 3
('3d6b2c5e-7f4c-4d27-9e3d-7e8b9c2f1a5e', 'b7e1f6c8-9c4b-4d27-8e1d-6c7a5b2f1a7f', 7),
('3d6b2c5e-7f4c-4d27-9e3d-7e8b9c2f1a5e', 'c8f2d7e9-0c4b-4d27-7e1d-5b6a4c2f1a8f', 8),
('3d6b2c5e-7f4c-4d27-9e3d-7e8b9c2f1a5e', 'd9e3c8f1-1c4b-4d27-6e1d-4a5b3c2f1a9f', 9),
-- Items for cart 4
('4e7c3d6b-6f4c-4d27-9e4d-7f8a9c2f1a6e', 'e1f4d2c3-2c4b-4d27-5e1d-3a4b2c1f1a0f', 10),
('4e7c3d6b-6f4c-4d27-9e4d-7f8a9c2f1a6e', 'f2e5c3d4-3c4b-4d27-4e1d-2a3b1c0f1a1f', 11),
('4e7c3d6b-6f4c-4d27-9e4d-7f8a9c2f1a6e', 'a3f6b4e5-4c4b-4d27-3e1d-1a2b0c1f1a2f', 12),
-- Items for cart 5
('5f8d4e7c-5f4c-4d27-9e5d-8a9b7c2f1a7e', 'b4e7c5f6-5c4b-4d27-2e1d-0a1b2c3f1a3f', 13),
('5f8d4e7c-5f4c-4d27-9e5d-8a9b7c2f1a7e', 'c5f8d6e7-6c4b-4d27-1e1d-9a0b1c2f1a4f', 14),
('5f8d4e7c-5f4c-4d27-9e5d-8a9b7c2f1a7e', 'd6e9c7f8-7c4b-4d27-0e1d-8a9b0c1f1a5f', 15),
-- Items for cart 6
('6a9e5f8d-4f4c-4d27-9e6d-9b8c7a2f1a8e', 'e7f1d8c9-8c4b-4d27-9e1d-7a8b9c0f1a6f', 16),
('6a9e5f8d-4f4c-4d27-9e6d-9b8c7a2f1a8e', 'f8e2c9d1-9c4b-4d27-8e1d-6a7b8c9f1a7f', 17),
('6a9e5f8d-4f4c-4d27-9e6d-9b8c7a2f1a8e', 'a9f3b1e2-0c4b-4d27-7e1d-5a6b7c8f1a8f', 18),
('6a9e5f8d-4f4c-4d27-9e6d-9b8c7a2f1a8e', 'b1e4c2f3-1c4b-4d27-6e1d-4a5b6c7f1a9f', 19),
('6a9e5f8d-4f4c-4d27-9e6d-9b8c7a2f1a8e', 'c2f5d3e4-2c4b-4d27-5e1d-3a4b5c6f1a0f', 20);