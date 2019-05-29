"use strict";
const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");

describe("generator-version-file:app", () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, "../generators/app"))
      .withPrompts({ language: "Javascript", path: "templates" });
  });

  it("creates templates/version.js", () => {
    assert.file(["templates/version.js"]);
  });
});
