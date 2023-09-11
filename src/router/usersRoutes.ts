import express from "express";
const router = express.Router();
import {getUsers,createUser,updateUser,deleteUser,getUserById
} from "../controllers/usersController"
router.route("/")
    .get(getUsers)
    .post(createUser);
    
    router.route("/:id")
    .put(updateUser)
    .delete(deleteUser)
    .get(getUserById)
    module.exports = router;