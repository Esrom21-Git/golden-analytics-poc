Planned reorganization (safe, git-friendly steps).

From repository root, run these commands to move files and preserve history:

```bash
# Move frontends
git mv client apps/golden-insights
git mv frontend apps/vehicle-management-frontend

# Move backend projects and solution
git mv VehicleManagement.Api backend/
git mv VehicleManagement.Application backend/
git mv VehicleManagement.Domain backend/
git mv VehicleManagement.Infrastructure backend/
git mv VehicleManagement.sln backend/
```

After moving, perform these edits (examples):

- Update root `index.html` script tag to point to `apps/golden-insights/client/src/main.tsx` or move the root `index.html` into the moved app and edit the path accordingly.
- Update `vite.config.ts` `resolve.alias` entries if they reference `@` -> `client/src`.
- Update `.vscode/launch.json` or other workspace configs if they reference moved paths.

Optional: I can run these `git mv` commands and update references automatically — reply `yes` to let me proceed. If you prefer manual control, run the commands above and then ask me to update configs.