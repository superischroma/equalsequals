import { User, Identifiable } from "./internal";

const USER_CACHE: Map<number, User> = new Map();

export class Caching
{
    static cache(obj: Identifiable)
    {
        if (obj instanceof User)
            USER_CACHE.set(obj.id, obj);
        else
            throw new Error("Attempted to cache unsupported object");
    }

    static saveAll(type: any)
    {
        if (type == User)
        {
            for (let user of USER_CACHE.values())
                user.save();
        }
        else
            throw new Error("Attempted to run save-all on an unsupported type");
    }

    static purge(type: any)
    {
        if (type == User)
            USER_CACHE.clear();
        else
            throw new Error("Attempted to clear cache for an unsupported type");
    }

    static releaseID(id: number, type: any)
    {
        if (type == User)
            USER_CACHE.delete(id);
        else
            throw new Error("Attempted to release value for an unsupported type");
    }

    static release(obj: Identifiable)
    {
        if (obj instanceof User)
            USER_CACHE.delete(obj.id);
        else
            throw new Error("Attempted to release value for an unsupported type");
    }

    static cached(id: number, type: any)
    {
        if (type == User)
            return USER_CACHE.has(id);
        else
            throw new Error("Could not retrieve state for an unsupported type");
    }

    static retrieve(id: number, type: any)
    {
        if (type == User)
            return USER_CACHE.get(id);
        else
            throw new Error("Could not retrieve value for an unsupported type");
    }

    static releaseAll()
    {
        USER_CACHE.clear();
    }
}