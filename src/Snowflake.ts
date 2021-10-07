const EQUALSEQUALS_EPOCH = 1633046400000; // millis
let additive = 0;

export class Snowflake
{
    static async generate()
    {
        if (additive >= 255)
            throw new Error("Too many snowflake requests at the same time");
        additive++;
        let time = this.currentTimestamp() + additive;
        additive--;
        return time;
    }

    static currentTimestamp()
    {
        return Date.now() - EQUALSEQUALS_EPOCH;
    }

    static getTimestamp(snowflake: number)
    {
        return snowflake >>> 8;
    }

    static getUnixTimestamp(snowflake: number)
    {
        return (snowflake >>> 8) + EQUALSEQUALS_EPOCH;
    }
}