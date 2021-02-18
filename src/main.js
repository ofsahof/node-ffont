import readline from "readline";
import colors from "colors"

import alphaset, {
    colorset,
    alphabet
} from "./helpers.js";

import commands from "./utils"

class Questionnaire {

    static rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    static queue = ["word", "point", "color"]
    static errors = []
    static options = {}

    static questioner(util, $opt) {
        if ($opt.name) {
            this.options[$opt.name] = util
            if($opt.name !== "color") {
                return this.sync()
            } else {
                return this.write()
            }
        }
    }
    static async sync(elem, opts) {
        if (this.errors.length) {
            let err = this.errors
            try {
                await err[err.length - 1].handle(commands.filter(c => c.name == err[err.length - 1].cmd))
                this.errors.pop()
            } catch {
                return this.rl.close()
            }
        } else {
            let $cmd = await commands.filter(c => (c.name == this.queue[0]))

            if ($cmd.length) {
                await $cmd[0].exec(this, Questionnaire)
                if (!this.errors.length) this.queue.shift()
            } else {
                if (!this.queue.length) return this.rl.close()
            }
        }
    }

    static write() {
        let point = this.options.point || "*";
        let color = this.options.color
        let word = this.options.word

        try {
            const chars = word.toLowerCase().split("").map(char => alphabet[`${char}`].split("\n"));

            let output = "";
            while (point.length < 5) {
                point += point[point.length - 1]
            }
            console.clear()
            console.log("\n")

            if (colorset.has(color)) {
                for (j = 0; j < 5; j++) {
                    for (i = 0; i < chars.length; i++) {
                        output += `${chars[i][j].replaceAll("*", point[j])}`
                    }
                    output += "\n"
                }
                colors.setTheme({
                    processColor: color
                })
                console.log(output.processColor);
                console.log("\n")

            } else {
                for (var j = 0; j < 5; j++) {
                    for (var i = 0; i < chars.length; i++) {
                        output += `${chars[i][j].replaceAll("*", point[j])}` [
                            [...colorset][j]
                        ]
                    }
                    output += "\n"
                }
                console.log(output.blue);
                console.log("\n")
            }
            return this.rl.close()
        } catch (e) {
            console.log(`error: \n${e}`);
        }
    }
}
Questionnaire.sync()