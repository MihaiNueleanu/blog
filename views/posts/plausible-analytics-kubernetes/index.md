---
layout: blog.njk
title: Simple Plausible Analytics on Kubernetes
date: 2021-04-18
tags: 
  - post
  - published
  - plausible
  - analytics
  - simple
  - kubernetes
---

![cover](./cover.png)

Here's a simple, self-hosted configuration for Plausible Analytics, meant for deploying to Kubernetes.

**Note:** All the code and instructions have been uploaded to github: https://github.com/dotmethodme/plausible-kubernetes

## How to
1. Go to https://github.com/dotmethodme/plausible-kubernetes and clone the repository. All yaml files are inside the folder named `base`
2. Open `postgress.yaml`. Edit the `POSTGRES_PASSWORD` field and set a randomly generated password for the postgres database
3. Open `ingress.yaml`. Insert your chosen domain name into the host fields 
4. Open `secret.yaml`. Configure the marked fields.
5. Apply the configuration with `kubectl apply -f ./base`

## Read more:
- [Full instructions and yaml files](https://github.com/dotmethodme/plausible-kubernetes)
- [The official plausible self-hosted docs](https://plausible.io/docs/self-hosting)
- [The official configuration options for plausible](https://plausible.io/docs/self-hosting-configuration)