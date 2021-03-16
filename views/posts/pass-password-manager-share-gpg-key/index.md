---
layout: blog.njk
title: "How can I use my gpg key with other devices?"
tags:
  - post
  - published
  - gpg
  - key
  - share
  - devices
date: 2021-03-16
---

So, let's say you've setup pass (the password manager) on your computer. But then, what if you want the same password manager on your phone? How about if you have a second computer that you want to share the passwords with?

In this post I won't go into the specifics of using pass on other platforms, **but** I will share a quick and simple example of how you could share your GPG key between devices.

## 1. List your keys

First off, list the keys on the local device

```shell
gpg -k
```

**Example result:**

```shell
/home/myuser/.gnupg/pubring.kbx
---------------------------
pub   rsa3072 2020-07-11 [SC] [expires: 2022-07-11]
      GPG_KEY_ID_WHICH_SHOULD_BE_PRETTY_LONG
uid           [ultimate] Mihai Nueleanu <email@example.com>
sub   rsa3072 2020-11-16 [E] [expires: 2022-11-16]
```

## 2. Export the keys

With the key ID from the previous step, run the following export commands:

```shell
gpg --export-secret-key -a GPG_KEY_ID_WHICH_SHOULD_BE_PRETTY_LONG > private_key.asc
gpg --export -a GPG_KEY_ID_WHICH_SHOULD_BE_PRETTY_LONG > public_key.asc
```

## 3. Move your keys to the new device

Use a USB stick, or some similar **local** means to copy the keys from one device to the other. Now, warning time:

**DO NOT SHARE THESE KEYS OVER THE INTERNET!!**
**IT WOULD BE A REALLY BAD IDEA TO SEND THESE KEYS OVER THE INTERNET, BECAUSE YOU RISK BEING COMPROMISED**

## 4. Import the key

On the secondary device, copy over the key and make sure not to leave copies of it hanging on the USB stick (or similar).

Run the import command:

```
gpg --import private_key.key
```

That should do it. Enjoy!
