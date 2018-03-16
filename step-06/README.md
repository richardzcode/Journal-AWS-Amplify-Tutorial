# Step 06 - Go Live

Now let's finalize and go live

* [1. Touch Ups](#1-touch-ups)
* [2. Build](#2-build)
* [3. Publish](#3-publish)

## 1. Touch Ups

We need to change icon, app title. Also I've added a sidebar point to this GitHub repo.

Not necessary to explain details in this step. Just check out the code should be fine.

## 2. Build

```
npm run build
```

The command generate everything needed into `build/` folder.

## 3. Publish

This app is built completely in HTML/JS/CSS, no backend server needed. Just a static file hosting will do. Here we choose Amazon S3.

In [Step 02](../step-02) we created an AWS Mobile Hub project. During that step we have created everything that we needed for this app.

Go to AWS Console -> Mobile Hub. Click `Resources` on the top-right corner. Look for "Amazon S3 Buckets", then find the bucket that has `hosting` inside its name.

Upload files under `build/` folder to this bucket. Then open in browser. We are live!

<img src="live.png" width="360px" />
