const fs = require('fs');

function writeToFile(filePath, content) {
    fs.writeFile(filePath, content, (err) => {
        if (err) {
            console.error(`Error writing to file: ${err.message}`);
        } else {
            console.log(`Data written to ${filePath}`);
        }
    });
}

// Test cases
writeToFile('output.txt', 'This is a test message ,if u can see this message then this progarm is successful');

