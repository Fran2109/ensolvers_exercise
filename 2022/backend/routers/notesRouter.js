import { Router } from "express";
import { notes } from "../daos/index.js";
import { postNote, getNotesAndCategories, getNotesFromCategory, deleteNote, archiveNote, getNotes, putNote } from './../controllers/notesController.js';
import { verifyUserJwt } from './../passport/passport.js';

const notesRouter = Router();

notesRouter.post('/', verifyUserJwt, postNote);
notesRouter.get('/', getNotes);
notesRouter.get('/all', getNotesAndCategories);
notesRouter.get('/category/:categoryId', getNotesFromCategory);
notesRouter.delete('/:noteId', verifyUserJwt, deleteNote);
notesRouter.put('/archive', verifyUserJwt, archiveNote);
notesRouter.put('/:noteId', verifyUserJwt, putNote);

export default notesRouter;

