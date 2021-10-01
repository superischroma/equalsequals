const { User } = require("./internal");

/** @type {Map<Number, User>} */
const USER_CACHE = new Map();

module.exports.cache = obj =>
{
    if (obj instanceof User)
        USER_CACHE.set(obj.id, obj);
    else
        throw new Error("Attempted to cache unsupported object");
}

module.exports.saveAll = type =>
{
    if (type == User)
    {
        for (let user of USER_CACHE.values())
            user.save();
    }
    else
        throw new Error("Attempted to run save-all on an unsupported type");
}

module.exports.purge = type =>
{
    if (type == User)
        USER_CACHE.clear();
    else
        throw new Error("Attempted to clear cache for an unsupported type");
}

/**
 * @param {Number} id 
 * @param {any} type
 */
module.exports.release = (id, type) =>
{
    if (type == User)
        USER_CACHE.delete(id);
    else
        throw new Error("Attempted to release value for an unsupported type");
}

module.exports.release = obj =>
{
    if (obj instanceof User)
        USER_CACHE.delete(obj.id);
    else
        throw new Error("Attempted to release value for an unsupported type");
}

module.exports.cached = (id, type) =>
{
    if (type == User)
        return USER_CACHE.has(id);
    else
        throw new Error("Could not retrieve state for an unsupported type");
}

/**
 * @param {Number} id 
 * @param {any} type 
 * @returns {any}
 */
module.exports.retrieve = (id, type) =>
{
    if (type == User)
        return USER_CACHE.get(id);
    else
        throw new Error("Could not retrieve value for an unsupported type");
}

module.exports.releaseAll = () =>
{
    USER_CACHE.clear();
}