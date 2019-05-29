"use strict";
const Generator = require("yeoman-generator");
const _ = require("lodash");
const spawn = require("child_process").spawnSync;

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.option("git", {
      desc: "git add version file when complete",
      alias: "g",
      type: Boolean,
      default: false
    });
  }

  initializing() {
    this.defaults = this.config.get("promptValues") || {};
    this.package = this.fs.readJSON("package.json") || {};
    this.currentVersion =
      this.package.version ||
      spawn("git", ["describe", "--abbrev=0"]) ||
      "0.1.0";
    this.filenames = {
      Javascript: "version.js",
      Python: "version.py",
      Ruby: "version.rb"
    };
  }

  prompting() {
    var prompts = [
      {
        type: "list",
        name: "language",
        message: "What language?",
        choices: ["Javascript", "Python", "Ruby"],
        default: this.defaults.language,
        store: true
      },
      {
        type: "input",
        name: "path",
        message: "Relative path of version file (directory only)?",
        default: this.defaults.path,
        store: true
      }
    ];

    prompts = _.filter(prompts, function(p) {
      return p.default === undefined;
    });

    return this.prompt(prompts).then(answers => {
      // To access answers later use this.answers.someAnswer;
      this.answers = _.merge(answers, this.defaults);
    });
  }

  writing() {
    this.versionFilePath =
      this.answers.path + "/" + this.filenames[this.answers.language];

    this.fs.copyTpl(
      this.templatePath(this.answers.language),
      this.destinationPath(this.versionFilePath),
      this
    );
  }

  end() {
    if (this.options.git) {
      spawn("git", ["add", this.versionFilePath]);
    }
  }
};
