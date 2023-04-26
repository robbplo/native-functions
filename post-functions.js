const Jaws = require("@betty-blocks/jaws");
const FormData = require("form-data");
const fetch = require("node-fetch");
const fs = require("fs-extra");
const path = require("path");
const shell = require("shelljs");
const { chdir } = require("process");
const { tmpdir } = require("os");

const run = (cmd) => shell.exec(cmd, { silent: true }).stdout.trim();

const URL = process.env.NATIVE_FUNCTIONS_BUILDER_API_URL;
const CONFIG = {
  issuer: "native_functions",
  services: {
    "builder-api": { secret: process.env.NATIVE_FUNCTIONS_BUILDER_API_SECRET },
  },
};

run("cd native-functions; git pull");

const jaws = Jaws.default.getInstance(CONFIG);

const {
  functionDefinitions,
  stringifyDefinitions,
  zipFunctionDefinitions,
} = require(`@betty-blocks/cli/build/functions/functionDefinitions.js`);

const functionsDir = path.join(run("pwd"), "native-functions", "functions");
const functions = functionDefinitions(functionsDir);
const functionsJson = stringifyDefinitions(functions);

chdir(tmpdir());

const appFile = zipFunctionDefinitions(functionsDir);
const nativeFile = appFile.replace("app", "native");
run(`mv ${appFile} ${nativeFile}`);

const jwt = jaws.sign("builder-api", { application_id: "native" }).jwt;

const formData = new FormData();
formData.append("functions", functionsJson);
formData.append("options", JSON.stringify({ compile: false }));
formData.append("file", fs.createReadStream(nativeFile));

fetch(URL, {
  method: "POST",
  body: formData,
  headers: {
    Authorization: `Bearer ${jwt}`,
  },
}).then((response) => {
  if (response.ok) {
    console.log(`${response.status} - ${response.statusText}`);
  } else {
    console.log(response);
    throw new Error(`Failed to post functions: ${response.status}`);
  }
});
