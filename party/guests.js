'use strict';

const fs = require('fs');
const path = require('path');
const guestsPath = path.join(__dirname, 'guests.json');

const node = path.basename(process.argv[0]);
const file = path.basename(process.argv[1]);

// This is where the command line argument is found
// process.argv is an array that contains them.
const cmd = process.argv[2];

// if the command line argument is read
if (cmd === 'read') {

  // read from the file guestsPath
  fs.readFile(guestsPath, 'utf8', function(err, data) {
    // if there is an error, throw (exit the program)
    if (err) {
      throw err;
    }

    // data is a string that was returned from reading the file
    // here the string is parsed from JSON to an object
    var guests = JSON.parse(data);

    // print out the guests object to screen.
    console.log(guests);
  });
}

// if the command line argument is create
else if (cmd === 'create') {

  // read from the file guestsPath
  fs.readFile(guestsPath, 'utf8', function(readErr, data) {
    // if there is an error, throw (exit the program)
    if (readErr) {
      throw readErr;
    }

    // parse JSON into an Object
    var guests = JSON.parse(data);
    // get the name of the guest from the command line argument
    var guest = process.argv[3];

    // if there command line argument is not given, print error and exit.
    if (!guest) {
      console.error(`Usage: ${node} ${file} ${cmd} GUEST`);
      process.exit(1);
    }

    // add the new guest into the array guests
    guests.push(guest);

    // convert an Object into a string so that we can save it to a file.
    var guestsJSON = JSON.stringify(guests);

    // write string guestsJSON to file. This will overwrite all contents
    // of the original file
    fs.writeFile(guestsPath, guestsJSON, function(writeErr) {
      // if there is an error writing, throw (exit program)
      if (writeErr) {
        throw writeErr;
      }

      // print out new guest list
      console.log(guest);
    });
  });
}
else if(cmd === 'count'){
  // read from the file guestsPath
  fs.readFile(guestsPath, 'utf8', function(readErr, data) {
    // if there is an error, throw (exit the program)
    if (readErr) {
      throw readErr;
    }

    console.log(JSON.parse(data).length);
  })
}
// If ther command line arguments are not as expected, print out usage and exit
else {
  console.error(`Usage: ${node} ${file} [read | create]`);
  process.exit(1);
}
