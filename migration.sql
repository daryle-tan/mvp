DROP TABLE IF EXISTS crypto;

CREATE TABLE crypto (
    id SERIAL PRIMARY KEY,
    name TEXT,
    amount_invested MONEY,
    price_at_purchase MONEY,
    date_purchased DATE,
    tokens_owned INT
);