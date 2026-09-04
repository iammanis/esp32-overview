---
title: "ESP32-P4"
chip: esp32-p4
order: 13
lede: "400 MHz, 32 MB of in-package PSRAM, MIPI display and camera interfaces, a hardware H.264 encoder and 480 Mbps USB — and deliberately no radio at all. The ESP32 for things with real screens."
description: "ESP32-P4 specifications: dual-core RISC-V at 400 MHz plus LP core, 768 KB SRAM, up to 32 MB PSRAM, MIPI-DSI and CSI, ISP, H.264 encoder, USB 2.0 High Speed, Ethernet, 55 GPIOs, from $4.00."
---

## The chip that gave up the radio

Every other part in this family is defined by its radio. The P4 is defined by not having one. There is
no Wi-Fi, no Bluetooth, no 802.15.4 — and the die area, power budget and pin count that would have gone
to a radio went into application performance and I/O instead.

The result is by some distance the most capable Espressif application processor:

- **Two RISC-V cores at up to 400 MHz** with a single-precision FPU and AI extensions, plus a separate
  **40 MHz low-power core**
- **768 KB of on-chip L2 memory**, plus **16 or 32 MB of PSRAM in the package** and up to 64 MB external
- **MIPI-DSI** display output and **MIPI-CSI** camera input, both handling up to **1080p**
- An **image signal processor** (ISP) for the camera pipeline — demosaicing, white balance, noise
  reduction in hardware
- A **hardware H.264 encoder** and a **JPEG codec**
- A **PPA** (pixel processing accelerator) and 2D-DMA for blitting, scaling and rotation
- **USB 2.0 High Speed** at 480 Mbps, with an integrated HS PHY — plus a *separate* Full Speed OTG
  controller and a USB Serial/JTAG unit. Three independent USB controllers.
- **10/100 Ethernet MAC** (RMII), **three TWAI (CAN)** controllers, **SD/MMC**
- **55 GPIOs**, sixteen of them in the low-power domain
- **I3C** support — uniquely in the family — and **LP-I2C**, **LP-SPI**, **LP-UART**
- **14 touch channels**, two ADCs, voice activity detection

## What this actually enables

The distinction between the P4 and the S3 is the difference between *a screen* and *a display*.

An S3 drives a parallel-RGB panel at perhaps 800×480, decodes JPEGs in software with SIMD help, and
runs LVGL acceptably if you are careful about what you redraw. A P4 drives a **1920×1080 MIPI-DSI
panel**, composites through hardware, and has enough PSRAM bandwidth to double-buffer it. Espressif's
own **ESP32-P4-Function-EV-Board** ships with a 7-inch 1920×1080 touchscreen, which tells you the
target.

Similarly for cameras: an S3 with a DVP sensor gets you VGA stills and a slideshow-rate stream. A P4
with a MIPI-CSI sensor, the ISP and the H.264 encoder gets you an actual **network camera** or a
**UVC webcam** at 480 Mbps over USB.

## The radio problem, and how it is solved

You cannot ship a connected P4 product without something else providing the radio. Espressif's answer
is **ESP-Hosted**: a companion ESP32 chip runs the Wi-Fi and Bluetooth stacks and presents them to the
P4 over SDIO, SPI or UART, with the P4 running the TCP/IP stack locally.

The standard pairing is **P4 + C6**, which gets you Wi-Fi 6, Bluetooth 5.3, Thread and Zigbee. Both are
RISC-V, both use ESP-IDF, and Espressif supports the combination directly. Other combinations make
sense for specific needs: **P4 + C5** for 5 GHz, **P4 + H2** for a low-power Thread link into building
automation, **P4 + E22** for tri-band Wi-Fi 6E when you are pushing video.

Budget for this in cost and board area. A P4 at $4.00 plus a C6 at $1.85 is a $5.85 silicon bill before
memory and passives — several times the cost of a single C6 solution. The P4 is the right answer only
when you genuinely need what it does.

{{< note type="info" title="Clock speed, and which datasheet you are reading" >}}
Espressif's product page quotes **400 MHz**; some datasheet revisions and comparison tables list
**360 MHz** for the high-performance cores. The difference tracks silicon revisions — the higher figure
applies to later revisions such as v1.3. Espressif publishes the P4 as two related documents, a base
series datasheet and a chip-revision-specific one, so check which revision you are ordering.
{{< /note >}}

## Power

Deep sleep is around **25 µA** — an order of magnitude worse than the C and H series, and unremarkable
for a chip of this class. The 32 KB LP SRAM and the 40 MHz low-power core do let you run meaningful
background logic while the main cores are down, which is more useful here than a lower floor would be.
The P4 is a mains-powered or large-battery chip. Do not plan a coin-cell product around it.

## Security

Strong: **AES with DPA resistance and pseudo-round protection**, hardware SHA, RSA, ECC and HMAC, an
eFuse-backed **ECDSA digital signature peripheral**, **APM/TEE** isolation and a **Key Manager**. The
combination of 400 MHz, 768 KB of SRAM and a hardened AES block also makes the P4 the best platform in
the family for software post-quantum cryptography, since no embedded MCU accelerates ML-KEM or ML-DSA in
hardware today.

{{< note type="warning" title="Secure Boot advisory AR2026-006" >}}
The P4 is one of four parts affected by Espressif's AR2026-006 advisory concerning a **ROM-level** ECDSA
secure-boot signature-check bypass (with the H2, C5 and C61). Application-layer verification through
ESP-IDF is unaffected. Relevant if ROM-level secure boot is your intended root of trust.
{{< /note >}}

## Modules and boards

Bare chips are **ESP32-P4NRW16X** ($4.00, 16 MB PSRAM) and **ESP32-P4NRW32X** ($4.50, 32 MB), in a
QFN 9×9 package. There is no in-package flash on any variant — flash is always external.

The reference board is the **ESP32-P4-Function-EV-Board** ($56 as the P4X variant): 7-inch 1920×1080
MIPI-DSI touchscreen, 2 MP MIPI-CSI camera, microphone, speaker, Ethernet and a microSD slot.
**ESP32-P4-EYE** is the vision-focused kit, with a 2 MP MIPI-CSI camera, a 1.54-inch display, a
fill light and a battery connector.

Third-party boards have arrived quickly: Waveshare's **ESP32-P4-Nano** and **ESP32-P4-Module-DEV-KIT**
are the most widely available, and the P4 is beginning to appear on MIPI-DSI panel boards aimed at Home
Assistant dashboards.

## Choose it when

- You are driving a **high-resolution MIPI display** — anything beyond ~800×480
- You need a **real camera pipeline**: MIPI-CSI, ISP, H.264 or JPEG in hardware
- You need **USB High Speed** (480 Mbps) — UVC capture, fast mass storage
- You need **many GPIOs** (55), **multiple CAN buses** (3), or **Ethernet**
- You need the **most compute** available in the family and can add a radio separately

## Choose something else when

- You need a radio on one chip → [ESP32-C6](/variants/esp32-c6/) or
  [ESP32-S31](/variants/esp32-s31/)
- A smaller screen would do → [ESP32-S3](/variants/esp32-s3/), at a quarter of the system cost
- The device is battery powered → anything in the C or H series
- You need Wi-Fi 6, BT Classic *and* multimedia in one part →
  [ESP32-S31](/variants/esp32-s31/)
