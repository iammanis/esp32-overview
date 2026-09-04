---
title: "ESP32-C3"
chip: esp32-c3
order: 6
lede: "Espressif's first RISC-V part, and still the value benchmark for the whole family. A dollar for a 160 MHz core with Wi-Fi, BLE 5 and hardware crypto — and six years of accumulated documentation."
description: "ESP32-C3 specifications: single-core RISC-V at 160 MHz, 400 KB SRAM, Wi-Fi 4, BLE 5, 22 GPIOs, hardware ECC, from $1.00."
---

## Why it is still recommended

The C3 was announced in 2020 as Espressif's first RISC-V chip and its answer to the question "what
replaces the ESP8266?". Six years later it is neither the fastest, the most efficient nor the most
featured part in the family — and it is still the one to recommend to most people building most
things.

The argument is boring and correct: at **$1.00 for the chip and $8 for the development board**, with
400 KB of SRAM, a 160 MHz core, Wi-Fi, Bluetooth LE 5 and hardware ECC, the C3 has no gap between what
it claims and what it delivers. Every framework supports it properly. Every tutorial works. The errata
are known and worked around. Nothing about it will surprise you at integration time.

For a sensor that reads a value and posts it somewhere, a relay controller, a switch, a light, or a
first ESP32 project, this is the right chip and has been for years.

## Where the C3 sits against the C6

This is the comparison that matters, since the C6 costs only 85 cents more:

| | ESP32-C3 | ESP32-C6 |
|---|---|---|
| Wi-Fi | Wi-Fi 4 (802.11n) | **Wi-Fi 6 (802.11ax)** |
| Bluetooth | BLE 5 | BLE 5.3 + Mesh |
| Thread / Zigbee | No | **Yes (802.15.4)** |
| Low-power core | No | **Yes, 20 MHz RISC-V** |
| SRAM | 400 KB | 512 KB |
| GPIO | 22 | 30 |
| Security certification | PSA Level 1 | **PSA Level 2** |
| Chip price from | $1.00 | $1.85 |

On specifications the C6 wins comprehensively. Choose the C3 anyway when the extra features are
genuinely unused — a mains-powered device on a quiet network does not benefit from Target Wake Time —
or when the ecosystem maturity gap matters more than the feature gap, or when 85 cents times your
volume is a number that gets discussed.

## Architecture notes

A single RISC-V core at up to 160 MHz, and single-core has the usual consequence: the Wi-Fi and
Bluetooth stacks run on the same core as your application. A tight loop or a long blocking call will
cause dropped packets. Write event-driven code, keep interrupt handlers short, and do not fight it.

**There is no ULP or LP coprocessor.** A small RTC memory region survives deep sleep for a handful of
variables, but nothing executes while the main core is down. Deep-sleep current is around **5 µA**,
which is genuinely good — better than the C6's 7 µA — but the sleep *pattern* available to you is
limited to wake-on-timer or wake-on-GPIO. You cannot, for example, have a coprocessor average
thirty ADC readings over a minute and only wake the main core if the trend crosses a threshold. On the
C6 or C5, you can.

On the security side the C3 has hardware **AES-128/256, SHA-1/224/256, RSA-3072, ECC and HMAC**, plus
secure boot v2 and flash encryption, and carries a **PSA Level 1** certification. Its ECC support is
real hardware, not bignum emulation.

## Peripherals

- **22 GPIOs** (16 on some package variants)
- **3 SPI** controllers, **1 I2S**, **1 I2C** (master and slave), **2 UART**
- **USB Serial/JTAG** — flash and debug over one USB cable with no external adapter, but no USB device
  classes
- **TWAI (CAN 2.0)**, which the C2 lacks
- **4 RMT channels** (2 TX, 2 RX) — addressable LEDs, IR, one-wire sensors all work
- **6-channel 12-bit ADC** and an internal temperature sensor
- No touch sensing, no DAC, no Ethernet MAC, no SD/MMC

{{< note type="warning" title="Check the part number for EOL status" >}}
Some early C3 part numbers are marked EOL or NRND. For a new design specify a current part —
**ESP32-C3FH4X** or **ESP32-C3FH8X** — or simply design in a current module such as the
ESP32-C3-MINI-1 or ESP32-C3-WROOM-02, which is what most people should do anyway.
{{< /note >}}

## Modules and boards

**ESP32-C3-MINI-1** from $1.80 (the `-N4-A` variant) is the cheapest module in the entire Espressif
catalogue; **ESP32-C3-WROOM-02** from $1.90 is the larger-footprint alternative. Both have `U`
external-antenna variants. Espressif also sells this die as **ESP8685**, with **ESP8685-WROOM**
modules at $2.25.

**ESP32-C3-DevKitM-1** is $8. Two specialist kits are worth knowing about:
**ESP32-C3-DevKit-RUST-2** ($18), built specifically for the Rust `esp-rs` toolchain with an onboard
IMU and sensors, and **ESP32-C3-AWS-ExpressLink-DevKit-2** ($25). **ESP32-C3-Lyra** targets audio and
LED-strip applications, and **ESP32-C3-LCDkit** pairs a 1.28-inch round display with a rotary encoder.

Third-party: Seeed's **XIAO ESP32-C3** is the standout — a genuinely tiny board with a battery
connector, widely used in wearables and small sensors.

## Choose it when

- You want the **best ratio of capability to hassle** at the bottom of the market
- The device is **mains powered** on a network that is not congested
- You are **learning**, prototyping, or building a one-off
- You need RMT for LEDs, IR or one-wire sensors on a budget
- You want RISC-V with the most mature tooling in the family

## Choose something else when

- You need Thread, Zigbee, Matter-over-Thread or Wi-Fi 6 → [ESP32-C6](/variants/esp32-c6/)
- You need a coprocessor active during deep sleep → [ESP32-C6](/variants/esp32-c6/) or
  [ESP32-C5](/variants/esp32-c5/)
- There is a display or camera involved → [ESP32-S3](/variants/esp32-s3/)
- You need USB device classes → [ESP32-S2](/variants/esp32-s2/) or [ESP32-S3](/variants/esp32-s3/)
- Volume pricing is everything → [ESP32-C2](/variants/esp32-c2/)
