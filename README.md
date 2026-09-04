# ESP32 Overview

A researched, source-cited reference site for Espressif's ESP32 family — history, every SoC variant,
detailed specifications, pricing, development boards and real-world use cases.

**Live site: <https://esp32.iammanis.com/>**

Built with [Hugo](https://gohugo.io) and a purpose-written theme. No JavaScript frameworks, no build
dependencies beyond Hugo itself, and it works with JavaScript disabled.

## What's covered

| Page | Contents |
|---|---|
| **History** | Espressif from 2008, the ESP8266 breakthrough, the 2016 ESP32 launch, the STAR Market listing, and the migration from Xtensa to RISC-V — with a full timeline |
| **Variants** | All **14** current SoCs compared side by side, plus a dedicated page for each with specifications, strengths and honest limitations |
| **Specifications** | The detail comparison charts flatten: USB speed classes, real bus clocks, RMT channel architecture, deep-sleep behaviour, and the hardware security matrix |
| **Pricing** | Espressif's own published reference prices for every chip, module and dev kit, plus third-party board street prices and BOM cost guidance |
| **Boards & Modules** | Chip vs. module vs. dev board, the WROOM/WROVER/MINI/PICO part-number grammar decoded, every official kit, and the third-party ecosystem |
| **Use Cases** | Application areas with a recommended part for each, useful multi-chip pairings, and where the ESP32 is the wrong tool |
| **Choosing** | A nine-question decision guide that narrows fourteen options to one or two, with worked examples |
| **Ecosystem** | ESP-IDF, Arduino, MicroPython, ESPHome, Rust and Zephyr compared; the SDK landscape; getting started; practical gotchas |
| **Sources & Method** | Where every number came from, and where published sources contradict each other |

All fourteen variants are documented: **ESP32**, **S2**, **S3**, **S31**, **C2**, **C3**, **C5**,
**C6**, **C61**, **H2**, **H21**, **H4**, **P4** and **E22**.

## Running it locally

Requires [Hugo **extended**](https://gohugo.io/installation/) v0.146 or later (built and tested with
0.165.0 — the extended build is needed for the asset pipeline).

```bash
git clone https://github.com/iammanis/esp32-overview.git
cd esp32-overview
hugo server
# → http://localhost:1313/
```

To produce a static build:

```bash
hugo --gc --minify          # output in ./public
```

## Repository layout

```
├── hugo.toml                     # site configuration, menus, markup settings
├── data/
│   └── chips.yaml                # single source of truth for all 14 SoCs
├── content/
│   ├── _index.md                 # home (content lives in the home.html layout)
│   ├── history.md
│   ├── variants/
│   │   ├── _index.md             # comparison + index
│   │   └── esp32*.md             # one page per SoC
│   ├── specifications.md
│   ├── pricing.md
│   ├── boards.md
│   ├── use-cases.md
│   ├── choosing.md
│   ├── ecosystem.md
│   └── sources.md
├── themes/espressive/            # the theme (see below)
├── static/favicon.svg
└── .github/workflows/deploy.yml  # builds and deploys to GitHub Pages
```

### Data-driven chip tables

Every specification table, chip card and spec panel on the site is generated from
[`data/chips.yaml`](data/chips.yaml). Adding a field or correcting a value there updates it
everywhere it appears. Each entry looks like this:

```yaml
- id: esp32-c6
  name: ESP32-C6
  slug: esp32-c6
  group: c
  tagline: The modern default. Wi-Fi 6, Thread, Zigbee, PSA L2.
  isa: RISC-V
  cores: 1
  clock: 160
  sram: 512 KB + 16 KB LP
  radioShort: Wi-Fi 6 + BLE 5.3 + 802.15.4
  gpio: 30
  deepSleep: 7 µA
  status: production
  priceFrom: 1.85
  standout: …
  weakness: …
```

To add a variant: append an entry to `data/chips.yaml`, then create
`content/variants/<slug>.md` with `chip: <id>` and `order: <n>` in the front matter. The comparison
table, the grouped card grids, the spec panel and the prev/next navigation all pick it up
automatically.

## The theme

`themes/espressive` is written for this site rather than adapted from an existing theme. It uses
Hugo's current template layout (`layouts/baseof.html`, `_partials/`, `_shortcodes/`, `_markup/`) and
provides:

- Dark-first design with a light theme, toggled and remembered, applied before first paint
- A sticky table of contents with scroll-position highlighting
- Wide, horizontally scrollable specification tables with a sticky first column
- Data-driven chip cards, spec panels and comparison tables
- Shortcodes: `compare`, `families`, `note`, `timeline` / `event`
- Responsive down to small phones, plus a print stylesheet
- Progressive enhancement only — every page is fully usable without JavaScript

### A note on subdirectory hosting

GitHub Pages project sites are served from a subpath (`/esp32-overview/`). Hugo's `relURL` does not
rewrite Markdown links that already begin with `/`, so the theme includes a link render hook
([`_markup/render-link.html`](themes/espressive/layouts/_markup/render-link.html)) that rewrites
root-relative Markdown links through `relURL`. Without it, every in-content link would 404 on a
project site.

## Deployment

[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) installs Hugo extended, builds with
the `baseURL` supplied by `actions/configure-pages`, sanity-checks the output, and publishes via
`actions/deploy-pages`. It runs on pushes to `main` and to `site/**` branches, and can be triggered
manually.

Pages is configured with **Source: GitHub Actions** (Settings → Pages).

### Custom domain

The site is served from **`esp32.iammanis.com`**. Three things keep that working:

1. **A DNS `CNAME` record** at the domain registrar: `esp32` → `iammanis.github.io.`
2. **The custom domain set in Settings → Pages**, which is what GitHub actually enforces.
3. **[`static/CNAME`](static/CNAME)**, which Hugo copies to the site root. Strictly optional for
   Actions-based deployments — GitHub does not create it and the Settings value takes precedence —
   but it documents the domain in the repository and keeps it working if deployment ever switches to
   a branch source. **If you change the domain, change it in both places.**

Because a custom domain serves from the **root** of that domain rather than from
`/esp32-overview/`, the `baseURL` in [`hugo.toml`](hugo.toml) is the domain root. The workflow does
not depend on that value in normal operation — `actions/configure-pages` reports the real base URL —
and the link check derives the expected path prefix from whatever base URL was used, so the same
build works correctly whether the site is served from a custom domain or from a
`username.github.io/repo` project path.

To move the site to a different domain, update: the DNS record, Settings → Pages,
`static/CNAME`, `baseURL` in `hugo.toml`, and `FALLBACK_BASE_URL` in the workflow.

## Accuracy, corrections and scope

Specifications and prices were compiled and cross-checked against Espressif's published
documentation in **September 2026**. Prices are Espressif's own *reference sample prices*, not
quotations — confirm with a distributor before committing a BOM.

Nothing on this site was measured. It is a synthesis of published documentation, with community
measurements cited and attributed where they exist. Where sources disagree, the disagreement is
recorded rather than silently resolved — see the
[Sources & Method](https://esp32.iammanis.com/sources/) page.

Corrections are welcome, especially ones that cite a primary source or report figures from silicon
you have actually measured. Please open an issue or a pull request.

## Attribution

Content from [artkeller/ESP32Features](https://github.com/artkeller/ESP32Features)
([CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/)) informed the peripheral-detail and
hardware-security sections. Full source list on the
[Sources & Method](https://esp32.iammanis.com/sources/) page.

This is an **independent reference**. It is not affiliated with, endorsed by or sponsored by
Espressif Systems. ESP32, ESP8266, ESP-IDF and Espressif are trademarks of Espressif Systems
(Shanghai) Co., Ltd.

## Licence

See [LICENSE](LICENSE).
