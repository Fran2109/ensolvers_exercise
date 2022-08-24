import containerMySql from "../containers/containerMySql.js";

export default class daoNotesCategories extends containerMySql {
    constructor(tableName, knex) {
        super(tableName, knex);
    }
    async saveMultiple(data) {
        const { noteId, categories } = data;
        const newData = categories.map(category => {
            return{
               category_id: category.id,
                note_id: noteId 
            }
        });
        return await this.knex(this.tableName).insert(newData);
    }
    async deleteMultiple(noteId) {
        return await this.knex(this.tableName).where('note_id', noteId).del();
    }
    async getNotesFromCategory(categoryId) {
        return await this.knex(this.tableName)
            .join('notes', 'notes.id', 'notes_categories.note_id')
            .select('notes.id', 'notes.title', 'notes.content', 'notes.archived', 'notes.created_at', 'notes.updated_at')
            .where('category_id', categoryId)
            .orderBy('notes.id');
    }
    async getCategoriesInNote(noteId) {
        return await this.knex(this.tableName)
            .join('categories', 'categories.id', 'notes_categories.category_id')
            .select('categories.id', 'categories.name')
            .where('note_id', noteId)
            .orderBy('categories.id');
    }
}