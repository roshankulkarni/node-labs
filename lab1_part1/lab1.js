//
// Read JSON File and Write to a Output Flat File
//

// Dependent Modules
var fs = require("fs");

// Configuration
var inputFileName = "source.json";
var outputFileName = "destination.txt";

// Let's run.
processFile(inputFileName, outputFileName);

// Reads the specified input file (JSON) and generates the output file.
function processFile(inputFileName, outputFileName) {

    // Valid input file name?
    if(typeof inputFileName === 'undefined' || inputFileName == null || inputFileName.trim() == "") {
        console.log("Input file name is unspecified.");
        return;
    }

    // Valid input file name?
    if(typeof outputFileName === 'undefined' || outputFileName == null || outputFileName.trim() == "") {
        console.log("Output file name is unspecified.");
        return;
    }

    // Let's attempt to read source file.
    fs.readFile(inputFileName, function readCallback(err, contents) {

        // Error?
        if(err){
            console.log("Failed to read input file:" + err);
            return;
        }

        // String contents
        console.log("File Contents as String: " + contents);

        // Attempt to cast the contents into JSON.
        var contentsObj = {};
        try {
            contentsObj = JSON.parse(contents);
            console.log("Parsed Contents: " + JSON.stringify(contentsObj));
        } catch (ex) {
            // Parsing JSON String Failed.
            console.log("Source file is not in expected JSON format:" + ex);
            return;            
        }

        // Expected Structure?
        if(!contentsObj.hasOwnProperty("students")) {
            console.log("Expected students element not found");
            return;
        }
        
        // Iterate over every student and generate output string.
        var outputString = "Id | First Name | Last Name | Score \n";
        console.log("Students Found: " + contentsObj.students.length);
        for(i = 0; i < contentsObj.students.length; i++) {
            var student = contentsObj.students[i];
            outputString += student.id + " | " + student.fName + " | " + student.lName + " | " + student.score + "\n";
        }

        console.log("Writing This Data: \n" + outputString);
        fs.writeFile(outputFileName, outputString, function writeCompletedCallback(err) {

            // Errors?
            if(err) {
                console.log("Error Writing to File: " + err);
                return;
            }

            // Successful
            console.log("File Generated: " + outputFileName);
            return;
        });

    });
}

