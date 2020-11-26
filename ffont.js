#!/usr/bin/node

import alphabet from "./alphabet.js";
import readline from "readline";


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('What do you want to write: ', (word) => {
    rl.question('which character will be pencil(default *)',point => {
	point = point || "*";
	try {
	    const chars = word.toLowerCase().split("").map(char => alphabet[`${char}`].split("\n"));
	var output = "";

	for(var j = 0;j < 5;j++) {
	    for(var i = 0; i < chars.length; i++) {
		output = output.concat(`${chars[i][j]}`);
	    }
	    output = output.concat("\n");
	}
	    console.log(((output.replaceAll("*",point))||output));
	rl.close();
    }catch(e) {
	console.log(`error: \n${e}`);
    }
    });
});


