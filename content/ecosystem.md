---
title: "Ecosystem"
lede: "ESP-IDF, Arduino, MicroPython, ESPHome, Rust and Zephyr — what each is genuinely good for, the SDKs layered on top, and how to get your first firmware onto a board."
description: "The ESP32 software ecosystem: ESP-IDF v6.0, Arduino core, MicroPython, ESPHome, PlatformIO, Rust esp-rs, Zephyr, plus ESP-Matter, ESP-ADF, ESP-DL and getting started."
weight: 80
---

## The frameworks

An unusual property of this platform: **almost everything ends up on ESP-IDF**. The Arduino core is a
layer over it, MicroPython runs as a FreeRTOS task inside it, and ESPHome now builds against it by
default. The frameworks differ mainly in how far above it they sit.

### ESP-IDF — the foundation

Espressif's official IoT Development Framework: C and C++, FreeRTOS, CMake, and a Kconfig-based
configuration system familiar to anyone who has built a Linux kernel.

**Current versions.** **v6.0** was released in March 2026 and brings a reworked installation flow,
tooling and build-system changes, security updates and support for the newest silicon — C5, C61, H4,
E22, H21 and S31. It requires **Python 3.10 or later**. The **v5.5.x** line remains widely used and is
what most third-party components target.

**Use it when:** you are building a product. Everything is available — every peripheral, every power
mode, secure boot, flash encryption, OTA, the coexistence layer, the LP-core toolchain. Nothing is
hidden from you.

**The cost:** it is a real embedded framework with a real learning curve. Partition tables, `sdkconfig`,
component manifests and FreeRTOS task priorities are all things you will need to understand.

```bash
# Install (v6.0)
git clone -b v6.0 --recursive https://github.com/espressif/esp-idf.git ~/esp/esp-idf
cd ~/esp/esp-idf && ./install.sh esp32c6
. ./export.sh

# Build, flash and monitor
idf.py set-target esp32c6
idf.py menuconfig          # optional — configure the project
idf.py build
idf.py -p /dev/ttyACM0 flash monitor
```

### Arduino — the fastest way in

The **arduino-esp32** core wraps ESP-IDF in the Arduino API. `setup()`, `loop()`, `digitalWrite()`,
plus `WiFi.h` and `BLEDevice.h`.

**Use it when:** you are prototyping, learning, or building something where development speed matters far
more than firmware size or fine-grained power control. The library ecosystem is the real draw — for any
sensor or display you can name, someone has already written the driver.

**The cost:** abstractions hide things you eventually need. Deep-sleep power optimisation, LP-core
programming and secure boot are all harder from Arduino than from ESP-IDF. You can call ESP-IDF APIs
directly from an Arduino sketch, which is the usual escape hatch.

Install via Boards Manager using Espressif's package URL, or use PlatformIO.

### MicroPython — interactive development

A Python 3 implementation that runs as a FreeRTOS task on top of ESP-IDF, with a REPL over serial.

**Use it when:** you want to poke at hardware interactively, you are teaching, or the application is
mostly logic and network calls rather than tight timing. Being able to type `machine.Pin(2).value(1)`
and see an LED change, with no compile step, is genuinely valuable during bring-up.

**The cost:** an interpreter's memory and speed overhead, and coverage that trails ESP-IDF for newer
peripherals and newer chips.

### ESPHome — configuration instead of code

Aimed squarely at home automation: you write YAML describing sensors and entities, and it generates,
compiles and flashes the firmware, with native Home Assistant integration.

**Recent developments matter here.** **ESPHome 2026.7.0** switched the default ESP32 toolchain to
**native ESP-IDF** builds, and landed a coordinated wave of security work targeting **EN 18031**
compliance: NVS encryption, OTA downgrade protection, and a transport-agnostic provisioning component.
This moves ESPHome meaningfully closer to something you could ship commercially rather than only run at
home.

**Use it when:** the goal is a Home Assistant device. If the product is "a temperature sensor that shows
up in Home Assistant", writing C is a waste of your evening.

**The cost:** you are inside its model. Anything ESPHome does not have a component for requires either a
custom component or dropping to `lambda` blocks.

```yaml
esphome:
  name: office-sensor
esp32:
  board: esp32-c6-devkitc-1
  framework:
    type: esp-idf
wifi:
  ssid: !secret wifi_ssid
  password: !secret wifi_password
api:
ota:
  - platform: esphome
sensor:
  - platform: bme280_i2c
    temperature:
      name: "Office Temperature"
    humidity:
      name: "Office Humidity"
```

### Rust — esp-rs

Two distinct approaches, and the difference matters:

- **`std` on ESP-IDF** — `esp-idf-sys`, `esp-idf-hal` and `esp-idf-svc` bind Rust to ESP-IDF, so you get
  the full framework (Wi-Fi, BLE, TLS, OTA) with Rust's type system on top. Supports ESP-IDF v6.
- **`no_std` with `esp-hal`** — pure Rust, no ESP-IDF, no FreeRTOS. Cleaner and smaller, but you give up
  everything ESP-IDF provides, which for a networked device is a great deal.

**Use it when:** your team writes Rust and you want memory safety in firmware. `std` on ESP-IDF is the
pragmatic path for anything connected. Note that Xtensa needs a forked LLVM toolchain, while **RISC-V
targets use upstream Rust** — a real argument for choosing a C-series or P4 part if you are working in
Rust.

Espressif sells the **ESP32-C3-DevKit-RUST-2** ($18) specifically for this, with onboard sensors and an
IMU.

### Zephyr

The Linux Foundation's RTOS supports several ESP32 targets. Choose it when you are standardising a
fleet across multiple silicon vendors and want one RTOS and one driver model across all of them.
Otherwise ESP-IDF gives you better ESP32-specific coverage.

### PlatformIO

Not a framework but a build system and toolchain manager that wraps the others. The `espressif32`
platform supports Arduino, ESP-IDF and other frameworks with dependency management and a VS Code
integration. Many people prefer it to the Arduino IDE for anything non-trivial.

### Choosing between them

| Goal | Use |
|---|---|
| Shipping a commercial product | **ESP-IDF** |
| Learning, prototyping, weekend project | **Arduino** (via PlatformIO or the Arduino IDE) |
| Interactive hardware exploration, teaching | **MicroPython** |
| Home Assistant device | **ESPHome** |
| Memory-safe firmware, Rust team | **esp-rs** (`std` on ESP-IDF, RISC-V target) |
| Multi-vendor fleet, one RTOS | **Zephyr** |

## Espressif's SDKs and libraries

Layered on ESP-IDF, these are where a lot of the platform's real value sits:

| SDK | Purpose |
|---|---|
| **ESP-Matter** | Matter over Wi-Fi and Thread — the certified stack, plus commissioning and cluster implementations |
| **ESP-Thread-BR** | Thread border router reference, bridging Thread to Wi-Fi and Ethernet |
| **ESP-BLE-MESH** | Bluetooth mesh networking |
| **ESP-BLE-AUDIO** | LE Audio with LC3, for BT 5.4 parts (H4, S31) |
| **ESP-ADF** | Audio Development Framework — codecs, pipelines, streaming, AEC. Tracks ESP-IDF v5.5.x |
| **ESP-SkAInet** | Wake-word detection and on-device speech recognition |
| **ESP-WHO** | Face detection and recognition, image processing |
| **ESP-DL** | Deep-learning inference with hand-optimised kernels that exploit the S3's SIMD path |
| **ESP-GMF** | General multimedia framework, for the newer multimedia parts |
| **ESP-Brookesia** | UI framework for the AI human-machine-interface boards |
| **ESP-Hosted** | Runs the Wi-Fi/Bluetooth stack on one ESP32 for a separate host — the mechanism behind P4 + C6 pairings. Variants: NG, FG and MCU |
| **ESP RainMaker** | Espressif's managed cloud platform, with phone apps and voice-assistant integration |
| **ESP Private Agents** | Newer platform for LLM-backed voice and agent applications, targeting the S3 and S31 |
| **ESP Component Registry** | `components.espressif.com` — the package manager, used via `idf.py add-dependency` |

## Getting started, concretely

The path below works on any current variant. Substitute your target for `esp32c6`.

**1. Buy the right board.** An **ESP32-C6-DevKitC-1** ($9) or **ESP32-S3-DevKitC-1** ($15) is the right
first purchase for most people. Both have native USB, so no driver hunting.

**2. Plug it in and find the port.** On Linux, native-USB parts appear as `/dev/ttyACM0`; boards with a
CP2102 or CH340 bridge appear as `/dev/ttyUSB0`. On macOS, `/dev/cu.usbmodem*` or `/dev/cu.usbserial-*`.
Add yourself to the `dialout` group on Linux if you get permission errors.

**3. Install a toolchain.** ESP-IDF v6.0 as shown above, or the Arduino core via Boards Manager, or
`pip install esphome`.

**4. Flash something trivial first.** Prove the toolchain and the cable before debugging your own code:

```bash
idf.py create-project -p . hello
cd hello && idf.py set-target esp32c6
idf.py -p /dev/ttyACM0 flash monitor
```

**5. Know the escape hatch.** If a board will not enter download mode: hold **BOOT**, tap **RESET**,
release **BOOT**. Native-USB parts usually handle this automatically; older boards and the ESP32-CAM
often do not.

## Tools worth knowing

- **`esptool.py`** — the underlying flasher. Reads chip IDs, MAC addresses, dumps and writes flash. When
  `idf.py flash` fails, `esptool.py chip_id` tells you whether the problem is the connection or the
  build.
- **`idf.py monitor`** — serial monitor with **automatic backtrace decoding**. When the chip panics it
  prints a stack trace of addresses; the monitor resolves them to file and line numbers. Invaluable.
- **ESP-Prog-2** ($11.50) — JTAG debugger. Hardware breakpoints and watchpoints, via OpenOCD and GDB.
  The C/H-series parts give you basic JTAG over their USB Serial/JTAG peripheral without it.
- **`idf.py size-components`** — where your flash actually went, when the image no longer fits.
- **ESP Insights** — remote diagnostics: crash reports and metrics from deployed devices.
- **VS Code ESP-IDF extension** — official integration for building, flashing and debugging.

## Practical gotchas

{{< note type="warning" title="The five things that will cost you an afternoon" >}}
**Brownouts that look like software bugs.** These chips draw hundreds of milliamps in transmit bursts. An
undersized regulator or thin USB cable causes resets that appear random. Check the brownout detector's
log output before suspecting your code.

**Strapping and reserved pins.** Not every GPIO is usable. Some are strapping pins that determine boot
mode; on the original ESP32, GPIO 6–11 are wired to the SPI flash and unusable. On parts with Octal-SPI
PSRAM, more pins disappear into the memory bus. Check the datasheet pin table before finalising your
schematic.

**ADC2 conflicts with Wi-Fi.** On several parts, ADC2 cannot be read while Wi-Fi is active. Use ADC1.
And calibrate — the on-chip ADCs are not precision instruments.

**Partition tables and OTA.** The default partition layout may not leave room for two OTA slots plus a
filesystem. Plan this at the start; discovering it when your first update will not fit is painful.

**Framework version drift.** A tutorial written for ESP-IDF v4.4 may not build on v6.0 — APIs have moved
and been deprecated across major versions. Check what version an example targets, and read the migration
guides when upgrading.
{{< /note >}}

## Documentation worth bookmarking

- [ESP-IDF Programming Guide](https://docs.espressif.com/projects/esp-idf/en/latest/) — select your
  specific chip from the target dropdown; the content differs per target
- [documentation.espressif.com](https://documentation.espressif.com/) — datasheets and technical
  reference manuals, the canonical host
- [ESP Component Registry](https://components.espressif.com/) — packages
- [Espressif Developer Portal](https://developer.espressif.com/) — blog posts and release announcements,
  usually the first place new-silicon detail appears
- [github.com/espressif](https://github.com/espressif) — ESP-IDF, arduino-esp32, and every SDK above
- [ESP32 Forum](https://esp32.com/) — Espressif engineers answer questions here
