import mongoose from "mongoose";

const problemSchema = mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true,
      maxlength: 255,
    },
    description: {
      type: String,
      // required: true,
    },
    difficulty: {
      type: String,
      required: true,
      default: "medium", // Set a default value if needed
      validate: {
        validator: function (value) {
          const validDifficulties = ["easy", "medium", "hard"];
          return validDifficulties.includes(value.toLowerCase());
        },
        message: "Invalid difficulty level",
      },
    },
    inputFormat: {
      type: String,
      required: true,
    },
    outputFormat: {
      type: String,
      required: true,
    },
    constraints: {
      type: String,
      required: true,
    },
    sampleInput: {
      type: String,
      required: true,
    },
    sampleOutput: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Add index for text search on the title field
problemSchema.index({ title: "text" });

const Problem = mongoose.model("Problem", problemSchema);

export default Problem;
