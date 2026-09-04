---
title: "Pricing"
lede: "Espressif's own published reference prices for every chip, module and development kit — plus street prices for third-party boards, and a look at what actually drives the cost of an ESP32 product."
description: "ESP32 pricing: official Espressif reference sample prices for all SoCs, WROOM/WROVER/MINI modules and development kits, plus third-party board prices and BOM cost guidance."
weight: 40
---

{{< note type="warning" title="What these numbers are, and are not" >}}
The chip, module and kit prices on this page are **Espressif's own published "sample price for
reference"** figures, taken from the product selector on espressif.com and verified in September 2026.

They are indicative, not quotations. They are not volume prices — real production pricing is negotiated
with a distributor and will normally be **lower** at volume and **higher** in single quantities. They
exclude tax, shipping and any tariff. And they move: check with a distributor such as Mouser, DigiKey,
LCSC or Espressif's own sales channel before committing a BOM.
{{< /note >}}

## Bare chips

The cheapest way to buy silicon, and the right choice only if you are designing your own RF layout and
handling your own regulatory certification.

| Part number | Chip | Flash | PSRAM | Price |
|---|---|---|---|---|
| **ESP32-C3** | C3 | — | — | **$1.00** |
| ESP8684 | C2 | — | — | $1.18 |
| ESP32-S2 | S2 | — | — | $1.25 |
| ESP32-C3FH4 / C3FH4X | C3 | 4 MB | — | $1.30 |
| ESP8684H4X | C2 | 4 MB | — | $1.32 |
| ESP32-S2R2 | S2 | — | 2 MB | $1.35 |
| ESP32-H2 | H2 | — | — | $1.39 |
| ESP32-H2FH4S | H2 | 4 MB | — | $1.46 |
| ESP32-C61 | C61 | — | — | $1.46 |
| ESP32-S2F | S2 | 4 MB | — | $1.48 |
| ESP32-C3FH8X | C3 | 8 MB | — | $1.50 |
| ESP32-D0WD-V3 / D0WDQ6-V3 | ESP32 | — | — | $1.50 |
| ESP8685 | C3 | — | — | $1.50 |
| ESP32-C61HF4 | C61 | 4 MB | — | $1.51 |
| ESP32-S2FN4R2 | S2 | 4 MB | 2 MB | $1.60 |
| **ESP32-S3** | S3 | — | — | **$1.85** |
| **ESP32-C6** | C6 | — | — | **$1.85** |
| ESP32-U4WDH | ESP32 | 4 MB | — | $1.88 |
| ESP32-D0WDRH2-V3 | ESP32 | — | 2 MB | $1.95 |
| ESP32-C6FH4 | C6 | 4 MB | — | $2.06 |
| ESP32-S3R8 | S3 | — | 8 MB | $2.28 |
| ESP32-S3FH4R2 | S3 | 4 MB | 2 MB | $2.34 |
| ESP32-S3FN8 | S3 | 8 MB | — | $2.38 |
| ESP32-PICO-V3 | ESP32 (SiP) | — | — | $2.48 |
| ESP32-S3R16V | S3 | — | 16 MB (Octal) | $2.49 |
| ESP32-C5HF4 / C5HR2 | C5 | 4 MB / — | — / 2 MB | $2.50 |
| ESP32-S0WD | ESP32 | — | — | $2.50 |
| ESP32-C5 | C5 | — | — | $3.00 |
| ESP32-PICO-V3-02 | ESP32 (SiP) | 8 MB | 2 MB | $3.20 |
| ESP32-S3-PICO-1 | S3 (SiP) | — | — | $3.47 |
| **ESP32-S31NRV16** | S31 | — | 16 MB | **$3.80** |
| ESP32-S3-PICO-1-N8R8 | S3 (SiP) | 8 MB | 8 MB | $3.89 |
| **ESP32-P4NRW16X** | P4 | — | 16 MB | **$4.00** |
| ESP32-PICO-D4 | ESP32 (SiP) | 4 MB | — | $4.50 |
| **ESP32-P4NRW32X** | P4 | — | 32 MB | **$4.50** |

No public reference price has been posted for the **H21**, **H4** or **E22**.

## Modules

For most projects and nearly all commercial products, this is the right thing to buy. A module bundles
the chip, crystal, flash, PSRAM, antenna and matching network onto a certified PCB — so you inherit
**FCC and CE certification** rather than paying for your own RF qualification, which typically costs
thousands and takes weeks.

The premium over a bare chip is roughly **$0.80 to $1.50**. It is almost always worth it.

### Wi-Fi 4 + BLE modules

| Module | Chip | Price from |
|---|---|---|
| **ESP32-C3-MINI-1-N4-A** | C3 | **$1.80** |
| ESP32-C3-MINI-1-H4 / -H4X | C3 | $1.90 |
| ESP32-C3-WROOM-02 | C3 | $1.90 |
| ESP32-C3-MINI-1U-N4X | C3 | $1.90 |
| ESP32-S2-MINI-1 | S2 | $2.00 |
| ESP8685-WROOM-01 … -07 | C3 | $2.25–$2.30 |
| ESP32-MINI-1 / -1U | ESP32 | $2.30 |
| ESP32-S2-MINI-2 | S2 | $2.32 |
| ESP32-S2-SOLO-2 | S2 | $2.40 |
| **ESP32-WROOM-32E / -32UE** | ESP32 | **$2.50** |
| ESP32-WROOM-32E-H4 | ESP32 | $2.68 |
| ESP32-WROOM-32E-N8 | ESP32 | $2.80 |
| **ESP32-WROVER-E / -IE** | ESP32 + PSRAM | **$2.80** |
| ESP32-S3-WROOM-1U | S3 | $2.95 |
| **ESP32-S3-WROOM-1** | S3 | **$2.96** |
| ESP32-WROOM-32E-N16 | ESP32 | $2.99 |
| ESP32-WROVER-E-N8R8 | ESP32 | $2.99 |
| ESP32-S3-MINI-1-N4R2 | S3 | $3.01 |
| ESP32-S3-WROOM-1-N4R2 | S3 | $3.10 |
| ESP32-S3-MINI-1 / -1U | S3 | $3.10 |
| ESP32-S3-WROOM-1-N8 | S3 | $3.20 |
| ESP32-WROVER-E-N16R8 | ESP32 | $3.28 |
| ESP32-S3-WROOM-1-N4R8 / -N8R2 | S3 | $3.35 |
| ESP32-S3-WROOM-1-N16 | S3 | $3.48 |
| ESP32-PICO-MINI-02 | ESP32 (SiP) | $3.50 |
| ESP32-S3-WROOM-1-N8R8 / -N16R2 | S3 | $3.62 |
| ESP32-S3-WROOM-1-N16R8 | S3 | $3.90 |
| ESP32-S3-WROOM-2 | S3 (Octal) | $5.85 |
| ESP32-S3-WROOM-2-N32R8V | S3 | $6.68 |
| ESP32-S3-WROOM-2-N32R16V | S3 | $6.88 |

### Wi-Fi 6, 802.15.4 and next-generation modules

| Module | Chip | Radio | Price from |
|---|---|---|---|
| **ESP32-H2-MINI-1** | H2 | BLE 5 + 802.15.4 | **$2.03** |
| ESP32-H2-MINI-1-H4S | H2 | BLE 5 + 802.15.4 | $2.07 |
| ESP32-H2-MINI-1U / -1U-H4S | H2 | BLE 5 + 802.15.4 | $2.13–$2.19 |
| **ESP32-C61-MINI-1 / -1U** | C61 | Wi-Fi 6 + BLE 5 | **$2.14** |
| **ESP32-C6-MINI-1-N4** | C6 | Wi-Fi 6 + BLE 5.3 + 802.15.4 | **$2.50** |
| ESP32-C6-MINI-1U / -1U-H4 | C6 | Wi-Fi 6 + BLE + 802.15.4 | $2.53–$2.60 |
| ESP32-C6-MINI-1 | C6 | Wi-Fi 6 + BLE + 802.15.4 | $2.57 |
| ESP32-C61-WROOM-1 / -1U | C61 | Wi-Fi 6 + BLE 5 | $2.60 |
| **ESP32-C6-WROOM-1** | C6 | Wi-Fi 6 + BLE + 802.15.4 | **$2.85** |
| ESP32-C6-WROOM-1U | C6 | Wi-Fi 6 + BLE + 802.15.4 | $2.88 |
| ESP32-C6-MINI-1-H8 | C6 | Wi-Fi 6 + BLE + 802.15.4 | $2.71 |
| ESP32-C6-WROOM-1-N8 / -1U-N8 | C6 | Wi-Fi 6 + BLE + 802.15.4 | $3.13–$3.15 |
| ESP32-C6-WROOM-1-N16 / -1U-N16 | C6 | Wi-Fi 6 + BLE + 802.15.4 | $3.40–$3.43 |
| **ESP32-C5-WROOM-1 / -MINI-1** | C5 | **Dual-band** Wi-Fi 6 + BLE + 802.15.4 | **$3.50** |
| ESP32-C5-WROOM-1-N8R8 / -1U | C5 | Dual-band Wi-Fi 6 | $4.50 |
| ESP32-C5-WROOM-1-N16R8 | C5 | Dual-band Wi-Fi 6 | $5.00 |
| **ESP32-S31-WROOM-3** | S31 | Wi-Fi 6 + BT 5.4 + 802.15.4 + 1 GbE | **$5.00** |

The `U` suffix means an external antenna connector instead of the PCB antenna; the `I` in WROVER-IE
means the same thing. See [Boards → decoding part numbers](/boards/#decoding-part-numbers) for the full
suffix grammar.

## Official development kits

| Kit | Chip | What it is | Price |
|---|---|---|---|
| **ESP32-S2-DevKitC-1 / DevKitM-1** | S2 | Basic breakout | **$8** |
| **ESP32-C3-DevKitM-1** | C3 | Basic breakout | **$8** |
| **ESP32-C6-DevKitM-1** | C6 | Basic breakout | **$8** |
| **ESP32-C6-DevKitC-1** | C6 | Basic breakout, more pins | **$9** |
| ESP8684-DevKitM-1 / DevKitC-02 | C2 | Basic breakout | $9.80 |
| ESP32-PICO-KIT-1 | ESP32 | SiP breakout | $10 |
| ESP32-H2-DevKitM-1-N4S | H2 | Thread / Zigbee / BLE | $10 |
| ESP-Prog-2 | — | JTAG debugger and flashing tool | $11.50 |
| **ESP32-S3-DevKitC-1** | S3 | Basic breakout | **$15** |
| **ESP32-C5-DevKitC-1** | C5 | Dual-band Wi-Fi 6 | **$15** |
| ESP32-C3-DevKit-RUST-2 | C3 | Rust toolchain kit with onboard sensors | $18 |
| ESP32-C3-AWS-ExpressLink-DevKit-2 | C3 | AWS IoT ExpressLink | $25 |
| ESP-VoCat | S3 | 1.85" round touch, dual mic, LLM voice kit | $40 |
| ESP32-S3-EYE | S3 | 2 MP DVP camera + 1.3" display | $45 |
| ESP32-S3-BOX-3 | S3 | 2.4" touch, dual mic, radar, IR — AIoT kit | $49 |
| ESP-SensairShuttle | S3 | 1.93" touch + Bosch BME690/BMI270/BMM350 | $49.90 |
| **ESP32-P4X-Function-EV-Board** | P4 | 7" 1920×1080 MIPI-DSI + MIPI-CSI camera | **$56** |
| ESP32-S3-LCD-EV-Board | S3 | 3.95" 480×480 RGB display kit | $59 |
| **ESP32-S31-Korvo-1** | S31 | Audio and voice reference board | **$59** |
| ESP32-S3-LCD-EV-Board-2 | S3 | Larger display variant | $69 |

## Third-party boards

Street prices, which move more than Espressif's reference figures. Included to give a sense of the
market rather than as a price list.

| Board | Chip | Notable | Typical |
|---|---|---|---|
| Generic NodeMCU-32S / DevKitC clones | ESP32 | The cheapest way to get started | $3–6 |
| **AI-Thinker ESP32-CAM** | ESP32 | OV2640 camera + microSD | **~$10** |
| Seeed XIAO ESP32-C3 | C3 | Thumbnail-sized, battery pads | ~$5–8 |
| Seeed XIAO ESP32-C6 | C6 | Wi-Fi 6 + Thread, tiny | ~$8–10 |
| **Seeed XIAO ESP32-C5** | C5 | Cheapest dual-band ESP32 board | **~$7** |
| Seeed XIAO ESP32-S3 Sense | S3 | Camera + mic, 8 MB PSRAM / 8 MB flash | ~$14–20 |
| Adafruit QT Py ESP32 | ESP32 | STEMMA QT connector | $14.95 |
| Adafruit ItsyBitsy ESP32 | ESP32 | Small, breadboard friendly | $14.95 |
| Adafruit HUZZAH32 Feather / Feather V2 | ESP32 | LiPo charging, FeatherWing ecosystem | $19.95 |
| **LilyGO T-Display-S3** | S3 | 1.9" IPS display in a slim board | **$15–23** |
| LilyGO T5 4.7" E-Paper | S3 | Large e-paper, low power dashboards | $35–45 |
| "Cheap Yellow Display" / Sunton / Guition | ESP32, S3 | Resistive or capacitive touch panels | $12–30 |
| WT32-ETH01 | ESP32 | Ethernet + Wi-Fi gateway board | $8–14 |
| TTGO LoRa32 / Heltec WiFi LoRa | ESP32, S3 | SX127x/SX126x LoRa + OLED | $18–30 |
| M5Stack Core / StickC / Atom | ESP32, S3 | Enclosed, stackable modules | $10–50 |
| Waveshare ESP32-P4-Nano | P4 | Compact P4 with MIPI headers | ~$30–45 |
| BPI-BIT | ESP32 | Education board | ~$20 |

## What actually drives the cost of a product

The chip is rarely the largest line on the BOM. If you are costing an ESP32 product, these matter more:

**Memory configuration.** Going from no PSRAM to 8 MB on an S3 module costs roughly $0.40; going to
16 MB Octal on a WROOM-2 roughly triples the module price. Buy the memory you need and no more — but
note that running out of RAM late in a project is far more expensive than the part difference.

**Certification.** Using a pre-certified module means you inherit FCC and CE approval for the radio.
Designing with a bare chip means running your own intentional-radiator testing: typically several
thousand dollars and weeks of schedule, per market. **This is why the module premium is worth paying
below roughly 50,000 units.**

**Antenna choice.** A PCB antenna is free but constrained by enclosure and ground-plane geometry. An
external antenna on a `U`-variant module adds a connector, a cable and an antenna — call it $1 to $3 —
but recovers range when the enclosure is metal or the board is crowded.

**Flash endurance and OTA.** Two OTA partitions plus a factory image plus filesystem means 4 MB fills up
faster than expected. Going to 8 MB costs about $0.30 at the module level, which is cheap insurance
against not being able to ship a firmware update in year three.

**Power supply.** These chips have high peak currents during transmit — hundreds of milliamps in bursts.
An undersized regulator or insufficient bulk capacitance produces brownouts that look like firmware
bugs, and debugging that costs more engineering time than a better regulator costs in parts.

**Development boards are not products.** A $15 DevKitC has a USB-serial bridge, an LDO and headers you
will not ship. Prototype on the kit, cost the module.
