import { Router } from "express";

const router = Router();
import {
  addMovie,
  getAllSavedMovies,
  getUsers,
  removeMovie,
} from "../controllers/userControllers";
router.route("/users").get(getUsers);
router.route("/addmovie").patch(addMovie);
router.route("/removemovie").delete(removeMovie);
router.route("/getallsavedmovies").get(getAllSavedMovies);
export default router;
