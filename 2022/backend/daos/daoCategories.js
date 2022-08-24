import containerMySql from "../containers/containerMySql.js";

export default class daoCategories extends containerMySql {
    constructor(tableName, knex) {
        super(tableName, knex);
    }
    async saveIfDontExist(category) {
        const categoryExists = await this.knex(this.tableName).select('*').where('name', category);
        if(categoryExists.length === 0){
            return await this.save({name: category});
        }
        else{
            return null;
        }
    }
    async getAllOrdered(){
        const allCategories = await this.knex(this.tableName).select('*').orderBy('name');
        return allCategories;
    }
}