"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var Promise = require("bluebird");
var _ = require("lodash");
var git = require("nodegit");
var vile = require("@forthright/vile");

var vile_issues = function vile_issues(commit, branch) {
  var committer = commit.committer();
  var author = commit.author();
  var commit_date = new Date(committer.when().time() * 1000);
  var author_date = new Date(author.when().time() * 1000);
  var sha = commit.sha();

  return [vile.issue({
    type: vile.GIT,
    signature: "git::" + branch + "-" + sha,
    commit: {
      sha: sha,
      branch: branch,
      message: commit.message(),
      committer: committer.name() + " <" + committer.email() + ">",
      commit_date: commit_date,
      author: author.name() + " <" + author.email() + ">",
      author_date: author_date
    }
  })];
};

var open_repo = function open_repo(config) {
  return git.Repository.open(_.get(config, "config.repo", process.cwd()));
};

var get_latest_current_branch_commit = function get_latest_current_branch_commit(repo) {
  return repo.getCurrentBranch().then(function (ref) {
    return repo.getBranchCommit(ref).then(function (commit) {
      return [commit, ref];
    });
  });
};

var punish = function punish(config) {
  return new Promise(function (resolve, reject) {
    return open_repo(config).then(get_latest_current_branch_commit).then(function (results) {
      var _results = _slicedToArray(results, 2);

      var commit = _results[0];
      var ref = _results[1];

      var issues = vile_issues(commit, ref.shorthand());
      resolve(issues);
    });
  });
};

module.exports = {
  punish: punish
};