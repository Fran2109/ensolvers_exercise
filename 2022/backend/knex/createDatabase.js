import knex from 'knex';
import { clearDatabaseUrl } from '../configs/configs.js';

const db = knex(clearDatabaseUrl);

if( !(await db.schema.hasTable('notes')) ) {
    await db.schema.createTable('notes', table => {
        table.increments('id').primary();
        table.string('title');
        table.string('content');
        table.string('created_at');
        table.string('updated_at');
        table.boolean('archived').defaultTo(false);
    });
}

if( !(await db.schema.hasTable('categories')) ) {
    await db.schema.createTable('categories', table => {
        table.increments('id').primary();
        table.string('name');
    })
}

if( !(await db.schema.hasTable('notes_categories')) ) {
    await db.schema.createTable('notes_categories', table => {
        table.increments('id').primary();
        table.integer('note_id').unsigned();
        table.integer('category_id').unsigned().nullable();
        table.foreign('note_id').references('id').inTable('notes');
        table.foreign('category_id').references('id').inTable('categories');
    })
}

export default db;
