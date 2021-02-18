import alphaset from "./helpers.js";

export default [{
        name: "word",
        exec: ($this, Q) => {
            return $this.rl.question('? What do you want to write: '.green, w => {
                if (new Set(w.toLowerCase().split("").map(word => alphaset.has(word))).has(false)) {
                    console.log("Invalid Char".red)
                    return $this.rl.close()
                }
                if (w) {
                    Q.questioner(w, {
                        name: "word"
                    })
                } else {
                    let err = Q.errors.push({
                        cmd: "word",
                        err: "undefined_word",
                        handle(startup) {
                            return startup[0].exec($this, Q)
                        }
                    })
                    Q.sync()
                    return err;
                }
            })
        }
    },
    {
        name: "point",
        exec: ($this, Q) => {
            return $this.rl.question('# Specify utf-8 chars for palette (default *):'.blue, (point) => {
                if (point.length > 5) {
                    console.log("Char Length must be less than 5");
                    return $this.rl.close()
                }
                if (point) {
                    Q.questioner(point, {
                        name: "point"
                    })
                } else {
                    Q.sync()
                }
            })
        }
    },
    {
        name: "color",
        exec: ($this, Q) => {
            return $this.rl.question('$ Select a output color (default rainbow):'.yellow, (color) => {
                if(color) {
                    Q.questioner(color, {
                        name:"color"
                    })
                } else {
                    Q.write()
                }
            })
        }
    }
]