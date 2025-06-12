import userHandler from "../handlers/userHandler.js";
import { body, validationResult } from "express-validator";

const registerForm = async (req, res) => {
  res.render("register", { title: "Register" });
};

const register = async (req, res) => {
  const callback = (err, newUser) => {
    if (err) {
      res.redirect("/register");
    } else {
      res.redirect("/login");
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
    console.log(">>> errors is: ", errors)
    if (!errors.isEmpty()) {
      console.log("inside conditional ")
      req.flash("danger", errors.errors.map((err) => err.msg).join(". "));
      res.render("register", { title: "Register", flashes: req.flash() });
    } else {
      next();
    }
  },
];

const loginForm = async (req, res) => {
  res.render("login", { title: "Login" });
};

export default {
  registerForm,
  register,
  validateRegister,
  loginForm,
};
