import { Router } from "express";
import noteController from "../controllers/noteController.js";
import userController from "../controllers/userController.js";
import authController from "../controllers/authController.js";
import { catchErrors } from "../handlers/errorHandlers.js";
import devCont from "../controllers/devCont.js";

export const router = Router();

router.get("/", catchErrors(noteController.homePage));

router.get("/notes", catchErrors(noteController.getNotes));

router.get("/dev", authController.isAuthenticated, catchErrors(devCont.devRen)); // dev route for testing

router.get("/register", userController.registerForm);
router.post(
  "/register",
  catchErrors(userController.validateRegister),
  catchErrors(userController.register)
);
router.get("/login", userController.loginForm);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

router.get(
  "/add",
  authController.isAuthenticated,
  catchErrors(noteController.addNote)
);
router.post(
  "/add",
  noteController.upload,
  catchErrors(noteController.resize),
  catchErrors(noteController.createNote)
);
