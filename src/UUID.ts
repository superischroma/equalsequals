const IDENTIFIER_SELECTOR = "1234567890abcdef";

export class UUID
{
    data: string;

    constructor(value?: string | UUID | Buffer | Uint8Array | readonly number[])
    {
        if (!value)
            this.data = String(UUID.randomUUID());
        else if (typeof value === "string")
            this.data = value;
        else if (value instanceof Buffer)
            this.data = UUID.fromBuffer(value);
        else if (value instanceof UUID)
            this.data = value.data;
        else
            this.data = UUID.fromBuffer(Buffer.from(value));
    }

    private static randomUUID()
    {
        let str = "";
        for (let i = 0; i < 36; i++)
        {
            if (i == 8 || i == 13 || i == 18 || i == 23)
                str += "-";
            else
                str += IDENTIFIER_SELECTOR.charAt(Math.floor(Math.random() * IDENTIFIER_SELECTOR.length));
        }
        return str;
    }

    private static buffer(uuid: string)
    {
        uuid = uuid.replace(/-/g, "");
        let buffer = Buffer.alloc(16);
        for (let i = 0; i < 16; i++)
            buffer.writeUInt8(Number("0x" + uuid.substr(i * 2, 2)), i);
        return buffer;
    }

    public buffer()
    {
        return UUID.buffer(this.data);
    }

    private static fromBuffer(buf: Buffer)
    {
        let str = "";
        for (let i = 0; i < 16; i++)
        {
            if (i == 4 || i == 6 || i == 8 || i == 10)
                str += "-";
            str += buf.readUInt8(i).toString(16).padStart(2, "0");
        }
        return str;
    }
}