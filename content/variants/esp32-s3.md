---
title: "ESP32-S3"
chip: esp32-s3
order: 3
lede: "The one to reach for when there is a screen, a camera or a microphone involved. Dual 240 MHz cores with SIMD, up to 16 MB of in-package PSRAM, and by far the best-supported multimedia chip in the family."
description: "ESP32-S3 specifications: dual-core Xtensa LX7 at 240 MHz with 128-bit SIMD, 512 KB SRAM, up to 16 MB PSRAM, Wi-Fi 4, BLE 5, USB OTG, 45 GPIOs, from $1.85."
---

## Why it is the community favourite

If you look at what people actually build with ESP32 parts in 2026 — LVGL touchscreen dashboards,
network cameras, voice assistants, e-paper displays, handheld gadgets — a large majority of it runs on
an S3. The reason is that it is the only part in the family that is simultaneously **fast enough**,
has **enough memory**, has **enough pins**, and has **a radio**.

The P4 is faster and has better display interfaces but no radio. The C6 has better radios but a
fraction of the memory bandwidth and pin count. The S3 sits in the middle, and for a
graphical, connected device the middle is exactly where you want to be.

## The two features that matter most

**Up to 16 MB of in-package PSRAM.** This is the decisive specification. A 480×480 RGB565 framebuffer
is 460 KB; double-buffer it and you have consumed most of the 512 KB of on-chip SRAM before your
application starts. LVGL, JPEG decoding, audio buffers and neural-network tensors all need working
memory measured in megabytes, not kilobytes. The S3 is available with 2, 4, 8 or 16 MB of PSRAM in the
package, and Octal-SPI PSRAM variants (the `V` suffix, running at 1.8 V) give meaningfully higher
bandwidth than the Quad-SPI ones.

**128-bit SIMD vector instructions.** Espressif markets these as "AI acceleration", which
overstates it — there is no neural processing unit, no systolic array, nothing resembling a modern NPU.
What there is: vector instructions that multiply throughput on the dot products, convolutions and FFTs
that dominate signal processing and small quantised neural networks. In practice, wake-word detection,
simple face detection, keyword spotting and audio feature extraction all run comfortably. Real-time
object detection on a 640×480 stream does not.

{{< note type="tip" title="ESP-DL and ESP-SkAInet" >}}
The vector instructions are only useful if the software uses them. Espressif's **ESP-DL** library
provides hand-optimised kernels, and **ESP-SkAInet** provides ready-made wake-word and speech
recognition. A generic TensorFlow Lite Micro build will not automatically exploit the SIMD path —
check that your inference library has an ESP32-S3 backend.
{{< /note >}}

## Peripherals

- **45 GPIOs** — the most of any Espressif part until the P4 and S31. Note that if you fit Octal-SPI
  PSRAM, several pins are consumed by the memory bus.
- **USB 2.0 OTG at Full Speed** plus a separate USB Serial/JTAG unit, so you can flash and debug over
  one USB connection while your application uses the other.
- **LCD and camera interfaces**: 8/16-bit parallel RGB, I8080 and MOTO6800 for displays, DVP for
  cameras. Not MIPI — that is the P4's territory — so display resolution realistically tops out
  around 800×480.
- **Two SD/MMC slots** and an SDIO 3.0 host.
- **RMT with DMA support** — the S3 is the *only* chip in the family with this. It matters for driving
  long WS2812/NeoPixel chains without visible glitches when the Wi-Fi radio generates interrupt
  latency. On every other part, long LED strings can flicker under network load.
- **14 touch channels**, a 20-channel 12-bit ADC, MCPWM, PCNT and TWAI.

## Honest limitations

**Wi-Fi 4 only.** No 802.11ax, so no Target Wake Time and no OFDMA. In a congested apartment building
a C6 will hold a more stable connection than an S3.

**No 802.15.4.** The S3 cannot do Thread or Zigbee, which rules it out as a single-chip Matter
device on Thread. It can be a Matter-over-Wi-Fi device.

**No Ethernet MAC.** Unlike the original ESP32, wired networking needs an SPI bridge such as the
W5500, with the throughput penalty that implies.

**Xtensa, and the ADC.** The Xtensa toolchain is well supported by ESP-IDF but has thinner
third-party runtime support than RISC-V. And as on most of the family, the ADC is mediocre and
partially conflicts with Wi-Fi.

## Modules and boards

The **ESP32-S3-WROOM-1** family is the workhorse, from $2.96, with the memory configuration in the
suffix: `-N8` is 8 MB flash, `-N8R8` is 8 MB flash plus 8 MB PSRAM, `-N16R8` is 16 and 8. The
**-WROOM-2** (from $5.85) carries Octal-SPI memory up to 32 MB flash and 16 MB PSRAM. **-MINI-1**
from $3.10 is the compact option.

**ESP32-S3-DevKitC-1** at $15 is the reference board. Espressif also sells several S3 specialty kits:
**ESP32-S3-BOX-3** ($49) for voice assistants, **ESP32-S3-EYE** ($45) for vision,
**ESP32-S3-LCD-EV-Board** ($59) for display development, and **ESP32-S3-Korvo-1/-2** for far-field
audio.

Third-party options are abundant: LilyGO **T-Display-S3** ($15–23) with a 1.9-inch IPS panel, the
**T5 4.7-inch e-paper** board ($35–45), Seeed's **XIAO ESP32-S3 Sense** with a camera and microphone
in a thumbnail footprint, and the family of cheap Chinese panel boards — Sunton, Guition, Elecrow,
and the widely documented "Cheap Yellow Display".

## Choose it when

- There is a **display** in the product, especially with LVGL
- There is a **camera** or a **microphone array**
- You need **megabytes of RAM**, not kilobytes
- You are driving **long addressable-LED strips** and cannot tolerate glitches
- You want **native USB** plus Bluetooth plus lots of pins

## Choose something else when

- You need Wi-Fi 6, Thread or Zigbee → [ESP32-C6](/variants/esp32-c6/) or
  [ESP32-S31](/variants/esp32-s31/)
- You need a high-resolution MIPI display or H.264 → [ESP32-P4](/variants/esp32-p4/)
- The product runs on a battery for months → [ESP32-C6](/variants/esp32-c6/)
- You need Bluetooth Classic → [ESP32](/variants/esp32/) or [ESP32-S31](/variants/esp32-s31/)
