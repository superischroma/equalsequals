const EQUALSEQUALS_EPOCH = 1633046400000n;
let additive = 0;

module.exports.generate = async () =>
{
    if (additive >= 255)
        throw new Error("Too many snowflake requests at the same time");
    additive++;
    let time = this.currentTimestamp();
    time |= additive;
    additive--;
    return time;
}

module.exports.currentTimestamp = () =>
{
    return (BigInt(Date.now()) - EQUALSEQUALS_EPOCH) << 56n;
}

/**
 * @param {bigint} snowflake 
 * @returns {bigint}
 */
module.exports.getTimestamp = (snowflake) =>
{
    return snowflake >> 56n;
}

/**
 * @param {bigint} snowflake 
 * @returns {bigint}
 */
module.exports.getUnixTimestamp = (snowflake) =>
{
    return (snowflake >> 56n) + EQUALSEQUALS_EPOCH;
}