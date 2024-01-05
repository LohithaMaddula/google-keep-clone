import mongoose from 'mongoose'

const notesSchema = new mongoose.Schema(
  {
    title: String,
    description: {
      type: String,
    },
    theme: {
      type: String,
      default: 'white',
    },
    user: {
      type: String,
      required: true,
    },
    collaborators: {
      type: Array,
    },
    isBinned: {
      type: Boolean,
      default: false,
    },
    isPinned: {
      type: Boolean,
      default: false,
    },
    isPublic: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
)

const notesModel = mongoose.model('Note', notesSchema)

export default notesModel
