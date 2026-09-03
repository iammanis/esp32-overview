---
title: "ESP32-C6"
chip: esp32-c6
order: 8
lede: "The one to default to. Wi-Fi 6, Bluetooth 5.3 and 802.15.4 for Thread and Zigbee, a low-power coprocessor, 7 µA deep sleep and the family's only PSA Level 2 security certification — for under two dollars."
description: "ESP32-C6 specifications: RISC-V at 160 MHz plus 20 MHz LP core, 512 KB SRAM, Wi-Fi 6, BLE 5.3, 802.15.4 Thread and Zigbee, PSA Level 2 certified, from $1.85."
---

## Why this is the default recommendation

The C6 is the chip that most new ESP32 designs should start with, and the reasoning is that it is the
only part where **nothing important is missing** for a typical connected device.

It has the modern radio set: **Wi-Fi 6**, **Bluetooth 5.3 with Mesh**, and **802.15.4** for Thread and
Zigbee — so it can be a Matter device over Wi-Fi *or* over Thread, a Zigbee node, or a bridge between
them. It has a **dedicated low-power core** so sleep patterns can be sophisticated. It sleeps at
**7 µA**. It has 512 KB of SRAM, the joint-largest in the C-series. It has 30 GPIOs. And it has the
strongest security certification of any chip in the family.

It costs **$1.85**, and the development board costs **$9**.

## The Wi-Fi 6 argument

Wi-Fi 6 on an IoT device is not about throughput. A smart plug does not need 600 Mbps. Two specific
802.11ax features matter:

**Target Wake Time (TWT).** The device and the access point negotiate a schedule: "I will wake at these
times, do not buffer for me otherwise." Instead of waking every beacon interval to check for traffic,
a sensor can sleep through minutes at a time with the AP's cooperation. For battery-powered
Wi-Fi devices this is transformative — Wi-Fi has historically been the wrong choice for coin-cell
products almost entirely because of beacon-listening overhead, and TWT substantially narrows that gap
against BLE and Thread.

**OFDMA and MU-MIMO.** These let the access point service many devices in one transmission
opportunity. In an apartment building with sixty competing networks, or a factory with two hundred
sensors on one AP, a Wi-Fi 6 client holds a materially more stable connection with lower latency than
a Wi-Fi 4 one. The benefit is about **contention**, not speed.

## Security: the PSA Level 2 part

The C6 is the **first RISC-V microcontroller certified to PSA Certified Level 2**, and it is the
strongest security story in the family after the brand-new S31. Concretely:

- **ESP-TEE** — a trusted execution environment with hardware-enforced isolation between a secure and
  a non-secure domain, backed by the **APM** (access permission management) block
- A **Key Manager** for provisioning and using keys without exposing them to application code
- **DPA protection** and **AES pseudo-round** countermeasures against differential power analysis —
  i.e. resistance to an attacker with physical access measuring power consumption to extract keys
- A **genuine, separate ECC accelerator** block. This is worth emphasising: it is not the general
  bignum unit doing double duty. Independent measurement shows roughly 7× faster ECDSA signing and
  16–18× faster ECDH point multiplication with the accelerator enabled.

PSA Level 2 means the Root of Trust has been laboratory-evaluated against scalable software attacks —
not merely self-asserted. If you are building anything that has to survive a security review, or that
falls under the EU Cyber Resilience Act, this is a meaningful de-risking of the compliance argument.

{{< note type="warning" title="Where the ECC accelerator does not help" >}}
The C6's ECC accelerator covers NIST curves, **not Curve25519**. Measured X25519 point multiplication
takes about the same time (~121 ms) whether the accelerator is enabled or not. This has a practical
consequence for post-quantum hybrid schemes: on a C6, the classical X25519 half of an X25519 + ML-KEM
hybrid handshake can cost more time than the entire ML-KEM encapsulation. Plan your cipher suites with
that in mind.
{{< /note >}}

## Peripherals

- **30 GPIOs** (22 on some variants)
- A **20 MHz low-power RISC-V core** with 16 KB LP SRAM, plus **LP-I2C**, **LP-UART** and **LP-SPI**
  peripherals that operate while the main core sleeps
- **Two TWAI (CAN 2.0)** controllers — note CAN 2.0, not CAN FD as on the C5
- **SDIO 2.0 slave**, so the C6 can serve as a radio co-processor for a host MCU
- **USB Serial/JTAG** — no USB OTG
- **3 SPI**, **1 I2S**, **2 I2C + 1 LP**, **3 UART + 1 LP**, **PARLIO**, **MCPWM** (3), **RMT** (4),
  **PCNT** (4)
- **7-channel 12-bit ADC**, temperature sensor, GDMA, ETM (event task matrix)
- **No in-package PSRAM** — external only, up to 16 MB. This is the C6's most awkward limitation.
- No touch sensing, no LCD or camera interface, no Ethernet MAC

Espressif's longevity commitment for the C6 runs from 2023, and it has achieved **Thread 1.4
interoperability certification**, which brings Thread-over-Infrastructure and better commissioning.

## Modules and boards

**ESP32-C6-MINI-1** from $2.50 (the `-N4` variant), **ESP32-C6-WROOM-1** from $2.85 with `-N8` at
$3.13 and `-N16` at $3.40, each with `U` external-antenna versions. Bare chip **ESP32-C6** $1.85,
**ESP32-C6FH4** (4 MB flash) $2.06.

**ESP32-C6-DevKitC-1** is $9 and **ESP32-C6-DevKitM-1** is $8. The C6 is also the Wi-Fi and Thread
element in Espressif's **ESP Thread Border Router / Zigbee Gateway** kit.

Third-party support is now broad: Seeed's **XIAO ESP32-C6**, Adafruit and SparkFun boards, and
first-class **ESPHome** and **Home Assistant** support, which is why the C6 has become the standard
part for DIY Matter and Zigbee devices.

## Choose it when

- You are starting a **new connected design** and have no reason to choose otherwise
- The product is a **Matter, Thread or Zigbee** device
- The product runs on a **battery** and uses Wi-Fi (TWAI + TWT + 7 µA sleep)
- The product must **pass a security review** or meet CRA-style requirements
- You want to bridge between Wi-Fi and 802.15.4 networks

## Choose something else when

- You need **5 GHz** Wi-Fi → [ESP32-C5](/variants/esp32-c5/)
- You need a **display, camera or megabytes of PSRAM** → [ESP32-S3](/variants/esp32-s3/)
- You need **Bluetooth Classic** or **Ethernet** → [ESP32](/variants/esp32/) or
  [ESP32-S31](/variants/esp32-s31/)
- You need **absolute lowest cost** → [ESP32-C3](/variants/esp32-c3/) or
  [ESP32-C61](/variants/esp32-c61/)
- You need **sub-5 µA sleep** with no Wi-Fi → [ESP32-H2](/variants/esp32-h2/) or
  [ESP32-H21](/variants/esp32-h21/)
