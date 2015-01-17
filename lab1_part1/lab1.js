//
// Read JSON File and Write to a Output Flat File
//
"use strict";

// Dependencies
var fs = require("fs");
var util = require("util");

// Configuration
var inputFileName = "file_source.json";
var outputFileName = "file_destination.txt";

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

    // Attempt to read source file.
    fs.readFile(inputFileName, function readCallback(err, contents) {

        // Error reading?
        if(err) {
            console.log("Failed to read input file: " + err);
            return;
        }

        // Attempt to cast the contents into JSON. Check if parse fails?
        console.log("File Contents as String: " + contents);
        var contentsObj = {};
        try {
            contentsObj = JSON.parse(contents);
            console.log("Parsed Contents: " + JSON.stringify(contentsObj));
        } catch (ex) {
            console.log("Source file is not in expected JSON format:" + ex);
            return;            
        }

        // Expected root element?
        if(!contentsObj.hasOwnProperty("students")) {
            console.log("Expected students element not found in: " + inputFileName);
            return;
        }

        // This must be an array.
        if(!util.isArray(contentsObj.students)) {
            console.log("Expected students array not found in: " + inputFileName);
            return;
        }

        // Student records found?
        console.log("Students Found: " + contentsObj.students.length);
        
        //
        // Iterate over every student and generate output string.
        //
        var studentsListString = "";
        for(var i = 0; i < contentsObj.students.length; i++) {

            // Student Object
            var student = contentsObj.students[i];

            // Validate all expected parameters present?
            if(!student.hasOwnProperty("id") || !student.hasOwnProperty("fName") || !student.hasOwnProperty("lName") || !student.hasOwnProperty("score")) {
                console.log("Skipping bad record: " + i);
                continue;
            }

            // Construct record (string)
            studentsListString += student.id + " | " + student.fName + " | " + student.lName + " | " + student.score + "\n";
        }

        //
        // Generate final output file.
        //
        var outputString = "-----\nId | First Name | Last Name | Score\n-----\n";
        outputString += studentsListString;
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

