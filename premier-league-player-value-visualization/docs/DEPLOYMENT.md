# Deployment guide

## Local check (recommended first)

Requirements: Python 3. No backend service, Node dependencies or API tokens.

```bash
python -m http.server 8000
```

Open `http://localhost:8000/`. Test each of these:

- Dashboard: pick Liverpool, click player/club
- Player profile and radar: select two players, zoom/reset
- Sphere: choose club, rotate, switch sphere/sunburst
- Salary: change team and annual/weekly wages
- Cost-effectiveness: use filters and hover over curve/points

Internet access may still be needed for external portraits/club badges and optional tooltip/CSS CDNs. Never load via `file://`.

## GitHub Pages (recommended)

1. Create an empty repository named `premier-league-player-value-visualization` (or another name) in your own GitHub account. Keep original team credit.
2. Unzip the prepared archive and add **its contents** at the repository root. Verify `index.html`, `dashboard/`, `salary/`, `sphere_graph/` are root-level siblings.
3. Commit and push:

   ```bash
   git init
   git add .
   git commit -m "Organize EPL player value visualization portfolio"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/premier-league-player-value-visualization.git
   git push -u origin main
   ```

4. GitHub **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: main, Folder: /(root)** → Save.
5. Published URL is typically `https://YOUR_USERNAME.github.io/premier-league-player-value-visualization/`.
6. Wait for publishing, open the URL, then manually try links, CSV loading, 3D interaction and filters.

GitHub Pages is free for public repos on eligible accounts. The `index.html` redirect is relative and `.nojekyll` disables unnecessary Jekyll processing.

### Alternative: fork the original team repository

The project is already publicly maintained at [Jake-Choi9233/Premier-League-Visualization](https://github.com/Jake-Choi9233/Premier-League-Visualization). If you prefer to preserve the team's existing Git history, **fork that original repository** to your account, then selectively apply the cleanup/README/compatibility changes from this package instead of copying the group code into an unrelated repo.

## Vercel (optional)

1. Import your GitHub repository into Vercel.
2. Choose **Framework Preset: Other**.
3. Set **Root Directory: `./`**, no build command, and no output directory override (all static assets live in the root).
4. Deploy and test the same pages and data URLs.

Vercel is not required, and no Vercel-only features are used. If a deployment wizard insists on a framework or build, choose a basic static site instead of Next.js.

## Debugging

| Symptom | Likely cause / action |
|---|---|
| `404` on `/dashboard/...` | Assets uploaded one folder too deep; check repository root |
| Blank charts with `file://` | Use `python -m http.server 8000` |
| No data or static charts | Inspect browser Network for missing CSV/JSON paths; case-sensitive filenames on GitHub Pages |
| Player portraits missing | Externally hosted image URL unavailable or blocked |
| Tooltips or styles missing | Network/CDN restriction; see network console |
| Blank 3D sphere | Browser WebGL not enabled, GPU/driver issue or JS error |
| Dashboard appears only after redirect | Expected `index.html` behavior |

## Continuous checks

Run `python scripts/check_project.py` to check HTML references, JSON/CSV and source paths. The GitHub Actions workflow additionally performs JavaScript syntax checks using Node. **These are static tests, not a substitute for a real browser smoke test**.
