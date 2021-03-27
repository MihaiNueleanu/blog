---
layout: blog.njk
title: "Async Python: fire and forget method"
date: 2021-03-27
tags:
  - post
  - published
  - python
  - async
  - fire and forget
  - background
  - method
  - function
---

## The decorator method

```python
def fire_and_forget(f):
    from functools import wraps

    @wraps(f)
    def wrapped(*args, **kwargs):
        loop = asyncio.get_event_loop()
        if callable(f):
            return loop.run_in_executor(None, f, *args, **kwargs)
        else:
            raise TypeError('Task must be a callable')
    return wrapped
```

## An example:

Use the method above as a decorator for other methods:

```python
@fire_and_forget
async hello_world():
  sleep(5)
  print("Successful")
```
