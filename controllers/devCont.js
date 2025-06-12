import noteHandler from "../handlers/noteHandler.js";
import multer from "multer";
import { Jimp } from "jimp";
import { v4 as uuidv4 } from "uuid";

const devRen = async (req, res) => {
  res.render("splash", { title: "Dev Render" });
};
export default {
  devRen,
};
