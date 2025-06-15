import noteHandler from "../handlers/noteHandler.js";
import multer from "multer";
import { Jimp } from "jimp";
import { v4 as uuidv4 } from "uuid";

const homePage = async (req, res) => {
  if (req.user) {
    return res.redirect("/notes");
  }
  res.render("home", {
    title: "Welcome to Your Notes",
    flashes: req.flash(),
  });
};

const addNote = async (req, res) => {
  res.render("addNote", {
    title: "Add Note",
    flashes: req.flash(),
    user: req.user,
  });
};

const createNote = async (req, res) => {
  const noteData = req.body;
  noteData.user = req.user._id; // <-- Attach the logged-in user's ID
  console.log("noteData: ", noteData);
  const note = await noteHandler.createNote(noteData);
  req.flash("success", `/${note.slug} added successfully!`);
  res.redirect("/notes");
};

const getNotes = async (req, res) => {
  const notes = await noteHandler.getAllNotes(req.user._id);
  res.render("notes", { title: "All Notes", flashes: req.flash(), notes });
};

const editNote = async (req, res) => {
  const note = await noteHandler.getOneNoteBySlug({
    slug: req.params.slug,
    userId: req.user._id,
  });
  if (!note) {
    req.flash("error", "Note not found or access denied.");
    return res.redirect("/notes");
  }
  res.render("editNote", {
    title: `Edit`,
    flashes: req.flash(),
    note,
  });
};

const updateNote = async (req, res) => {
  const slug = req.params.slug;
  const noteData = req.body;
  const note = await noteHandler.updateNoteBySlug(slug, noteData);

  res.redirect(`/note/:${note.slug}/`);
};

const deleteNote = async (req, res) => {
  const id = req.params.id;
  const note = await noteHandler.deleteNote(id);
  res.redirect("/notes");
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

const getNoteBySlug = async (req, res, next) => {
  const note = await noteHandler.getOneNoteBySlug({ slug: req.params.slug });

  if (!note) return next();
  res.status(200);
};
const viewNote = async (req, res, next) => {
  const note = await noteHandler.getOneNoteBySlug({
    slug: req.params.slug,
    userId: req.user._id,
  });
  if (!note) {
    req.flash("error", "Note not found or access denied.");
    return res.redirect("/notes");
  }
  res.status(200);
  res.render("noteView", {
    title: `${note.title}`,
    flashes: req.flash(),
    note,
  });
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
  // resize,
  getNoteBySlug,
  viewNote,
};
