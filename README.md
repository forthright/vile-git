# vile-git

A [Vile](http://vile.io) plugin for making use of [Git](https://git-scm.com) based data
including commit messages, author, and sha.

## Features

Creates a `vile.SCM` issue for the current HEAD commit.

## Requirements

- [Node.js](http://nodejs.org)

## Installation

    npm i -D vile vile-git

## CI/CD Issues

When using more up to date `git` versions everything should just work.

However, since `gift` is the git pkg currently being used, the way a repository is
cloned might cause sporadic issues.

For the time being, until a better alternative is used,
you may need to run a git command prior to running vile-git.

For example, on [Codeship](https://codeship.com), you would run:

    git checkout -f $CI_BRANCH

If you are using [CircleCI](https://circleci.com), you can run:

    git checkout -f $CIRCLE_BRANCH

## Analyzing Shallow Clones

If you are having further issues, notably with shallow clones, try this:

```yaml
  checkout:
    post:
      - "[[ ! -s \"$(git rev-parse --git-dir)/shallow\" ]] || git fetch --unshallow"
```

## Config

You can specify a custom repo location, else the `cwd` is used.

```yaml
git:
  config:
    repo: ../some/path
```

## Versioning

This project uses [Semver](http://semver.org).

## Licensing

This project is licensed under the [MPL-2.0](LICENSE) license.

Any contributions made to this project are made under the current license.

## Contributions

Current list of [Contributors](https://github.com/forthright/vile-git/graphs/contributors).

Any contributions are welcome and appreciated!

All you need to do is submit a [Pull Request](https://github.com/forthright/vile-git/pulls).

1. Please consider tests and code quality before submitting.
2. Please try to keep commits clean, atomic and well explained (for others).

### Issues

Current issue tracker is on [GitHub](https://github.com/forthright/vile-git/issues).

Even if you are uncomfortable with code, an issue or question is welcome.

### Code Of Conduct

By participating in this project you agree to our [Code of Conduct](CODE_OF_CONDUCT.md).

### Maintainers

- Brent Lintner - [@brentlintner](http://github.com/brentlintner)

## Developing

    cd vile-git
    npm install
    npm test

To run compile task with file watch in the background:

    npm run dev

To run tests with coverage:

    npm run test-cov

See `package.json` for other available scripts.

## Architecture

- `src` is es6+ syntax compiled with [Babel](https://babeljs.io)
- `lib` generated js library
- `test` is any test code, written in [CoffeeScript](http://coffeescript.org)
- `.test` where coffeescript is generated to
