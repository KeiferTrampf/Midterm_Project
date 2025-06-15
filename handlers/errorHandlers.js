export const catchErrors = (fn) => {
  return function (req, res, next) {
    return fn(req, res, next).catch(next);
  };
};

export const notFound = (req, res, next) => {
  const err = new Error("⚠️ Not Found");
  err.status = 404;
  console.error("Not Found Error:", err);
  req.flash("error", "Whoops! That didn't work. Please try again.");
  res.redirect("/");
};

export const flashValidationErrors = (err, req, res, next) => {
  if (!err.errors) return next(err);
  console.error("Validation errors:", err.errors);

  const errorKeys = Object.keys(err.errors);
  console.log("my errorkeys: ", errorKeys);
  errorKeys.forEach((key) => req.flash("error", err.errors[key].message));
  res.redirect("/");
};
