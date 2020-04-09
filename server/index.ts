/**/
import * as express from 'express';
import { Express } from 'express';

import { readFileSync } from 'fs';
const app: Express = express();

app.get("/", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    const jsonData: string = readFileSync(__dirname + "/db.json", { encoding: "utf8" });
    res.json(JSON.parse(jsonData).Countries);
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running in http://localhost:${PORT}`)
});

