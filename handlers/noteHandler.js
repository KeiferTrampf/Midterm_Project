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

const getOneNoteBySlug = async ({ slug }) => {
  return await Note.findOne({ slug }).lean();
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
