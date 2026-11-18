# Changelog

All notable changes to the RavenLabs platform and collective website will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.1.7] - 2026-11-18

### Added
- **Click-to-Cycle Focus Ticker**: Interactive badge click handler cycling through real-time engineering disciplines accompanied by ascending triad musical chimes.
- **Scroll Velocity Pitch Modulation**: Dynamic frequency scaling on micro-haptic tones proportional to rapid page scroll velocity.
- **Dynamic Network Telemetry**: Integrated `navigator.connection` network downlink speed and effective tier (e.g. `4G 10M`) directly into the HUD telemetry display.
- **Glass Specular Border on Scroll**: Applied elevated depth shadow and glass specular border highlight (`#site-nav.nav-scrolled`) upon user page traversal.

### Enhanced
- **Sitemap Indexing**: Updated lastmod timestamp to 2026-11-18 across all canonical routes.
- **Engine Version Bump**: Promoted systems twin engine telemetry badge to `v1.1.7 Stable`.

---

## [1.1.6] - 2026-11-17

### Added
- **Vim-Style Scrolling Navigation**: Bound `J` (scroll down) and `K` (scroll up) keys with smooth interpolation and acoustic haptic tones.
- **JS Heap Memory Telemetry**: Dynamically sampled `performance.memory` footprint (e.g. `14.2 MB`) in the live engineering telemetry HUD.
- **Navigation Control Tooltips**: Accessible micro-tooltips attached to navbar controls displaying hotkey shortcuts (`[M]`, `[T]`, `[?]`).

### Enhanced
- **Glassmorphic Toast Popup**: Upgraded `#toast` alert notification with glassmorphism, accent boundary lighting, and cubic-bezier bounce physics.
- **Sitemap Indexing**: Updated lastmod timestamp to 2026-11-17.

---

## [1.1.5] - 2026-11-16

### Added
- **Stereo Panning Audio Spatialization**: Integrated `StereoPannerNode` in the Web Audio oscillator engine to dynamically spatialise micro-haptics based on pointer coordinate position.
- **Organic Typewriter Jitter**: Replaced linear typing loop with human keystroke latency variance on the hero engineering focus badge.
- **Latency Jitter & Health Indicator**: Added 99th-percentile frame latency delta tracking in the FPS HUD with dynamic warning amber indicators.

### Accessibility & UI
- **WCAG AAA High Contrast Media Query**: Implemented `@media (prefers-contrast: more)` with hardened borders and high-visibility focus indicators.
- **Tactile Button Sink Transform**: Added physical depression physics (`translateY(1.5px) scale(0.98)`) on `:active` button clicks.
- **Sitemap Freshness**: Updated sitemap last modified timestamp to 2026-11-16.

---

## [1.1.4] - 2026-11-15

### Added
- **Product Navigation Hotkey (`P`)**: Direct keyboard jump to `#products` (Raven Notch) with tactile haptic tone and toast confirmation.
- **Cheatsheet Integration**: Embedded `P` key directly inside the interactive keyboard shortcuts modal dialog.
- **Session Duration Telemetry**: Client-side elapsed time meter in the footer status bar (`MM:SS`) operating with zero remote cookies or trackers.
- **Platform Micro-Interactions**: Hover slide-in accent underline and acoustic synthesizer tones across platform cards.

### Enhanced
- **Milestone Grid Dynamics**: Spring elevation transforms and cyan highlight physics on milestone statistics.
- **Sitemap Indexing**: Updated lastmod timestamp to 2026-11-15.

---

## [1.1.3] - 2026-11-14

### Added
- **Founder Contact Micro-Physics**: Interactive slide transitions and scaling icon transforms on founder communication links.
- **Enhanced Mobile Vibration**: Expanded Vibration API triggers to include 1-click contact clipboard copies and network status changes.
- **Harmonic Network Chimes**: Four-note harmonic reconnect chords (`[523.25, 659.25, 783.99, 1046.50]`) played dynamically on connectivity recovery.

### Accessibility & UI
- **Accordion ARIA Expanded Sync**: Automated real-time synchronization of `aria-expanded` attributes across all FAQ disclosure items.
- **Feature Icon Spring Transform**: Smooth elevation physics and hover color transitions across platform capability cards.
- **Sitemap Indexing**: Updated lastmod timestamp to 2026-11-14 for search engines.

---

## [1.1.2] - 2026-11-13

### Added
- **Interactive Shortcut Actions**: Made keyboard shortcut modal rows directly clickable and touchable to trigger theme switches, audio toggles, CLI copy, and telemetry.
- **Live DOM Node Telemetry**: Enhanced FPS HUD with continuous DOM element footprint counting alongside frame rate and render latency.
- **Manifesto Track Hover**: Interactive hover states and directional acoustic tone feedback across core manifesto steps.
- **Scroll Beacon Pulse**: Subtle glow beacon animation on floating back-to-top button when reaching the page terminus.

### Enhanced
- **Pipeline Visual Depth**: Upper border accent gradients and spring elevation hover physics on pipeline lab preview cards.
- **Sitemap Indexing**: Updated last modified timestamp to 2026-11-13.

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
