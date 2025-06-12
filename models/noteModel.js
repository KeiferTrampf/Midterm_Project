import mongoose from "mongoose";
import GitHubSlugger from "github-slugger";

const slugger = new GitHubSlugger();

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title for the note."],
      trim: true,
      maxlength: [32, "Title is too long."],
    },
    slug: String,
    note: {
      type: String,
      required: [true, "Please provide a note."],
      trim: true,
      maxlength: [300, "Note is too long."],
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    // class: {
    //   type: Number,
    //   default: 6,
    // },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Login is required."],
    },
  },
  { timestamps: true }
);

noteSchema.pre("save", function (next) {
  if (!this.isModified("name")) {
    return next();
  }

  // TODO: ensure slugs are unique
  this.slug = slugger.slug(this.name);
  next();
});

export default mongoose.model("Note", noteSchema);
