"use strict";

var Promise = require("bluebird");
var _ = require("lodash");
var git = require("gift");
var vile = require("@forthright/vile");

var vile_issues = function vile_issues(commit, branch) {
  var committer = _.get(commit, "committer", {});
  var author = _.get(commit, "author", {});

  var issues = [vile.issue({
    type: vile.GIT,
    signature: "git::" + branch + "-" + commit.id,
    commit: {
      sha: commit.id,
      branch: branch,
      message: commit.message,
      committer: committer.name + " <" + committer.email + ">",
      commit_date: commit.committed_date,
      author: author.name + " <" + author.email + ">",
      author_date: commit.authored_date
    }
  })];

  return issues;
};

var open_repo = function open_repo(config) {
  return new Promise(function (resolve, reject) {
    var repo_path = _.get(config, "config.repo", process.cwd());
    resolve(git(repo_path));
  });
};

var get_head = function get_head(repo) {
  return new Promise(function (resolve, reject) {
    repo.branch(function (err, head) {
      if (err) reject(err);else resolve(head);
    });
  });
};

var punish = function punish(config) {
  return new Promise(function (resolve, reject) {
    return open_repo(config).then(get_head).then(function () {
      var head = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var issues = vile_issues(head.commit, head.name);
      resolve(issues);
    });
  });
};

module.exports = {
  punish: punish
};