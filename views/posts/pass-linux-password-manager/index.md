---
layout: blog.njk
title: "Pass: the free, secure password manager"
date: 2020-09-03
tags: ["post", "pass", "linux", "password", "manager", "published"]
---

How do you manage your passwords? Google's password service? 1Password? LastPass? None of the above?

Oh well.. all of that is bloat anyways. Here's how you do it in the terminal, easy and securely.

## 1. Install pass

Depending what OS you're on, install pass with your package manager. I'll assume we're on Ubuntu, but you can do the same on OSX, Arch Linux, Debian, etc..

```bash
sudo apt-get install pass
```

## 2. Generate a GPG key

In order to encrypt your passwords, you need to generate a GPG key.

```bash
gpg --gen-key
```

You don't need to worry about what it is, you just need to know that it's the secret to opening your passwords. So you lose the key, you lose your passwords.

Another thing to pay attention to - memorize the password that you created for the GPG key with. Once again, you lose this master password, you lose all the passwords.

To summarize:

- Keep the **GPG** key **safe**
- **Remember** your master **password**

...or else you **lose** everything ☠️

## 3. Create a password store

This is where your passwords will be securely stored.

**Use the same email address** that you used when creating the GPG key in step 2.

```bash
pass init myemail@example.com
```

## 4. Put a password in the store

Let's say... a password under the name of `facebook`, for your facebook account

```bash
pass add facebook
```

## 5. Check that you did a good job

Try to see what's inside the password store:

```bash
pass
pass ls       # does the same thing
pass list     # also does the same thing
```

Copy out the passord

```bash
pass -c facebook
```

## You're done!

That's it. Rinse and repeat, add more passwords, and keep them safe. You can even generate random secure passwords so that you don't have to remember them:

```bash
pass generate gmail
```

And there's many other things you can do with it. Use the `--help` command for convenience:

```bash
pass --help
```
