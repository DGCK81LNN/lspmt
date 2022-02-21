#! /usr/bin/env node

const fs = require("fs")

var workerCodeBuffer = fs.readFileSync("./worker.js")
var mainCode = fs.readFileSync("./main.js").toString()
var dataURL = "data:text/javascript;base64," + workerCodeBuffer.toString("base64")
mainCode = mainCode.replace('"worker.js"', JSON.stringify(dataURL))
fs.writeFileSync("./index.js", mainCode)
