---
title: "Specifications"
lede: "The detail that comparison charts flatten: what \"USB\" actually means on each part, real bus clocks, RMT channel architecture, deep-sleep behaviour, and which security ticks are the same tick."
description: "Detailed ESP32 specifications across the family: CPU and memory architecture, radios, USB speed classes, SPI/I2C/I2S/UART limits, RMT channels, deep sleep currents and the hardware security matrix."
weight: 30
---

## Full comparison

{{< compare >}}

## CPU and memory architecture

### Instruction sets

Three CPU architectures appear across the family, and the split is chronological rather than
functional.

| ISA | Chips | Notes |
|---|---|---|
| **Xtensa LX6** | ESP32 | Dual-core, the original |
| **Xtensa LX7** | ESP32-S2, ESP32-S3 | S3 adds 128-bit SIMD vector instructions |
| **RISC-V** | C2, C3, C5, C6, C61, H2, H21, H4, P4, E22, S31 | Everything designed after the S3 |

For application code written against ESP-IDF, the ISA is mostly invisible. It matters in four places:
hand-written assembly and intrinsics, third-party runtime availability (RISC-V generally has broader
support in newer toolchains), debugging with external probes, and the fact that the RISC-V parts can
carry small **low-power RISC-V coprocessors** that share the same toolchain as the main core.

### Cores and coprocessors

The distinction between an **ULP coprocessor** and an **LP core** is worth understanding because it
determines what your device can do while it is asleep.

| Chip | Main cores | Low-power capability | Can execute code in deep sleep? |
|---|---|---|---|
| ESP32 | 2 × Xtensa LX6 @ 240 MHz | ULP FSM @ 8 MHz | Limited — FSM only, awkward to program |
| ESP32-S2 | 1 × Xtensa LX7 @ 240 MHz | ULP RISC-V + ULP FSM (not concurrent) | **Yes** — RISC-V ULP is C-programmable |
| ESP32-S3 | 2 × Xtensa LX7 @ 240 MHz | ULP RISC-V + FSM @ 17.5 MHz | **Yes** |
| ESP32-S31 | 2 × RISC-V @ 320 MHz (MMU) | LP RISC-V core @ 40 MHz | **Yes** |
| ESP32-C2 | 1 × RISC-V @ 120 MHz | None | No — RTC memory retention only |
| ESP32-C3 | 1 × RISC-V @ 160 MHz | None | No — RTC memory retention only |
| ESP32-C5 | 1 × RISC-V @ 240 MHz | LP RISC-V core @ 20–48 MHz | **Yes** |
| ESP32-C6 | 1 × RISC-V @ 160 MHz | LP RISC-V core @ 20 MHz | **Yes** |
| ESP32-C61 | 1 × RISC-V @ 160 MHz | LP peripherals, 4 KB LP SRAM | No — storage and simple peripherals only |
| ESP32-H2 | 1 × RISC-V @ 96 MHz | LP peripherals, 4 KB LP SRAM | No |
| ESP32-H21 | 1 × RISC-V @ 96 MHz | LP peripherals, 4 KB LP SRAM | No |
| ESP32-H4 | 2 × RISC-V @ 96 MHz | Dedicated LP domain | **Yes** |
| ESP32-P4 | 2 × RISC-V @ 400 MHz | LP RISC-V core @ 40 MHz, 32 KB LP SRAM | **Yes** |
| ESP32-E22 | 2 × RISC-V @ 500 MHz | Host-managed | N/A — co-processor |

{{< note type="tip" title="Why an LP core changes your design" >}}
Without one, a battery sensor's only sleep pattern is *wake on timer → read → transmit → sleep*. Each
wake-up costs the full boot, radio-association and Wi-Fi handshake energy, which dwarfs the sensor read.

With an LP core, the coprocessor can wake every second, read the ADC, keep a running average, and only
wake the main core and the radio when the value actually changes. For slowly-varying quantities —
temperature, soil moisture, tank level — this can extend battery life by an order of magnitude,
because you are amortising the expensive radio wake-ups over many cheap sensor reads.
{{< /note >}}

### SRAM and external memory

On-chip SRAM is the number that constrains you, and the headline figure always overstates what you
get: the Wi-Fi and Bluetooth stacks consume a substantial slice, and on several parts the memory is
split into regions with different access rules.

| Chip | On-chip SRAM | Max in-package PSRAM | Max external PSRAM | Max flash |
|---|---|---|---|---|
| ESP32 | 520 KB | 2 MB | 8 MB | 4 MB in-package / 16 MB ext |
| ESP32-S2 | 320 KB + 16 KB RTC | 2 MB | Very large | 4 MB / large |
| ESP32-S3 | 512 KB + 16 KB RTC | **16 MB** | 32 MB | 16 MB / 32 MB |
| ESP32-S31 | 512 KB | — (external only) | **64 MB @ 250 MHz 8-bit DDR** | 64 MB Octal SPI |
| ESP32-C2 | 272 KB | — | 8 MB | External only, 16 MB |
| ESP32-C3 | 400 KB | — | 8 MB | 4 MB / 16 MB |
| ESP32-C5 | 384 KB + 16 KB LP | 8 MB | 32 MB | 4 MB / 32 MB |
| ESP32-C6 | 512 KB + 16 KB LP | — (external only) | 16 MB | 8 MB / 16 MB |
| ESP32-C61 | 320 KB + 4 KB LP | 8 MB | 32 MB | 4 MB / 32 MB |
| ESP32-H2 | 320 KB + 4 KB LP | — | 16 MB | 4 MB / 16 MB |
| ESP32-H21 | 320 KB + 128 KB ROM | — | External | External SPI |
| ESP32-H4 | 384 KB | 4 MB | 4 MB | External |
| ESP32-P4 | 768 KB L2 + 32 KB LP + 8 KB SPM | **32 MB** | 64 MB | External only, 64 MB |
| ESP32-E22 | 1 MB | — | Via host | Via host |

Two practical notes. **PSRAM is not SRAM** — it sits behind a cache over a serial bus, so access is
slower and latency is less predictable; do not put interrupt-critical data there. And on some parts
**flash and PSRAM share a controller and contend** for bandwidth; the S31 explicitly supports
simultaneous access, which is a real advantage for display work.

## Radios

### Wi-Fi

| Chip | Standard | Bands | Notable |
|---|---|---|---|
| ESP32, S2, S3, C2, C3 | Wi-Fi 4 (802.11 b/g/n) | 2.4 GHz | No TWT, no OFDMA |
| ESP32-C6, C61, S31 | **Wi-Fi 6 (802.11ax)** | 2.4 GHz | TWT, OFDMA, MU-MIMO; 20 MHz in ax mode |
| ESP32-C5 | **Wi-Fi 6 (802.11ax)** | **2.4 + 5 GHz** | Backward compatible to a/b/g/n/ac |
| ESP32-E22 | **Wi-Fi 6E** | **2.4 + 5 + 6 GHz** | 160 MHz channels, 2×2 MU-MIMO, 1024-QAM, 2.4 Gbps |
| ESP32-H2, H21, H4, P4 | None | — | — |

The Wi-Fi 6 benefit for IoT is **Target Wake Time** and **OFDMA**, not throughput. TWT lets a device
negotiate long sleep windows with the access point instead of waking for every beacon; OFDMA lets the
AP service many clients per transmission opportunity, which is what makes congested networks tolerable.

### Bluetooth

| Chip | Version | LE | Classic (BR/EDR) |
|---|---|---|---|
| ESP32 | 4.2 | Yes | **Yes** |
| ESP32-S2 | — | No | No |
| ESP32-S3, C2, C3, C5, C61, H2, H21 | 5 / 5.0 | Yes | No |
| ESP32-C6 | 5.3 (+ Mesh) | Yes | No |
| ESP32-H4 | **5.4** (BT 6.0 certified) | Yes | No |
| ESP32-S31 | **5.4** (LE Audio, Mesh 1.1, Direction Finding) | Yes | **Yes** |
| ESP32-E22 | **5.4** | Yes | **Yes** |
| ESP32-P4 | — | No | No |

Only three parts have **Bluetooth Classic**: the original ESP32, the S31 and the E22. If you need A2DP
audio, HFP or SPP, those are your options. Everything else is LE only.

### IEEE 802.15.4 — Thread and Zigbee

Present on: **C5, C6, H2, H21, H4, S31**. Absent from: ESP32, S2, S3, C2, C3, C61, P4, E22.

Having the radio is necessary but not sufficient. Thread and Zigbee are network layers above it, and
Matter is an application layer above them. Espressif provides certified stacks via ESP-IDF and
**ESP-Matter**; the C6 additionally holds **Thread 1.4 interoperability certification**.

### Multi-radio coexistence

On parts with more than one radio, the radios generally **time-slice** rather than operate genuinely
concurrently. Wi-Fi, Bluetooth and 802.15.4 all share the 2.4 GHz front end on the C5, C6 and S31.
This is managed transparently by ESP-IDF's coexistence layer, but it caps aggregate throughput and adds
latency jitter. A device acting as both a Wi-Fi station and a Thread router will not achieve the
datasheet figures for both simultaneously.

## Peripheral detail

### USB — three different things called USB

This is the most commonly misread row in any ESP32 comparison table.

| Class | Speed | Chips | Can implement USB device classes? |
|---|---|---|---|
| **USB 2.0 High Speed OTG** | 480 Mbps | **ESP32-P4** (plus a separate FS OTG and a Serial/JTAG unit — three controllers) | **Yes** |
| **USB 2.0 Full Speed OTG** | 12 Mbps | ESP32-S2, ESP32-S3, ESP32-H4, ESP32-S31 | **Yes** |
| **USB Serial/JTAG only** | 12 Mbps | C2, C3, C5, C6, C61, H2, H21 | **No** — flashing and debugging only |
| **None** | — | ESP32 (original) | No — needs an external UART bridge |
| **Host-managed** | USB 2.0 | ESP32-E22 | N/A |

A **USB Serial/JTAG** peripheral is genuinely useful — it lets you flash and debug over a single USB
cable with no CP2102 or CH340 on the board — but it is a fixed-function device. You cannot use it to
present a HID keyboard, a mass-storage volume or a MIDI interface. If your product needs to *be* a USB
device, you need OTG, which means an S2, S3, H4, S31 or P4.

### UART

**All parts share a 5 MBaud maximum** on their general-purpose UART controllers, limited by the APB
clock and internal division. Hardware flow control (RTS/CTS) is available on all general-purpose
controllers. IrDA is supported on the ESP32, S2, S3, C3, C6 and P4. **LP-UART**, which operates on RTC
clock sources at lower baud rates while the main core sleeps, is available on the C5, C6 and P4.

### I2C

| Mode | Speed | Support |
|---|---|---|
| Standard | 100 kbit/s | All parts |
| Fast | 400 kbit/s | All parts |
| Fast Mode Plus | 1 Mbit/s | S3, C3, C5, C6, H2, P4 |
| High Speed (3.4 Mbit/s) | — | **Not supported natively on any part** |
| **I3C** | up to 12.5 MHz | **ESP32-P4 only** |
| LP-I2C | low | C5, C6, P4 |

**Slave mode** is available on all general-purpose controllers **except the ESP32-C2**, which is
master-only. If your design needs the ESP32 to be addressed by another controller over I2C, rule out
the C2.

### SPI

Controllers split into flash/PSRAM-dedicated (SPI0/SPI1) and general-purpose (SPI2/SPI3).

| Chip | General-purpose SPI max | Modes |
|---|---|---|
| ESP32 | 80 MHz master / 40 MHz slave | Single, Dual, Quad |
| ESP32-S2 / S3 | 80 MHz | Single, Dual, Quad; **Octal (OPI) on S3's SPI3** |
| C2 / C3 / C5 / C6 / H2 | 60–80 MHz master (clock-routing dependent), 40 MHz slave | Quad on C3, C5, C6 |
| ESP32-C61 | 80 MHz | Quad |
| ESP32-P4 | **80–100 MHz** | Single, Dual, Quad, Octal, plus LP-SPI |
| ESP32-S31 | Octal SPI for external memory | — |

These are hardware controller maximums. Achievable clocks depend on whether the pins are routed
through the GPIO matrix or use direct IO muxing (the matrix costs you speed), plus PCB layout and
pull-up choices.

### I2S — audio

| Chip | Controllers | Max clock | Capabilities |
|---|---|---|---|
| ESP32 | 2 | ~40 MHz | I2S, PCM, PDM TX/RX, parallel LCD/camera mode |
| ESP32-S2 | 1 | 40 MHz | I2S, PDM |
| ESP32-S3 | 2 | 40 MHz | I2S, enhanced PDM microphone RX |
| C2 / C3 / H2 | 1 | 40 MHz | I2S, PDM (PDM on C3/H2) |
| C5 / C6 / C61 | 1 | 40 MHz | I2S, PDM |
| ESP32-P4 | 2 | **50 MHz** | **TDM up to 16 channels**, PDM |
| ESP32-S31 | 2 | — | **Hardware Bluetooth audio synchronisation** |

### RMT — the addressable-LED peripheral

RMT was designed for infrared remote control, but its flexible pulse timing made it the standard way to
drive WS2812/NeoPixel strips, one-wire sensors like the DS18B20, and any software-defined precision
timing.

| Chip | Channels | Architecture | DMA |
|---|---|---|---|
| ESP32 | 8 | Flexible — any channel TX or RX | No |
| ESP32-S2 | 4 | Flexible | No |
| **ESP32-S3** | 8 | Dedicated (4 TX + 4 RX) | **Yes — the only chip in the family** |
| ESP32-C3 | 4 | Dedicated (2 TX + 2 RX) | No |
| ESP32-C5 | 4 | Dedicated | No |
| ESP32-C6 | 4 | Dedicated (2 TX + 2 RX) | No |
| ESP32-H2 | 4 | Dedicated (2 TX + 2 RX) | No |
| ESP32-P4 | 8 | — | — |
| **ESP32-C2** | **None** | — | — |
| **ESP32-C61** | **None** | — | — |

Three things follow from this table:

1. **The C2 and C61 have no RMT at all.** No hardware IR, no clean NeoPixel driving, no DS18B20
   without bit-banging. This is the single most under-advertised limitation of those two parts.
2. **Only the S3 has RMT DMA.** This decouples LED transmission from interrupt latency. On every other
   chip, a long addressable-LED chain can visibly glitch when the Wi-Fi radio delays an interrupt. If
   you are building anything with more than a short LED strip, this is a real argument for the S3.
3. Memory block size is 64 bytes per channel on the ESP32 and S2, 48 bytes on the S3/C3/C6/H2
   generation, which caps how many RMT symbols fit before the driver borrows from an adjacent channel.

### Other notable peripherals

| Feature | Available on |
|---|---|
| **Ethernet MAC** | ESP32 (10/100), ESP32-P4 (10/100 RMII), ESP32-S31 (**1000 Mbps**) |
| **CAN FD** | ESP32-C5 (2×), ESP32-H4 |
| **TWAI / CAN 2.0** | ESP32, S2, S3, C3, C6 (2×), C61, H2, P4 (3×), S31 |
| **Capacitive touch** | ESP32 (10), S2 (14), S3 (14), H4 (14), P4 (14), S31 (14) |
| **True DAC** | ESP32 (2 × 8-bit), ESP32-S2 (2 × 8-bit) — nothing newer |
| **MIPI-DSI / CSI** | **ESP32-P4 only** |
| **H.264 encoder** | **ESP32-P4 only** |
| **JPEG codec** | ESP32-P4, ESP32-S31 |
| **PPA (2D graphics)** | ESP32-P4, ESP32-S31 |
| **SD/MMC** | ESP32 (SDIO host+slave), S3 (2 slots), P4, S31 |
| **PARLIO** | C5, C6, H2, P4 |
| **PCIe 2.1** | **ESP32-E22 only** |

## Power and sleep

| Chip | Deep sleep (typical) | Retention while asleep |
|---|---|---|
| ESP32-H21 | **5 µA** | 4 KB LP SRAM |
| ESP32-C3 | ~5 µA | Small RTC region (<8 KB) |
| ESP32-S2 | ~5–7 µA | 16 KB RTC SRAM + ULP |
| ESP32-S3 | ~7 µA | 16 KB RTC SRAM + ULP |
| ESP32-C6 | 7 µA | 16 KB LP SRAM + LP core |
| ESP32-H2 | 7 µA | 4 KB LP SRAM |
| ESP32-H4 | ~7 µA (est.) | 16 KB LP SRAM + LP core |
| ESP32-C2 | <8 µA | Small RTC region |
| ESP32-C61 | ~10 µA (est.) | 4 KB LP SRAM |
| ESP32 | ~10 µA | ~8 KB RTC domain + ULP FSM |
| ESP32-C5 | ~12 µA | 16 KB LP SRAM + LP core |
| ESP32-P4 | ~25 µA | 32 KB LP SRAM + LP core |
| ESP32-E22 | Host-managed | — |
| ESP32-S31 | Not yet published | Expected LP SRAM |

{{< note type="warning" title="Do not choose a chip on deep-sleep current alone" >}}
Three caveats. **First**, some of these are Espressif estimates extrapolated from similar silicon rather
than characterised datasheet values — the C61, H4 and S31 in particular. **Second**, deep-sleep current
is often not the dominant term: for a device that wakes every thirty seconds, the energy per wake-up
cycle (boot, radio association, transmit) matters far more than the floor between wake-ups. **Third**,
your board's regulator quiescent current, pull-ups and peripheral leakage will frequently exceed the
chip's sleep current by an order of magnitude. Measure the assembled board.
{{< /note >}}

The **ESP32-H21's on-chip DC-DC converter** is worth singling out, because it improves the term that
usually matters most for mesh devices: **receive current**, quoted at around 8.2 mA. A Thread router
that keeps its receiver on to relay neighbours' traffic spends most of its life in RX, where a
2 µA difference in deep sleep is irrelevant.

## Security and cryptography

### Hardware accelerator matrix

| Feature | ESP32 | S2 | S3 | C2 | C3 | C5 | C6 | C61 | H2 | H21 | H4 | P4 | E22 | S31 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| AES | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| SHA | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| RSA | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| TRNG | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| ECC | — | — | ✓* | — | ✓ | ✓ | **✓** | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| HMAC | — | ✓ | ✓ | — | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Digital Signature (RSA) | — | ✓ | ✓ | — | ✓ | ✓ | ✓ | ✓ | ✓ | — | ✓ | ✓ | ✓ | ✓ |
| Digital Signature (ECDSA) | — | — | — | — | — | ✓ | — | ✓ | ✓ | — | ✓ | ✓ | — | ✓ |
| APM / TEE | — | — | — | — | — | ✓ | ✓ | ✓ | — | — | — | ✓ | ✓ | ✓ |
| Key Manager | — | — | — | — | — | — | ✓ | — | — | — | — | ✓ | — | — |
| DPA protection | — | — | — | — | — | — | ✓ | — | ✓ | — | — | ✓ | — | — |
| ECC-based Secure Boot | — | — | ✓ | — | — | — | — | — | ✓ | — | — | — | — | ✓ |
| RAM-based PUF | — | — | — | — | — | — | — | — | — | — | — | — | — | **✓** |
| PSA Certified | — | — | — | — | L1 | — | **L2** | — | — | — | — | — | — | — |

### Two ticks that are not the same tick

{{< note type="warning" title="\"ECC ✓\" means two structurally different things" >}}
The **ESP32-C6** has a genuinely separate ECC accelerator hardware block, with its own chapter in the
technical reference manual and its own mbedTLS build option (`CONFIG_MBEDTLS_HARDWARE_ECC`).
Independently verified measurements show roughly **7× faster ECDSA signing** and **16–18× faster ECDH**
point multiplication with it enabled.

The **ESP32-S3** has no such block. Its ECC operations run through the general-purpose RSA/bignum unit
(`CONFIG_MBEDTLS_HARDWARE_MPI` only). Both chips get a ✓ in the row above; their performance differs by
an order of magnitude.

Verify per-chip against each target's `soc_caps.h` (`SOC_ECC_SUPPORTED` / `SOC_ECDSA_SUPPORTED`) rather
than trusting a checkmark.
{{< /note >}}

Similarly, **"Digital Signature (ECDSA)"** means a dedicated ECDSA_DS peripheral with the private key
held in an eFuse block, inaccessible to software. That is verified on the **C5, C61, H2, H4, P4 and
S31**. The **C6**, despite similar marketing language, has only the RSA-flavoured Digital Signature
peripheral.

### The C6 and the post-quantum wrinkle

The C6's ECC accelerator covers **NIST curves only, not Curve25519**. Measured X25519 point
multiplication takes about 121 ms whether the accelerator is on or off. That has a direct consequence
for the hybrid post-quantum key exchange that both NIST and BSI guidance recommend: on a C6, the
classical **X25519 half of an X25519 + ML-KEM hybrid can cost more time than the entire ML-KEM-1024
encapsulation**. A scheme chosen for regulatory alignment can end up slower than the post-quantum-only
alternative it was meant to hedge.

No current embedded MCU accelerates ML-KEM or ML-DSA in hardware. Post-quantum cryptography on ESP32 is
a software exercise, available through **wolfSSL/wolfCrypt**, **liboqs** and similar libraries. The
**P4** is the best platform for it on raw performance (400 MHz, 768 KB SRAM, DPA-resistant AES); the
**C6** is the best on security architecture (PSA L2, ESP-TEE); the **S31** may supersede both once
characterised.

### Known advisory

{{< note type="warning" title="Espressif advisory AR2026-006" >}}
A Secure Boot bypass affecting the **ROM-level ECDSA signature check** on four parts with a dedicated
ECDSA_DS peripheral: **ESP32-H2, C5, C61 and P4**. A crafted invalid signature can be accepted during
the ROM-level boot check; on the C5 specifically the ROM code fails to initialise the ECDSA peripheral
before verification, leaving it power-gated during the check.

**Application-layer ECDSA verification is not affected** — the ESP-IDF driver initialises the peripheral
correctly, so TLS handshakes and OTA update paths that rely on application-layer checks remain sound.
This matters only if you are relying on ROM-level Secure Boot as your root of trust on these four
chips. Check the advisory against your silicon revision.
{{< /note >}}

## Longevity commitments

Espressif publishes availability commitments, which matter for products with long service lives:

| Chip | Committed available from |
|---|---|
| ESP32 | 2016-01-01 |
| ESP32-S2, S3, C3 | 2020-01-01 |
| ESP32-H2 | 2021-01-01 |
| ESP32-C2 | 2022-01-01 |
| ESP32-C6 | 2023-01-01 |
| ESP32-C5, C61, P4 | 2025-01-01 |
| ESP32-S31, H4, H21, E22 | Not yet published |

Note that several **original ESP32 part numbers are marked NRND** (not recommended for new designs)
even though the family as a whole is committed. Always check the specific part number, not just the
chip family, and read the errata sheet for your silicon revision.
