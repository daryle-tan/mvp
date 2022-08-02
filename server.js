import express from "express";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.static("static"));

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ...(process.env.NODE_ENV === "production"
    ? {
        ssl: {
          rejectUnauthorized: false,
        },
      }
    : {}),
});

// const URL = `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd`
// app.get(URL, (req, res, next) => {
//   pool.query("SELECT * FROM v3").then((result) => {
//     res.send(result.rows)
//   })
//     .catch(next);
// });

app.get("/api/crypto", (req, res, next) => {
  pool
    .query("SELECT * FROM crypto")
    .then((result) => {
      res.send(result.rows);
      console.log(result)
    })
    .catch(next);
});

app.get("/api/crypto/:id", (req, res, next) => {
  const id = req.params.id;
  pool
    .query("SELECT * FROM crypto WHERE id = $1;", [id])
    .then((data) => {
      const asset = data.rows[0];
      if (asset) {
        res.send(asset);
      } else {
        res.sendStatus(404);
      }
    })
    .catch(next);
});

app.post("/api/crypto", (req, res, next) => {
 
   const name = req.body.name
   const amount_invested = req.body.amount_invested
   const price_at_purchase = req.body.price_at_purchase
   const date_purchased = req.body.date_purchased
   const tokens_owned = req.body.tokens_owned
  
  pool
    .query("INSERT INTO crypto(name, amount_invested, price_at_purchase, date_purchased, tokens_owned) VALUES($1, $2, $3, $4, $5) RETURNING *;",
      [name, amount_invested, price_at_purchase, date_purchased, tokens_owned])
    .then((data) => {
      if (req.body) {
        res.send(data);
        console.log(data);
      } else {
        res.sendStatus(400);
      }
    })
    .catch(next);
});

app.delete("/api/crypto/:id", (req, res, next) => {
  const id = req.params.id;
  pool
    .query("DELETE FROM crypto WHERE id = $1 RETURNING *;", [id])
    .then((data) => {
      console.log(data);
      if (data.rows.length === 0) {
        res.sendStatus(404);
      } else {
        res.send(data.rows[0]);
      }
    })
    .catch(next);
});

app.use((err, req, res, next) => {
  return res
    .set("content-type", "text/plain")
    .status(500)
    .send("Internal Server Error");
});

app.listen(PORT, () => {
  console.log(`listening to ${PORT}`);
});
