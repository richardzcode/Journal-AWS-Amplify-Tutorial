---
id: step-04-refresh-album
title: Step 04 - Everyday Journal
sidebar_label: Refresh Album
---

# Refresh Album

Notice on `S3Text.onLoad` we set a state `ts`. This is to tell `S3Album` to reload so new writing can be displayed in album.

```
        <S3Album path={path} ts={ts} picker />
```
