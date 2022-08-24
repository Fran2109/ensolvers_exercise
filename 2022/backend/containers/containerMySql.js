export default class containerMySql {
    constructor(tableName, knex) {
        this.tableName = tableName;
        this.knex = knex;
    }
    async save(data) {
        return await this.knex(this.tableName).insert(data);
    }
    async getAll() {
        return await this.knex(this.tableName).select('*');
    }
    async delete(id) {
        return await this.knex(this.tableName).where('id', id).del();
    }
    async update(id, data) {
        return await this.knex(this.tableName).where('id', id).update(data);
    }
}