# Portfolio packaging audit (2026-10)

This archive is a structured repackaging of the user's uploaded **four-member course project**, not a replacement implementation or independent authorship claim.

## Added

- Root `index.html` to redirect to the pitch view under root and repository subpaths
- Professional English and Korean READMEs, method/deployment/contribution docs, report, project screenshots
- `.gitignore`, `.nojekyll`, optional Vercel config, GitHub Actions static checker
- `scripts/check_project.py` for HTML asset references, duplicate IDs and data file integrity

## Minimal code fixes / portability

1. Load D3 from the bundled files instead of remote D3 CDNs for the pitch, player and 3D visualization pages.
2. `dashboard/dashboard.js`: normalize the `GK_Data.json` `Player` / `Team` field names for goalkeeper pitch markers and position them as GKs.
3. `dashboard/player.js`, `dashboard/player.html`: support basic GK details with fields actually present in GK JSON; avoid pretending unavailable GK demographics or wages were present; make the goalkeeper tab work and remove duplicate element IDs.
4. `dashboard/team.js`: read the bundled CSV that also powers 3D charts, rather than requiring a separate runtime XLSX browser parser; original Excel input remains archived in `data_sources/`.
5. Remove unused IDE caches, draft/mock JSX, alternative obsolete sphere page and redundant unused images. Keep original HTML/CSS/JavaScript layout and primary runtime data.

## Tests completed

- Static local HTML asset references and duplicate HTML IDs: PASS
- Parsed players JSON: 459 objects; goalkeeper JSON: 42 objects; contribution CSV: 487 rows: PASS
- Node `--check` across locally authored `.js` files: PASS

**NOT independently validated:** full web UI behavior, external image hosts, data re-computation, browser WebGL compatibility, live GitHub Pages/Vercel deployment. The execution environment blocked browser access to local HTTP/file URLs. Manual smoke testing is still necessary after upload.

## Missing for full analytical reproducibility

- Complete raw FBref table exports and original extraction/cleaning pipeline
- Python scripts for the position-specific aggregated contribution measure, scoring constants, scaling, fitted quadratic regression, classification, and robustness checks
- Personal code-level authorship / commit history for specific modules (the owner has now confirmed his four analytical responsibility areas, but repository file-level authorship remains unverified)
- Confirmed source season after reconciling the 2024–25/2020–21 discrepancy in the report

None of these gaps prevents **publishing the existing static web charts**, but they limit claims of complete end-to-end scientific reproducibility.

## Individual contribution update (2026-10-21)

The team member identified as **Jiwon Jung (郑智元)** personally confirmed responsibility for data preprocessing, radar-based player analysis/comparisons, salary analysis, and contribution-formula design/calculation. English/Korean READMEs and `docs/CONTRIBUTIONS.md` have been updated accordingly. No unconfirmed claim of exclusive authorship of individual visualization source files has been added.
