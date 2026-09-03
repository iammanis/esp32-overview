---
title: "ESP32"
chip: esp32
order: 1
lede: "The original, from 2016. Still in production, still the only member of the family with Bluetooth Classic, and still the one with the deepest pool of example code."
description: "ESP32 (original) specifications: dual-core Xtensa LX6 at 240 MHz, 520 KB SRAM, Wi-Fi 4, Bluetooth 4.2 Classic and LE, Ethernet MAC, CAN, and pricing from $1.50."
---

## Why it still matters

Ten years after launch, the original ESP32 is beaten on almost every individual specification by
something newer in the family. It has no Wi-Fi 6, no BLE 5, no 802.15.4, the highest active current,
and an instruction set Espressif has stopped designing new parts around.

It nonetheless remains a defensible choice, for three reasons that no newer part fully replaces.

**It is the only ESP32 with Bluetooth Classic** — specifically BR/EDR alongside LE 4.2. If your
product needs to pair with a phone as an A2DP audio sink, act as a hands-free device, or talk to
legacy Bluetooth serial equipment, the original ESP32 and the very new S31 are your only options in
the family. Every part in between is Bluetooth LE only.

**It has an on-chip Ethernet MAC.** Add an external PHY such as the LAN8720 or IP101GRI and you have
wired 10/100 networking with no SPI-to-Ethernet bridge chip and no bandwidth bottleneck. Until the P4
and S31, no other ESP32 offered this.

**The ecosystem depth is unmatched.** A decade of Arduino libraries, tutorials, Stack Overflow
answers, ESPHome configurations and commercial reference designs targets this specific chip. When
something goes wrong at 2 a.m., that matters more than a datasheet advantage.

## Architecture notes

Two Xtensa LX6 cores run at up to 240 MHz, and unusually for this family they are **not symmetric in
practice**: by convention ESP-IDF pins the Wi-Fi and Bluetooth stacks to one core (PRO_CPU) and leaves
the other (APP_CPU) for application code. This is a genuine advantage over the single-core C-series
parts, where radio housekeeping and your application contend for the same core.

Alongside them sits an **ULP co-processor** — an 8 MHz finite-state-machine design, not a general
RISC-V core as on later chips. It can poll an ADC or a touch pad and wake the main cores on a
threshold, but programming it is awkward compared with the LP cores on the C5, C6 and P4.

The 520 KB of SRAM is the largest in-package figure in the family, but it is fragmented across
regions with different access rules, and a meaningful slice is consumed by the Wi-Fi and Bluetooth
stacks. Enabling Bluetooth Classic and Wi-Fi simultaneously leaves considerably less free heap than
the raw number suggests.

{{< note type="warning" title="Silicon revisions and part-number churn" >}}
The original ESP32 has accumulated a long list of part numbers — D0WD, D0WDQ6, U4WDH, S0WD, PICO-D4,
and V3 revisions of several. Some earlier variants are marked NRND (not recommended for new designs).
For a new design, specify a **V3 revision** part or a current module such as the ESP32-WROOM-32E, and
read the errata sheet: several documented hardware issues were only fixed in later silicon.
{{< /note >}}

## Peripherals worth noting

- **34 GPIOs**, but a substantial number are input-only or strapping pins, and GPIO 6–11 are
  connected to the SPI flash and unusable. The practical count is well below 34.
- **Two 8-bit DACs** — the only ESP32 parts with true analogue output are this one and the S2.
- **10 capacitive touch channels**, and an 18-channel 12-bit ADC. The ADC is notoriously non-linear
  and conflicts with Wi-Fi on ADC2; calibrate it, and prefer ADC1.
- **TWAI (CAN 2.0)** and an **SDIO host and slave** interface.
- **8 RMT channels** with flexible TX/RX assignment, which is why so many addressable-LED projects
  target this chip.
- **No USB**. Programming is over UART, so boards need a CP2102 or CH340 serial bridge.

## Modules and boards

The dominant module is the **ESP32-WROOM-32E** (from $2.50), with the **-32UE** variant substituting
an external antenna connector for the PCB antenna. If you need PSRAM, the **ESP32-WROVER-E** (from
$2.80) adds it. The **ESP32-MINI-1** (from $2.30) is the small-footprint option, and
**ESP32-PICO-MINI-02** (from $3.50) is a system-in-package that shrinks the external component count
further.

For development, the ESP32-DevKitC is the reference board; **ESP32-PICO-KIT-1** costs $10. The
third-party ecosystem is enormous — NodeMCU-32S, Wemos/LOLIN D32, the AI-Thinker **ESP32-CAM** (~$10,
still the cheapest way to get a networked camera), WT32-ETH01 for Ethernet, and the LoRa-equipped
TTGO and Heltec boards.

## Choose it when

- You need **Bluetooth Classic** — A2DP audio, HFP, or SPP to legacy equipment
- You need **wired Ethernet** on a budget
- You are maintaining or extending an existing ESP32 design
- You want the **maximum amount of copy-pasteable prior art**

## Choose something else when

- You are starting fresh and want modern radios → [ESP32-C6](/variants/esp32-c6/)
- You need a display, a camera, or on-device ML → [ESP32-S3](/variants/esp32-s3/)
- Battery life is the primary constraint → [ESP32-C6](/variants/esp32-c6/) or
  [ESP32-H2](/variants/esp32-h2/)
- You want the lowest possible unit cost → [ESP32-C2](/variants/esp32-c2/) or
  [ESP32-C3](/variants/esp32-c3/)
