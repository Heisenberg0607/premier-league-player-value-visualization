# Premier League Player Contribution and Wage-Based Value Visualization

**An interactive analytics system for exploring player performance, positions, and wages, and comparing the strengths and relative value of two players.**

[English](https://github.com/Heisenberg0607/premier-league-player-value-visualization/blob/main/premier-league-player-value-visualization/README.md) | [한국어](README.ko.md)

[Live Demo](https://premier-league-player-value-visuali.vercel.app/dashboard/dashboard.html) · [Current Repository](https://github.com/Heisenberg0607/premier-league-player-value-visualization) · [Submitted Report](https://github.com/Heisenberg0607/premier-league-player-value-visualization/blob/main/premier-league-player-value-visualization/docs/project_report.pdf)

| Item | Description |
| --- | --- |
| Project Type | A four-person team project for the Data Visualization course at Peking University |
| Analysis Scope | Approximately 500 players across 20 Premier League clubs |
| Core Approach | Position-specific contribution scoring, score standardization, wage–contribution analysis, and visual comparison |
| My Role | Led the design of the data analysis logic and evaluation framework; handled preprocessing, contribution scoring, and value-for-money analysis; focused on implementing radar-chart-based player comparison |
| Public Version | A static web application built with D3.js and Three.js, deployed on Vercel |

## Project Overview

### Problem

Raw football statistics alone make it difficult to compare players while accounting for their different positional roles and wages. This project connects performance indicators with wages so that users can explore players' strengths and contributions relative to their pay.

### Approach

We organized performance, position, and wage data obtained from FBref and designed a contribution evaluation framework using different indicators for each position. The contribution scoring procedure described in the report applies group-wise Z-score standardization followed by min-max normalization to produce scores from 0–100; D3.js and Three.js provide interfaces for player comparison and contribution exploration.

### What You Can Do

Users can select a club, view player profiles, and compare two players' ability indicators on a radar chart. They can explore the relationship between wages and contribution in a scatterplot and narrow down players by team, position, wage range, and classification.

## Key Results and Screenshots

The overall project delivers a web system connecting **club and player exploration, two-player comparison, 3D contribution exploration, wage analysis, and wage-based value classification**. The profile and wage datasets cover 501 players, while the contribution and value-for-money datasets cover 487 players.

The images below were captured from the live deployment. The current public version builds on the course team project with updated UI and deployment configuration; screenshots from the original submission are included in the project report.

| Home Page | Club and Player Exploration |
| --- | --- |
| ![The live site's home page with a season introduction and feature guide](docs/screenshots/demo-home.png) | ![Player position exploration with Liverpool selected](docs/screenshots/demo-club.png) |

| Two-Player Comparison | 3D Contribution Exploration |
| --- | --- |
| ![Radar chart comparing Virgil van Dijk and William Saliba](docs/screenshots/demo-radar.png) | ![A 3D sphere for exploring contribution by position and player](docs/screenshots/demo-sphere.png) |

| Wage Analysis | Contribution Relative to Wages |
| --- | --- |
| ![Bar chart comparing Manchester City players' annual wages](docs/screenshots/demo-wages.png) | ![Value-for-money scatterplot showing wages, contribution, and the reference curve](docs/screenshots/demo-value.png) |

## My Contributions

In this team project, I **led the design of the data analysis logic and player evaluation framework**.

| Responsibility | Work Performed |
| --- | --- |
| Data Cleaning and Integration | Cleaned and integrated player performance, position, and wage data for analysis and visualization. |
| Position-Specific Contribution Design and Calculation | Selected role-specific performance indicators and designed and calculated contribution scores using group-wise standardization and normalization. |
| Wage-Based Value Analysis | Calculated value for money by connecting wages with contribution and classified players as overvalued or undervalued relative to the reference baseline. |
| Player Comparison with D3.js | Contributed to visualization development, focusing on implementing two-player comparison using radar charts. |

## Data and Preprocessing

The data sources are the **FBref performance statistics and player and club wage data** cited in the submitted report. The current web application reads processed JSON, CSV, and JavaScript datasets.

| Data File | Records | Usage |
| --- | ---: | --- |
| `dashboard/players_data.json` | 459 | Outfield player profiles and comparison |
| `dashboard/GK_Data.json` | 42 | Goalkeeper profiles and comparison |
| `salary/wage_player_data.js` | 501 | Wage bar chart |
| `sphere_graph/con_merge_rank_s.csv` | 487 | 3D visualization, Sunburst, and club information |
| `salary/scatterplot_data.js` | 487 | Wage–contribution scatterplot and player classification |

These files serve different purposes and include different player populations, so their record counts should not be added together as a single analytical sample. The numbers above were obtained by directly counting records in the public files.

**The preprocessing described in the submitted report** consists of manually obtaining tables, using pandas to clean formats and missing values, excluding players without appearances, and consolidating duplicate records for transferred players. The repository's `sphere_graph/data.ipynb` contains Excel-to-CSV conversion and coordinate-column merging code; the reproducibility scope of the full preprocessing and scoring procedure is discussed in the limitations below.

The current site labels the season as **2024/25**. The report's inconsistent season references are noted in the limitations and future directions.

## Analytical Methods and System Architecture

### 1. Position-Specific Contribution Indicators

The framework uses **6 evaluation groups**: goalkeepers, center backs, full backs, defensive midfielders, central and attacking midfielders, and forwards. Each group uses different indicators to reflect its positional role.

| Evaluation Group | Example Indicators |
| --- | --- |
| Goalkeepers | Save percentage, clean-sheet contribution, PSxG-GA |
| Center Backs | Aerial duel success rate, block, clearance, and interception contributions |
| Full Backs | Crosses, progressive carries, tackle contribution |
| Defensive Midfielders | Ball recoveries, interceptions, progressive passes |
| Central and Attacking Midfielders | Key passes, shot-creating actions, expected assists |
| Forwards | Goals, assists, expected goals, progressive passes received |

The contribution calculation described in the report incorporates role-specific indicators and the share of playing time. To account for different value ranges, **contribution values are standardized with Z-scores within each evaluation group, then min-max normalized to a 0–100 scale**.

### 2. Exploring Relative Value Through Wages and Contribution

The scatterplot's horizontal axis represents **annual wages in millions of US dollars**, and its vertical axis represents **contribution scores from 0–100**. The frontend displays the following precomputed quadratic reference curve.

```text
Reference contribution = 0.0382 × x² − 0.5563 × x + 19.6367
x = annual wages in millions of US dollars
```

Relative undervaluation and overvaluation are represented using a player's position above or below the reference curve and the Z-score of the distance stored in the dataset. The four categories are `Severely undervalued`, `Undervalued`, `Overvalued`, and `Severely overvalued`; severe undervaluation and overvaluation correspond to Z-scores above +1 and below −1, respectively.

Here, value refers to **contribution relative to wages**, which is distinct from an estimate of transfer fees or future performance.

### 3. Visualizations Designed for Comparison

| Technology or Structure | Role and Purpose |
| --- | --- |
| Python and pandas | Clean tabular data and convert it into visualization-ready files |
| D3.js | Implement multidimensional radar comparisons, wage bar charts, scatterplots, filters, tooltips, and zoom interactions |
| Three.js | Explore contribution distributions on a 3D sphere with rotation and zoom |
| HTML, CSS, and JavaScript | Connect pages and implement browser interactions |
| Static JSON, CSV, and JavaScript Data | Load processed results in the browser and display them in analytical interfaces |

The radar chart **uses separate indicator sets for goalkeepers and outfield players**. Its ability axes are calculated and scaled separately in the code and should be interpreted separately from the aggregate contribution score in the scatterplot.

```text
Performance, position, and wage data
  → Cleaning, integration, and position-specific contribution calculation
  → Visualization-ready JSON / CSV / JavaScript files
  → Filtering and comparison in the browser
     ├─ Club and player profiles
     ├─ Radar chart comparison
     ├─ 3D sphere / 2D Sunburst
     ├─ Wage bar chart
     └─ Wage–contribution scatterplot
```

## Evaluation Methods and Findings

### Analytical Results

Contribution scores in the current public **value-for-money dataset of 487 players** range from **0–100**. The stored classification results are as follows.

| Classification | Players |
| --- | ---: |
| Severely undervalued | 58 |
| Undervalued | 129 |
| Overvalued | 260 |
| Severely overvalued | 40 |
| Total | 487 |

This table shows the **exploratory classification distribution** produced by the dataset and reference curve. Its scope is the exploration of relative value within the current sample; agreement with actual player value requires separate validation.

## Setup and Usage

Use Python 3 and a modern browser with WebGL support. Clone the repository and run the following commands.

```bash
git clone https://github.com/Heisenberg0607/premier-league-player-value-visualization.git
cd premier-league-player-value-visualization/premier-league-player-value-visualization
python -m http.server 8000
```

Open [http://localhost:8000/](http://localhost:8000/) in your browser to reach the home page. An HTTP server is used for D3's JSON and CSV loading; photos, club crests, and some CDN resources require an internet connection.

The repository's static file checks can be run from the application folder.

```bash
python scripts/check_project.py
```

## Main Directories

The structure below is relative to the repository's inner `premier-league-player-value-visualization/` folder.

```text
premier-league-player-value-visualization/
├─ index.html                 # Dashboard entry point
├─ dashboard/                 # Club and player profiles, radar chart
├─ salary/                    # Wage bar chart, value-for-money scatterplot
├─ sphere_graph/              # 3D sphere, Sunburst, CSV, partial conversion notebook
├─ data_sources/              # Archived Excel data
├─ assets/                    # Shared UI resources for the current public version
├─ docs/                      # Submitted report and methodology, contribution, and deployment documents
├─ scripts/check_project.py   # Static file integrity checks
└─ vercel.json                # Static site URL configuration
```

## Original Work, References, and Terms of Use

- **Project Report:** [Data Visualization Group Project Report](https://github.com/Heisenberg0607/premier-league-player-value-visualization/blob/main/premier-league-player-value-visualization/docs/project_report.pdf)
- **Data Source:** [FBref](https://fbref.com/), as described in the submitted report's data section and references
- **Related Implementation:** `dashboard/radar_graph.js`, `salary/render_scatterplot.js`, `salary/scatterplot_data.js`

Statistics, player photos, club and league trademarks, fonts, and external libraries are subject to the terms of their respective rights holders and providers. The public demo is an independent course and portfolio project.
