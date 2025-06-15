import Note from "../models/noteModel.js";

const createNote = async (noteData) => {
  return await Note.create(noteData);
};

const getOneNote = async ({ _id }) => {
  return await Note.findOne({ _id: _id }).lean();
};

const getAllNotes = async (userId) => {
  return await Note.find({ user: userId }).lean();
};

const updateNote = async (id, noteData) => {
  return await Note.findOneAndUpdate({ _id: id }, noteData, {
    new: true,
    runValidators: true,
  }).lean();
};

const deleteNote = async (id) => {
  return await Note.findByIdAndDelete(id).lean();
};

const getOneNoteBySlug = async ({ slug, userId }) => {
  const note = await Note.findOne({ slug }).lean();
  if (!note || String(note.userId) !== String(userId)) {
    // Not found or not the author
    return null;
  }
  return note;
};
const updateNoteBySlug = async (slug, noteData) => {
  return await Note.findOneAndUpdate({ slug }, noteData, {
    new: true,
    runValidators: true,
  }).lean();
};

export default {
  createNote,
  getAllNotes,
  updateNote,
  getOneNote,
  deleteNote,
  getOneNoteBySlug,
  updateNoteBySlug,
};
