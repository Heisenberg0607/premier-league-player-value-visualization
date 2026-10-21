# Methods, data lineage, and limitations

This document summarizes the **submitted project report** and the packaged application. It does **not** claim the full historical preprocessing code has been recovered.

## Research question

Can player performance and annual wages be combined in an interactive visualization to help identify relative bargains across Premier League footballers?

## Data sources and fields

The report credits **FBref** statistics and wage data, including performance dimensions such as shooting, passing, defensive actions, goalkeeping, possession, and player/team wages. The static application ships:

| Dataset | Used by | Notes |
|---|---|---|
| `dashboard/players_data.json` | Pitch + non-GK profile + radar | 459 outfield player objects |
| `dashboard/GK_Data.json` | Pitch + GK profile + radar | 42 goalkeeper objects, different schema (`Player`/`Team`) |
| `sphere_graph/con_merge_rank_s.csv` | 3D Sphere, sunburst, team details | 487 exported player rows with position and contribution fields |
| `salary/wage_player_data.js` | Wage histogram | Serialized runtime dataset |
| `salary/scatterplot_data.js` | Contribution–wage scatterplot | Precomputed contribution, residual and grouping fields |
| `data_sources/*.xlsx` | Source material | Not required for web runtime |
| `sphere_graph/data.ipynb` | Data prep reference | Two short CSV conversion/merge snippets, **not full model pipeline** |

These datasets are **not identical in row count**. Counts are for the archived files, not necessarily the exact analytic samples used for each plot.

## Position-aware contribution score

According to Sections 3.1–3.2 of the report:

1. Ten detailed positions are organized into **six scoring groups** with different relevant indicators (GK, center backs, full backs, defensive midfield, midfield/attacking midfield, forwards).
2. Each group's tailored indicators are used to compute a contribution metric, with additional adjustments for playing-time share. The report identifies calibration constants **α = 0.8** and **β = 0.2**.
3. Contribution values are **standardized within group** using a Z-score followed by min–max scaling to a reported **0–100** range.

The report's typeset aggregation formula is not sufficiently explicit to implement identically from this package. No original complete computation notebook or tested pipeline is included, so **do not reconstruct or claim exact formula reproduction** without the original authors' calculations.

## Relative wage–performance valuation

The scatterplot uses annual wages along the horizontal axis and contribution score on the vertical axis. The shipped front-end draws the precomputed quadratic baseline:

```text
score = 0.0382 * wage_millions^2 - 0.5563 * wage_millions + 19.6367
```

Players above/below the curve are labeled relatively undervalued/overvalued. The app data includes a signed, precomputed `distance_to_quadratic` and `z_score_of_distance`; report Section 4.5 describes a **one-standard-deviation threshold** for the 'severely' undervalued/overvalued categories.

This is an **illustrative descriptive classification**. The fitted coefficient estimation code, weighting, uncertainty, and any out-of-sample evaluation are not in the supplied project archive.

## Data provenance and limitations

1. **Season conflict:** the report introduction, bibliography and website refer to the **2024–25 Premier League**, while Section **2.2** explicitly states **2020–21** as the base season. It should be reconciled with the source exports before an auditable publication.
2. **Low playing-time bias:** the report highlights Jakub Moder as a highly scored outlier with only a **five-minute** substitute appearance and 15 passes. No robust minimum-minute correction is supplied here.
3. **Not a fair universal value measure:** relative score distributions differ across roles; transformed/normalized values and salary distributions cannot be taken as causal evidence of true player value.
4. **Static data:** no live API, automatic refresh, authentication, or server-side calculation.
5. **Incomplete reproducibility:** actual raw FBref export collection/cleaning scripts and full score/regression code are not in the ZIP, though some processed exports are.
6. **External resources:** photos, club logos and some CSS/tooltips load from other websites; permissions and availability are controlled by those providers.

See the complete [Chinese course report](project_report.pdf) for the originally described design.
