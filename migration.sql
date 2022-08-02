DROP TABLE IF EXISTS crypto;

CREATE TABLE crypto (
    id SERIAL PRIMARY KEY,
    name TEXT,
    amount_invested MONEY,
    price_at_purchase MONEY,
    date_purchased DATE,
    tokens_owned NUMERIC
);

INSERT INTO crypto (name, amount_invested, price_at_purchase, date_purchased, tokens_owned) 
VALUES ('bitcoin', 100, 22000, '2022-08-01', .001);
