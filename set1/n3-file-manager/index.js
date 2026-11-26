
// Name: IAN GEOFREY SANGALANG | Section: IV-BSIT B | Activity: N3 | Date: 2026-11-26

const fs = require("fs/promises");
const path = require("path");

const folder = path.join(__dirname, "files");

function filePath(name) {
    if (!name || path.basename(name) !== name) {
        throw new Error("Enter a file name only, such as notes.txt.");
    }

    return path.join(__dirname, "files", name);
}

async function main() {
    try {
        await fs.mkdir(folder, { recursive: true });

        const [command, name, ...contentParts] = process.argv.slice(2);
        const content = contentParts.join(" ");

        if (command === "list") {
            const names = await fs.readdir(folder);

            if (!names.length) {
                console.log("No files in files folder.");
                return;
            }

            for (const fileName of names) {
                const fullPath = path.join(__dirname, "files", fileName);
                const info = await fs.stat(fullPath);

                if (info.isFile()) {
                    const text = await fs.readFile(fullPath, "utf8");

                    console.log("\nFull path:", fullPath);
                    console.log("File name:", path.basename(fullPath));
                    console.log("Extension:", path.extname(fullPath));
                    console.log("Contents:", text);
                }
            }

        } else if (["create", "read", "update", "delete"].includes(command)) {
            const target = filePath(name);

            if (command === "create") {
                await fs.writeFile(target, content, "utf8");
                console.log("Created:", target);

            } else if (command === "read") {
                console.log(await fs.readFile(target, "utf8"));

            } else if (command === "update") {
                await fs.appendFile(target, content + "\n", "utf8");
                console.log("Appended text to:", target);

            } else if (command === "delete") {
                await fs.unlink(target);
                console.log("Deleted:", target);
            }

        } else {
            console.log("Usage: node index.js <create|read|update|delete|list> [filename] [text]");
        }

    } catch (error) {
        if (error.code === "ENOENT") {
            console.error("Error: file does not exist.");
        } else {
            console.error("Error:", error.message);
        }

        process.exitCode = 1;
    }
}

main();
