---
layout: blog.njk
title: "Search engine: Meilisearch deployment for k8s"
date: 2022-01-25
tags: ["post", "published"]
---

Elastic search, TypeSense, Algolia, Meilisearch - a few search engine technologies which you might have seen out there; ElasticSearch currently being the largest of them. 

My favorite of them: Meilisearch. No surprise here, given the title of the article. So here's how I deployed it on Kubernetes.


```yaml
# Source: meilisearch/templates/serviceaccount.yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  namespace: meilisearch
  name: meilisearch
  labels:
    app.kubernetes.io/name: meilisearch
    app.kubernetes.io/instance: meilisearch
---
# Source: meilisearch/templates/configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  namespace: meilisearch
  name: meilisearch-environment
  labels:
    app.kubernetes.io/name: meilisearch
    app.kubernetes.io/instance: meilisearch
data:
  MEILI_ENV: "development"
  MEILI_NO_ANALYTICS: "true"
  MEILI_HTTP_PAYLOAD_SIZE_LIMIT: "10Gb"
  MEILI_DB_PATH: "/data"
---
# Source: meilisearch/templates/service.yaml
apiVersion: v1
kind: Service
metadata:
  name: meilisearch
  namespace: meilisearch
spec:
  selector:
    app: meilisearch
  ports:
    - port: 7700
      targetPort: 7700
---
apiVersion: apps/v1
kind: StatefulSet
metadata:
  namespace: meilisearch
  name: meilisearchdb
spec:
  selector:
    matchLabels:
      app: meilisearch
  serviceName: "meilisearch"
  replicas: 1
  template:
    metadata:
      labels:
        app: meilisearch
    spec:
      securityContext:
        fsGroup: 1000
      serviceAccountName: meilisearch
      containers:
        - name: meilisearch
          image: getmeili/meilisearch:v0.24.0
          resources:
            requests:
              memory: 1Gi
              cpu: "1"
            limits:
              memory: 2Gi
              cpu: "2"
          envFrom:
            - configMapRef:
                name: meilisearch-environment
          ports:
            - name: http
              containerPort: 7700
              protocol: TCP
          volumeMounts:
            - mountPath: "/data"
              name: mpvc
          livenessProbe:
            httpGet:
              path: /health
              port: http
            initialDelaySeconds: 30
          readinessProbe:
            httpGet:
              path: /health
              port: http
            initialDelaySeconds: 30
  volumeClaimTemplates:
    - metadata:
        name: mpvc
      spec:
        accessModes:
          - ReadWriteOnce
        resources:
          requests:
            storage: 30Gi
        storageClassName: do-block-storage

```