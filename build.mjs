#! /usr/bin/env node

import { readFileSync } from "fs"
import { transformSync, buildSync } from "esbuild"

var isDevelopment = process.argv.indexOf("--dev", 2) !== -1

console.log("transform lib.worker.js ...")
var workerCode = readFileSync("./src/lib.worker.js").toString()
var workerTransform = transformSync(workerCode, {
  minify: !isDevelopment,
  charset: "utf8",
  sourcemap: isDevelopment && "inline",
  logLevel: "info",
})
console.log("done")

var workerBase64 = Buffer.from(workerTransform.code).toString("base64")
var workerURL = "data:text/javascript;base64," + workerBase64

console.log("\n\n======== build ========")

buildSync({
  entryPoints: [ "./src/inject.mjs" ],
  minify: !isDevelopment,
  charset: "utf8",
  bundle: true,
  define: {
    __LSPMT_WORKER_URL: JSON.stringify(workerURL),
  },
  loader: {
    ".css": "text",
    ".html": "text",
    ".worker.js": "dataurl",
  },
  sourcemap: isDevelopment && "inline",
  outfile: "dist/lspmultitool.user.js",
  logLevel: "info",
})
