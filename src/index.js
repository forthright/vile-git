let Promise = require("bluebird")
let _ = require("lodash")
let git = require("gift")
let vile = require("@forthright/vile")

let vile_issues = (commit, branch) => {
  let committer = _.get(commit, "committer", {})
  let author = _.get(commit, "author", {})

  let issues = [
    vile.issue({
      type: vile.SCM,
      signature: `git::${branch}-${commit.id}`,
      commit: {
        sha: commit.id,
        branch: branch,
        message: commit.message,
        committer: `${committer.name} <${committer.email}>`,
        commit_date: commit.committed_date,
        author: `${author.name} <${author.email}>`,
        author_date: commit.authored_date
      }
    })
  ]

  return issues
}

let open_repo = (config) =>
  new Promise((resolve, reject) => {
    let repo_path = _.get(config, "config.repo", process.cwd())
    resolve(git(repo_path))
  })

let get_head = (repo) =>
  new Promise((resolve, reject) => {
    repo.branch((err, head) => {
      if (err) reject(err)
      else resolve(head)
    })
  })

let punish = (config) =>
  new Promise((resolve, reject) =>
    open_repo(config)
      .then(get_head)
      .then((head={}) => {
        let issues = vile_issues(head.commit, head.name)
        resolve(issues)
      })
  )

module.exports = {
  punish: punish
}
