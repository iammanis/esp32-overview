---
title: "ESP32-C5"
chip: esp32-c5
order: 7
lede: "The only ESP32 that can join a 5 GHz network. Dual-band Wi-Fi 6, Bluetooth LE 5 and 802.15.4 in one part, with two CAN FD controllers thrown in. Announced 2022, finally shipping in volume since 2025."
description: "ESP32-C5 specifications: RISC-V at 240 MHz plus LP core, 384 KB SRAM, dual-band Wi-Fi 6 on 2.4 and 5 GHz, BLE 5, 802.15.4 Thread and Zigbee, 2× CAN FD, from $2.50."
---

## The one thing only it can do

"Why won't my ESP32 connect to my Wi-Fi?" has, for a decade, had one overwhelmingly common answer:
because the network is 5 GHz and every ESP32 radio was 2.4 GHz only. The C5 is the part that fixes
this. It is the first — and as of now the only — Espressif SoC with a **dual-band Wi-Fi 6 radio
covering both 2.4 GHz and 5 GHz**, with backward compatibility down to 802.11a/b/g/n/ac.

That is worth more than raw throughput suggests. The 2.4 GHz band is crowded with Wi-Fi, Bluetooth,
Zigbee, microwave ovens and every other ESP32 in the building. Moving to 5 GHz buys a quieter
spectrum, more non-overlapping channels and lower latency, which matters for anything real-time.
Increasingly it also buys basic compatibility, as more installations put IoT devices on a 5 GHz SSID or
run 6 GHz-capable equipment where the 2.4 GHz radio is an afterthought.

The C5 also carries **802.15.4** for Thread 1.4 and Zigbee 3.0 alongside **Bluetooth LE 5**, making it
a superset of the C6's radio capability. Think of it as a 5 GHz-capable C6 that trades a little power
efficiency and a few GPIOs for the extra band.

{{< note type="info" title="It took three years to arrive" >}}
Espressif announced the C5 in June 2022; it reached mass production in **May 2025**. This is the
clearest illustration in the family of the gap between announcement and availability. It is worth
remembering when reading about parts announced recently.
{{< /note >}}

## Architecture and low power

A single high-performance RISC-V core at up to **240 MHz** — the fastest clock in the C-series, 50%
above the C6 — plus a **dedicated low-power RISC-V core** running at 20 to 48 MHz with its own 16 KB of
LP SRAM. The LP core can execute while the main core is in deep sleep, which makes real
sensor-processing-while-asleep patterns practical: poll an ADC, filter the readings, decide whether the
event is worth waking up for.

384 KB of on-chip SRAM, and unlike the C6 the C5 supports **in-package PSRAM** (up to 8 MB), which is a
meaningful advantage if you need buffer space.

Deep-sleep current is around **12 µA** — the highest of the modern C-series parts, and noticeably worse
than the C6's 7 µA. Two radios and a faster core cost something. For a device that wakes every few
minutes this is irrelevant; for a coin-cell sensor that sleeps for hours, it is the reason to choose a
C6 or an H-series part instead.

## Peripherals

- **29 GPIOs** — fewer than the C6's 30 and the C61's 30
- **Two CAN FD controllers.** Not TWAI/CAN 2.0 — actual **CAN FD**, with the higher data rates. Only
  the C5 and the H4 have this. For automotive and industrial field devices, this is a strong draw.
- **SDIO 2.0 slave**, so the C5 can act as a Wi-Fi and Bluetooth co-processor for a host CPU
- **USB Serial/JTAG** only — no USB OTG
- **3 SPI**, **1 I2S**, **2 I2C plus 1 LP-I2C**, **3 UART plus 1 LP-UART**
- **PARLIO**, **MCPWM** (6 channels), **RMT** (4 channels), **PCNT** (4 units)
- **6-channel 12-bit ADC**, two analogue comparator pads, a temperature sensor
- No touch sensing, no LCD or camera interface, no Ethernet MAC

## Security

Hardware AES, SHA, RSA, ECC, HMAC, a digital signature peripheral for both RSA and **ECDSA** (with the
private key held in eFuses and inaccessible to software), **APM** and **PMP** for memory isolation,
**XTS-AES** external memory encryption, and a TRNG.

{{< note type="warning" title="Secure Boot advisory AR2026-006" >}}
Espressif's advisory AR2026-006 describes a bypass affecting the **ROM-level** ECDSA secure-boot
signature check on the C5, along with the H2, C61 and P4. On the C5 specifically, the ROM code does not
initialise the ECDSA peripheral before verification. Application-layer ECDSA verification — TLS
handshakes, OTA checks performed by ESP-IDF — is **not** affected, because the driver initialises the
peripheral correctly. This matters if you are relying on ROM-level secure boot as your root of trust.
Check the advisory against your silicon revision.
{{< /note >}}

## Modules and boards

**ESP32-C5-WROOM-1** from $3.50, with `-N8R8` (8 MB flash, 8 MB PSRAM) at $4.50 and `-N16R8` at $5.00.
**ESP32-C5-MINI-1** is also $3.50. Bare chips: **ESP32-C5HF4** and **ESP32-C5HR2** at $2.50, the
flash-less die at $3.00.

**ESP32-C5-DevKitC-1** is $15. Third-party availability is improving — Seeed's **XIAO ESP32-C5** lands
around $7, which is currently the cheapest way to experiment with 5 GHz on an ESP32.

Software support requires **ESP-IDF 5.5 or later**; Arduino support followed afterwards and is newer
than for the C3 and C6.

## Choose it when

- The device must join a **5 GHz network**
- You need **low latency** and cannot tolerate 2.4 GHz congestion
- You need **CAN FD**
- You want Wi-Fi 6, BLE and Thread/Zigbee *and* the 5 GHz band in one chip
- You are building a **gateway** or **border router** that bridges Wi-Fi and 802.15.4

## Choose something else when

- 2.4 GHz is fine and battery life matters → [ESP32-C6](/variants/esp32-c6/), lower sleep current and
  cheaper
- You need the lowest cost → [ESP32-C3](/variants/esp32-c3/) or [ESP32-C61](/variants/esp32-c61/)
- You need a display or camera interface → [ESP32-S3](/variants/esp32-s3/)
- You need 6 GHz / Wi-Fi 6E → [ESP32-E22](/variants/esp32-e22/), but only as a host co-processor
