import { query } from "express";
import { pool } from "../db.js";

//obtiene todos los productos cargados de la base de datos.
export const getProducts = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM productos");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Falló la consulta" });
  }
};

//ingresar un nuevo producto

export const createProduct = async (req, res) => {
  try {
    const { url_imagen, stock, nombre, descripcion, precio, categoria_id } =
      req.body;
    const [rows] = await pool.query(
      "INSERT INTO productos (url_imagen, stock, nombre, descripcion,precio, categoria_id) VALUES (?,?,?,?,?,?)",
      [url_imagen, stock, nombre, descripcion, precio, categoria_id]
    );
    res.send({ rows });
  } catch (error) {
    return res.status(500).json({ message: "Falló la consulta" });
  }
};

//actualiza la informacion de un producto ya cargado
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { url_imagen, stock, nombre, descripcion, precio, categoria_id } =
      req.body;

    const [result] = await pool.query(
      "UPDATE productos SET url_imagen=IFNULL(?,url_imagen), stock=IFNULL(?,stock), nombre=IFNULL(?,nombre), descripcion=IFNULL(?,descripcion), precio=IFNULL(?,precio), categoria_id=IFNULL(?,categoria_id) WHERE id=?",
      [url_imagen, stock, nombre, descripcion, precio, categoria_id, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Producto no encontrado" });

    res.send("Producto actualizado con exito!");
  } catch (error) {
    return res.status(500).json({ message: "Falló la consulta" });
  }
};

//Borra un producto por su "id"
export const deleteProduct = async (req, res) => {
  try {
    const result = await pool.query("DELETE FROM productos WHERE id=?", [
      req.params.id,
    ]);

    if (result.affctedRows > 0) {
      res.send("Producto borrado");
    } else {
      res.status(404).json({ message: "producto no encontrado" });
    }
    console.log(result);
  } catch (error) {
    return res.status(500).json({ message: "Falló la consulta" });
  }
};

//obtiene un producto por su id
export const getProduct = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM productos WHERE id=?", [
      req.params.id,
    ]);

    //si el id no enxiste devuele este mensaje

    if (rows.length <= 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Falló la consulta" });
  }
};

//busca productos por palabras clave en las columnas de "nombre" y "descripcion"

export const findProducts = async (req, res) => {
  try {
    const consulta = req.query.q;
    const [rows] = await pool.query(
      "SELECT * FROM productos WHERE nombre LIKE ? OR descripcion LIKE ?",
      [`%${consulta}%`, `%${consulta}%`]
    );

    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Falló la consulta" });
  }
};
