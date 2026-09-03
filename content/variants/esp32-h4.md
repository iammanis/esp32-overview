---
title: "ESP32-H4"
chip: esp32-h4
order: 12
lede: "The H-series grows up: two cores, Bluetooth 5.4 with Bluetooth 6.0 certification, 35 GPIOs, CAN FD and USB OTG — still with no Wi-Fi and still at single-digit microamp sleep."
description: "ESP32-H4 specifications: dual-core RISC-V at 96 MHz, 384 KB SRAM, Bluetooth 5.4 LE (BT 6.0 certified), IEEE 802.15.4 Thread and Zigbee, CAN FD, USB OTG, 35 GPIOs."
---

## Why it is more than an H2 refresh

The [H2](/variants/esp32-h2/) and [H21](/variants/esp32-h21/) are sensor-node chips: one slow core,
19 pins, minimal peripherals. The H4 keeps the H-series radio philosophy — 802.15.4 plus Bluetooth LE,
no Wi-Fi — but scales everything else up enough to build a *device* rather than a sensor.

**Two RISC-V cores** instead of one, at 96 MHz, with a dedicated low-power domain for selected
peripherals. Two cores in a mesh device is more useful than it sounds: the 802.15.4 stack and the
Bluetooth stack are both timing-sensitive, and separating protocol work from application work removes
a class of jitter problem.

**35 GPIOs**, nearly double the H2's 19, plus **14 capacitive touch channels** — enough for a remote
control with buttons, or a panel.

**Bluetooth 5.4 (LE)**, fully implementing the 5.4 core specification and **certified against
Bluetooth 6.0**. This is a significant jump: every other H-series part is on BLE 5.0/5.3. 5.4 brings
Periodic Advertising with Responses and Encrypted Advertising Data, and the version level is what
unlocks **LE Audio** with the LC3 codec.

**USB OTG** and **CAN FD**, neither of which the H2 or H21 has. Espressif's published peripheral tables
list USB OTG for the H4; some secondary summaries disagree, so confirm against the final datasheet
before committing a design that depends on it.

**384 KB of SRAM** with up to 4 MB of PSRAM support, versus the H2's 320 KB and no PSRAM. Combined with
I2S and a DC-DC converter, this is what makes audio applications feasible.

## The applications this unlocks

Espressif positions the H4 for a distinctly different set of products than the H2:

- **LE Audio devices** — earbuds, hearing devices, broadcast audio receivers. LC3 with multi-stream
  needs the 5.4 stack, the buffer memory and the I2S path.
- **Remote controls with displays** — 35 GPIOs, touch, low power, and a Thread or BLE link back to a
  hub.
- **Smart-home hubs** — two cores let one chip run a Zigbee coordinator and BLE simultaneously.
- **Indoor positioning** — Bluetooth direction-finding and 802.15.4 ranging.
- **Low-power BLE peripherals** generally, where the H2 would be too pin-constrained.

## What it still cannot do

**No Wi-Fi.** This remains the defining constraint of the H-series. An H4 cannot reach an IP network
without a border router, a gateway, or a companion chip. If your product needs to talk to a cloud
service directly over the home network, it needs a Wi-Fi part — either instead of, or alongside, the H4.

**96 MHz.** Two cores at 96 MHz is not a lot of compute. There are no SIMD extensions and no AI
acceleration. Audio decode and mesh routing are within reach; image processing is not.

**No display or camera interface.** Screens attach over SPI, which caps you at small panels.

On security the H4 has hardware AES, SHA, RSA and ECC plus an **ECDSA digital signature peripheral**,
but — like the H2 — no APM or TEE isolation.

{{< note type="warning" title="Availability" >}}
The H4 was announced in September 2024 and is **sampling** rather than in volume production. Espressif
documents it primarily through its product page and press materials; a standalone series datasheet PDF
was not publicly indexed at the time of writing, which means several figures on this page (SRAM, USB
capability, exact deep-sleep current) come from Espressif's comparison tables rather than a
characterised datasheet. Treat them as provisional and verify with Espressif before committing.
{{< /note >}}

## Where it sits in the family

The H4's closest competitor is not another H-series part but the **[S31](/variants/esp32-s31/)**, which
also has Bluetooth 5.4 with LE Audio and 802.15.4 — plus Wi-Fi 6, plus gigabit Ethernet, plus 320 MHz
dual cores, plus real display and camera interfaces. The S31 is a much bigger chip in every sense,
including price and power.

The H4 wins where **power discipline** matters. It is a 96 MHz part with a single-digit-microamp sleep
current designed to run from a battery; the S31 is a mains-powered hub chip. If your LE Audio device
needs to last a day on a small cell, the H4 is the right family. If it is plugged into a wall, the S31
gives you far more.

## Choose it when

- You are building an **LE Audio** product on a battery
- You need **Bluetooth 5.4** features specifically, at low power
- You need **more pins and touch** than the H2 offers, without Wi-Fi's power cost
- You need **CAN FD** in a low-power, non-Wi-Fi device
- You are building a hub that must run **Zigbee and BLE concurrently**

## Choose something else when

- You need volume production today → [ESP32-H2](/variants/esp32-h2/)
- You need Wi-Fi → [ESP32-C6](/variants/esp32-c6/) or [ESP32-S31](/variants/esp32-s31/)
- You need the lowest possible sleep current on a simple sensor →
  [ESP32-H21](/variants/esp32-h21/)
- You need real compute, a display or a camera → [ESP32-S3](/variants/esp32-s3/) or
  [ESP32-P4](/variants/esp32-p4/)
