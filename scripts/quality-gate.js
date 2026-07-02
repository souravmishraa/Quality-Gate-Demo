const fs = require("fs");

// Get inputs
const report = process.argv[3];
// process.argv = [
//   "node",
//   "script.js",
//   "report.json"
// ]
const maxHigh = 0;
const maxMedium = 5;
const maxLow = 20;

if (!report) {
    console.log("Please provide report file");
    process.exit(1);
}

// Read report
const data = JSON.parse(fs.readFileSync(report));

// Count vulnerabilities
let high = 0, medium = 0, low = 0;

let sites = data.site || [];

for (const site of sites) {
    for (const alert of site.alerts || []) {
        if (alert.riskcode === 3) high++;
        else if (alert.riskcode === 2) medium++;
        else if (alert.riskcode === 1) low++;
    }
}

// Print result
console.log("HIGH:", high);
console.log("MEDIUM:", medium);
console.log("LOW:", low);

// Quality Gate
if (high > maxHigh || medium > maxMedium || low > maxLow) {
    console.log("FAIL ");
    process.exit(1);
}

console.log("PASS ");
process.exit(0);