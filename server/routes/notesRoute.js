import express from 'express'
import {
  createNotes,
  deleteNotes,
  editNote,
  manageNotes,
  pinNotes,
  fetchBinNotes,
  fetchNote,
  fetchNotes,
  fetchCollabedNotes,
  fetchSharedNote,
  setReminder,
  deleteReminder,
} from '../controllers/notesController.js'

const router = express.Router()

router.post('/create', createNotes)
router.get('/notes/:user', fetchNotes)
router.get('/bin/:user', fetchBinNotes)
router.delete('/delete/:noteId', deleteNotes)
router.patch('/manage/:noteId/:action', manageNotes)
router.patch('/pin/:noteId/:action', pinNotes)
router.get('/note/:user/:noteId', fetchNote)
router.patch('/edit/:user/:noteId', editNote)
router.get('/collabed/:user', fetchCollabedNotes)
router.get('/shared/:noteId', fetchSharedNote)
router.put('/setReminder/:noteId', setReminder)
router.delete('/deleteReminder/:noteId', deleteReminder)

export default router
