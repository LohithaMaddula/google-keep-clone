import mongoose from 'mongoose'

//model for pdf files
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
      required: true
    },
    isBinned: {
      type: Boolean,
      default: false
    },
    isPinned: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
)

const notesModel = mongoose.model('Note', notesSchema)

export default notesModel
