-- Drop the cart_items table first (depends on carts)
DROP TABLE IF EXISTS cart_items CASCADE;

-- Drop the carts table (depends on users)
DROP TABLE IF EXISTS carts CASCADE;

-- Drop the stock table first (depends on product)
DROP TABLE IF EXISTS stock CASCADE;

-- Drop the product table
DROP TABLE IF EXISTS product CASCADE;

-- Drop the users table
DROP TABLE IF EXISTS users CASCADE;

-- Drop the orders table
DROP TABLE IF EXISTS orders CASCADE;

-- Drop the order_items table
DROP TABLE IF EXISTS order_items CASCADE;

-- Drop the statuses enum type
DROP TYPE IF EXISTS cart_statuses CASCADE;
DROP TYPE IF EXISTS order_statuses CASCADE;