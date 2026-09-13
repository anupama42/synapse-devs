const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    category: String,
    liveUrl: String,
    thumbnail: String,
    shortDescription: String,
    description: String,
    techStack: [String],
    role: String,
    highlight: String,
    accent: String,
    featured: { type: Boolean, default: true },
    order: Number,
  },
  { timestamps: true }
);

const messageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);
const Message = mongoose.models.Message || mongoose.model('Message', messageSchema);

module.exports = { Project, Message };
