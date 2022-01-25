---
layout: blog.njk
title: "Getting started with K8S: How to get a cluster"
date: 2021-04-24
tags: 
  - post
  - published
  - kubernetes
  - k8s
  - k3s
  - getting started
  - setup
  - create
  - cluster
  - from scratch
---

![Cover](./cover.jpg)

<div class="attribution">
Photo by <a href="https://unsplash.com/@bamin?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Pierre Bamin</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
</div>


"How do I get started with Kubernetes? Is it difficult? I've read it's difficult. I skimmed through some articles and I was overwhelmed."

Alright. Alright... Fair enough. I was also confused at first. But here's what it boils down to: think of it like any other large open-source project - you have options. Many, many options; maybe too many. The same way you have thousands of linux distributions, kubernetes also has many distributions. And some of them are 100% accessible to anyone with a bit of technical know-how. 


## K8S Distros worth knowing about
- [microk8s](https://microk8s.io/) - made by Canonical (the Ubuntu people)
- **[k3s](https://k3s.io/) - made by the people who made Rancher**

And honestly, that's enough. These two distros are easy to get started with, they have nice documentation, and they won't overwhelm while getting started. I choose K3S as my favorite, although it's a close call.

## K3S Installation

How do you get going with K3S? Well, it's pretty simple. You'll first need a server (VPS) with ssh access; I don't recommend trying this directly on your machine (although you totally could). 

The installation is really simple, and the command is at the top of on their [landing page](https://k3s.io/):

```shell
curl -sfL https://get.k3s.io | sh -
```

You then wait for a few seconds, for the "cluster" to get up and running. Monitor the progress with this command:

```shell
k3s kubectl get node
```

### Access the cluster from the outside

At this stage the kubernetes node is running and ready for action. How do you connect to it? 

Generally speaking, you use the locally installed `kubectl` cli for remotely managing any kubernetes cluster. You can download and install it from the official [k8s website](https://kubernetes.io/docs/tasks/tools/).

With that done, you need some sort of config to get you authenticated with your new cluster. This is handled by kubectl, and you can get your hands on this configuration from inside your node. Taken straight from the [k3s docs](https://rancher.com/docs/k3s/latest/en/cluster-access/):

> *Copy /etc/rancher/k3s/k3s.yaml on your machine located outside the cluster as ~/.kube/config. Then replace “localhost” with the IP or name of your K3s server. kubectl can now manage your K3s cluster.*

In other words, you just need to copy the config file, from the server, to your computer. Afterwards, you'll want to test it out, and you can do that locally with the following commands:

```shell
kubectl get nodes
kubectl get pods --all-namespaces
```

If you get some output out of it, without errors, congratulations!

## Conclusion

And. That's. It. You have kubernetes up and running. 

Sure, it's a single node cluster. But don't worry about that yet; not in the beginning. When the time comes, you can easily connect more K8S nodes and get your hands on more compute power, but you'll search for that when you need it.
