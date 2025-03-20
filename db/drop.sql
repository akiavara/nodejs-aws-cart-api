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

-- Drop the statuses enum type
DROP TYPE IF EXISTS statuses CASCADE;

-- Drop the uuid-ossp extension
DROP EXTENSION IF EXISTS "uuid-ossp";