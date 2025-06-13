import noteHandler from "../handlers/noteHandler.js";
import multer from "multer";
import { Jimp } from "jimp";
import { v4 as uuidv4 } from "uuid";

const CLASS = [
  "Journal",
  "Meeting Minutes",
  "Technical Notes",
  "Academic Notes",
  "Reminders/Tasks",
  "Other",
];

const homePage = async (req, res) => {
  if (req.user) {
    return res.redirect("/notes");
  }
  res.render("home", {
    title: "Welcome to the Shitshow",
    messages: req.flash(), // <-- Add this line
  });
};

const addNote = async (req, res) => {
  res.render("addNote", { title: "Add Note", classes: CLASS, user: req.user });
};

const createNote = async (req, res) => {
  const noteData = req.body;
  noteData.user = req.user._id; // <-- Attach the logged-in user's ID
  console.log("noteData: ", noteData);
  const note = await noteHandler.createNote(noteData);
  req.flash("success", `/${note.slug} added successfully!`);
  res.redirect("/");
};

const getNotes = async (req, res) => {
  const notes = await noteHandler.getAllNotes(req.user._id);
  res.render("notes", { title: "All Notes", notes });
};

const editNote = async (req, res) => {
  const note = await noteHandler.getOneNoteBySlug({ slug: req.params.slug });
  res.render("editNote", {
    title: `Edit`,
    note,
  });
};

const updateNote = async (req, res) => {
  const slug = req.params.slug;
  const noteData = req.body;
  const note = await noteHandler.updateNoteBySlug(slug, noteData);

  res.redirect(`/notes/:${note.slug}/edit`);
};

const deleteNote = async (req, res) => {
  const id = req.params.id;
  const note = await noteHandler.deleteNote(id);
  res.redirect("/");
};

const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter: (req, file, next) => {
    const isPhoto = file.mimetype.startsWith("image/");

    if (isPhoto) {
      next(null, true); // it's fine continue on, no error here
    } else {
      next({ message: "⚠️ That file type isn't allowed" }, false);
    }
  },
};

const upload = multer(multerOptions).single("photo");

const resize = async (req, res, next) => {
  // check if there is a file, and if there isn't call next
  if (!req.file) {
    return next(); // skip to the next middleware
  }

  // image/png = ['image', 'png']
  const extension = req.file.mimetype.split("/")[1];

  req.body.photo = `${uuidv4()}.${extension}`;
  console.log("buffer ", req.file.buffer);
  const photo = await Jimp.read(req.file.buffer);
  await photo.write(`./public/uploads/${req.body.photo}`); // saves the image in uploads
  next();
};

const getNoteBySlug = async (req, res, next) => {
  const note = await noteHandler.getOneNoteBySlug({ slug: req.params.slug });

  if (!note) return next();
  res.status(200);
  // res.render("foodnote", { title: `${note.name}`, note });
};
const viewNote = async (req, res, next) => {
  const note = await noteHandler.getOneNoteBySlug({ slug: req.params.slug });

  if (!note) return next();
  res.status(200);
  res.render("noteView", { title: `${note.title}`, note });
};
export default {
  addNote,
  createNote,
  getNotes,
  homePage,
  updateNote,
  editNote,
  deleteNote,
  upload,
  resize,
  getNoteBySlug,
  viewNote,
};
