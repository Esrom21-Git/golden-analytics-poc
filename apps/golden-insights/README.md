This folder is intended to contain the Golden Insights frontend (currently `client/`).

Recommended safe move (use from repo root):

```bash
# move the current client/ into this folder
git mv client apps/golden-insights
```

After moving, update paths that reference `/client/...` such as the root `index.html` script tag or Vite config aliases.

If you'd like, I can perform the `git mv` and update references for you. Reply `yes` to proceed.