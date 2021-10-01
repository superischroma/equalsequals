const { filedata, caching, snowflake } = require("./internal");

class User
{
    /**
     * @param {bigint} id 
     * @param {String} name 
     * @param {String} password
     * @param {Array<Number>} languages 
     */
    constructor(id, name, password, languages)
    {
        this.id = id;
        this.name = name;
        this.password = password;
        this.languages = languages;
    }

    save()
    {
        if (!filedata.get("SELECT * FROM users WHERE id=?", this.id))
        {
            filedata.run("INSERT INTO users (name, password, languages) VALUES (?, ?, ?);",
                this.id, this.name, this.password, Buffer.from(this.languages));
        }
        else
        {
            filedata.run("UPDATE users SET name=?, password=?, languages=? WHERE id=?", this.name,
                this.password, Buffer.from(this.languages), this.id);
        }
    }

    static retrieve(id)
    {
        let user;
        if (user = caching.retrieve(id, User))
            return user;
        let obj = filedata.get("SELECT * FROM users WHERE id=?", id);
        if (!obj)
            return null;
        user = new User(BigInt(obj.id), obj.name, obj.password, Array.from(obj.languages.buffer));
        caching.cache(user);
        return user;
    }

    static async create(name, password)
    {
        let user = new User(await snowflake.generate(), name, password, []);
        user.save();
        return user;
    }
}

module.exports = User;