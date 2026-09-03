---
title: "ESP32-C2"
chip: esp32-c2
order: 5
lede: "The cost floor. A 4×4 mm RISC-V part with Wi-Fi and BLE 5 for a dollar, with almost everything else stripped out. Sold in flash-integrated form as the ESP8684."
description: "ESP32-C2 (ESP8684) specifications: single-core RISC-V at 120 MHz, 272 KB SRAM, Wi-Fi 4, BLE 5, 14 GPIOs, 4×4 mm package, from $1.00."
---

## What it is for

The C2 exists to win price-driven design contests. If you are building a smart plug, a lamp
controller or a Wi-Fi relay in six-figure volumes, the difference between a $1.00 chip and a $1.85 one
is real money, and the C2's job is to be the cheapest part that still speaks Wi-Fi and BLE 5.

Everything about it follows from that goal. The package is **4×4 mm**, the smallest in the family. The
core is a single RISC-V at 120 MHz — slower than the C3's 160 MHz. SRAM is 272 KB. There are
**14 GPIOs**. And an unusually long list of peripherals simply is not present.

{{< note type="info" title="ESP32-C2 and ESP8684 are the same silicon" >}}
Espressif sells the flash-integrated version of this die under the name **ESP8684**, which is why the
C2 appears to have no in-package flash while ESP8684 modules obviously do. If you are searching for
parts or documentation and coming up empty on "ESP32-C2", search "ESP8684" instead. The
**ESP8684-DevKitM-1** and **ESP8684-DevKitC-02** boards ($9.80) are the C2 development kits.
{{< /note >}}

## What has been removed

This is the important part of the C2 story, because the omissions are more consequential than the
specifications:

- **No RMT.** No hardware pulse generation, which means no clean WS2812/NeoPixel driving, no IR
  remote transmit/receive, and no easy one-wire protocols like DS18B20. All of these become
  bit-banging exercises with real timing risk.
- **No MCPWM.** Only basic LED PWM. Motor control with dead-time insertion and fault handling is out.
- **No PARLIO** parallel I/O.
- **I2C is master-only.** Uniquely in the family, the C2 cannot act as an I2C slave. If your product
  needs to be addressed by another controller over I2C, this chip cannot do it.
- **No ULP or LP core.** There is a small RTC region that survives deep sleep for a few variables, but
  no coprocessor can execute while the main core sleeps. Deep-sleep logic must be "wake up, decide,
  sleep again".
- **No USB OTG** — USB Serial/JTAG only.
- **No touch sensing, no DAC, no Ethernet, no CAN, no SD/MMC.**

Positively: it retains the hardware AES, SHA, RSA and TRNG, along with secure boot and flash
encryption, so the **security baseline is the same as the C3's**. Cost reduction did not come out of
the security block, which is the right trade to have made.

## As an ESP8266 replacement

The most persuasive case for the C2 is as a **drop-in-thinking replacement for the ESP8266** rather
than as a competitor to the C3. Against the 2014 part it offers a modern RISC-V core, more RAM,
Bluetooth LE 5, hardware crypto, secure boot, and a supported position in current ESP-IDF — at
roughly the same price. There is very little reason to start a new ESP8266 design in 2026 when the C2
exists.

## Where it stops making sense

The uncomfortable comparison is not with the ESP8266 but with the **C3**, which also has a base price
around $1.00, runs 33% faster, has 400 KB of SRAM instead of 272 KB, has 22 GPIOs instead of 14, and
retains RMT, TWAI and I2C slave mode. At single-unit and low-volume pricing the two are effectively
the same cost.

The C2 only wins when either (a) you are buying at a volume where negotiated pricing separates them,
or (b) the 4×4 mm footprint genuinely solves a board-space problem the 5×5 mm C3 does not.

For hobby projects and prototypes, **buy the C3 instead**. For a product going into mass production
where BOM cost is scrutinised line by line, price both.

## Modules and boards

Modules are sold under the ESP8684 name: **ESP8684-WROOM-01** through **-07** at $2.25–$2.30, in
various footprints and antenna configurations. Bare chips are **ESP8684** ($1.18) and
**ESP8684H4X** ($1.32, with 4 MB flash); the flash-less ESP32-C2 die is $1.00.

Development boards: **ESP8684-DevKitM-1** and **ESP8684-DevKitC-02**, both $9.80.

## Choose it when

- **Unit cost is the deciding factor** at real volume
- The **4×4 mm footprint** is necessary
- You are replacing an **ESP8266** in an existing design
- The application is simple: read a sensor or drive a relay, report over Wi-Fi

## Choose something else when

- You are prototyping or building one of something → [ESP32-C3](/variants/esp32-c3/)
- You need addressable LEDs, IR, or one-wire sensors → [ESP32-C3](/variants/esp32-c3/) for RMT
- You need I2C slave mode → anything else in the family
- You need Thread, Zigbee or Wi-Fi 6 → [ESP32-C6](/variants/esp32-c6/)
- You need real deep-sleep processing → [ESP32-C6](/variants/esp32-c6/) has an LP core
