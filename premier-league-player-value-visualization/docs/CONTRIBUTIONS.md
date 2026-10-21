# Individual contributions — Jiwon Jung (郑智元)

This is a **four-member Peking University Data Visualization course group project**. The original report credits 崔元皙 (team leader), 郑智元 (Jiwon Jung), 乔帅泽 and 丁键. The statement below is based on **Jiwon Jung's own confirmation of his responsibilities**, not on independent verification of the commit history or sole ownership of source-code files.

## Confirmed responsibilities (self-reported)

| Area | Jiwon Jung's responsibility | Relevant project material (context, not proof of sole code authorship) |
|---|---|---|
| **Data preprocessing** | Cleaned/preprocessed player performance and wage data for analysis and visualization. | [Data-method section](METHODOLOGY.md#data-sources-and-fields), `data_sources/`, `dashboard/players_data.json` |
| **Radar-chart-based player analysis and comparison** | Analyzed player-specific performance dimensions and compared players through the radar-chart visualization. | `dashboard/radar_graph.js`, `dashboard/player.html`; report §4.2 |
| **Salary analysis** | Analyzed player wage distributions and examined salaries alongside contribution/performance measures. | `salary/wage_barchart.js`, `salary/render_scatterplot.js`; report §§4.4–4.5 |
| **Contribution formula design and calculation** | Designed the role-specific contribution-scoring formula and calculated player contribution measures using position-relevant metrics and a playing-time adjustment. | [Methods](METHODOLOGY.md#position-aware-contribution-score); report §§3.1–3.2 |

### Team scope and attribution

The **overall application** (dashboard, radar chart, 3D sphere, 2D sunburst, salary visuals and integrations) is a **team deliverable**. The contribution statements above do not assert that Jiwon alone coded the radar module, the wage charts, the frontend infrastructure, or the 3D visualization. Where feature-implementation ownership is not confirmed, attribution remains with the whole team.

The report specifies six position-specific scoring groups, the parameters α = 0.8 and β = 0.2, and Z-score / min–max normalization; these are **methodology details of the team project**, not evidence that every software component of that process was personally coded by Jiwon. The packaged repository does **not** include the complete original preprocessing and score calculation pipeline.

## Résumé / portfolio copy

### English — concise

> Contributed to a four-member Premier League data visualization project by preprocessing player datasets, designing and computing position-aware contribution scores, analyzing wage patterns, and conducting radar-chart-based player comparisons.

### English — expanded bullets

- Preprocessed player performance and salary data for an interactive Premier League analytics dashboard.
- Designed and calculated position-aware contribution scores based on role-specific performance indicators and playing-time considerations.
- Compared player performance using radar-chart visualizations and analyzed salary distributions and relative player value.

### Korean — concise

> 4인 팀 데이터 시각화 프로젝트에서 선수 경기력·연봉 데이터 전처리, 포지션별 기여도 산출 공식 설계 및 계산, 레이더 차트 기반 선수 비교 분석, 연봉 분석을 담당했습니다.

### Chinese — concise

> 在四人合作的英超联赛数据可视化项目中，负责球员表现与薪资数据预处理、分位置贡献度公式设计与计算、基于雷达图的球员表现分析与比较，以及薪资分析。

## Evidence / follow-up materials to strengthen the portfolio

If available, add the original Python scripts/notebooks for preprocessing, contribution scoring and fitting, and cite personal commits/PRs or screenshots documenting the specific analytical workflows. **Do not claim full end-to-end reproducibility** until the missing scripts and source data are restored.

## Credit

[Original public team repository](https://github.com/Jake-Choi9233/Premier-League-Visualization). Preserve all four authors and do not represent third-party statistics, player photos or club crests as independently created.
