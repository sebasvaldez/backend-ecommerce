import express from "express";
import cors from "cors";
import productsRoutes from "./routes/products.routes.js";
import userRoutes from "./routes/users.routes.js";
import indexRoutes from "./routes/index.routes.js";


const app = express();

app.use(cors());
app.use(express.json());

app.use(indexRoutes);
app.use("/api/", productsRoutes);
app.use("/api/", userRoutes);

//entra aqui si consulta una ruta que no existe
app.use((req, res, next) => {
  res.status(404).json({ message: "Endpoint no encontrada" });
});

export default app;