import mongoose from "mongoose";
import slugify from "slugify";

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
      maxlength: [500, "Note is too long."],
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Login is required."],
    },
  },
  { timestamps: true }
);

noteSchema.pre("save", async function (next) {
  // Slug logic (only for new or changed title)
  if (this.isModified("title")) {
    const baseSlug = slugify(this.title, { lower: true, strict: true });
    let slug = baseSlug;
    let count = 1;
    while (await this.constructor.findOne({ slug })) {
      slug = `${baseSlug}-${count++}`;
    }
    this.slug = slug;
  }
  next();
});

export default mongoose.model("Note", noteSchema);
