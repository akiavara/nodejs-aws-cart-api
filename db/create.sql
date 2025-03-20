create extension if not exists "uuid-ossp";

create type statuses as enum ('OPEN', 'ORDERED');

create table users (
  id UUID not null default uuid_generate_v4() primary key,
  name varchar(255) not null,
  password varchar(255) not null
);

create table carts (
	id UUID not null default uuid_generate_v4() primary key,
    user_id UUID not null references users(id) on delete cascade,
    created_at DATE not null,
    updated_at DATE not null,
    status statuses not null
);


create table cart_items (
    cart_id UUID not null references carts(id) on delete cascade,
    product_id UUID not null,
    count INTEGER not null check (count >= 0),
    primary key (cart_id, product_id)
);

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