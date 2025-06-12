import passport from "passport";

const login = passport.authenticate("local", {
  successRedirect: "/notes",
  failureRedirect: "/login",
  failuresFlash: "⚠️ Invalid Login",
});

const logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
  });
  req.flash("success", "👋 You have logged out");
  res.redirect("/");
};

const isAuthenticated = async (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  req.flash("danger", "Please login.");
  res.redirect("/login");
};

export default {
  login,
  logout,
  isAuthenticated,
};
