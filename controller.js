const fs = require("fs");
const config = require("./config.json");
const express = require("express");
const server = express();
const path = require("path");

server.get("/", (req, res) => res.sendFile(path.join(__dirname, "web/index.html")));
serveResource("./web/init.js");

server.listen(config.port, config.hostname,
    () => console.log(`equalsequals running on ${config.hostname}:${config.port}`));

/**
 * @param {String} path 
 * @param {String} type
 */
function serveResource(path, type = undefined)
{
    const name = path.substring(path.lastIndexOf("/") + 1);
    if (!type)
        type = "text/" + name.substring(0, name.indexOf("."));
    if (type === "text/js")
        type = "text/javascript";
    server.all(`/resources/${name}`, (req, res) => res.header("Content-Type", type).send(fs.readFileSync(path)));
}