import { pool } from "../db.js";

//muestra todos los usuarios
export const getUsers = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM usuarios ");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Falló la consulta" });
  }
};

export const createUser = async (req, res) => {
  try {
    const { nombre, usuario, password } = req.body;
    const [rows] = await pool.query(
      "INSERT INTO usuarios (nombre,usuario,password) VALUES(?,?,?)",
      [nombre, usuario, password]
    );
    res.send(rows);
  } catch (error) {
    res.status(500).json({ message: "Falló la consulta" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, usuario, password } = req.body;
    const [result] = await pool.query(
      "UPDATE usuarios SET nombre=IFNULL(?, nombre), usuario= IFNULL(?, usuario), password=IFNULL(?, password) WHERE id=?",
      [nombre, usuario, password, id]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Usuario no encontrado" });

    res.send("Usuario actualizado con exito");
    console.log(result);
  } catch (error) {
    res.status(500).json({ message: "Falló la consulta" });
  }
};

export const deleteUser = (req, res) => {
  const { id } = req.params;

  try {
    const result = pool.query("DELETE FROM usuarios WHERE id=?", [id]);
    if (result.affectedRows > 0) {
      return res.send("Usuario borrado");
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Falló la consulta" });
  }
};


//Aun no sé si usaré esta consulta...
export const getUser = (req, res) => res.send("Obteniendo 1 usuario");
