import { FileData, Caching, Identifiable, Snowflake } from "./internal";

export class User implements Identifiable
{
    id: number;
    name: string;
    password: string;
    languages: number[];

    constructor(id: number, name: string, password: string, languages: number[])
    {
        this.id = id;
        this.name = name;
        this.password = password;
        this.languages = languages;
    }

    save()
    {
        if (!FileData.get("SELECT * FROM users WHERE id=?", this.id))
        {
            FileData.run("INSERT INTO users (id, name, password, languages) VALUES (?, ?, ?, ?);",
                this.id, this.name, this.password, Buffer.from(this.languages));
        }
        else
        {
            FileData.run("UPDATE users SET name=?, password=?, languages=? WHERE id=?", this.name,
                this.password, Buffer.from(this.languages), this.id);
        }
    }

    createdAt()
    {
        return new Date(Snowflake.getUnixTimestamp(this.id));
    }

    static retrieve(id: number)
    {
        let user;
        if (user = Caching.retrieve(id, User))
            return user;
        let obj = FileData.get("SELECT * FROM users WHERE id=?", id);
        if (!obj)
            return null;
        user = new User(obj.id, obj.name, obj.password, Array.from(obj.languages.buffer));
        Caching.cache(user);
        return user;
    }

    static async create(name: string, password: string)
    {
        let user = new User(await Snowflake.generate(), name, password, []);
        user.save();
        return user;
    }
}