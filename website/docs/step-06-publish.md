---
id: step-06-publish
title: Step 06 - Go Live
sidebar_label: Publish
---

# Publish

This app is built completely in HTML/JS/CSS, no backend server needed. Just a static file hosting will do. Here we choose Amazon S3.

In [Step 02](step-02-prepare.html) we created an AWS Mobile Hub project. During that step we have created everything that we needed for this app.

Go to AWS Console -> Mobile Hub. Click `Resources` on the top-right corner. Look for "Amazon S3 Buckets", then find the bucket that has `hosting` inside its name.

Upload files under `build/` folder to this bucket. Then open in browser. We are live!

<img src="assets/img/live.png" width="360px" />
