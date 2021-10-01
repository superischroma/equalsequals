const SQLite = require("better-sqlite3");
const db = new SQLite("database.db");
db.prepare("CREATE TABLE IF NOT EXISTS users (id INTEGER, name TEXT, password TEXT, languages BLOB);");

/**
 * @param {String} statement
 * @param {any[]} params
 */
module.exports.run = (statement, ...params) =>
{
    return db.prepare(statement).run(params);
}

/**
 * @param {String} statement
 * @param {any[]} params
 */
module.exports.get = (statement, ...params) =>
{
    return db.prepare(statement).get(params);
}

/**
 * @param {String} statement
 * @param {any[]} params
 */
module.exports.all = (statement, ...params) =>
{
    return db.prepare(statement).all(params);
}