---
title: "Boards & Modules"
lede: "Chip, module or development board — which to buy and when. Plus the part-number grammar decoded, every official kit, and a tour of the third-party ecosystem."
description: "ESP32 boards and modules: chip vs module vs dev board, WROOM/WROVER/MINI/PICO/SOLO naming decoded, official Espressif development kits, specialty AI boards, third-party boards and accessories."
weight: 50
---

## Chip, module, or development board?

Espressif sells the same silicon in three forms, and picking the wrong one wastes either money or
months.

### The chip

A bare integrated circuit. It contains the CPU, RAM, peripherals and radio — and nothing else. It
**cannot be powered on and used directly**: you must supply the crystal oscillator circuit, the flash
memory circuit, the RF matching network and the antenna yourself.

Choosing a bare chip also means **you are responsible for radio certification**. An intentional radiator
requires FCC (US), CE/RED (EU) and equivalent approvals in each market you sell into, which realistically
means several thousand dollars and several weeks per market, plus an RF engineer who knows what they are
doing.

**Use a chip when:** you are shipping in tens of thousands of units, you have RF layout expertise, and
the $0.80–$1.50 module premium multiplied by your volume exceeds the certification cost.

### The module

A small PCB carrying the chip plus the crystal, the flash, optionally PSRAM, the RF matching network and
either a PCB antenna or a connector for an external one. Espressif's modules ship **pre-certified for
FCC and CE**, so you inherit that approval.

This is what the overwhelming majority of commercial ESP32 products use, and it is the right default.
You solder it to your own carrier board and design the rest of the product around it.

**Use a module when:** you are building a real product at anything below roughly 50,000 units.

### The development board

A module or chip on a larger PCB with a USB connector, a USB-to-serial bridge (on parts without native
USB), a voltage regulator, buttons and pin headers broken out. Designed for bench work, not for
shipping.

**Use a development board when:** prototyping, evaluating, learning, or building one of something.

{{< note type="tip" title="The usual path" >}}
Prototype on a **development board**, then design your product around the equivalent **module**. Do not
prototype on a bare chip, and do not ship a development board inside an enclosure — you are paying for a
USB bridge, an LDO and headers that your product does not need, and the mechanical form factor will
fight you.
{{< /note >}}

## Module families

Espressif's module names encode the form factor and the feature set.

| Family | What it means | Typical use |
|---|---|---|
| **WROOM** | The standard module. PCB antenna, general-purpose, widest availability | Default choice |
| **WROVER** | A WROOM with **PSRAM** added. ESP32-generation naming only | Memory-hungry ESP32 designs |
| **MINI** | The smallest footprint for a given chip | Space-constrained products |
| **SOLO** | Single-core variant of a dual-core chip | Cost reduction on ESP32/S2 |
| **PICO** | System-in-package — flash, crystal and passives inside the package | Minimum external component count |
| **DevKitC** | Full-featured development board, more pins broken out | Bench development |
| **DevKitM** | Development board built around a MINI module, cheaper | Bench development, lower cost |

Note that WROVER is a legacy naming convention: on newer parts, PSRAM is indicated by an `R` suffix on a
WROOM part number instead (`ESP32-S3-WROOM-1-N8R8`).

## Decoding part numbers

Espressif's suffixes are systematic once you know the grammar.

### Module suffixes

| Suffix | Meaning | Example |
|---|---|---|
| `N` + number | **QSPI flash** size in MB | `-N8` = 8 MB flash |
| `H` + number | Flash size, in-package / alternative process | `-H4` = 4 MB flash |
| `R` + number | **PSRAM** size in MB | `-R8` = 8 MB PSRAM |
| `V` | PSRAM runs at **1.8 V** (usually Octal SPI, higher bandwidth) | `-N32R16V` |
| `U` | **External antenna connector** instead of PCB antenna | `ESP32-WROOM-32UE` |
| `I` | External antenna (older ESP32-generation naming) | `ESP32-WROVER-IE` |
| `X` | Alternative packaging or process variant | `ESP32-C3FH4X` |
| `S` | Specific silicon variant (H-series) | `ESP32-H2FH4S` |

Worked example: **`ESP32-S3-WROOM-1-N16R8`** is an ESP32-S3 in a WROOM-1 module with **16 MB of flash**
and **8 MB of PSRAM**, with a PCB antenna. **`ESP32-S3-WROOM-1U-N8R2`** is the same family with 8 MB
flash, 2 MB PSRAM and an **external antenna connector**.

### Chip suffixes (original ESP32)

The original ESP32's part numbers predate the systematic scheme and read differently: `D0WD` is
dual-core with no in-package flash, `U4WDH` is single-core with 4 MB flash, `S0WD` is single-core,
`Q6` indicates the QFN 6×6 package rather than 5×5, and `-V3` marks the third silicon revision. For new
designs, specify **-V3** or later.

### The part numbers that are secretly other chips

| Sold as | Actually | Why |
|---|---|---|
| **ESP8684** | **ESP32-C2** with integrated flash | Positioned as an ESP8266 successor |
| **ESP8685** | **ESP32-C3** variant | Same reason |
| **ESP8266** | Genuinely the 2014 predecessor | Not an ESP32 |

If you search for "ESP32-C2 module" and find nothing, search "ESP8684".

## Official development kits

### Basic breakout boards

The plain ones, for general development. All expose most GPIOs on headers, include a USB connector and a
regulator, and have boot and reset buttons.

| Kit | Chip | Price |
|---|---|---|
| ESP32-S2-DevKitC-1 / DevKitM-1 | S2 | $8 |
| ESP32-C3-DevKitM-1 | C3 | $8 |
| ESP32-C6-DevKitM-1 | C6 | $8 |
| ESP32-C6-DevKitC-1 | C6 | $9 |
| ESP8684-DevKitM-1 / DevKitC-02 | C2 | $9.80 |
| ESP32-PICO-KIT-1 | ESP32 | $10 |
| ESP32-H2-DevKitM-1-N4S | H2 | $10 |
| ESP32-S3-DevKitC-1 | S3 | $15 |
| ESP32-C5-DevKitC-1 | C5 | $15 |

The classic **ESP32-DevKitC** for the original chip remains widely available, largely through
third-party clones.

### AI and voice-interaction kits

Espressif has invested heavily here, and these boards come with working reference applications rather
than just headers.

| Kit | Chip | Hardware | Platform |
|---|---|---|---|
| **ESP-VoCat** ($40) | S3 | 1.85" round 360×360 touch, dual-mic array, speaker, LEDs, battery | Doubao LLM, ESP-Brookesia |
| **ESP32-S3-BOX-3** ($49) | S3 | 2.4" 320×240 touch (ILI9342), dual mic, speaker, temp/humidity, IR TX/RX, radar | ChatGPT, Wenxin Yiyan |
| **ESP-SensairShuttle** ($49.90) | S3 | 1.93" 240×284 touch (ST7789P3), Bosch BME690 + BMI270 + BMM350, RGB strip, battery | XiaoZhi |
| **ESP32-S31-Korvo-1** ($59) | S31 | Audio and voice reference design | ESP-BLE-AUDIO, ESP-GMF |

### Vision kits

| Kit | Chip | Camera | Display | Capability |
|---|---|---|---|---|
| **ESP32-S3-EYE** ($45) | S3 | 2 MP DVP | 1.3" 240×240 ST7789 | Face and QR recognition (ESP-WHO) |
| **ESP32-P4-EYE** | P4 | 2 MP **MIPI-CSI** | 1.54" 240×240 ST7789 | Photo/video capture, face and pedestrian detection, fill light, microSD, battery |

### Display and HMI kits

| Kit | Chip | Display |
|---|---|---|
| **ESP32-P4-Function-EV-Board** ($56) | P4 | **7" 1920×1080 MIPI-DSI capacitive touch**, MIPI-CSI camera, Ethernet, microSD |
| ESP32-S3-LCD-EV-Board ($59) | S3 | 3.95" 480×480 RGB (GC9503CV), multi-interface daughterboard, dual mic |
| ESP32-S3-LCD-EV-Board-2 ($69) | S3 | Larger display variant |
| ESP32-C3-LCDkit | C3 | 1.28" round 240×240 (GC9A011) + EC11 rotary encoder, speaker, IR |

### Audio kits

| Kit | Chip | Audio hardware |
|---|---|---|
| ESP32-S3-Korvo-1 | S3 | **3-microphone array**, far-field capture at 3–4 m, beamforming, noise reduction, speaker, headphone |
| ESP32-S3-Korvo-2 | S3 | Dual-mic array, DVP camera, ILI9341 touch display, USB OTG, microSD |
| ESP32-C3-Lyra | C3 | ECM mic, speaker, IR transceiver, addressable RGB LED strip |
| ESP32-LyraT-Mini | ESP32 | Onboard mic, 3 W speaker output, headphone jack, microSD |

### Networking and gateway kits

| Kit | Chip | Purpose |
|---|---|---|
| **ESP Thread Border Router / Zigbee Gateway** | C6 + companion | Matter control, Thread ↔ Wi-Fi/Ethernet IPv6 bridging, web configuration |
| ESP32-Ethernet-Kit | ESP32 | 10/100 Ethernet (IP101GRI) + Wi-Fi, IPv4/IPv6 gateway reference |

### Tools

**ESP-Prog-2** ($11.50) is Espressif's JTAG debugger and flashing tool. Worth buying early: the parts
with only USB Serial/JTAG give you basic debugging over USB, but a proper JTAG probe with hardware
breakpoints and watchpoints pays for itself the first time you chase a memory corruption bug.

## Third-party boards

The third-party ecosystem is arguably the ESP32's biggest advantage over competing platforms. A
selective tour:

### Tiny form factors

**Seeed XIAO ESP32** series — thumbnail-sized boards with battery pads, available in **C3**, **C6**,
**S3**, **S3 Sense** (with camera and microphone) and now **C5** (~$7, the cheapest dual-band ESP32
board). Excellent for wearables and small sensors.

**Adafruit** — QT Py ESP32 ($14.95) with a STEMMA QT/Qwiic connector, ItsyBitsy ESP32 ($14.95), and the
**HUZZAH32 Feather** / **Feather ESP32 V2** ($19.95) with LiPo charging and access to the whole
FeatherWing accessory ecosystem. Adafruit's documentation quality is consistently the best in the
market.

**SparkFun Thing Plus** — Qwiic connector, Feather-compatible footprint.

### Cameras

**AI-Thinker ESP32-CAM** (~$10) is a phenomenon: an ESP32-S module, an OV2640 camera and a microSD slot
for the price of a coffee. It has real flaws — no USB, so you need an FTDI adapter to program it; a
notoriously marginal 3.3 V supply; and it gets hot — but nothing else offers a networked camera at that
price. **ESP32-S3-CAM** style boards are the modern equivalent, with more PSRAM and native USB.

### Displays

This is where the third-party market has been most inventive:

- **LilyGO T-Display-S3** ($15–23) — 1.9" wide IPS panel, native USB, generous PSRAM. The default
  choice for a small handheld gadget.
- **LilyGO T5 4.7" E-Paper** ($35–45) — large e-paper, readable in daylight, sips power between
  refreshes. Ideal for always-on dashboards.
- **The "Cheap Yellow Display" (CYD)** and its successors — an ESP32 with a 2.8" resistive touch
  panel for around $12, extensively documented by the community. Capacitive versions from **Guition**
  and larger panels from **Sunton**, **Elecrow** and **Waveshare** cover 3.5" to 7".
- **ESP32-P4 MIPI-DSI panel boards** are the emerging generation, targeting 1024×600 and above for
  Home Assistant wall dashboards.

### Networking and radio

- **WT32-ETH01** — ESP32 with Ethernet, popular as a cheap wired gateway.
- **TTGO LoRa32** and **Heltec WiFi LoRa** — ESP32 or S3 plus an SX127x/SX126x LoRa transceiver and an
  OLED. The standard boards for LoRaWAN and Meshtastic.
- **M5Stack** — enclosed, stackable modules (Core, StickC, Atom) with screens, batteries and a large
  accessory range. Unusually polished for prototyping demonstrable things.

### Classics

**NodeMCU-32S**, **Wemos/LOLIN D32**, and generic **ESP32-DevKitC clones** sell for $3–6 and are what
most people's first ESP32 actually is. Quality varies; the regulators on the cheapest clones are often
undersized for sustained transmit.

## Accessories and add-ons

There is no single official shield standard for the ESP32 the way there is for Arduino, but several
de-facto ecosystems have emerged:

- **Qwiic / STEMMA QT** — a 4-pin JST-SH I2C connector standard from SparkFun and Adafruit. Hundreds of
  solderless sensor breakouts. Boards with this connector are dramatically faster to prototype with.
- **FeatherWings** — stackable add-ons for Adafruit's Feather footprint: displays, motor drivers, GPS,
  LoRa, prototyping wings.
- **M5Stack Units and Hats** — sensors and actuators on Grove-style connectors for the M5 ecosystem.
- **Grove** — Seeed's 4-pin connector system, widely used on XIAO expansion boards.
- **ESP32-P4 and S3 display daughterboards** — Espressif's own EV boards use swappable display
  daughterboards (I2C, SPI, 8080, RGB) so one carrier can evaluate several panel types.
- **ESP-Prog-2** — the JTAG debugger, worth treating as essential rather than optional.
- **USB-to-UART adapters** — still needed for the original ESP32, the ESP32-CAM and any board without
  native USB or an onboard bridge. CP2102 and CH340 are the common chips.

{{< note type="info" title="Choosing a board for Home Assistant / ESPHome" >}}
If the goal is a Home Assistant sensor or dashboard rather than a product, the calculus is different:
buy a board with the peripherals already attached. A **CYD**-class touch panel, a **LilyGO T5 e-paper**
board or an **M5Stack** unit will get you to a working dashboard in an evening, and ESPHome has
ready-made configurations for the popular ones. For sensors, a **XIAO ESP32-C6** with a Qwiic sensor is
hard to beat.
{{< /note >}}
