"use strict";
const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");

describe("generator-version-file:app", () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, "../generators/app"))
      .withPrompts({ language: "Ruby", path: "" });
  });

  it("creates version.rb", () => {
    assert.file(["version.rb"]);
  });
});
