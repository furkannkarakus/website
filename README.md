# Furkan Karakuş — Visual Storyteller & Filmmaker Portfolio

> Official modern, unconventional, dynamic, and interactive personal portfolio website for **furkankarakus.com** (Furkan Karakuş).

---

## 🎬 Core Features & Aesthetic Highlights

### 1. Viewfinder & Aperture Blade Intro Loader
- Dynamic iris aperture blade opening animation on load with mechanical audio release.
- Blinking recording beacon (`REC 🔴`) and live real-time 24fps timecode HUD ticker (`00:24:18:09`).

### 2. Interactive Camera Lens Cursor
- Custom cursor with dynamic focus ring, rotating aperture stops, optical crosshairs, and live focal length readout (`[24mm]`, `[35mm]`, `[50mm]`, `[85mm]`, `[200mm]`) that dynamically shifts when hovering over different sections and works.

### 3. Hero Section: Optical Lens Simulator
- Focal length selector dials (`24mm Wide`, `50mm Prime`, `85mm Portrait`, `200mm Telephoto`) that dynamically adjust the optical depth-of-field and background blur in real-time.
- Punchy tagline: *"Freezing frames, bending time, creating memories."*
- Full camera hardware HUD telemetry (Sony FX3, Cine EI 800, 1/8000s, 98% battery).

### 4. Selected Works Bento Grid & Horizontal Reel
- Filterable gallery: `All Works`, `Street & Urban`, `Editorial Portraits`, `Cinematic Reels`, `Drone / Commercial`.
- **Hover EXIF Data Inspector**: Dynamic telemetry overlay displaying Camera Body, Lens, Aperture, Shutter Speed, and ISO on mouse hover.
- **Interactive RAW vs Color Graded Split-Slider**: Compare flat S-Log3 sensor data against the final Kodak 2383 film emulation print grade by dragging the divider.
- High-res Lightbox modal with full metadata inspector.
- 4K Video Cinema Player modal with anamorphic aspect ratio badges.

### 5. "What's In My Bag?" Interactive Gear Loadout
- Visual clickable gear mat: **Sony FX3 Cinema Line**, **Sony A7R V (61MP)**, **Sony FE 24-70mm f/2.8 GM II**, **Sony FE 85mm f/1.4 GM**, **DJI Mavic 3 Pro Cine (Tri-Camera Drone)**, **DJI RS 3 Pro Gimbal**.
- Click to inspect item: reveals hardware specifications, field notes ("Why I shoot with this"), and sample captures.

### 6. "Manual Mode Master" Interactive Focus Mini-Game
- Dynamic viewfinder subject moving through optical depth of field with simulated defocus blur.
- Real-time **Focus Peaking** green contour overlay when hitting critical focus plane.
- Shutter release via button or `SPACEBAR` key with mechanical shutter sound FX and camera flash animation.
- Instant developed Polaroid result card with accuracy scoring (e.g. *100% Tack Sharp — Legendary Eye*), high score storage in `localStorage`, and direct shoot booking prompt.

### 7. Director's Clapperboard Booking Form
- Tactile Hollywood film clapperboard design with hinged wooden clapper snap animation and sound FX.
- Production form fields for Scene, Take, Project Type, Estimated Timeline, Interactive Budget Slider, and Vision Brief.
- Instant submission slate with direct email fallback.

### 8. Web Audio API Sound Engine
- Zero-latency synthesized sound effects (mechanical shutter snap, dual focus confirmation beep, knurled dial click, clapperboard clack) that require no external audio asset downloads.
- Global audio mute/unmute toggle in the HUD.

---

## 🚀 Running Locally

To preview the portfolio site locally:

```bash
# Using Node / npx serve
npx serve .

# Or using Python 3 built-in server
python -m http.server 3000
```
Open `http://localhost:3000` in your browser.
