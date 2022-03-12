#! /usr/bin/env node

import { readFileSync, writeFileSync } from "fs"
import { transformSync, buildSync } from "esbuild"
const versionTagRegex = /^(\/\/[ ]*@version\s+).*$/m

console.log("get version tag...")
var packageJson = readFileSync("./package.json").toString()
var { version } = JSON.parse(packageJson)

console.log("get banner...")
var bannerCode = readFileSync("./src/banner.js").toString()
bannerCode = bannerCode.replace(versionTagRegex, (_, $1) => `${$1}${version}`)

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

console.log("\n======== build ========")

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
  banner: { js: bannerCode },
  outfile: "dist/lspmultitool.user.js",
  logLevel: "info",
})

console.log("\n======== cleanup ========")

console.log("remove version tag...")
injectCode = injectCode.replace(versionTagRegex, `$1${versionTagPlaceholder}`)
writeFileSync("./src/inject.mjs", injectCode)
