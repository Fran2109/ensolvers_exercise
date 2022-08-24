import { Router } from 'express';
import { verifyUserJwt } from './../passport/passport.js';
import { postCategory, getCategories, getCategoriesInNote } from './../controllers/categoriesController.js';

const categoriesRouter = Router();

categoriesRouter.post('/', verifyUserJwt, postCategory);
categoriesRouter.get('/', getCategories);
categoriesRouter.get('/notes/:noteId', getCategoriesInNote);

export default categoriesRouter;