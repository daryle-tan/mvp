import express from "express";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

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

app.get("/api/mvp", (req, res, next) => {
  pool
    .query("SELECT * FROM crypto")
    .then((result) => {
      res.send(result.rows);
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

app.use((err, req, res, next) => {
  return res
    .set("content-type", "text/plain")
    .status(500)
    .send("Internal Server Error");
});

app.listen(PORT, () => {
  console.log(`listening to ${PORT}`);
});
