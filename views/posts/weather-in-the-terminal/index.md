---
layout: blog.njk
title: "You'll want to use it all day: Weather in the terminal"
date: 2020-06-30
tags: ["post", "bash", "terminal", "shell", "weather", "published"]
---

![Screenshot of weather report](./landing.png)

One command and you can get the weather in any terminal:

```bash
curl wttr.in
```

How awesome is that?

The project and the documentation is available on [GitHub](https://github.com/chubin/wttr.in). In reality you can do a number of things with this API

```bash
curl wttr.in
curl wttr.in/Copenhagen
curl wttr.in/:help
curl wttr.in/Copenhagen?format=3
curl v2.wttr.in # my favourite
curl wttr.in/:help
```

All in all, great project, really useful tool, I use it every day. Hope you find it useful too.
