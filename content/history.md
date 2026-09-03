---
title: "History"
lede: "How a Shanghai startup with no brand recognition ended up inside a billion devices — and why the ESP32 family looks the way it does today."
description: "The history of Espressif Systems and the ESP32: the ESP8266 breakthrough, the 2016 ESP32 launch, the STAR Market listing, and the migration from Xtensa to RISC-V."
weight: 10
---

## Before the ESP32: the problem it solved

In the early 2010s, putting a hobby project or a low-volume product on a Wi-Fi network was
disproportionately expensive. The microcontroller might cost two dollars; the Wi-Fi module bolted
onto it cost twenty or thirty, needed its own certification, and usually spoke a proprietary
AT-command protocol over a serial link. Wi-Fi was something you added to a design, not something
that came with it.

Espressif's insight was that this separation was an artefact of the industry's structure rather than
a technical necessity. If you designed the radio and the processor together, on the same die, and
sold the result as a commodity, the price collapsed.

## Espressif Systems

Espressif Systems was founded in **April 2008**, with its headquarters in the ZhangJiang Hi-Tech Park
in Shanghai. Its founder, **Teo Swee Ann**, is a Singaporean electrical engineer who graduated from
the National University of Singapore and had previously worked as an engineering director at Montage
Technology.

The company was, and remains, **fabless** — it designs chips and has them manufactured by third-party
foundries. It opened its first mainland R&D office in Wuxi in March 2010, added branches in Suzhou
and Hefei, and later established research centres in Czechia, Singapore, Brazil and India. It has
been ISO 9001 certified since April 2015.

For its first six years the company was essentially unknown outside a narrow circle of Chinese
consumer-electronics manufacturers. That changed with one part.

## The ESP8266 breakthrough

The **ESP8266** appeared in **May 2014**. On paper it was modest: a single Tensilica L106 core at up
to 160 MHz, 160 KB of usable RAM, and 2.4 GHz 802.11 b/g/n. What made it remarkable was that
complete modules built around it — with the crystal, the antenna, the flash and regulatory
certification already handled — sold for a few dollars.

The chip was not originally aimed at Western developers. Its documentation was sparse and initially
Chinese-only, and it reached the maker community largely by accident, through cheap serial Wi-Fi
modules sold on marketplaces. What followed was a genuine grassroots reverse-engineering effort: an
independent SDK, an Arduino core, a MicroPython port and NodeMCU firmware all emerged from the
community, in some cases ahead of official support.

Espressif made a consequential strategic choice at this point: rather than treating the unofficial
ecosystem as a nuisance, it **leaned into open source**. Its SDK, and later ESP-IDF, went onto GitHub
under permissive licences. That decision is arguably as responsible for the company's position today
as any piece of silicon design.

## September 2016: the ESP32

The **ESP32** launched in **September 2016** as the ESP8266's successor, and it was a substantial
step up rather than an increment:

- Two **Xtensa LX6** cores at up to 240 MHz instead of one core at 160 MHz
- 520 KB of SRAM instead of 160 KB
- **Bluetooth 4.2, both Classic and Low Energy**, alongside Wi-Fi
- An Ethernet MAC, a CAN controller, capacitive touch sensing, two DACs, an 18-channel ADC
- An **ultra-low-power co-processor** that keeps running while the main cores sleep
- Hardware AES, SHA, RSA and a true random number generator, plus secure boot and flash encryption

Crucially, it kept the price structure. A chip cost a couple of dollars; a certified module cost
under four; a development board cost under ten. The ESP32 became the default answer to "how do I get
this thing on the network?" for makers, and increasingly for commercial products too — smart plugs,
bulbs, thermostats, air-conditioner controllers and industrial sensors shipped in enormous volumes
built around ESP32 modules.

The company listed on the **Shanghai Stock Exchange's STAR Market** on **22 July 2019** under the
ticker **688018**, raising roughly 1.2 billion yuan. By around 2020 it had shipped its
hundred-millionth IoT chip; in **October 2023** it announced that **cumulative shipments had passed
one billion** since the ESP8266.

## The great diversification

From 2019 onward, the strategy changed. Instead of one general-purpose flagship, Espressif began
splitting the family into lines aimed at specific trade-offs. Three changes drove this:

**1. RISC-V.** Xtensa is a licensed, proprietary instruction set. Every chip released after the S3 —
the entire C, H, P and E series, and now the S31 — uses **RISC-V** instead. This removed a licensing
dependency, simplified the toolchain story and let Espressif put small low-power RISC-V cores
alongside the main processors as coprocessors.

**2. Matter, Thread and Zigbee.** The smart-home industry converged on **Matter**, which runs over
Wi-Fi and over Thread. Thread needs an **802.15.4** radio, which the original ESP32 does not have.
The C6, C5, H2, H21, H4 and S31 all added one.

**3. Wi-Fi 6.** Not for raw speed — IoT devices do not need gigabits — but for **Target Wake Time**,
which lets a battery-powered device negotiate sleep windows with the access point, and for
**OFDMA**, which behaves far better in the congested networks where these devices actually live.

The result is the current arrangement: an S-series for general-purpose and multimedia work, a
cost-optimised C-series, an H-series that drops Wi-Fi for ultra-low-power mesh, a P-series that drops
the radio for raw performance, and an E-series that is a radio without a microcontroller.

## Timeline

{{< timeline >}}
{{< event year="2008" title="Espressif Systems founded" >}}
Headquarters established in ZhangJiang Hi-Tech Park, Shanghai, in April, by Teo Swee Ann.
{{< /event >}}
{{< event year="2010" title="First mainland R&D office" >}}
A branch opens in Wuxi in March — the company's first dedicated research office outside Shanghai.
{{< /event >}}
{{< event year="2014" title="ESP8266 ships" >}}
A single-core Wi-Fi SoC at a price that had no precedent. It reaches Western developers largely
through unofficial channels and triggers a community reverse-engineering effort.
{{< /event >}}
{{< event year="2015" title="ISO 9001 certification" >}}
Formal quality-management certification in April, as the company begins selling into commercial
rather than purely hobbyist volumes.
{{< /event >}}
{{< event year="2016" title="ESP32 launches" >}}
September. Dual Xtensa LX6 cores at 240 MHz, 520 KB SRAM, Wi-Fi plus Bluetooth Classic and LE,
Ethernet MAC, CAN, touch sensing and hardware crypto.
{{< /event >}}
{{< event year="2019" title="STAR Market listing" >}}
Espressif goes public on the Shanghai Stock Exchange's STAR Market on 22 July as ticker 688018,
raising about 1.2 billion yuan. The ESP32-S2 is announced the same year.
{{< /event >}}
{{< event year="2020" title="One hundred million chips — and the RISC-V pivot" >}}
The hundred-millionth IoT chip ships. The **ESP32-C3**, Espressif's first RISC-V part, and the
**ESP32-S3** with its SIMD vector extensions are both announced.
{{< /event >}}
{{< event year="2021" title="802.15.4 arrives" >}}
The **ESP32-H2** (Thread and Zigbee, no Wi-Fi) and the **ESP32-C6** (Wi-Fi 6 plus 802.15.4) are
announced, positioning the family for Matter.
{{< /event >}}
{{< event year="2022" title="ESP32-C2 and the 5 GHz announcement" >}}
The minimalist **C2** ships as a cost floor. The **ESP32-C5**, the first dual-band part, is announced
— though it will take three years to reach volume.
{{< /event >}}
{{< event year="2023" title="One billion chips shipped" >}}
Announced in October. The ESP32-C6 enters production, and Espressif ships a one-stop Matter solution.
{{< /event >}}
{{< event year="2024" title="ESP32-P4 revealed" >}}
January. A 400 MHz dual-core RISC-V part with MIPI-DSI and CSI, an image signal processor and a
hardware H.264 encoder — and deliberately **no radio at all**. The **ESP32-H4** is announced in
September.
{{< /event >}}
{{< event year="2025" title="Dual-band, at last" >}}
The **ESP32-C5** reaches mass production in May — the first RISC-V SoC with dual-band Wi-Fi 6, BLE 5
and 802.15.4 in one part. The **ESP32-P4** and the budget Wi-Fi 6 **ESP32-C61** also enter production.
{{< /event >}}
{{< event year="2026" title="A radio co-processor, and the S-series goes RISC-V" >}}
January: the **ESP32-E22**, a tri-band Wi-Fi 6E and dual-mode Bluetooth radio co-processor for Linux
hosts — the first Espressif part that is not a standalone microcontroller. It is Wi-Fi 6E certified in
June. March: **ESP-IDF v6.0**, and preview support for the ultra-low-power **ESP32-H21**. July: the
**ESP32-S31** enters mass production, moving the S-series to RISC-V and combining Wi-Fi 6, Bluetooth
5.4, 802.15.4 and gigabit Ethernet in a single chip.
{{< /event >}}
{{< /timeline >}}

## What the history tells you about choosing a part

Two practical lessons fall out of this trajectory.

**Newer is not automatically better.** The original ESP32 is a decade old and outclassed on paper by
almost everything since, but it has the deepest pool of example code, the widest board availability
and the only Bluetooth Classic radio in the family. The C3 is five years old and remains one of the
best value-for-effort choices precisely because it is boring and thoroughly documented.

**Availability lags announcement, sometimes by years.** The C5 was announced in 2022 and reached
volume production in 2025. If a part matters to your schedule, check its actual production status —
the [variants pages](/variants/) flag this for every chip — rather than the date of the press release.

{{< note type="info" title="On sourcing" >}}
Dates and corporate milestones on this page are drawn from Espressif's own
[milestones page](https://www.espressif.com/en/company/about-us/milestones) and product
announcements, cross-checked against public encyclopaedic records. See
[Sources & method](/sources/) for the full list and for notes on where published sources disagree.
{{< /note >}}
