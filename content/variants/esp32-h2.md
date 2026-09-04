---
title: "ESP32-H2"
chip: esp32-h2
order: 10
lede: "The ESP32 with no Wi-Fi — and that is the point. Thread, Zigbee and Bluetooth LE at 7 µA, for sensors that have to run for years on a coin cell."
description: "ESP32-H2 specifications: single-core RISC-V at 96 MHz, 320 KB SRAM, IEEE 802.15.4 (Thread 1.4, Zigbee 3.0), Bluetooth LE 5, no Wi-Fi, 7 µA deep sleep, from $1.39."
---

## Why remove Wi-Fi

Wi-Fi is expensive in every sense: die area, peak current, average current, and the RAM the stack
consumes. A Wi-Fi transmission can draw a few hundred milliamps in bursts, and even an idle associated
station must wake periodically to listen for beacons.

For a door sensor, a temperature probe or a light switch, none of that is wanted. What is wanted is a
radio that can send twenty bytes, occasionally, using as little energy as possible, on a network that
routes around dead nodes. That radio is **IEEE 802.15.4** — the physical layer beneath both **Thread**
and **Zigbee** — and the H2 is Espressif's part built entirely around it.

The H2 also carries **Bluetooth LE 5** with Long Range (coded PHY), advertising extensions and mesh
support, which covers commissioning from a phone and BLE beacon use cases.

{{< note type="info" title="802.15.4, Thread, Zigbee and Matter — how they stack" >}}
These four terms get conflated constantly. **802.15.4** is the radio: channels, modulation, 250 kbps.
**Thread** and **Zigbee** are competing network layers built on that radio — Thread is IPv6-based,
Zigbee is not. **Matter** is an application layer that runs over Thread *or* over Wi-Fi. Having the
802.15.4 radio does not by itself give you a certified Thread or Zigbee stack; you also need the
protocol stack, which Espressif provides through ESP-IDF and **ESP-Matter**. The H2 has both.
{{< /note >}}

## The consequences of no Wi-Fi

An H2 **cannot reach the internet on its own**. There is no IP-over-Wi-Fi path and no Ethernet MAC.
Every H2 deployment requires something else on the network to act as a **border router** (for Thread) or
a **coordinator/gateway** (for Zigbee) — commonly an ESP32-C6, a commercial hub, or a Home
Assistant installation with a compatible radio.

That is not a flaw; it is the architecture. Mesh end devices are supposed to be dumb, cheap and
long-lived, with the intelligence and the mains power at the border. But it does mean the H2 is never a
one-chip solution.

## Architecture and power

A single RISC-V core at up to **96 MHz** — the slowest in the current family, deliberately. 320 KB of
SRAM plus 4 KB of LP SRAM that survives deep sleep.

**Deep-sleep current is 7 µA.** There is no LP *core*, only LP peripherals — timers and sensors that can
run and wake the main core, but no coprocessor executing your code during sleep. For the duty cycles
these devices use (wake, read, transmit, sleep for ten minutes) that is usually sufficient.

Security is better than the price implies: hardware AES-128/256 **with DPA protection**, SHA, RSA, ECC
and HMAC, an **ECDSA digital signature peripheral** with eFuse-held keys, and — notably —
**ECC-based secure boot**, which is more modern than the RSA-based secure boot on the older parts and
produces smaller signatures.

{{< note type="warning" title="Secure Boot advisory AR2026-006" >}}
The H2 is affected by Espressif's AR2026-006 advisory covering a **ROM-level** ECDSA secure-boot
signature-check bypass (also affecting the C5, C61 and P4). Application-layer ECDSA verification through
ESP-IDF is unaffected. Review the advisory if ROM-level secure boot is your root of trust.
{{< /note >}}

## Peripherals

- **19 GPIOs** — enough for a sensor node, not for much else
- **2 SPI** (one dedicated to flash), **2 UART**, **2 I2C**, **1 I2S**
- **USB Serial/JTAG** for flashing and debugging
- **4 RMT channels** (2 TX, 2 RX) — so unlike the C2 and C61, IR and addressable LEDs work
- **TWAI (CAN)**, **MCPWM**, **PCNT**, **GDMA**
- **5-channel 12-bit ADC**, temperature sensor
- **No SD/MMC**, no touch sensing, no camera or LCD interface

## Modules and boards

**ESP32-H2-MINI-1** from $2.03, with `-H4S` (4 MB flash) at $2.07 and `U` external-antenna variants at
$2.13–$2.19. Bare chips: **ESP32-H2** $1.39, **ESP32-H2FH4S** $1.46.

**ESP32-H2-DevKitM-1-N4S** is $10. Espressif's longevity commitment runs from 2021.

## H2 versus H21 versus H4

The H-series now has three members, and they are close together:

| | H2 | H21 | H4 |
|---|---|---|---|
| Cores | 1 | 1 | **2** |
| Bluetooth | LE 5 | LE 5 (5.3 cert.) | **LE 5.4 (BT 6.0 cert.)** |
| Deep sleep | 7 µA | **5 µA** | ~7 µA |
| TX power | Standard | **20 dBm** | Standard |
| DC-DC converter | No | **Yes** | No |
| SRAM | 320 KB | 320 KB | **384 KB** |
| GPIO | 19 | 19 | **35** |
| Status | **Production** | Sampling | Sampling |

**The H2 is the one you can actually buy in volume today.** The H21 is a refinement of it (better
efficiency, more range) and the H4 is a step up (two cores, newer Bluetooth, far more pins) — but both
are still ramping. For a product shipping now, the H2 is the H-series.

## Choose it when

- The device is **battery powered** and must last years
- It joins a **Thread or Zigbee mesh** with a border router already present
- You are building a **Matter-over-Thread** end device
- You need **BLE mesh lighting** or long-range BLE
- Wi-Fi is genuinely unnecessary — the H2 is cheaper and lower power precisely because of it

## Choose something else when

- The device must reach the internet unaided → [ESP32-C6](/variants/esp32-c6/)
- You need more than 19 GPIOs → [ESP32-H4](/variants/esp32-h4/) when available, or
  [ESP32-C6](/variants/esp32-c6/)
- You need the absolute lowest sleep current → [ESP32-H21](/variants/esp32-h21/) at 5 µA
- You need Bluetooth 5.4 or LE Audio → [ESP32-H4](/variants/esp32-h4/) or
  [ESP32-S31](/variants/esp32-s31/)
- You want one chip that does both Wi-Fi and Thread → [ESP32-C6](/variants/esp32-c6/)
