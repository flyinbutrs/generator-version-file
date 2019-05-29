"use strict";
const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");

describe("generator-version-file:app", () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, "../generators/app"))
      .withPrompts({ language: "Javascript", path: "" });
  });

  it("creates version.js", () => {
    assert.file(["version.js"]);
  });
});
