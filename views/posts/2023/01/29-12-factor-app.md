---
layout: blog.njk
title: "The pragmatic rules of thumb of the 12-factor app"
date: 2023-01-29
tags: ["post", "published", "12-factor-app"]
---

In principle, the 12-factor app is a methodology for building software-as-a-service (SaaS) apps that are optimized for the cloud. This methodology, first introduced by Heroku, defines a set of principles that developers should follow to ensure that their applications are easy to deploy, scale, and maintain. 

Pragmatically speaking, these 12 principles are hard lessons learned through years of experience building and operating apps in the cloud by talented engineers. And they're damn good lessons.

**They go as follows:**

- Codebase: One codebase tracked in revision control, many deploys.
- Dependencies: Explicitly declare and isolate dependencies.
- Config: Store config in the environment.
- Backing services: Treat backing services as attached resources.
- Build, release, run: Strictly separate build and run stages.
- Processes: Execute the app as one or more stateless processes.
- Port binding: Export services via port binding.
- Concurrency: Scale out via the process model.
- Disposability: Maximize robustness with fast startup and graceful shutdown.
- Dev/prod parity: Keep development, staging, and production as similar as possible.
- Logs: Treat logs as event streams.
- Admin processes: Run admin/management tasks as one-off processes.
  

By following these principles, developers can maximize the chances that their applications will be easy to deploy, scale, and maintain. For example, by storing config in the environment and treating backing services as attached resources, developers can ensure that their applications will be portable and easy to run in different environments. Additionally, by strictly separating the build and run stages, developers can ensure that their applications will be easy to test and deploy.

If you chose not to pay attention to these principles, the only thing that will happen is that you'll come to the exact same conclusions by yourself, but you'll have to learn them the hard way. My advice is to just keep them in the back of your mind, and if you're ever in doubt, just come back and give them another glance - it'll likely save you loads of time and frustration.