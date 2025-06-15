import userHandler from "../handlers/userHandler.js";
import { body, validationResult } from "express-validator";
import authController from "./authController.js";

const registerForm = async (req, res) => {
  res.render("register", { title: "Register", flashes: req.flash() });
};

const register = async (req, res) => {
  const callback = (err, newUser) => {
    if (err) {
      req.flash(
        "danger",
        "There was an error registering your account. Please try again."
      );
      res.render("register", {
        title: "Register",
        flashes: req.flash(),
      });
      console.error("Registration error:", err);
    } else {
      req.flash("success", "Your account has been created successfully!");
      res.render("login", {
        title: "Login",
        flashes: req.flash(),
      });
      console.log("New user registered:", newUser);
    }
  };

  await userHandler.register({
    username: req.body.username,
    password: req.body.password,
    callback,
  });
};

const validateRegister = [
  body("username").notEmpty().withMessage("Email address is required"),
  body("username").isEmail().withMessage("Please provide a valid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  body("confirm-password")
    .isLength({ min: 6 })
    .withMessage("Confirm Password must be at least 6 characters"),
  body("confirm-password")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("Password does not match Confirm Password"),
  (req, res, next) => {
    const errors = validationResult(req);
    console.log(">>> errors is: ", errors);
    if (!errors.isEmpty()) {
      console.log("inside conditional ");
      req.flash("danger", errors.errors.map((err) => err.msg).join(". "));
      res.render("register", { title: "Register", flashes: req.flash() });
    } else {
      next();
    }
  },
];

const loginForm = async (req, res) => {
  res.render("login", { title: "Login", flashes: req.flash() });
};
const login = async (req, res) => {
  const callback = (err, user) => {
    if (err) {
      req.flash("danger", "There was an error logging in. Please try again.");
      res.render("login", { title: "Login", flashes: req.flash() });
      console.error("Login error:", err);
    } else if (!user) {
      req.flash("danger", "Invalid email or password.");
      res.render("login", { title: "Login", flashes: req.flash() });
    } else {
      req.flash("success", "You are now logged in!");
      res.redirect("/notes");
    }
  };

  await userHandler.login({
    username: req.body.username,
    password: req.body.password,
    callback,
  });
};

const preventAuthRegister = (req, res, next) => {
  if (req.isAuthenticated()) {
    req.flash("info", "You are already logged in.");
    return res.redirect("/notes");
  }
  next();
};
const deactivateForm = async (req, res) => {
  res.render("deactivate", {
    title: "Deactivate Account",
    flashes: req.flash(),
  });
};
const deactivateAccount = async (req, res) => {
  const callback = (err) => {
    if (err) {
      req.flash("danger", "There was an error deactivating your account.");
      res.render("deactivate", {
        title: "Deactivate Account",
        flashes: req.flash(),
      });
      console.error("Deactivation error:", err);
    } else {
      req.logout((err) => {
        if (err) {
          return next(err);
        }
        req.flash("success", "Your account has been deactivated.");
        res.redirect("/");
      });
    }
  };

  await userHandler.deactivateAccount({ userId: req.user.id, callback });
};
export default {
  registerForm,
  register,
  validateRegister,
  loginForm,
  login,
  preventAuthRegister,
  deactivateForm,
  deactivateAccount,
};
