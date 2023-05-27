import express from "express";
import productsRoutes from "./routes/products.routes.js";
import userRoutes from "./routes/users.routes.js";
import indexRoutes from "./routes/index.routes.js";

const app = express();

app.use(express.json());

app.use(indexRoutes);
app.use(productsRoutes);
app.use(userRoutes);

app.listen(4000);
console.log("Server is running on port 4000");
