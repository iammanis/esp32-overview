---
title: "Use Cases"
lede: "What people actually build with these chips, organised by application area — with a recommended part and the reason for it in each case."
description: "ESP32 use cases and applications: smart home, Matter and Thread devices, cameras and vision, audio and voice, industrial and automotive, wearables, displays and HMI — with a recommended chip for each."
weight: 60
---

## How to read this page

Each section below covers an application area, lists the concrete products people build in it, and names
the part that fits. Where two chips are plausible, both are given with the deciding factor.

A recurring pattern worth internalising: **the right answer is often two chips**. The P4 has no radio;
the H2 has no Wi-Fi; the E22 has no application processor. Espressif designed these gaps deliberately,
expecting pairing — and supports it through **ESP-Hosted**, which lets one chip run the radio stack on
behalf of another over SDIO, SPI or UART.

## Smart home and building automation

The largest single application area for the family, and the one Espressif optimises most heavily for.

| Product | Recommended | Why |
|---|---|---|
| Smart plug, socket, relay | **C3** or **C2** | Cheapest parts that do Wi-Fi + BLE; nothing more is needed |
| Smart light bulb, LED strip controller | **C3** | RMT for addressable LEDs; the C2 and C61 lack it |
| Matter-over-Wi-Fi device | **C6** | Wi-Fi 6 + certified Matter stack; TWT if battery powered |
| Matter-over-Thread device | **C6** or **H2** | H2 if battery powered and a border router exists; C6 for both radios |
| Zigbee sensor or bulb | **H2** | 802.15.4 at 7 µA; no Wi-Fi overhead |
| Thread border router / Zigbee gateway | **C6** or **S31** | Needs both 802.15.4 and an IP uplink; S31 adds gigabit Ethernet |
| Smart thermostat | **C6** | Wi-Fi 6 + 802.15.4 + LP core; add a display and it becomes S3 |
| Wall control panel with a screen | **S3** or **P4** | S3 to ~800×480; P4 for 1080p MIPI |
| Door / window / motion sensor | **H2**, later **H21** | Coin-cell lifetime is the only real requirement |
| Smart-home hub | **S31** or **C6** | S31 for Wi-Fi 6 + BT Classic + Thread + Ethernet in one chip |
| Blind and curtain motor | **C3** or **C6** | Simple, plus MCPWM on the C6 for smoother motor control |

{{< note type="tip" title="On Matter" >}}
Matter runs over **Wi-Fi** and over **Thread**, and the choice is a power decision. Mains-powered
devices — plugs, bulbs, panels — should use Matter-over-Wi-Fi on a C6 or C61. Battery devices should use
Matter-over-Thread on an H2 or C6, because Thread's power profile is fundamentally better suited to
years on a cell. Espressif's **ESP-Matter** SDK covers both.
{{< /note >}}

## Sensors and data acquisition

| Product | Recommended | Why |
|---|---|---|
| Wi-Fi environmental sensor (mains) | **C3** | Cheap, mature, plenty fast |
| Battery environmental sensor | **C6** | TWT + LP core + 7 µA sleep; LP core can filter before waking |
| Coin-cell sensor, multi-year life | **H2** / **H21** | No Wi-Fi overhead; H21 adds a DC-DC converter and 20 dBm |
| Agricultural / soil sensor | **C6** or **H21** | LP core polls the ADC; H21 for range through crops and structures |
| Multi-channel analogue acquisition | **S3** or **P4** | 20-channel ADC on the S3, two ADCs on the P4; the C61 has just one channel |
| Vibration / predictive maintenance | **S3** or **P4 + C6** | Needs FFT: S3's SIMD, or the P4's 400 MHz with a C6 for telemetry |
| SD-card data logger | **S3** or **P4** | Real SD/MMC rather than SPI; the S3 has two slots |
| Weather station | **C6** | LP core accumulates readings; radio wakes rarely |
| Asset-tracking BLE tag | **H21** or **C3** | H21 for 5 µA and 20 dBm; C3 if cost dominates |
| Occupancy sensor | **C6** or **H2** | Both sleep well; H2 if the mesh already exists |

## Cameras and computer vision

| Product | Recommended | Why |
|---|---|---|
| Cheap networked camera | **ESP32** (ESP32-CAM) or **S3** | ESP32-CAM is ~$10; the S3 is the modern choice with more PSRAM |
| 1080p network camera | **P4 + C6** | MIPI-CSI, ISP and hardware H.264 — only the P4 has these |
| Video doorbell | **P4 + C6** or **S3** | P4 for real video; S3 for stills and a small preview |
| UVC webcam / capture device | **P4** | 480 Mbps USB High Speed + MIPI camera + hardware JPEG/H.264 |
| QR / barcode scanner | **S3** | DVP camera + SIMD for decoding; ESP-WHO has working examples |
| Face detection / recognition | **S3** or **P4** | S3 for the entry-level case (ESP32-S3-EYE); P4 for higher resolution |
| Machine-vision inspection | **P4** or **S31** | P4 for MIPI + ISP; S31 for DVP + JPEG with a radio attached |

{{< note type="warning" title="Set expectations on \"AI\"" >}}
The S3's "AI acceleration" is 128-bit SIMD vector instructions, not a neural processing unit. Wake-word
detection, keyword spotting, QR decoding, simple face detection and audio feature extraction all run
well. Real-time multi-class object detection on a VGA stream does not. Use **ESP-DL** so the SIMD path is
actually exercised — a generic TensorFlow Lite Micro build will not use it.
{{< /note >}}

## Audio and voice

| Product | Recommended | Why |
|---|---|---|
| Bluetooth Classic speaker (A2DP) | **ESP32** or **S31** | Only these and the E22 have Bluetooth Classic |
| LE Audio earbuds / hearables | **H4** or **S31** | LE Audio needs BT 5.4 + LC3; H4 for battery, S31 for mains |
| Wi-Fi music streamer | **S3** | I2S + PSRAM for buffering + enough CPU for decode |
| Voice assistant with a screen | **S3** | ESP32-S3-BOX-3 is the reference; SIMD handles wake-word |
| Far-field voice capture | **S3** | 3-mic array support, beamforming, AEC via ESP-ADF / ESP-SkAInet |
| Intercom / doorphone | **S3** or **P4** | S3 for audio only; P4 if video is involved |
| Smart speaker with LLM backend | **S3** or **S31** | ESP-VoCat and ESP Private Agents target exactly this |

## Displays and HMI

| Product | Recommended | Why |
|---|---|---|
| Small status display (<2") | **C3** or **S3** | SPI panel; C3 is fine if the UI is simple |
| LVGL touch UI to 800×480 | **S3** | Parallel RGB + PSRAM; the well-trodden path |
| 1024×600 and above, MIPI | **P4 + C6** | MIPI-DSI, PPA compositing, 32 MB PSRAM |
| E-paper dashboard | **S3** | Needs RAM for the framebuffer; power is irrelevant between refreshes |
| Rotary-knob control panel | **C3** | ESP32-C3-LCDkit is exactly this |
| Industrial HMI panel | **P4** or **S31** | P4 for MIPI + Ethernet; S31 for 24-bit RGB + gigabit + touch |
| Instrument cluster / dashboard | **P4** | Only part with the display bandwidth |

## Industrial and automotive

| Product | Recommended | Why |
|---|---|---|
| CAN 2.0 bus monitor | **C3** or **C6** | TWAI on both; the C6 has two controllers |
| **CAN FD** field device | **C5** or **H4** | Only these two have CAN FD, not just CAN 2.0 |
| Multi-bus fieldbus controller | **P4** | Three TWAI controllers plus Ethernet |
| Wired Ethernet controller | **ESP32**, **P4** or **S31** | On-chip MAC; S31 is gigabit |
| Industrial IoT gateway | **C6** or **S31** | C6 for wireless multi-protocol; S31 adds a gigabit uplink |
| Large relay / GPIO matrix | **P4** or **S31** | 55 and 60 GPIOs respectively — the highest in the family |
| Motor control | **C6** or **S3** | MCPWM with dead-time and fault handling |
| POS terminal | **C5**, **C61** or **S31** | Display + secure element requirements; C5 if 5 GHz is mandated |
| Vending machine controller | **S3** or **P4** | Display + SD + networking |
| Robotics controller | **P4** or **S3** | P4 for compute and MCPWM; S3 if a radio must be on-chip |

## Wearables and health

| Product | Recommended | Why |
|---|---|---|
| Fitness tracker | **C3** or **H21** | BLE + low power; H21 if no Wi-Fi is needed |
| Health monitor (PPG, ECG front-end) | **C6** or **S3** | ADC + BLE; S3 if signal processing is on-device |
| Smartwatch-class device | **S3** | Display + PSRAM + BLE, on a XIAO or T-Display board |
| BLE beacon | **C2** or **H21** | Cheapest and lowest-power options |

## Networking infrastructure

| Product | Recommended | Why |
|---|---|---|
| Wi-Fi range extender | **C6** or **C5** | Wi-Fi 6; C5 if 5 GHz is needed |
| Wi-Fi ↔ Ethernet bridge | **ESP32** or **S31** | On-chip Ethernet MAC |
| Radio co-processor for a host MCU | **C6**, **C5** or **C61** | SDIO slave interface + ESP-Hosted |
| **Radio co-processor for a Linux host** | **E22** | PCIe 2.1 / SDIO 3.0, tri-band Wi-Fi 6E, open-source driver |
| M.2 Wi-Fi 6E adapter | **E22** | The only part with PCIe and 6 GHz |
| Set-top box connectivity | **E22** | 2.4 Gbps for 4K/8K streaming |
| BLE mesh network | **H2** / **H21** or **C6** | H-series for nodes, C6 as the Wi-Fi-connected hub |

## Useful chip pairings

Because several parts are deliberately incomplete, these combinations recur:

**P4 + C6** — the canonical pairing. The P4 does display, camera, video encode and compute; the C6
provides Wi-Fi 6, BLE 5.3, Thread and Zigbee over SDIO or SPI. Both RISC-V, both ESP-IDF, directly
supported. Use for video doorbells, HMI panels, network cameras, edge-vision nodes.

**P4 + C5** — same idea, but with dual-band Wi-Fi 6 when 5 GHz throughput matters for video upload.
The C5's CAN FD is a bonus in industrial settings.

**P4 + E22** — the high-bandwidth extreme. The P4 encodes H.264 from a MIPI camera; the E22 pushes it
over tri-band Wi-Fi 6E at up to 2.4 Gbps. For 4K wireless video and AR/VR accessories.

**P4 + H2** — a low-power Thread link into a building-automation system, without adding a
power-hungry Wi-Fi radio to a large GPIO/relay controller.

**C6 + H2 or H21** — the mesh architecture. Cheap, long-lived H-series end nodes; a mains-powered C6
as the border router or gateway with a Wi-Fi uplink.

**S3 + C6** — an S3 doing camera and audio work, with a C6 adding Wi-Fi 6 and 802.15.4 for Matter
interoperability the S3 cannot provide alone.

**Legacy chip + modern crypto chip** — a pattern worth knowing for products facing new regulation. An
older ESP32 or S2 keeps doing application work while a C6 (PSA Level 2, ESP-TEE, DPA protection) acts as
a cryptographic gatekeeper handling identity, signing and the TLS uplink. This can extend the compliant
life of an existing design without a full redesign.

{{< note type="warning" title="Secure the link between paired chips" >}}
When you split a design across two chips, the SPI, UART or SDIO link between them becomes part of your
threat model. An attacker with physical access can tap or spoof that bus instead of attacking either
chip. If the security argument for the design rests on one chip's TEE or side-channel protection,
authenticate the inter-chip link — a boot-time session-key handshake or a pre-provisioned shared secret
is the usual minimum — and encrypt it if the bus is physically exposed.
{{< /note >}}

## Where the ESP32 is the wrong tool

Worth stating plainly, because the family gets applied well past its limits:

- **Hard real-time motor control** at high loop rates. Radio interrupts introduce jitter. Use a
  dedicated MCU, or put an ESP32 alongside one as the network interface.
- **Safety-critical systems.** No functional-safety certification (ISO 26262, IEC 61508) is available.
- **Precision analogue measurement.** The on-chip ADCs are non-linear and, on several parts, conflict
  with Wi-Fi. Use an external ADC over SPI or I2C.
- **Anything needing a real operating system.** Only the S31 has an MMU. If you need Linux, use a Linux
  SoC — and consider an E22 or an ESP-Hosted ESP32 as its radio.
- **Long-range links.** Wi-Fi, BLE and 802.15.4 are all short range. Pair with a LoRa transceiver
  (TTGO/Heltec boards) or a cellular modem.
- **Cheap wired-only devices.** If there is no radio requirement, an ESP32 is paying for silicon it
  will never use.
