---
title: "Sources & Method"
lede: "Where every number on this site came from, how it was verified, which claims are vendor marketing rather than measurement, and where the published documentation contradicts itself."
description: "Sources, methodology and attribution for the ESP32 Overview reference — Espressif documentation, community datasets, and known discrepancies between published sources."
weight: 90
---

## Method

Everything on this site was compiled and cross-checked in **September 2026**. The approach was:

1. **Prefer primary sources.** Specifications come from Espressif's own product pages, the SoC and
   module product selectors, the ESP-Techpedia board-selection comparison, and the series datasheets on
   `documentation.espressif.com`.
2. **Prices are Espressif's own published figures.** Every price on the [pricing page](/pricing/) is
   Espressif's "sample price for reference" as displayed on its product selector, scraped and
   transcribed rather than estimated. Third-party board prices are street prices and clearly marked as
   approximate.
3. **Flag status honestly.** Each variant carries a production status. Announced is not available;
   sampling is not volume production. The [ESP32-C5](/variants/esp32-c5/) — announced 2022, in mass
   production 2025 — is why this matters.
4. **Separate measurement from marketing.** Where a vendor claim is a specification rather than a
   characterised number, or an estimate extrapolated from similar silicon, it is labelled as such.
5. **Record disagreements** rather than silently picking one. See the discrepancies section below.

## Primary sources

### Espressif product and specification pages

- [Espressif SoC product selector](https://www.espressif.com/en/products/socs) — the authoritative list
  of current SoCs, part numbers, memory configurations, package sizes and **reference sample prices**
- [Module product selector](https://www.espressif.com/en/products/modules) — WROOM, WROVER, MINI, SOLO
  and PICO part numbers and prices
- [Development kit listing](https://www.espressif.com/en/products/devkits) — official kit prices
- Individual SoC product pages, used for the newest parts where datasheets are not yet indexed:
  [ESP32-S31](https://www.espressif.com/en/products/socs/esp32-s31),
  [ESP32-P4](https://www.espressif.com/en/products/socs/esp32-p4),
  [ESP32-C5](https://www.espressif.com/en/products/socs/esp32-c5),
  [ESP32-C61](https://www.espressif.com/en/products/socs/esp32-c61),
  [ESP32-H4](https://www.espressif.com/en/products/socs/esp32-h4),
  [ESP32-H21](https://www.espressif.com/en/products/socs/esp32-h21),
  [ESP32-E22](https://www.espressif.com/en/products/socs/esp32-e22)

### Espressif technical documentation

- [ESP-Techpedia: board selection](https://docs.espressif.com/projects/esp-techpedia/en/latest/esp-friends/get-started/board-selection.html)
  — the cross-family comparison table used for CPU, memory, radio, peripheral and longevity-commitment
  data, plus the official development-board catalogue by application area
- [documentation.espressif.com](https://documentation.espressif.com/) — series datasheets and technical
  reference manuals. This is Espressif's current canonical documentation host; older
  `espressif.com/sites/default/files/documentation/...` paths often still resolve but are being phased
  out
- [ESP-IDF Programming Guide](https://docs.espressif.com/projects/esp-idf/en/latest/) — peripheral
  capabilities per target, and the `soc_caps.h` definitions that are the ground truth for
  feature-presence questions
- [Espressif Developer Portal](https://developer.espressif.com/) — release announcements, including the
  [ESP-IDF v6.0 release](https://developer.espressif.com/blog/2026/03/idf-v6-0-release/) and the
  [ESP32-C5 mass-production announcement](https://developer.espressif.com/blog/2025/05/news-esp32c5-mp/)
- [Espressif part numbers explained](https://developer.espressif.com/blog/2025/03/espressif-part-numbers-explained/)
  — the basis for the suffix decoder on the [boards page](/boards/#decoding-part-numbers)

### Corporate history

- [Espressif milestones](https://www.espressif.com/en/company/about-us/milestones) — founding date,
  office openings, certifications and product announcements
- [Espressif: over 1 billion shipments](https://www.espressif.com/en/news/1_Billion_Chip_Sales) (October
  2023) and the [100-million milestone](https://www.espressif.com/en/node/2395)
- Product announcements including
  [ESP32-C5](https://www.espressif.com/en/news/ESP32-C5),
  [ESP32-C5 mass production](https://www.espressif.com/en/news/ESP32-C5_Mass_Production),
  [ESP32-P4](https://www.espressif.com/en/news/ESP32-P4),
  [ESP32-H4](https://www.espressif.com/en/news/ESP32-H4),
  [ESP32-E22](https://www.espressif.com/en/news/ESP32_E22_Announcement) and
  [ESP32-S31 mass production](https://www.espressif.com/en/news/ESP32_S31_Mass_Production)
- Public encyclopaedic records on Espressif Systems were used to corroborate the founding, ESP8266
  launch, ESP32 launch and STAR Market listing dates. Content from those sources has been paraphrased
  rather than reproduced.

### Software ecosystem

- [espressif/esp-idf](https://github.com/espressif/esp-idf) and the ESP-IDF release notes
- [ESPHome 2026.7.0 release notes](https://esphome.io/blog/2026/07/15/esphome-2026-7/) — the native
  toolchain default and the EN 18031 security work
- [MicroPython esp32 port](https://github.com/micropython/micropython/blob/master/ports/esp32/README.md)
- [esp-rs](https://github.com/esp-rs) — `esp-idf-sys`, `esp-idf-hal`, `esp-idf-svc`
- [espressif/esp-adf](https://github.com/espressif/esp-adf)
- [ESP Component Registry](https://components.espressif.com/)

## Community and secondary sources

Used for cross-checking, for peripheral-level detail that datasheet summaries omit, and for third-party
board information. Content from these sources has been paraphrased and independently reorganised.

- **[artkeller/ESP32Features](https://github.com/artkeller/ESP32Features)** (licensed
  [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/)) — a datasheet-derived comparison covering
  all fourteen variants. This was the most useful single secondary source for the
  [Specifications page](/specifications/): USB speed classes, UART/I2C/SPI/I2S limits, RMT channel
  architecture and DMA support, deep-sleep memory behaviour, and the hardware cryptography matrix.
  Attribution is required by its licence and gratefully given.
- **[espboards.dev](https://www.espboards.dev/blog/esp32-soc-options/)** — cross-family comparison and a
  catalogue of third-party development boards.
- **[atomic14.com/esp32/boards](https://www.atomic14.com/esp32/boards/)** — third-party board and display
  board comparisons, including street pricing.
- Vendor product pages for third-party hardware: Adafruit, Seeed Studio, LilyGO, Waveshare, M5Stack.
- The ECC-accelerator measurements referenced on the [specifications page](/specifications/#security-and-cryptography)
  — roughly 7× ECDSA signing and 16–18× ECDH speedup on the ESP32-C6 with the accelerator enabled, and
  no measurable X25519 speedup — originate from independent controlled hardware testing published by the
  community, notably [NIkir0LL/lacert](https://github.com/NIkir0LL/lacert), rather than from vendor
  documentation.

## Known discrepancies in published sources

Where sources disagree, this site records the disagreement rather than choosing silently.

**ESP32-P4 clock speed.** Espressif's product page states **400 MHz**; some datasheet revisions and
comparison tables state **360 MHz**. The difference appears to track silicon revisions, with the higher
figure applying to later revisions such as v1.3. Espressif publishes the P4 as two related documents — a
base series datasheet and a chip-revision-specific one — so confirm which revision you are ordering. This
site quotes 400 MHz and notes the discrepancy on the [P4 page](/variants/esp32-p4/).

**ESP32-H4 memory and USB.** Espressif's board-selection table lists **384 KB** of SRAM; other summaries
list 320 KB. The same table credits the H4 with **USB OTG**, which some secondary sources dispute. No
standalone H4 series datasheet PDF was publicly indexed at the time of writing, so these figures come
from comparison tables rather than a characterised datasheet. Flagged as provisional on the
[H4 page](/variants/esp32-h4/).

**ESP32 (original) deep-sleep current.** Published figures range from **~10 µA** to **~100 µA** depending
on which power domains and wake sources are assumed. This site uses ~10 µA as the typical
minimum-configuration figure, but board-level current will normally be much higher.

**ESP32-C6 ECC and ECDSA.** Espressif's marketing language for the C6 mentions ECDSA capability, but its
own security overview does not document a dedicated **ECDSA digital-signature peripheral** for that part
— only the RSA-flavoured one. Conversely the C6 *does* have a genuine, separate ECC accelerator block,
which the S3 does not, despite both being marked as having ECC. Both distinctions are documented on the
[specifications page](/specifications/#two-ticks-that-are-not-the-same-tick).

**Deep-sleep figures generally.** For the **C61**, **H4** and **S31**, published deep-sleep numbers are
Espressif estimates or are not yet published. They are labelled as estimates in the tables.

**ESP32-S31 characterisation.** Mass production began at the end of July 2026 and full power
characterisation has not been published. Several figures on the [S31 page](/variants/esp32-s31/) come from
the product page rather than a register-level datasheet.

## Security advisory referenced

**Espressif advisory AR2026-006** describes a Secure Boot bypass affecting the ROM-level ECDSA signature
check on the **ESP32-H2, C5, C61 and P4**. Application-layer ECDSA verification through ESP-IDF is not
affected. This is referenced on the affected variant pages and on the
[specifications page](/specifications/#known-advisory). Verify the advisory against your specific silicon
revision with Espressif before relying on ROM-level Secure Boot as a root of trust.

## Limitations of this site

Stated plainly:

- **Nothing here was measured.** No chip was benchmarked, no current was metered, no board was tested for
  this site. It is a synthesis of published documentation, with community measurements cited where they
  exist and attributed to their authors.
- **Prices change.** They were correct in September 2026 on Espressif's public pages and are reference
  figures rather than quotations. Confirm with a distributor.
- **New silicon moves fast.** Four of the fourteen parts documented here were announced or entered
  production within the last twelve months. Details for the H21, H4, E22 and S31 in particular will
  change as documentation matures.
- **Peripheral counts are approximate in the way datasheets are.** "45 GPIOs" never means 45 usable pins:
  strapping pins, flash pins and memory-bus pins reduce the practical count, sometimes substantially.
  Always check the pin table for your specific package and memory configuration.

## Corrections

If something here is wrong, the [repository](https://github.com/iammanis/esp32-overview) is the place to
raise it. Corrections that cite a primary source are especially welcome, as are notes on where a figure
here disagrees with silicon you have actually measured.

## Attribution and trademarks

This is an **independent reference**. It is not affiliated with, endorsed by, sponsored by or reviewed by
Espressif Systems.

**ESP32**, **ESP8266**, **ESP-IDF** and **Espressif** are trademarks of Espressif Systems (Shanghai)
Co., Ltd. **Matter**, **Thread** and **Zigbee** are trademarks of their respective organisations.
**Bluetooth** is a registered trademark of Bluetooth SIG, Inc. **Wi-Fi** is a registered trademark of
Wi-Fi Alliance. Other product and company names are the property of their respective owners and are used
here for identification only.

Content from [artkeller/ESP32Features](https://github.com/artkeller/ESP32Features) informed the
peripheral-detail and security sections and is used under
[CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/).
