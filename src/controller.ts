import fs from "fs";
import config from "./config.json";
import express from "express";
const server = express();
import { User } from "./internal";

server.get("/", (req, res) => res.end(String(fs.readFileSync("web/index.html"))));

server.post("/api/users", async (req, res) =>
{
    let name = String(req.query.name);
    let password = String(req.query.password);
    let user = await User.create(name, password);
    res.send(user);
});

serveResource("web/init.js");

server.listen(config.port, config.hostname,
    () => console.log(`equalsequals running on ${config.hostname}:${config.port}`));

function serveResource(path: string, type?: string)
{
    const name = path.substring(path.lastIndexOf("/") + 1);
    if (!type)
        type = "text/" + name.substring(0, name.indexOf("."));
    if (type === "text/js")
        type = "text/javascript";
    server.all(`/resources/${name}`, (req, res) => res.header("Content-Type", type).send(fs.readFileSync(path)));
}