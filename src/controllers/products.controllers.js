import { pool } from "../db.js";

export const getProducts = (req, res) =>
  res.send("Obteniendo el listado de productos");

export const createProduct = async (req, res) => {
  const { url_imagen, stock, nombre, descripcion, precio, cateogria_id } =
    req.body;


    

  const [rows] = await pool.query(
    "INSERT INTO productos (url_imagen, stock, nombre, descripcion,precio, categoria_id) VALUES (?,?,?,?,?,?)",
    [url_imagen, stock, nombre, descripcion, precio, cateogria_id]
  );
  res.send({ rows });
};

export const updateProduct = (req, res) => res.send("actualizando producto");

export const deleteProduct = (req, res) => res.send("Borando producto");

export const getProduct = (req, res) => res.send("Obteniendo 1 producto");
