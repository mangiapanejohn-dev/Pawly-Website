<div align="center">

<img src="assets/coding.png" width="240" alt="Pawly coding"/>

# Pawly

**Your coding agents, living on your desktop.**

Pawly turns Claude Code, Codex, and Gemini CLI activity into expressions, movement, approvals, and tiny signs of life.

<a href="downloads/Pawly-0.1.0.dmg"><img src="https://img.shields.io/badge/download-Pawly_0.1.0-CC785C?style=flat&logo=apple&logoColor=white" alt="Download Pawly"/></a>
<img src="https://img.shields.io/badge/macOS-14+-262624?style=flat&logo=apple&logoColor=white" alt="macOS 14+"/>
<img src="https://img.shields.io/badge/status-preview-A6431F?style=flat" alt="Preview"/>

</div>

## Your agent finally has a face

Pawly watches what your coding agent is doing—reading files, running commands, thinking, requesting approval, compressing context—and reflects it on the desktop in real time.

No dashboard. No extra window. Just a small creature that makes invisible agent work visible.

## What it reacts to

| Agent state | Pawly |
|---|---|
| Reading and editing | Starts coding |
| Thinking | Pauses and thinks |
| Waiting for approval | Asks you directly |
| Context compression | Packs everything into a box |
| Success | Celebrates |
| Warning or risky command | Stops and alerts you |
| Idle | Walks, drinks coffee, gets sleepy |

## Agent support

| Agent | Events |
|---|---:|
| Claude Code | 9 |
| Codex | 8 |
| Gemini CLI | 6 |

Pawly installs local hooks and keeps the connection visible. Support will expand as agent interfaces stabilize.

## Download

Download the current preview:

**[Pawly 0.1.0 for macOS](downloads/Pawly-0.1.0.dmg)**

Requirements: macOS 14+.

The preview build is unsigned. If macOS reports that the app is damaged after moving it to Applications, remove the quarantine flag:

~~~bash
xattr -dr com.apple.quarantine /Applications/Pawly.app
~~~

Only run preview builds you downloaded from this repository.

## Run the website locally

~~~bash
git clone https://github.com/mangiapanejohn-dev/Pawly-Website.git
cd Pawly-Website
python3 -m http.server 4173
~~~

Then open <http://localhost:4173>.

## This repository

This repository contains the public Pawly landing page, character assets, and preview binary.

| File | Purpose |
|---|---|
| <code>index.html</code> | Product page |
| <code>styles.css</code> | Responsive visual system |
| <code>script.js</code> | Interaction and motion |
| <code>assets/</code> | Pawly states and expressions |
| <code>downloads/</code> | Public preview builds |

The core macOS application is maintained separately.

<div align="center">

Let your agent work. Pawly will keep an eye on it. 👾

</div>
