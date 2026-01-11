import fs from "fs";

function tryParseJSON(value) {
    if (typeof value !== "string") return value;
    try {
        return JSON.parse(value);
    } catch {
        return value;
    }
}

function deepExpand(obj) {
    if (Array.isArray(obj)) {
        return obj.map(deepExpand);
    }
    if (obj !== null && typeof obj === "object") {
        const out = {};
        for (const [key, val] of Object.entries(obj)) {
            out[key] = deepExpand(tryParseJSON(val));
        }
        return out;
    }
    return tryParseJSON(obj);
}

const inputFile = process.argv[2];
if (!inputFile) {
    console.error("Usage: node decode-bitburner-save.mjs <bitburnerSave.json>");
    process.exit(1);
}

const base64 = fs.readFileSync(inputFile, "utf8").trim();
const decoded = Buffer.from(base64, "base64").toString("utf8");

const outer = JSON.parse(decoded);
const expanded = deepExpand(outer);

const outputFile = inputFile.replace(/\.json$/, "") + "_expanded.json";
fs.writeFileSync(outputFile, JSON.stringify(expanded, null, 2), "utf8");

console.log(`Expanded save written to: ${outputFile}`);
