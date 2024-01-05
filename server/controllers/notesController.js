import notesModel from '../models/notesModel.js'
import mongoose from 'mongoose'

export const createNotes = async (req, res) => {
  try {
    const { title, desc, user, theme } = req.body
    if (!title || !desc) return res.send({ message: 'Fields are required' })
    await notesModel.create({ title, description: desc, user, theme })
    return res.status(201).send({ success: 'Created Successfully' })
  } catch (error) {
    console.log(error)
    res.status(500).send({ error: 'Error in creating note' })
  }
}

export const fetchNotes = async (req, res) => {
  try {
    const { user } = req.params
    if (!user) return res.status(400).send('Enter mail')
    const userNotes = await notesModel.find({ user, isBinned: false })
    if (!userNotes) return res.status(404).send('No user found')
    return res.status(200).send(userNotes)
  } catch (error) {
    console.log(error)
    res.status(500).send({ error: 'Error' })
  }
}

export const fetchBinNotes = async (req, res) => {
  try {
    const { user } = req.params
    if (!user) return res.status(400).send('Enter mail')
    const userNotes = await notesModel.find({ user, isBinned: true })
    if (!userNotes) return res.status(404).send('No user found')
    return res.status(200).send(userNotes)
  } catch (error) {
    console.log(error)
    res.status(500).send({ error: 'Error' })
  }
}

export const manageNotes = async (req, res) => {
  try {
    const { noteId, action } = req.params

    let updateValue
    let successMessage

    if (action === 'toBin') {
      updateValue = { isBinned: true, isPinned: false }
      successMessage = 'Trashed Success'
    } else if (action === 'toNotes') {
      updateValue = { isBinned: false, isPinned: false }
      successMessage = 'Restored Success'
    } else {
      return res.send({ message: 'Invalid action parameter' })
    }

    await notesModel.updateOne({ _id: noteId }, { $set: updateValue })
    return res.status(200).send({ success: successMessage })
  } catch (error) {
    console.log(error)
    res.status(500).send({ error: 'Error on moving to bin or restoring' })
  }
}

export const deleteNotes = async (req, res) => {
  try {
    const { noteId } = req.params
    await notesModel.findByIdAndDelete(noteId)
    return res.status(200).send({ success: 'Deleted successfully' })
  } catch (error) {
    console.log(error)
    res.status(500).send({ error: 'Error while deleting' })
  }
}

export const pinNotes = async (req, res) => {
  try {
    const { noteId, action } = req.params

    let updateValue
    let successMessage

    if (action === 'isPinned') {
      updateValue = { isPinned: true }
      successMessage = 'Pinned'
    } else if (action === 'notPinned') {
      updateValue = { isPinned: false }
      successMessage = 'Unpinned'
    } else {
      return res.send({ message: 'Invalid action parameter' })
    }

    await notesModel.updateOne({ _id: noteId }, { $set: updateValue })
    return res.status(200).send({ success: successMessage })
  } catch (error) {
    console.log(error)
    res.status(500).send({ error: 'Error while Pinning note' })
  }
}

export const fetchNote = async (req, res) => {
  try {
    const { user, noteId } = req.params
    const note = await notesModel.findById(noteId)
    if (note.user !== user) return res.send({ message: 'Not created by you' })
    else return res.status(200).send(note)
  } catch (error) {
    console.log(error)
    res.status(500).send({ error: 'Error while fetching note' })
  }
}

export const editNote = async (req, res) => {
  try {
    const { user, noteId } = req.params
    const { title, desc, theme, collaborators, isPublic } = req.body
    await notesModel.findByIdAndUpdate(noteId, {
      $set: { title, description: desc, theme, collaborators, isPublic },
    })
    return res.status(200).send({ success: 'Successfully updated!' })
  } catch (error) {
    console.log(error)
    res.status(500).send({ error: 'Error while fetching note' })
  }
}

export const fetchCollabedNotes = async (req, res) => {
  try {
    const { user } = req.params
    const notes = await notesModel.find({ collaborators: user })
    return res.status(200).send(notes)
  } catch (error) {
    console.log(error)
    res.status(500).send({ error: 'Error while fetching collabed notes' })
  }
}

export const fetchSharedNote = async (req, res) => {
  try {
    const { noteId } = req.params
    if (!/^[0-9a-fA-F]{24}$/.test(noteId)) return res.status(400).send({ message: 'Invalid link' })
    const {
      Types: { ObjectId },
    } = mongoose
    const objectId = new ObjectId(noteId)
    const note = await notesModel.findById(new ObjectId(noteId))
    if (!note) {
      return res.status(404).send({ message: 'Note not found' })
    }
    if (note.isPublic === false) {
      return res.send({ message: 'This is a private note' })
    }
    return res.status(200).send(note)
  } catch (error) {
    console.log(error)
    res.status(500).send({ error: 'Error while fetching shared note' })
  }
}