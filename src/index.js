let Promise = require("bluebird")
let _ = require("lodash")
let git = require("nodegit")
let vile = require("@brentlintner/vile")

let vile_issues = (commit, branch) => {
  let committer = commit.committer()
  let author = commit.author()

  let issues = [
    vile.issue(
      vile.GIT,
      "vile-git", // HACK TODO
      undefined,
      undefined,
      undefined, {
        commit: {
          sha: commit.sha(),
          branch: branch,
          message: commit.message(),
          committer: `${committer.name()} <${committer.email()}>`,
          commit_date: commit.date(),
          author: `${author.name()} <${author.email()}>`,
          // TODO: get author date
          author_date: commit.date()
        }
      }
    )
  ]

  return issues
}

let open_repo = (config) =>
  git.Repository.open(_.get(config, "config.repo", process.cwd()))

let get_latest_current_branch_commit = (repo) =>
  repo
    .getCurrentBranch()
    .then((ref) =>
      repo
        .getBranchCommit(ref)
        .then((commit) => [commit, ref])
    )

let punish = (config) =>
  new Promise((resolve, reject) =>
    open_repo(config)
      .then(get_latest_current_branch_commit)
      .then((results) => {
        let [commit, ref] = results
        let issues = vile_issues(commit, ref.shorthand())
        resolve(issues)
      })
  )

module.exports = {
  punish: punish
}
