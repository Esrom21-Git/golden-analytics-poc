This folder is intended to contain the vehicle-management frontend (currently `frontend/`).

Recommended safe move (use from repo root):

```bash
# move the current frontend/ into this folder
git mv frontend apps/vehicle-management-frontend
```

After moving, update any paths referencing `/src/main.tsx` or root `index.html` script tags used by that frontend.

Reply `yes` and I will perform the move and update configs.