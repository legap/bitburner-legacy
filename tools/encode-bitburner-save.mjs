import fs from "fs";

// Only stringify the FIRST level of nested objects
function encodeTopLevel(obj) {
    const out = {};
    for (const [key, val] of Object.entries(obj)) {
        // If the value is an object, stringify it ONCE
        if (typeof val === "object" && val !== null) {
            out[key] = JSON.stringify(val);
        } else {
            out[key] = val;
        }
    }
    return out;
}

const inputFile = process.argv[2];
if (!inputFile) {
    console.error("Usage: node encode-bitburner-save.mjs <expanded.json>");
    process.exit(1);
}

// Read expanded JSON
const expanded = JSON.parse(fs.readFileSync(inputFile, "utf8"));

// Only encode the "data" object inside BitburnerSaveObject
const encodedData = encodeTopLevel(expanded.data);

// Rebuild the outer save object
const finalSave = {
    ctor: expanded.ctor,
    data: encodedData
};

// Stringify the whole save object
const jsonString = JSON.stringify(finalSave);

// Base64 encode
const base64 = Buffer.from(jsonString, "utf8").toString("base64");

// Output file
const outputFile = inputFile.replace(/_expanded\.json$/, "") + "_reencoded.json";
fs.writeFileSync(outputFile, base64, "utf8");

console.log(`Re-encoded save written to: ${outputFile}`);
