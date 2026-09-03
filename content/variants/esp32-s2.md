---
title: "ESP32-S2"
chip: esp32-s2
order: 2
lede: "Wi-Fi without Bluetooth, native USB, 43 GPIOs and 14 touch channels. A specialist that the S3 has largely absorbed — but it is cheap, and it does one thing the C-series cannot."
description: "ESP32-S2 specifications: single-core Xtensa LX7 at 240 MHz, 320 KB SRAM, Wi-Fi 4 only, USB 2.0 OTG Full Speed, LCD and camera interfaces, from $1.25."
---

## Why it exists

The S2 was the first structural departure from the original ESP32, and its design brief was
subtractive: **remove Bluetooth entirely** to cut die area, cost and power, then reinvest the savings
in a native USB controller, more pins and more touch channels.

At the time that was a coherent proposition. A great many Wi-Fi products — smart plugs, panels,
appliance controllers — never use Bluetooth for anything except initial provisioning, and
provisioning can be done over a SoftAP instead. Paying for a Bluetooth radio you disable in firmware
is waste.

The awkward fact is that the **S3 arrived a year later** with two cores instead of one, BLE 5 back in
the package, more SRAM, more PSRAM headroom and SIMD extensions, at a chip price only about sixty
cents higher. For most new designs the S3 is simply the better part.

## What the S2 still has going for it

**Native USB OTG.** At Full Speed (12 Mbps), but real OTG rather than the serial/JTAG-only peripheral
found on the C-series. That means you can implement actual USB device classes — HID keyboards and
mice, mass storage, MIDI, CDC serial — with no USB-to-serial bridge chip on the board. Among cheap
Wi-Fi microcontrollers this remains unusual.

**Pin count.** 43 GPIOs, more than the original ESP32 and more than any C-series part. Combined with
**14 capacitive touch channels** and an LCD interface, it suits control panels with a lot of buttons
and sensors.

**Analogue output.** The S2 and the original ESP32 are the only members of the family with true
8-bit DACs.

**Price.** At $1.25 for the base part it is the cheapest Xtensa chip Espressif sells, and
**ESP32-S2-MINI-1** modules start around $2.00.

{{< note type="warning" title="No Bluetooth means no Bluetooth" >}}
This is not a firmware limitation or a licensing choice — there is no Bluetooth radio on the die. If
your product might ever need BLE provisioning, a BLE beacon, or a phone app connecting directly over
BLE, the S2 rules that out permanently. This is the single most common reason projects abandon it
mid-way.
{{< /note >}}

## Architecture notes

One Xtensa LX7 core at up to 240 MHz. Single-core means the Wi-Fi stack and your application share a
core, so long blocking operations in application code can cause dropped packets and connection
instability in a way they would not on the dual-core ESP32 or S3. Structure your code around the
event loop rather than around `delay()`.

The low-power story is better than the original ESP32's: the S2 has **two ULP co-processors**, one
FSM-based and one a real RISC-V core, though only one can be active at a time. The RISC-V ULP is
programmable in C, which makes non-trivial deep-sleep logic — filtering sensor readings, counting
pulses, deciding whether a wake-up is warranted — genuinely practical. Deep-sleep current is roughly
5–7 µA, a substantial improvement.

External memory support is unusually generous: the address space allows very large external flash and
PSRAM, well beyond what any module actually ships.

{{< note type="info" title="Touch sensing caveat" >}}
The S2's 14 touch channels are not certified for use in electrically noisy environments in the way
some dedicated touch controllers are. If your product is a wall panel next to a switching power
supply or a motor, budget time for shielding and filtering work.
{{< /note >}}

## Modules and boards

**ESP32-S2-MINI-1** from $2.00 is the smallest and cheapest; **-MINI-2** from $2.32 and
**-SOLO-2** from $2.40 are the alternatives, each with `U` external-antenna variants. Development
boards **ESP32-S2-DevKitC-1** and **ESP32-S2-DevKitM-1** are both $8 — the cheapest official kits
Espressif sells alongside the C3 and C6 kits.

Adafruit's ESP32-S2 Feather and QT Py boards make the native USB easy to exploit, since they expose
it directly.

## Choose it when

- You are building a **USB device** — HID, mass storage, MIDI — that also needs Wi-Fi
- You need **many GPIOs and touch channels** on a budget
- You need an **analogue output** and Wi-Fi
- Bluetooth is definitively not required, now or later

## Choose something else when

- You might need Bluetooth → [ESP32-S3](/variants/esp32-s3/)
- You want two cores for radio and application isolation → [ESP32-S3](/variants/esp32-s3/)
- You need modern radios or low power → [ESP32-C6](/variants/esp32-c6/)
- USB throughput matters → [ESP32-P4](/variants/esp32-p4/) has High Speed USB
