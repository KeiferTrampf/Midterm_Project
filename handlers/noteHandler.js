import Note from "../models/noteModel.js";

const createNote = async (noteData) => {
  return await Note.create(noteData);
};

const getOneNote = async ({ id }) => {
  return await Note.findOne({ _id: id }).lean();
};

const getAllNotes = async () => {
  return await Note.find().lean();
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

const getOneNoteBySlug = async ({ slug }) => {
  return await Note.findOne({ slug }).lean();
};

export default {
  createNote,
  getAllNotes,
  updateNote,
  getOneNote,
  deleteNote,
  getOneNoteBySlug,
};
