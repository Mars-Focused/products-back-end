require("dotenv").config();
const express = require("express");
const app = express();
const massive = require("massive");
const products_controller = require("./products_controller");

const { SERVER_PORT, CONNECTION_STRING } = process.env;

app.post("/api/products", products_controller.create);
app.get("/api/products", products_controller.getAll);
app.get("/api/products/:id", products_controller.getOne);
app.put("/api/products/:id", products_controller.update);
app.delete("/api/products/:id", products_controller.delete);

app.use(express.json());

massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false },
})
  .then((dbInstance) => {
    console.log(`DB Working Master Nya~ =^w^=`);
    app.set("db", dbInstance);

    app.listen(SERVER_PORT, () => {
      console.log(`Port ${SERVER_PORT} ready Master Nya~ =^w^=`);
    });
  })
  .catch((err) => console.log(err));
