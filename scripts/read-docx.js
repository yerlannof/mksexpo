const mammoth = require("mammoth");
const fs = require("fs");
const path = require("path");

async function readDocx() {
  const docxPath = path.join(__dirname, "../docs/Презентация M&K (в ворде), 26.07.2025.docx");
  
  try {
    const result = await mammoth.extractRawText({ path: docxPath });
    console.log("=== M&K Education Company Information ===\n");
    console.log(result.value);
    
    // Save to text file for easier reading
    fs.writeFileSync(path.join(__dirname, "../docs/mk-education-info.txt"), result.value);
    console.log("\n=== Saved to docs/mk-education-info.txt ===");
  } catch (error) {
    console.error("Error reading DOCX:", error);
  }
}

readDocx();