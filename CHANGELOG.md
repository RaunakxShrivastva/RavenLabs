# Changelog

All notable changes to the RavenLabs platform and collective website will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.1.1] - 2026-11-12

### Added
- **Mobile Glassmorphic Navigation**: Full backdrop-filter blur and smooth slide-down overlay with integrated FAQ section navigation and tactile feedback.
- **Vibration API Integration**: Native mobile haptic feedback patterns triggered on button clicks, command clipboard copies, and anchor deep-links.
- **Audio State Chimes**: Bidirectional sound power-up (`[523.25, 659.25]`) and shutdown (`[440, 329.63]`) chime synthesis paired with feedback toasts.
- **Navbar Shortcuts Trigger**: Accessible dedicated `?` hotkey pill in the desktop navigation bar for immediate keyboard cheat sheet discovery.

### Optimized
- **Asset Performance & Decoding**: Added explicit dimensional attributes, `loading="lazy"`, and `decoding="async"` across hero logo and Linux Tux icons to prevent main-thread layout shifts.
- **Sitemap Freshness**: Updated sitemap timestamp for search engine re-indexing.

---

## [1.1.0] - 2026-11-11

### Added
- **Focus Pipeline Ticker**: Dynamic real-time typewriter loop in the Hero section showcasing collective engineering pillars (Rust Architecture, Zero Electron Overhead, <14MB RAM, Sub-millisecond Latency).
- **Engine Status Badge**: Live system status pill in the footer reflecting current build stability (`Engine: v1.1.0 Stable`).
- **Telemetry HUD**: Systems engineering live frame rate (FPS) and latency sampler HUD toggleable with the `F` hotkey.
- **Section Deep Links**: Click-to-copy direct section anchors (`#mission`, `#products`, `#platforms`, `#milestones`, `#faq`, `#founder`) with harmonic audio confirmation.
- **Escape Dismissal**: Consolidated universal key listener ensuring `Escape` dismisses modals, the telemetry HUD, mobile menus, and toast notifications cleanly.
- **Enhanced SEO & Indexing**: Enriched OpenGraph, Twitter Card, and Schema.org metadata alongside structured daily sitemap re-indexing.

### Changed
- **Scroll Parallax Depth**: Viewport-bounded scroll transforms with multi-layer parallax shift on the hero watermark and structural grid lines.
- **Audio Synthesizer Engine**: Refined pentatonic soundscapes and click haptics with zero-dependency Web Audio API oscillator nodes.

---

## [1.0.0] - 2026-11-08

### Added
- **PWA & Offline First**: Complete Progressive Web App implementation with `site.webmanifest` and Service Worker (`sw.js`) cache strategies.
- **Tactile Audio Engine**: Custom procedural Web Audio synthesizer powering UI feedback, clicks, and modal chimes.
- **Interactive Keyboard Modal**: Glassmorphic hotkey modal accessible via `?` key or dedicated footer trigger.
- **Reading Time Telemetry**: Dynamic reading duration estimator calculated on load.
- **Circular Back to Top**: Calibrated SVG progress ring tracking scroll depth with smooth return.
- **Zero Telemetry Counter**: Client-side private session visit counter stored purely in `localStorage`.
- **System Theme Adaptive Favicon**: SVG data URI favicon dynamically adapting to OS dark and light mode preferences.

---

## [0.9.0] - 2026-10-26

### Initial Release
- **Collective Manifesto**: Launch of RavenLabs independent collective mission.
- **Raven Notch Twin Showcase**: Dedicated native companion app architecture specifications for Windows 11/10 and Linux.
- **Responsive Layout**: Fluid typography, responsive grids, and dark-mode first design tokens.
