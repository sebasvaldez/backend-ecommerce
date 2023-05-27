import { Router } from "express";
import{getUsers,getUser,createUser, deleteUser, updateUser} from "../controllers/users.controllers.js"

const router = Router();

//CRUD para los usuarios (admin + vendedores)

router.get("/users", getUsers);

router.get("/users/:id", getUser);

router.post("/users", createUser);

router.delete("/users/:id", deleteUser);

router.patch("/users/:id", updateUser);

export default router;
