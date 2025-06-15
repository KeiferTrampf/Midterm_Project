import { Router } from "express";
import noteController from "../controllers/noteController.js";
import userController from "../controllers/userController.js";
import authController from "../controllers/authController.js";
import { catchErrors } from "../handlers/errorHandlers.js";
// import devCont from "../controllers/devCont.js";

export const router = Router();

router.get(
  "/",
  authController.isAuthenticated,
  catchErrors(noteController.homePage)
);

router.get(
  "/notes",
  authController.isAuthenticated,
  catchErrors(noteController.getNotes)
);

// router.get("/dev", authController.isAuthenticated, catchErrors(devCont.devRen)); // dev route for testing

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
router.get(
  "/note/:slug",
  authController.isAuthenticated,
  catchErrors(noteController.viewNote)
);
router.get(
  "/note/:slug/edit",
  authController.isAuthenticated,
  catchErrors(noteController.editNote)
);
router.post(
  "/note/:slug/edit",
  // noteController.upload,
  // catchErrors(noteController.resize),
  catchErrors(noteController.updateNote)
);
router.delete(
  "/note/:id",
  authController.isAuthenticated,
  catchErrors(noteController.deleteNote)
);
router.get(
  "/register",
  userController.preventAuthRegister,
  catchErrors(userController.registerForm)
);
router.post(
  "/register",
  userController.validateRegister,
  userController.register
);
router.get("/login", catchErrors(userController.loginForm));
router.post("/login", authController.login);
router.get(
  "/logout",
  authController.isAuthenticated,
  catchErrors(authController.logout)
);
router.get(
  "/deactivate",
  authController.isAuthenticated,
  catchErrors(userController.deactivateForm)
);
router.post(
  "/deactivate",
  authController.isAuthenticated,
  catchErrors(userController.deactivateAccount)
);
