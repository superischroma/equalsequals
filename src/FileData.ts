import SQLite from "better-sqlite3";
const db = new SQLite("database.db");
db.prepare("CREATE TABLE IF NOT EXISTS users (id INTEGER, name TEXT, password TEXT, languages BLOB);").run();

export class FileData
{
    static run(statement: string, ...params: any[])
    {
        return db.prepare(statement).run(params);
    }

    static get(statement: string, ...params: any[])
    {
        return db.prepare(statement).get(params);
    }

    static all(statement: string, ...params: any[])
    {
        return db.prepare(statement).all(params);
    }
}