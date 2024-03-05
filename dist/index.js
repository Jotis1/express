import "dotenv/config";
import express from "express";
import { exec } from "child_process";
import { join, dirname } from "path";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const port = 3001;
app.use(express.json());
app.post("/", async (req, res) => {
    const auth = req.headers.authorization?.split("Bearer ")[1];
    const { SECRET } = process.env;
    if (!auth || auth !== SECRET) {
        return res.status(401).send("Unauthorized");
    }
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
        return res.status(400).send("Email and password are required");
    }
    const command = `powershell.exe -File "${join(__dirname, "../script/main.ps1")}" -e "${email}" -p "${password}"`;
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            res.status(500).send("Internal Server Error");
            return;
        }
        if (stderr) {
            res.status(500).send("Internal Server Error");
            console.log(`stderr: ${stderr}`);
            return;
        }
        res.status(200).send(stdout);
    });
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
