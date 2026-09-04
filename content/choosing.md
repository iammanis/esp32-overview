---
title: "Choosing"
lede: "Fourteen options is too many. Nine questions, in order of how much they constrain the answer, that narrow the family down to one or two parts."
description: "How to choose an ESP32 variant: a decision guide covering radio requirements, power budget, memory, display, GPIO count, USB, certification and availability."
weight: 70
---

## The short version

If you do not want to read the rest of this page:

| If you are… | Buy |
|---|---|
| Starting a new connected product | **ESP32-C6** |
| Building something with a screen or camera | **ESP32-S3** |
| Trying to hit the lowest possible cost | **ESP32-C3** (or **C2** at volume) |
| Building a battery sensor for a mesh | **ESP32-H2** |
| Driving a 1080p display or encoding video | **ESP32-P4** + **ESP32-C6** |
| Needing 5 GHz Wi-Fi | **ESP32-C5** |
| Needing Bluetooth Classic | **ESP32** (original) or **ESP32-S31** |
| Needing every radio plus gigabit Ethernet | **ESP32-S31** |
| Adding Wi-Fi 6E to a Linux host | **ESP32-E22** |

Everything below is the reasoning, in the order that actually eliminates options fastest.

## 1. Which radios do you need?

This eliminates more candidates than any other question, so ask it first.

| Requirement | Candidates |
|---|---|
| Wi-Fi + BLE, 2.4 GHz, cost-driven | C2, C3 |
| Wi-Fi 6 (802.11ax), 2.4 GHz | **C6**, C61, S31 |
| Wi-Fi on **5 GHz** | **C5** only |
| Wi-Fi on **6 GHz** (Wi-Fi 6E) | **E22** only — and only as a host co-processor |
| **Bluetooth Classic** (A2DP, HFP, SPP) | ESP32, **S31**, E22 |
| **Bluetooth 5.4** / LE Audio | **H4**, S31, E22 |
| **802.15.4** (Thread, Zigbee, Matter-over-Thread) | C5, **C6**, H2, H21, H4, S31 |
| Wi-Fi **and** 802.15.4 in one chip | C5, **C6**, S31 |
| **No radio** — wired or companion only | **P4** |
| Wired **Ethernet MAC** on-chip | ESP32 (10/100), P4 (10/100), **S31** (1 Gbps) |

Two things commonly go wrong here. People assume all ESP32 parts can join any Wi-Fi network — only the
**C5** does 5 GHz. And people assume Bluetooth means Bluetooth Classic — only **three** parts have it,
and the newest general-purpose ones do not.

## 2. What is the power budget?

| Situation | Candidates |
|---|---|
| Mains powered | Anything. Skip to question 3. |
| Rechargeable battery, daily charge | Anything except the P4 if runtime matters |
| Battery lasting months, Wi-Fi required | **C6** — Target Wake Time is the reason |
| Battery lasting years, no Wi-Fi needed | **H2**, later **H21** |
| Coin cell, multi-year | **H21** (5 µA + DC-DC) or **H2** (7 µA, available now) |
| Needs to process sensor data *while asleep* | Parts with an LP core: **C5, C6, H4, P4, S31**, or ULP: S2, S3 |

The LP-core question is more important than the deep-sleep number. Without a low-power core, every
sensor reading costs a full wake-up: boot, associate, transmit, sleep. With one, the coprocessor can
read and filter continuously and only wake the expensive parts when something changes. For slowly
varying quantities that can be an order-of-magnitude difference in battery life.

Note also that on a real board the **regulator's quiescent current and your pull-ups will usually
dominate** the chip's sleep current. Chasing 2 µA between chips is pointless if your LDO burns 50 µA.

## 3. How much memory do you need?

Estimate honestly. Running out late is expensive.

| Working set | Candidates |
|---|---|
| A few kilobytes — read a sensor, post JSON | Anything, including **C2** (272 KB) |
| Tens of kilobytes — TLS, MQTT, small web UI | **C3** (400 KB) and up |
| Hundreds of kilobytes — larger web UI, buffers | **C6** or **S31** (512 KB) |
| **Megabytes** — LVGL, JPEG decode, audio, ML | Parts with PSRAM: **S3** (16 MB), **C5** (8 MB), **C61** (8 MB), **P4** (32 MB), **S31** (64 MB ext) |

Two traps. **A framebuffer is bigger than you think** — 480×480 at RGB565 is 460 KB, and you usually
want two. And the **C6 has no in-package PSRAM**, only external; if you need megabytes on a C6 you are
adding a PSRAM chip and the pins to drive it, at which point an S3 may be simpler and cheaper.

## 4. Is there a display?

| Display | Candidates |
|---|---|
| None, or a small SPI OLED / TFT | Anything |
| SPI TFT up to ~320×240 with a simple UI | **C3**, **C6** |
| Parallel RGB up to ~800×480, LVGL | **S3** |
| 24-bit parallel RGB with 2D acceleration | **S31** |
| **MIPI-DSI**, 1024×600 to 1920×1080 | **P4** only |
| E-paper | **S3** (needs the framebuffer RAM) |

## 5. Is there a camera?

| Camera need | Candidates |
|---|---|
| None | Anything |
| DVP sensor, stills or low frame rate | **S2**, **S3**, **S31** |
| **MIPI-CSI** with an ISP | **P4** only |
| Hardware **H.264** encoding | **P4** only |
| Hardware JPEG codec | **P4**, **S31** |

## 6. How many pins, and which peripherals?

| Need | Candidates |
|---|---|
| Fewer than 12 usable GPIOs | Anything, including **C2** (14) |
| 20–30 GPIOs | **C3** (22), **C5** (29), **C6** (30), **C61** (30) |
| 35–45 GPIOs | **S2** (43), **S3** (45), **H4** (35) |
| 55–60 GPIOs | **P4** (55), **S31** (60) |
| **RMT** — addressable LEDs, IR, one-wire | Everything **except C2 and C61** |
| RMT **with DMA** — long glitch-free LED chains | **S3** only |
| **Capacitive touch** | ESP32 (10), S2/S3/H4/P4/S31 (14) |
| **True DAC** (analogue out) | **ESP32**, **S2** only |
| **CAN FD** | **C5**, **H4** only |
| CAN 2.0 / TWAI | Most parts; **not the C2** |
| **I2C slave** mode | Everything **except the C2** |
| **I3C** | **P4** only |
| More than one ADC channel | Everything except the **C61** (one channel) |
| SD/MMC (not SPI) | ESP32, **S3**, P4, S31 |

The RMT row catches people out repeatedly. **If your product has a NeoPixel strip, an IR receiver or a
DS18B20 temperature sensor, do not choose the C2 or C61.**

## 7. Do you need USB?

| Need | Candidates |
|---|---|
| Nothing — UART programming is fine | Anything, including the original **ESP32** |
| Flash and debug over USB, no external bridge | Everything except the original ESP32 |
| **Be a USB device** — HID, mass storage, MIDI, CDC | **S2**, **S3**, **H4**, **S31** (Full Speed OTG) |
| USB **High Speed**, 480 Mbps — UVC, fast storage | **P4** only |
| USB host | **S3**, **P4** |

Be precise about the distinction: a **USB Serial/JTAG** peripheral (the C and H series) lets you flash
and debug over one cable, which is genuinely convenient, but it cannot present a USB device class. That
needs **OTG**.

## 8. What are your security and certification requirements?

| Requirement | Candidates |
|---|---|
| Basic secure boot + flash encryption | All parts |
| Real **ECC hardware acceleration** | **C6** (dedicated block), C3, C5, C61, H2, H4, P4, S31 |
| **eFuse-backed ECDSA** signature peripheral | **C5, C61, H2, H4, P4, S31** — notably *not* the C6 |
| **TEE / hardware isolation** (APM) | **C5, C6, C61, P4, S31** |
| **Side-channel (DPA) protection** | **C6**, **H2**, **P4** |
| **PSA Certified Level 2** | **C6** only |
| **Hardware PUF** (device-unique identity) | **S31** only |
| Best platform for software post-quantum crypto | **P4** (performance) or **S31** |

If you face a formal security review, the EU Cyber Resilience Act, or a customer security
questionnaire, the **C6** is the pragmatic choice today because PSA Level 2 is a laboratory-evaluated
claim rather than a self-assertion. The **S31** is likely to supersede it once fully characterised.

## 9. When do you ship?

The question people forget, and the one that most often overrides the others.

| Timeline | Constraint |
|---|---|
| Now, at volume | **ESP32, S2, S3, C2, C3, C5, C6, C61, H2, P4** — all in production with longevity commitments |
| Now, and you want the newest | **S31** works, but supply is still ramping and third-party framework support lags ESP-IDF |
| 2027 and beyond | **H21** and **H4** should be volume parts by then; design for them, prototype on H2 |
| You need a Linux host radio | **E22** — available, but plan around reference designs rather than DevKits |

Check the **production status badge** on each [variant page](/variants/). The C5's history is the
cautionary tale: announced June 2022, mass production May 2025.

## Worked examples

**A battery-powered temperature sensor reporting to Home Assistant.**
Radio: Thread is ideal, but only if a border router exists — otherwise Wi-Fi. Power: years on a cell.
Memory: trivial. Display: none. Pins: three.
→ **H2** if there is a Thread border router; **C6** otherwise, using Target Wake Time. Not the C3 —
no LP core means every reading costs a full wake-up.

**A 5-inch touchscreen wall panel for home control.**
Display: 800×480 or higher. Memory: megabytes. Radio: Wi-Fi, ideally Thread too. Power: mains.
→ **S3** with 8 MB PSRAM if 800×480 suffices and cost matters; **P4 + C6** for a 1024×600-plus MIPI
panel. Add an **S31** to the shortlist if you want one chip and can absorb the newness.

**A commercial smart plug, 200,000 units.**
Radio: Wi-Fi + BLE for provisioning. Power: mains. Memory: minimal. Pins: four. Cost: everything.
→ **C2/ESP8684** at volume, or **C3** if you want RMT and margin for firmware growth. Price both with
a distributor; at that volume the difference is real money. Use a **pre-certified module** regardless.

**A wireless 1080p security camera.**
Camera: MIPI-CSI with an ISP. Encode: H.264 in hardware. Radio: Wi-Fi with real throughput.
→ **P4 + C6**, or **P4 + C5** if 5 GHz upload bandwidth matters, or **P4 + E22** if you are pushing 4K.
No single chip does this.

**Retrofitting modern security onto an existing ESP32 product.**
Constraint: cannot redesign the main board; needs to satisfy new regulation.
→ Keep the ESP32 doing application work and add a **C6** as a cryptographic gatekeeper handling device
identity, signing and the TLS uplink over an authenticated SPI link. See
[Use cases → chip pairings](/use-cases/#useful-chip-pairings).

{{< note type="tip" title="When in doubt, buy two dev boards" >}}
An ESP32-C6-DevKitC-1 is $9 and an ESP32-S3-DevKitC-1 is $15. Twenty-four dollars is less than an hour
of engineering time. If the choice between two parts is genuinely close, buy both and spend an afternoon
finding out — measuring your actual workload beats reasoning from datasheets every time.
{{< /note >}}
