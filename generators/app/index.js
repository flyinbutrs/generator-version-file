"use strict";
const Generator = require("yeoman-generator");
const _ = require("lodash");
const spawn = require("child_process").spawnSync;
const moment = require("moment");

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
    this.rubyReleaseDate = moment().format("YYYY-MM-DD");
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
    console.log(this.options.git);
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
      },
      {
        type: "input",
        name: "module",
        message: "What is the module name?",
        default: this.defaults.module,
        when: function(answers) {
          return answers.language === "Ruby";
        },
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
    if (this.answers.path) {
      this.versionFilePath = [
        this.answers.path,
        this.filenames[this.answers.language]
      ].join("/");
    } else {
      this.versionFilePath = this.filenames[this.answers.language];
    }

    this.fs.copyTpl(
      this.templatePath(this.answers.language),
      this.destinationPath(this.versionFilePath),
      this
    );
  }

  end() {
    this.config.save();
    if (this.options.git === true) {
      spawn("git", ["add", this.versionFilePath]);
      if (this.fs.exists(".yo-rc.json")) {
        spawn("git", ["add", ".yo-rc.json"]);
      }
    }
  }
};
