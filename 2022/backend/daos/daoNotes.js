import containerMySql from "../containers/containerMySql.js";
import { getDate } from "../utils/utils.js";

export default class daoNotes extends containerMySql {
    constructor(tableName, knex) {
        super(tableName, knex);
    }
    async archive(id, archivedState){
        const updated_at = getDate();
        return await this.knex(this.tableName).where('id', id).update({ archived: !archivedState, updated_at });
    }
}