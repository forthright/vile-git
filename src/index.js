let Promise = require("bluebird")
let _ = require("lodash")
let git = require("nodegit")
let vile = require("@forthright/vile")

let vile_issues = (commit, branch) => {
  let committer = commit.committer()
  let author = commit.author()
  let commit_date = new Date(committer.when().time() * 1000)
  let author_date = new Date(author.when().time() * 1000)
  let sha = commit.sha()

  return [
    vile.issue({
      type: vile.GIT,
      signature: `git::${branch}-${sha}`,
      commit: {
        sha: sha,
        branch: branch,
        message: commit.message(),
        committer: `${committer.name()} <${committer.email()}>`,
        commit_date: commit_date,
        author: `${author.name()} <${author.email()}>`,
        author_date: author_date
      }
    })
  ]
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
