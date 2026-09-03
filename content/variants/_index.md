---
title: "Variants"
lede: "Fourteen system-on-chips across five product lines. This page compares all of them side by side; each has its own page with the full specification and an honest account of its limitations."
description: "Every ESP32 variant compared: ESP32, S2, S3, S31, C2, C3, C5, C6, C61, H2, H21, H4, P4 and E22 — architecture, memory, radios, GPIO, power and price."
weight: 20
---

## How the family is organised

"ESP32" is a family name, not a part number. The suffix after it tells you which line a chip belongs
to, and the line tells you what trade-off Espressif made:

| Line | What it optimises for | Members |
|---|---|---|
| **No suffix / S** | General purpose and multimedia — most GPIO, displays, cameras, USB | ESP32, S2, S3, S31 |
| **C** | Cost and power. Small packages, modern radios, lowest prices | C2, C3, C5, C6, C61 |
| **H** | Ultra-low power mesh. No Wi-Fi at all | H2, H21, H4 |
| **P** | Application performance. No radio at all | P4 |
| **E** | Radio only — a co-processor for a host CPU | E22 |

A second, orthogonal split matters just as much. The original ESP32, the S2 and the S3 use
Espressif's licensed **Xtensa** cores. Every part designed after them — the whole C, H, P and E
series, and the new S31 — uses **RISC-V**. In practice this rarely affects application code, because
ESP-IDF abstracts it, but it does affect toolchains, assembly-level optimisation and the
availability of third-party runtimes.

{{< note type="tip" title="If you only read one thing" >}}
For a new connected design in 2026, the **ESP32-C6** is the sensible default: Wi-Fi 6, Bluetooth 5.3,
Thread and Zigbee, a low-power core, and the family's strongest security certification, for under two
dollars. Choose the **ESP32-S3** instead if you need a screen, a camera or on-device inference. Use
the [decision guide](/choosing/) if neither fits.
{{< /note >}}

## Complete comparison

{{< compare >}}

## The lineup, by line

{{< families >}}

## What the table does not tell you

A specification table flattens some genuinely important distinctions. Four worth knowing before you
commit to a part:

**"USB" means three different things.** The S2 and S3 have real USB OTG, but only at Full Speed
(12 Mbps). The P4 has a High Speed controller (480 Mbps) *and* a Full Speed one *and* a serial/JTAG
unit. Most C and H parts have only a USB Serial/JTAG peripheral — excellent for flashing and
debugging without an external adapter, useless for implementing a USB device class. The original
ESP32 has no USB at all.

**"Hardware ECC" is not one feature.** The C6 has a genuinely separate ECC accelerator block that
measurably speeds up ECDSA signing and ECDH. The S3 is also marked as having ECC, but its operations
run through the general-purpose bignum unit. Both get a tick in a comparison table; their performance
differs by an order of magnitude. Details are in
[Specifications → security](/specifications/#security-and-cryptography).

**Deep-sleep figures are not equally trustworthy.** Some are characterised datasheet values; others,
particularly for the newest parts, are Espressif estimates extrapolated from similar silicon. Treat
single-microamp differences between chips as noise until you measure your own board.

**Announced is not available.** Two of the fourteen parts here — the H21 and the H4 — are sampling
rather than in volume production, and the E22 is not a microcontroller you can design in alone. The
status badge on each row reflects this.

## Also in the family, but not an ESP32

Three part numbers cause regular confusion:

- **ESP8266** — the 2014 predecessor. Single Tensilica L106 core, 160 KB RAM, Wi-Fi only, no
  Bluetooth. Still sold and still supported, but there is no good reason to start a new design on it
  when the C2 and C3 cost the same and are dramatically more capable.
- **ESP8684** — this *is* an ESP32-C2. Espressif sells the flash-integrated version of the C2 die
  under the ESP8684 name, which is why the C2 appears to have no in-package flash while ESP8684
  modules clearly do.
- **ESP8685** — likewise an **ESP32-C3** variant sold under a different part number.

The naming is a historical artefact of how the parts were positioned commercially, not a difference
in silicon family. See [Boards & modules](/boards/#decoding-part-numbers) for the full decoder.
