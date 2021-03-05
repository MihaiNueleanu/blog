---
layout: blog.njk
title: "Nodejs + Typescript + Redis Cache = <3"
date: 2021-03-05
tags: ["post", "published", "nodejs", "typescript", "redis", "cache"]
---

![Cover image](./cover.png)

In this post I want to share a simple redis-based cache layer, which you can put in front of various workloads in order to either save execution time, or compute resources.

## Usage example

How will we use this cache?

Let's start with an example. Say we have a "products" endpoint which returns the products which should be displayed as recommendations to the user on our fictitious online shop.

Here's the example in practice:

```ts
// Define the cache
const cache = new RedisCache(60);

app.get("/products/recommended", async (req: Request, res: Response) => {
  // Cache by userId as key
  const products = await cache.get<Product[]>(req.userId, () => {
    // Here's the function which refreshes the cache
    return RecommendationModel.find(req.userId)
  )};

  res.send(products);
});
```

Firstly, we want to define the cache with a "time to live" for each value we put in. Secondly, we want to cache each recommendation list, by the user id. And then finally we want to give the cache a way to refresh if the value is not cached yet.

Sounds simple? Let's do it!

## The dependancies

For this exercise, we only want to pull in 1 package - redis. So in a command line, we do:

```bash
npm install redis
```

## The implementation

```ts
import { RedisClient, createClient } from "redis";
import { env } from "../env";

export class RedisCache {
  private readonly cache: RedisClient;
  private ttl: number;

  constructor(ttl: number) {
    // [1] define ttl and create redis connection
    this.ttl = ttl;
    this.cache = createClient({
      host: env.REDIS_HOST,
      password: env.REDIS_PASSWORD,
    });

    this.cache.on("connect", () => {
      console.log(`Redis connection established`);
    });

    this.cache.on("error", (error) => {
      console.error(`Redis error, service degraded: ${error}`);
    });
  }

  // [2] generic function, takes `fetcher` argument which is meant to refresh the cache
  async get<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
    // [3] if we're not connected to redis, bypass cache
    if (!this.cache.connected) {
      return await fetcher();
    }

    return new Promise((resolve, reject) => {
      this.cache.get(key, async (err, value) => {
        if (err) return reject(err);
        if (value) {
          // [4] if value is found in cache, return it
          return resolve(JSON.parse(value));
        }

        // [5] if value is not in cache, fetch it and return it
        const result = await fetcher();
        this.cache.set(
          key,
          JSON.stringify(result),
          "EX",
          this.ttl,
          (err, reply) => {
            if (err) return reject(err);
          }
        );
        return resolve(result);
      });
    });
  }

  // [6]
  del(key: string) {
    this.cache.del(key);
  }

  flush() {
    this.cache.flushall();
  }
}
```

Alright, now let's break it down.

[1] First off, notice the class definition `RedisCache`. It has as a constructor argument a ttl (time to live), which is meant for deciding how long the cache should be valid for. Which is quite a convenient setup, for instance if you want different instances of this cache, with different TTL configurations.

[2] Secondly, we define a generic `get` function, which conveniently returns a promise with the same generic type we've put in. Notice also the `fetcher` function which is passed as an argument - this function is the way we can refresh the cache, in case the value is not yet stored, or the previous value has already expired.

[3] In case the redis cache is not connected (for example if the connection is in an error state), we "fail" gracefully by simply returning the original `fetcher` function - which essentially means we bypass the cache.

[4] We try to see if the key exists in the cache. If it does exist, we return the value.

[5] If the key does not exist in the cache, we first execute the `fetcher` function to fetch the value that we're trying to cache. We then save the this value in the cache, and as a last step, we return it.

That is all. Enjoy!
