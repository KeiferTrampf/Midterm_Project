import passport from "passport";

const login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash("danger", "⚠️ Invalid Login");
      return res.render("login", { title: "Login", flashes: req.flash() });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect("/notes");
    });
  })(req, res, next);
};

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
