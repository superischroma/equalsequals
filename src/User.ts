import { FileData, Caching, Identifiable, UUID } from "./internal";

export class User implements Identifiable
{
    id: UUID;
    name: string;
    password: string;
    languages: number[];

    constructor(id: UUID, name: string, password: string, languages: number[])
    {
        this.id = id;
        this.name = name;
        this.password = password;
        this.languages = languages;
    }

    save()
    {
        if (!FileData.get("SELECT * FROM users WHERE id=?", this.id.buffer()))
        {
            FileData.run("INSERT INTO users (id, name, password, languages) VALUES (?, ?, ?, ?);",
                this.id.buffer(), this.name, this.password, Buffer.from(this.languages));
        }
        else
        {
            FileData.run("UPDATE users SET name=?, password=?, languages=? WHERE id=?", this.name,
                this.password, Buffer.from(this.languages), this.id.buffer());
        }
    }

    static retrieve(id: UUID | string)
    {
        let user;
        if (user = Caching.retrieve(id, User))
            return user;
        let obj = FileData.get("SELECT * FROM users WHERE id=?", new UUID(id).buffer());
        if (!obj)
            return null;
        user = new User(new UUID(obj.id), obj.name, obj.password, Array.from(obj.languages.buffer));
        Caching.cache(user);
        return user;
    }

    static async create(name: string, password: string)
    {
        let user = new User(new UUID(), name, password, []);
        user.save();
        return user;
    }
}