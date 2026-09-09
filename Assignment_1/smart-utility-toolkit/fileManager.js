const fs = require("fs");

const filePath = "./test.txt";

// Write to file
fs.writeFileSync(filePath, "Smart Utility Toolkit\n");

console.log("File written successfully");

// Read the file
const data = fs.readFileSync(filePath, "utf8");

console.log("File content:");
console.log(data);