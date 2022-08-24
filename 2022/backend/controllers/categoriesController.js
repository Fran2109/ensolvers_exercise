import { categories, notesCategories } from "../daos/index.js";

export const postCategory = async (req, res) => {
    try{
        const { name } = req.body;
        const categoryId = await categories.saveIfDontExist(name);
        if(categoryId){
            res.status(200).json({ id: categoryId[0], name: name });
        } else {
            res.status(400).json({message: 'Category already exists'});
        }
    }
    catch(err){
        res.status(500).json(err);
    }
}

export const getCategories = async (req, res) => {
    try{
        const allCategories = await categories.getAllOrdered();
        res.status(200).json(allCategories);
    }
    catch(err){
        res.status(500).json(err);
    }
}

export const getCategoriesInNote = async (req, res) => {
    const { noteId } = req.params;
    try{
        const categoriesInNote = await notesCategories.getCategoriesInNote(noteId);
        res.status(200).json(categoriesInNote);
    }
    catch(err){
        res.status(500).json(err);
    }
}