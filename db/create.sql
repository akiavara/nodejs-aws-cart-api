create extension if not exists "uuid-ossp";

create type cart_statuses as enum ('OPEN', 'ORDERED');
create type order_statuses as enum ('OPEN', 'APPROVED', 'CONFIRMED', 'SENT', 'COMPLETED', 'CANCELLED');

CREATE TABLE product (
    id UUID primary key,
    title VARCHAR(255) not null,
    description TEXT,
    price NUMERIC(10, 2) not null check (price >= 0)
);

CREATE TABLE stock (
    product_id UUID primary key references product(id) on delete cascade,
    count INTEGER not null check (count >= 0)
);

create table users (
    id UUID not null default uuid_generate_v4() primary key,
    name varchar(255) not null,
    password varchar(255) not null
);

create table carts (
    id UUID not null default uuid_generate_v4() primary key,
    user_id UUID not null references users(id) on delete cascade,
    created_at timestamp not null default now(),
    updated_at timestamp not null default now(),
    status cart_statuses not null
);

CREATE TABLE cart_items (
    id UUID NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
    cart_id UUID NOT NULL REFERENCES carts(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES product(id) ON DELETE CASCADE,
    count INTEGER NOT NULL CHECK (count >= 0)
);

CREATE TABLE orders (
    id UUID NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    payment JSON NOT NULL,
    delivery JSON NOT NULL,
    comments TEXT,
    status order_statuses not null,
    total NUMERIC(10, 2) NOT NULL CHECK (total >= 0)
);