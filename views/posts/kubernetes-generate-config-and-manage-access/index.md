---
layout: blog.njk
title: Kubernetes generate user account and config
date: 2021-04-19
tags: 
  - post
  - published
  - kubernetes
  - config
  - generate
  - manage
  - access
  - rbac
  - user account
---

![Cover](./cover.png)

How do you generate a kubernetes user account? How do you get access to your kubernetes cluster? How can you generate a kubernetes config file?

Intuitively, this should be pretty simple. However, in practice, the process is quite a bit convoluted.

However, I have automated it for myself. Below is the script, responsible for issuing cluster access, together with a kube config file, from start to finish.

**Prerequisites:**
- [openssl](https://github.com/openssl/openssl)
- [kubectl](https://kubernetes.io/docs/tasks/tools/)

## How to use it:
- paste the script into a `.sh` file (e.g. `config-generate.sh`)
- replace occurrences of `myuser` with the name of your user account (can be anything)
- the script will finish by filling in the new config details in your kube config file: `~/.kube/config`

## The Script

```shell
# This script is responsible for issuing a cluster access 
# config file, which can afterwards be used by users or 
# service integrations (such as github actions)

# Generate a key and a certificate signing request
# Hint: The CN field is important
openssl genrsa -out myuser.key 2048
openssl req -new -key myuser.key \
    -subj "/C=DK/ST=DK/O=''/CN=myuser" \
    -out myuser.csr

# Extract the certificate signing request
REQ=$(cat myuser.csr | base64 | tr -d "\n")

# Create a Kubernetes CSR object
# and approve it
cat <<EOF | kubectl apply -f -
apiVersion: certificates.k8s.io/v1
kind: CertificateSigningRequest
metadata:
  name: myuser
spec:
  groups:
  - system:authenticated
  request: $REQ
  signerName: kubernetes.io/kube-apiserver-client
  usages:
  - client auth
EOF
kubectl get csr
kubectl certificate approve myuser

# Extract the kubernetes-approved signed certificate
kubectl get csr myuser -o jsonpath='{.status.certificate}'| base64 -d > myuser.crt

# Create the user role role (with the appropriate access levels)
# and bind the user to the role
kubectl create role myuser --verb="*" --namespace pr-env \
    --resource=pod \
    --resource=service \
    --resource=configmap \
    --resource=secret \
    --resource=ingress \
    --resource=daemonset \
    --resource=replicaset \
    --resource=deployment \
    --resource=job 
kubectl create rolebinding myuser-binding --role=myuser --user=myuser

# Cleanup the Kubernetes CSR
kubectl delete csr myuser

# Extract config locally, into your config file
# Location: ~/.kube/config
kubectl config set-credentials myuser --client-key=myuser.key --client-certificate=myuser.crt --embed-certs=true
kubectl config set-context myuser --cluster=kubernetes --user=myuser
kubectl config use-context myuser 
```

## The test
As soon as you have generate the new context, and it has been activated locally, run a test command, such as:

```shell
kubectl get nodes
kubectl get pods
kubectl get services
```

**Note:** the script is written in a very bare-bones and simple way, so that it's easy to understand and modify for you own purposes. 

### Read more
- [The official kubernetes documentation on certificate signing requests](https://kubernetes.io/docs/reference/access-authn-authz/certificate-signing-requests/#normal-user) 