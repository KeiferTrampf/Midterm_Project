import User from "../models/userModel.js";

const register = async ({ username, password, name, callback }) => {
  await User.register(new User({ username, name }), password, callback);
};
const login = async ({ username, password, callback }) => {
  await User.authenticate()(username, password, callback);
};
const deactivateAccount = async ({ userId, callback }) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      return callback(new Error("User not found"));
    }

    await user.deleteOne(); // more explicit than remove()

    return callback(null); // explicit return for clarity
  } catch (error) {
    return callback(error);
  }
};

export default {
  register,
  login,
  deactivateAccount,
};
