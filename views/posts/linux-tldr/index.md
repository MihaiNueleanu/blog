---
layout: blog.njk
title: "Minimalist man pages with TLDR"
date: 2021-03-10
tags: ["post", "published", "tldr", "linux", "man", "manual"]
---

## Installation

```shell
npm install -g tldr
```

## Example

How does `tar` work again? I always forget...

```shell
tldr tar
```

**Result:**

```shell
  tar

  Archiving utility.
  Often combined with a compression method, such as gzip or bzip2.
  More information: https://www.gnu.org/software/tar.

  - [c]reate an archive from [f]iles:
    tar cf target.tar file1 file2 file3

  - [c]reate a g[z]ipped archive from [f]iles:
    tar czf target.tar.gz file1 file2 file3

  - [c]reate a g[z]ipped archive from a directory using relative paths:
    tar czf target.tar.gz --directory=path/to/directory .

  - E[x]tract a (compressed) archive [f]ile into the current directory:
    tar xf source.tar[.gz|.bz2|.xz]

  - E[x]tract a (compressed) archive [f]ile into the target directory:
    tar xf source.tar[.gz|.bz2|.xz] --directory=directory

  - [c]reate a compressed archive from [f]iles, using [a]rchive suffix to determine the compression program:
    tar caf target.tar.xz file1 file2 file3

  - Lis[t] the contents of a tar [f]ile [v]erbosely:
    tar tvf source.tar

  - E[x]tract [f]iles matching a pattern:
    tar xf source.tar --wildcards "*.html"
```

Landing page: [https://tldr.sh/](https://tldr.sh)
GitHub page: [https://github.com/tldr-pages/tldr](https://github.com/tldr-pages/tldr)

That's it, keeping it minimalist.
