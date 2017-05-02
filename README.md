# vile-git

A [vile](http://vile.io) plugin for [git](https://git-scm.com).

## Features

This plugin sends various git based analytics to [vile](http://vile.io),
including:

* Info on your HEAD commit.

## Requirements

- [nodejs](http://nodejs.org)
- [npm](http://npmjs.org)

## Installation

    npm i -D vile vile-git

## CI/CD Issues

Since `gift` is the git pkg currently being used, the way a repository is cloned
(in most cases, via a build server), can cause issues.

For the time being, until a better alternative is used or the bug is fixed upstream,
you made need to run a git command prior to running vile-git.

For example, on [Codeship](https://codeship.com), you would run:

    git checkout -f $CI_BRANCH

If you are using [CircleCI](https://circleci.com), you can run:

    git checkout -f $CIRCLE_BRANCH

## Analyzing Shallow Clones

If you are having further issues, you can do this in `circle.yml`:

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

This project ascribes to [semantic versioning](http://semver.org).

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

This project ascribes to [contributor-covenant.org](http://contributor-covenant.org).

By participating in this project you agree to our [Code of Conduct](CODE_OF_CONDUCT.md).

### Maintainers

- Brent Lintner - [@brentlintner](http://github.com/brentlintner)

## Hacking

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
