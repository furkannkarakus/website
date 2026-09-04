/**
 * furkankarakus.com — Kişisel Portfolyo Sitesi
 * Videographer & Photographer
 * Pexels Koleksiyon API (w7u9amp) — Yüksek Çözünürlük (large2x / original) & Modern srcset Optimizasyonu
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initAudioEngine();
  initCameraReticle();
  initHeroSpotlight();
  initTimecodeTicker();
  initPexelsCollectionGallery();
  initRawGradedSlider();
  initGearAndSoftwareExplorer();
  initFocusMiniGame();
  initContactForm();
  initGrainAndSoundToggles();
  initMobileMenu();
  initScrollToTop();
  initSmoothScroll();
});

/* ==========================================================================
   1. Web Audio API Ses Motoru
   ========================================================================== */
let audioCtx = null;
let soundEnabled = false;

function initAudioEngine() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const enableAudio = () => {
    if (!audioCtx) audioCtx = new AudioContext();
    if (audioCtx.state === 'suspended') audioCtx.resume();
  };
  window.addEventListener('click', enableAudio, { once: true });
  window.addEventListener('keydown', enableAudio, { once: true });
}

function playShutterSound() {
  if (!soundEnabled || !audioCtx) return;
  try {
    const now = audioCtx.currentTime;
    const bufferSize = audioCtx.sampleRate * 0.05;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.2));
    }
    const noise = audioCtx.createBufferSource();
    noise.buffer = buffer;
    
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1200, now);
    filter.Q.setValueAtTime(3, now);

    const gain = audioCtx.createGain();
    gain.gain.setValueAtTime(0.8, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(audioCtx.destination);
    noise.start(now);

    const osc = audioCtx.createOscillator();
    const oscGain = audioCtx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(140, now + 0.02);
    osc.frequency.exponentialRampToValueAtTime(30, now + 0.08);

    oscGain.gain.setValueAtTime(0.6, now + 0.02);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(oscGain);
    oscGain.connect(audioCtx.destination);
    osc.start(now + 0.02);
    osc.stop(now + 0.09);
  } catch (e) {}
}

function playFocusBeep() {
  if (!soundEnabled || !audioCtx) return;
  try {
    const now = audioCtx.currentTime;
    [0, 0.07].forEach((delay) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1800, now + delay);
      gain.gain.setValueAtTime(0.15, now + delay);
      gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.04);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now + delay);
      osc.stop(now + delay + 0.05);
    });
  } catch (e) {}
}

function playDialClick() {
  if (!soundEnabled || !audioCtx) return;
  try {
    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(900, now);
    osc.frequency.exponentialRampToValueAtTime(200, now + 0.015);
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.015);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.02);
  } catch (e) {}
}

function playClapperSnap() {
  if (!soundEnabled || !audioCtx) return;
  try {
    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(450, now);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.06);
    gain.gain.setValueAtTime(0.6, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.07);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.08);
  } catch (e) {}
}

/* ==========================================================================
   2. Kompakt Kamera Odak Vizörü İmleci
   ========================================================================= */
function initCameraReticle() {
  const cursorWrapper = document.getElementById('cameraCursorWrapper');
  const focalText = document.getElementById('cursorFocalText');
  const flashEl = document.getElementById('reticleFlash');
  if (!cursorWrapper) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let cursorX = mouseX;
  let cursorY = mouseY;
  let isHovering = false;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function renderCursor() {
    cursorX += (mouseX - cursorX) * 0.22;
    cursorY += (mouseY - cursorY) * 0.22;
    cursorWrapper.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);

  const dynamicFocals = ['18mm ƒ/4', '24mm ƒ/4', '35mm ƒ/1.8', '50mm ƒ/4', '85mm ƒ/4', '105mm ƒ/4'];
  let focalIndex = 2;
  setInterval(() => {
    if (!isHovering && focalText) {
      focalIndex = (focalIndex + 1) % dynamicFocals.length;
      focalText.textContent = dynamicFocals[focalIndex];
    }
  }, 3500);

  document.addEventListener('mouseover', (e) => {
    const target = e.target;
    const isInteractive = target.closest('a, button, input, select, textarea, .portfolio-card, .gear-item-card, .filter-btn, .clapper-top, [role="button"]');

    if (isInteractive) {
      isHovering = true;
      document.body.classList.add('cursor-hover');
      const focal = target.closest('[data-focal]')?.getAttribute('data-focal') || 'LOCKED // %100';
      if (focalText) {
        focalText.textContent = focal === 'LOCKED // %100' ? focal : `LOCK // ${focal}`;
      }
    }
  });

  document.addEventListener('mouseout', (e) => {
    const target = e.target;
    const isInteractive = target.closest('a, button, input, select, textarea, .portfolio-card, .gear-item-card, .filter-btn, .clapper-top, [role="button"]');

    if (isInteractive) {
      isHovering = false;
      document.body.classList.remove('cursor-hover');
      if (focalText) {
        focalText.textContent = dynamicFocals[focalIndex];
      }
    }
  });

  window.addEventListener('mousedown', () => {
    document.body.classList.add('cursor-clicking');
    if (flashEl) {
      flashEl.classList.add('flash-active');
      setTimeout(() => flashEl.classList.remove('flash-active'), 160);
    }
  });

  window.addEventListener('mouseup', () => {
    document.body.classList.remove('cursor-clicking');
  });
}

/* ==========================================================================
   2.1 Sinematik Volumetrik Sahne Işıkları & Anamorfik Lens Flare Motoru
   ========================================================================== */
function initHeroSpotlight() {
  const heroSection = document.getElementById('hero');
  const canvas = document.getElementById('heroVolumetricCanvas');
  if (!heroSection || !canvas) return;

  const ctx = canvas.getContext('2d');
  let width = 0;
  let height = 0;

  function resizeCanvas() {
    width = heroSection.clientWidth || window.innerWidth;
    height = heroSection.clientHeight || window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  let targetX = width * 0.5;
  let targetY = height * 0.42;
  let currentX = targetX;
  let currentY = targetY;
  let isHovering = false;
  let flareIntensity = 0.85;

  heroSection.addEventListener('mouseenter', () => {
    isHovering = true;
  });

  heroSection.addEventListener('mousemove', (e) => {
    const rect = heroSection.getBoundingClientRect();
    targetX = e.clientX - rect.left;
    targetY = e.clientY - rect.top;
    isHovering = true;
  });

  heroSection.addEventListener('mouseleave', () => {
    isHovering = false;
    targetX = width * 0.5;
    targetY = height * 0.42;
  });

  // Çift Truss Işık Kaynağı (Sol Üst & Sağ Üst Sahne Tavanı)
  function renderVolumetricFrame(timestamp) {
    currentX += (targetX - currentX) * 0.12;
    currentY += (targetY - currentY) * 0.12;

    const targetFlare = isHovering ? 1.0 : 0.7;
    flareIntensity += (targetFlare - flareIntensity) * 0.08;

    ctx.clearRect(0, 0, width, height);

    // Sahne atmosferi ve hafif sis dalgalanması
    const time = timestamp * 0.001;
    const hazeFlicker = 0.96 + Math.sin(time * 2.5) * 0.04 + Math.cos(time * 4.2) * 0.02;

    ctx.save();
    ctx.globalCompositeOperation = 'screen';

    // 1. ORTA TEPE VOLUMETRİK SAHNE IŞIK HUZMESİ (Tek Merkez Tepe Spot Işığı)
    const fix = {
      x: width * 0.5,
      y: -30,
      topW: 48,
      bottomW: 240,
      color: '245, 158, 11'
    };

    const dx = currentX - fix.x;
    const dy = currentY - fix.y;
    const dist = Math.sqrt(dx * dx + dy * dy) || 1;
    const nx = -dy / dist;
    const ny = dx / dist;

    // Koni Şeklinde Tek Işık Huzmesi Poligonu
    const p1x = fix.x - nx * (fix.topW * 0.5);
    const p1y = fix.y - ny * (fix.topW * 0.5);
    const p2x = fix.x + nx * (fix.topW * 0.5);
    const p2y = fix.y + ny * (fix.topW * 0.5);
    const p3x = currentX + nx * (fix.bottomW * 0.5);
    const p3y = currentY + ny * (fix.bottomW * 0.5);
    const p4x = currentX - nx * (fix.bottomW * 0.5);
    const p4y = currentY - ny * (fix.bottomW * 0.5);

    // Doğrusal Gradyan Dolgu
    const beamGrad = ctx.createLinearGradient(fix.x, fix.y, currentX, currentY);
    beamGrad.addColorStop(0, `rgba(${fix.color}, ${0.45 * hazeFlicker * flareIntensity})`);
    beamGrad.addColorStop(0.18, `rgba(${fix.color}, ${0.26 * hazeFlicker * flareIntensity})`);
    beamGrad.addColorStop(0.6, `rgba(255, 255, 255, ${0.10 * hazeFlicker * flareIntensity})`);
    beamGrad.addColorStop(1, `rgba(${fix.color}, 0.0)`);

    ctx.beginPath();
    ctx.moveTo(p1x, p1y);
    ctx.lineTo(p2x, p2y);
    ctx.lineTo(p3x, p3y);
    ctx.lineTo(p4x, p4y);
    ctx.closePath();
    ctx.fillStyle = beamGrad;
    ctx.fill();

    // Işık Armatürünün Tepe Parlaması (Center Bulb Glare)
    const bulbGlow = ctx.createRadialGradient(fix.x, fix.y, 0, fix.x, fix.y, 90);
    bulbGlow.addColorStop(0, `rgba(255, 255, 255, ${0.9 * hazeFlicker})`);
    bulbGlow.addColorStop(0.3, `rgba(${fix.color}, ${0.5 * hazeFlicker})`);
    bulbGlow.addColorStop(1, 'transparent');

    ctx.beginPath();
    ctx.arc(fix.x, fix.y, 90, 0, Math.PI * 2);
    ctx.fillStyle = bulbGlow;
    ctx.fill();

    // 2. SİNEMATİK ANAMORFİK LENS FLARE & OPTİK PARLAMALAR
    const flareAlpha = flareIntensity * hazeFlicker;

    // A. Merkez Sıcak Işık Çekirdeği (Core Flare)
    const coreGlow = ctx.createRadialGradient(currentX, currentY, 0, currentX, currentY, 110);
    coreGlow.addColorStop(0, `rgba(255, 255, 255, ${0.75 * flareAlpha})`);
    coreGlow.addColorStop(0.18, `rgba(245, 158, 11, ${0.42 * flareAlpha})`);
    coreGlow.addColorStop(0.55, `rgba(245, 158, 11, ${0.12 * flareAlpha})`);
    coreGlow.addColorStop(1, 'transparent');

    ctx.beginPath();
    ctx.arc(currentX, currentY, 110, 0, Math.PI * 2);
    ctx.fillStyle = coreGlow;
    ctx.fill();

    // B. Yatay Anamorfik Işık Çizgisi (Cinematic Blue/Cyan Streak)
    const streakW = Math.min(width * 0.85, 750);
    const streakGrad = ctx.createLinearGradient(currentX - streakW * 0.5, currentY, currentX + streakW * 0.5, currentY);
    streakGrad.addColorStop(0, 'transparent');
    streakGrad.addColorStop(0.3, `rgba(56, 189, 248, ${0.35 * flareAlpha})`); // Sinematik Mavi / Camgöbeği
    streakGrad.addColorStop(0.5, `rgba(255, 255, 255, ${0.95 * flareAlpha})`); // Beyaz Merkez
    streakGrad.addColorStop(0.7, `rgba(56, 189, 248, ${0.35 * flareAlpha})`);
    streakGrad.addColorStop(1, 'transparent');

    // İnce ve net çizgi
    ctx.fillStyle = streakGrad;
    ctx.fillRect(currentX - streakW * 0.5, currentY - 1.2, streakW, 2.4);

    // Yumuşak halo çizgisi
    const streakHaloGrad = ctx.createLinearGradient(currentX - streakW * 0.35, currentY, currentX + streakW * 0.35, currentY);
    streakHaloGrad.addColorStop(0, 'transparent');
    streakHaloGrad.addColorStop(0.5, `rgba(56, 189, 248, ${0.20 * flareAlpha})`);
    streakHaloGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = streakHaloGrad;
    ctx.fillRect(currentX - streakW * 0.35, currentY - 5, streakW * 0.7, 10);

    // C. Optik Yansıma ve Hayalet Halka Parçacıkları (Lens Ghosting Artifacts)
    const centerX = width * 0.5;
    const centerY = height * 0.45;
    const vx = centerX - currentX;
    const vy = centerY - currentY;

    // Hayalet Halka 1 (Amber Disk)
    const g1x = currentX + vx * 0.35;
    const g1y = currentY + vy * 0.35;
    const g1Grad = ctx.createRadialGradient(g1x, g1y, 0, g1x, g1y, 22);
    g1Grad.addColorStop(0, `rgba(245, 158, 11, ${0.30 * flareAlpha})`);
    g1Grad.addColorStop(0.8, `rgba(245, 158, 11, ${0.08 * flareAlpha})`);
    g1Grad.addColorStop(1, 'transparent');
    ctx.beginPath();
    ctx.arc(g1x, g1y, 22, 0, Math.PI * 2);
    ctx.fillStyle = g1Grad;
    ctx.fill();

    // Hayalet Halka 2 (Cyan Halka)
    const g2x = currentX + vx * 0.72;
    const g2y = currentY + vy * 0.72;
    const g2Grad = ctx.createRadialGradient(g2x, g2y, 0, g2x, g2y, 35);
    g2Grad.addColorStop(0, `rgba(56, 189, 248, ${0.22 * flareAlpha})`);
    g2Grad.addColorStop(1, 'transparent');
    ctx.beginPath();
    ctx.arc(g2x, g2y, 35, 0, Math.PI * 2);
    ctx.fillStyle = g2Grad;
    ctx.fill();

    // Hayalet Halka 3 (Geniş Mor/Pembe Halka)
    const g3x = currentX + vx * 1.25;
    const g3y = currentY + vy * 1.25;
    const g3Grad = ctx.createRadialGradient(g3x, g3y, 0, g3x, g3y, 65);
    g3Grad.addColorStop(0, `rgba(168, 85, 247, ${0.14 * flareAlpha})`);
    g3Grad.addColorStop(1, 'transparent');
    ctx.beginPath();
    ctx.arc(g3x, g3y, 65, 0, Math.PI * 2);
    ctx.fillStyle = g3Grad;
    ctx.fill();

    ctx.restore();
    requestAnimationFrame(renderVolumetricFrame);
  }

  requestAnimationFrame(renderVolumetricFrame);
}

/* ==========================================================================
   3. Zaman Kodu
   ========================================================================== */
function initTimecodeTicker() {
  const timecodeEl = document.getElementById('hudTimecode');
  if (!timecodeEl) return;

  let frames = 0, seconds = 18, minutes = 24, hours = 0;
  setInterval(() => {
    frames++;
    if (frames >= 24) {
      frames = 0;
      seconds++;
      if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
          minutes = 0;
          hours = (hours + 1) % 24;
        }
      }
    }
    const pad = (n) => String(n).padStart(2, '0');
    timecodeEl.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(frames)}`;
  }, 1000 / 24);
}

/* ==========================================================================
   4. PEXELS KOLEKSİYON GALERİSİ & YÜKSEK ÇÖZÜNÜRLÜK OPTİMİZASYONU
   ========================================================================== */
const PEXELS_API_KEY = 'hvSvE1Rd2PHGtXtlshZe16y5lJYXvSuzdsJQsY9qK2REgd5BUmIkVm99';
const PEXELS_COLLECTION_ID = 'w7u9amp';
const PEXELS_COLLECTION_ENDPOINT = `https://api.pexels.com/v1/collections/${PEXELS_COLLECTION_ID}?per_page=50`;

const ITEMS_PER_PAGE = 10; // 5 Satır (her satırda 2 bento kartı = 10 kart)
let currentPage = 1;
let collectionMediaList = [];

// Skeleton Loading Gösterimi
function showSkeletonLoading() {
  const gridContainer = document.getElementById('portfolioBentoGrid');
  if (!gridContainer) return;

  const skeletonSpans = [
    'col-span-12 md:col-span-8',
    'col-span-12 md:col-span-4',
    'col-span-12 md:col-span-6',
    'col-span-12 md:col-span-6',
    'col-span-12 md:col-span-4',
    'col-span-12 md:col-span-8'
  ];

  gridContainer.innerHTML = skeletonSpans.map(span => `
    <div class="skeleton-card ${span}">
      <div class="skeleton-shimmer"></div>
    </div>
  `).join('');
}

// Pexels Koleksiyon API'sinden Medyaları Çekme & Yüksek Çözünürlük Eşlemesi
async function initPexelsCollectionGallery() {
  const syncStatus = document.getElementById('pexelsSyncStatus');
  showSkeletonLoading();

  const spans = [
    'col-span-12 md:col-span-8',
    'col-span-12 md:col-span-4',
    'col-span-12 md:col-span-6',
    'col-span-12 md:col-span-6',
    'col-span-12 md:col-span-4',
    'col-span-12 md:col-span-8',
    'col-span-12 md:col-span-6',
    'col-span-12 md:col-span-6',
    'col-span-12 md:col-span-8',
    'col-span-12 md:col-span-4'
  ];

  try {
    const res = await fetch(PEXELS_COLLECTION_ENDPOINT, {
      headers: {
        Authorization: PEXELS_API_KEY
      }
    });

    if (!res.ok) {
      throw new Error(`Pexels Koleksiyon API Hatası: ${res.status}`);
    }

    const data = await res.json();
    const mediaList = data.media || [];

    if (mediaList.length === 0) {
      throw new Error('Koleksiyonda medya bulunamadı.');
    }

    collectionMediaList = mediaList.map((item, idx) => {
      const isVideo = item.type === 'Video' || item.duration !== undefined || (item.video_files && item.video_files.length > 0);

      let imageSrc = '';
      let srcLarge = '';
      let srcLarge2x = '';
      let originalSrc = '';
      let videoLink = '';

      if (isVideo) {
        imageSrc = item.image || item.video_pictures?.[0]?.picture || '';
        srcLarge = imageSrc;
        srcLarge2x = imageSrc;
        originalSrc = imageSrc;
        const bestVideo = item.video_files?.find(f => f.quality === 'hd') || item.video_files?.[0];
        videoLink = bestVideo ? bestVideo.link : '';
      } else {
        // 1. Çözünürlük Kaynaklarını Yükselt: Izgarada large2x & large, Modalda original
        srcLarge = item.src?.large || item.src?.large2x || '';
        srcLarge2x = item.src?.large2x || item.src?.large || item.src?.original || '';
        imageSrc = srcLarge2x || srcLarge;
        originalSrc = item.src?.original || srcLarge2x;
      }

      return {
        id: item.id,
        type: isVideo ? 'video' : 'photo',
        image: imageSrc,
        srcLarge: srcLarge,
        srcLarge2x: srcLarge2x,
        original: originalSrc,
        videoUrl: videoLink,
        span: spans[idx % spans.length]
      };
    });

    if (syncStatus) syncStatus.textContent = `PEXELS HD (${collectionMediaList.length} FOTOĞRAF)`;
    renderPaginatedGrid();

  } catch (err) {
    console.warn('Pexels Koleksiyon yükleme hatası, yerel yedek devreye giriyor:', err);
    if (syncStatus) syncStatus.textContent = 'YEREL VERİ';
    loadFallbackData();
  }
}

function loadFallbackData() {
  collectionMediaList = [
    {
      id: 101,
      type: 'photo',
      image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1600&q=85',
      srcLarge: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=940&q=85',
      srcLarge2x: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1880&q=90',
      original: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=2600&q=95',
      span: 'col-span-12 md:col-span-8'
    },
    {
      id: 102,
      type: 'photo',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1600&q=85',
      srcLarge: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=940&q=85',
      srcLarge2x: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1880&q=90',
      original: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=2600&q=95',
      span: 'col-span-12 md:col-span-4'
    },
    {
      id: 103,
      type: 'video',
      image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1600&q=85',
      srcLarge: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=940&q=85',
      srcLarge2x: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1880&q=90',
      original: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=2400&q=95',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      span: 'col-span-12 md:col-span-6'
    },
    {
      id: 104,
      type: 'photo',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=85',
      srcLarge: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=940&q=85',
      srcLarge2x: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1880&q=90',
      original: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2600&q=95',
      span: 'col-span-12 md:col-span-6'
    }
  ];
  renderPaginatedGrid();
}

// 5 Satırlık Sayfalı & Yüksek Çözünürlüklü Responsive Izgara Renderı
function renderPaginatedGrid() {
  const gridContainer = document.getElementById('portfolioBentoGrid');
  const paginationContainer = document.getElementById('portfolioPagination');
  if (!gridContainer) return;

  gridContainer.innerHTML = '';

  const totalItems = collectionMediaList.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE) || 1;

  if (currentPage > totalPages) currentPage = totalPages;
  if (currentPage < 1) currentPage = 1;

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const pageItems = collectionMediaList.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  pageItems.forEach((item) => {
    const card = document.createElement('div');
    card.className = `portfolio-card relative rounded-2xl overflow-hidden group cursor-pointer border border-white/10 bg-surface ${item.span}`;
    card.setAttribute('data-id', item.id);

    const isVideo = item.type === 'video';

    // 2. Responsive srcset & Yüksek Çözünürlüklü CSS Kartı
    card.innerHTML = `
      <div class="gallery-media-container">
        <img 
          src="${item.image}" 
          ${item.srcLarge && item.srcLarge2x ? `srcset="${item.srcLarge} 940w, ${item.srcLarge2x} 1880w"` : ''}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          alt="Furkan Karakuş Fotoğraf" 
          class="gallery-hd-img" 
          loading="lazy" 
        />
        
        <!-- Hover Karartma & İkon -->
        <div class="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center pointer-events-none">
          <div class="w-12 h-12 rounded-full bg-black/80 border border-white/30 flex items-center justify-center text-white backdrop-blur-md shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100">
            <i data-lucide="${isVideo ? 'play' : 'maximize-2'}" class="w-5 h-5"></i>
          </div>
        </div>

        ${isVideo ? `
          <div class="absolute top-4 left-4 pointer-events-none">
            <span class="hud-badge text-xs bg-black/80 text-red-400 border-red-500/30">
              <span class="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              VİDEO
            </span>
          </div>
        ` : ''}
      </div>
    `;

    card.addEventListener('click', () => {
      playFocusBeep();
      if (isVideo && item.videoUrl) {
        openVideoModal(item);
      } else {
        openPhotoLightbox(item);
      }
    });

    gridContainer.appendChild(card);
  });

  // Sayfalama Düğmeleri
  if (paginationContainer) {
    if (totalPages <= 1) {
      paginationContainer.innerHTML = '';
    } else {
      let paginationHtml = '';

      paginationHtml += `
        <button id="prevPageBtn" class="hud-badge text-xs ${currentPage === 1 ? 'opacity-40 pointer-events-none' : 'hover:border-amber-500 cursor-pointer'}">
          <i data-lucide="chevron-left" class="w-4 h-4"></i>
          <span class="hidden sm:inline">ÖNCEKİ</span>
        </button>
      `;

      for (let p = 1; p <= totalPages; p++) {
        const isActive = p === currentPage;
        paginationHtml += `
          <button class="page-num-btn hud-badge text-xs ${isActive ? 'hud-badge-active bg-amber-500 text-black font-bold border-amber-500' : 'hover:border-amber-500 cursor-pointer'}" data-page="${p}">
            ${p}
          </button>
        `;
      }

      paginationHtml += `
        <button id="nextPageBtn" class="hud-badge text-xs ${currentPage === totalPages ? 'opacity-40 pointer-events-none' : 'hover:border-amber-500 cursor-pointer'}">
          <span class="hidden sm:inline">SONRAKİ</span>
          <i data-lucide="chevron-right" class="w-4 h-4"></i>
        </button>
      `;

      paginationContainer.innerHTML = paginationHtml;

      document.querySelectorAll('.page-num-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const targetPage = Number(btn.getAttribute('data-page'));
          if (targetPage !== currentPage) {
            playDialClick();
            currentPage = targetPage;
            renderPaginatedGrid();
            document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
          }
        });
      });

      const prevBtn = document.getElementById('prevPageBtn');
      if (prevBtn) {
        prevBtn.addEventListener('click', () => {
          if (currentPage > 1) {
            playDialClick();
            currentPage--;
            renderPaginatedGrid();
            document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
          }
        });
      }

      const nextBtn = document.getElementById('nextPageBtn');
      if (nextBtn) {
        nextBtn.addEventListener('click', () => {
          if (currentPage < totalPages) {
            playDialClick();
            currentPage++;
            renderPaginatedGrid();
            document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
          }
        });
      }
    }
  }

  if (window.lucide) window.lucide.createIcons();
}

// Lightbox: Sadece Temiz, Orijinal Çözünürlükte (src.original) Görsel
function openPhotoLightbox(item) {
  const modal = document.getElementById('lightboxModal');
  const modalImg = document.getElementById('lightboxImg');
  if (!modal || !modalImg) return;

  modalImg.src = item.original;
  modal.classList.add('modal-open');
}

// Video Modal Oynatıcı: Temiz Video Oynatıcı
function openVideoModal(item) {
  const modal = document.getElementById('videoModal');
  const videoPlayer = document.getElementById('cinemaVideoPlayer');
  if (!modal || !videoPlayer) return;

  videoPlayer.src = item.videoUrl;
  videoPlayer.play().catch(() => {});

  modal.classList.add('modal-open');
}

window.closeActiveModal = function() {
  playDialClick();
  document.querySelectorAll('.modal-backdrop').forEach(m => m.classList.remove('modal-open'));
  const videoPlayer = document.getElementById('cinemaVideoPlayer');
  if (videoPlayer) {
    videoPlayer.pause();
    videoPlayer.src = '';
  }
};

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeActiveModal();
});

/* ==========================================================================
   5. RAW vs Renkli Kurgu
   ========================================================================== */
function initRawGradedSlider() {
  const container = document.getElementById('rawGradedContainer');
  const slider = document.getElementById('rawGradedSlider');
  const gradedImg = document.getElementById('gradedImageWrapper');
  if (!container || !slider || !gradedImg) return;

  let isDragging = false;

  const updateSlider = (x) => {
    const rect = container.getBoundingClientRect();
    let pos = (x - rect.left) / rect.width;
    pos = Math.max(0, Math.min(1, pos));
    const percentage = pos * 100;
    slider.style.left = `${percentage}%`;
    gradedImg.style.clipPath = `polygon(0 0, ${percentage}% 0, ${percentage}% 100%, 0 100%)`;
  };

  container.addEventListener('mousedown', (e) => {
    isDragging = true;
    updateSlider(e.clientX);
    playDialClick();
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    updateSlider(e.clientX);
  });

  window.addEventListener('mouseup', () => { isDragging = false; });

  container.addEventListener('touchstart', (e) => {
    isDragging = true;
    updateSlider(e.touches[0].clientX);
  });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    updateSlider(e.touches[0].clientX);
  });

  window.addEventListener('touchend', () => { isDragging = false; });
}

/* ==========================================================================
   6. Çantamda Neler Var? (Madde Madde Teknik Özellikler)
   ========================================================================== */
const gearItems = [
  {
    id: 'a6500',
    name: 'Sony a6500',
    category: 'Kamera Gövdesi',
    tag: 'Ana Kamera',
    specsList: [
      '24.2 MP APS-C Exmor CMOS Sensör',
      '5 Eksenli Gövde İçi Görüntü Sabitleme (IBIS)',
      '4K 30p & Full HD 120fps Ağır Çekim Video',
      '425 Faz Algılamalı Hibrit Otofokus Noktası',
      'S-Log2 & S-Log3 Profesyonel Sinematik Renk Profilleri',
      'Kompakt & Hafif Magnezyum Alaşım Gövde'
    ],
    why: 'Fotoğraf ve video projelerimde kullandığım kompakt, güvenilir ve güçlü ana kamera. Dahili 5 eksenli sabitleme ve hızlı hibrit otofokusu sayesinde hareketli sokak ve etkinlik çekimlerinde büyük avantaj sağlıyor.',
    icon: 'camera',
    thumb: 'sony-a6500.png'
  },
  {
    id: 'lens18105',
    name: 'Sony E PZ 18-105mm f/4 G OSS',
    category: 'Lens',
    tag: 'Çok Yönlü Power Zoom Lens',
    specsList: [
      'Sabit f/4.0 Diyafram Açıklığı (Tüm Odak Aralığında)',
      '27 - 157.5mm Eşdeğer Çok Yönlü Odak Aralığı',
      'Dahili Optical SteadyShot (OSS) Titreşim Engelleme',
      'Pürüzsüz Elektrikli Power Zoom (PZ) Mekanizması',
      'İçten Odaklama ve Zoom (Lens Boyu Değişmez)',
      'G Master Kalitesinde ED Cam Elemanları'
    ],
    why: 'Geniş açıdan telefotoya kadar tüm aralığı tek bir lenste toplayan çalışma atım. Sabit f/4 diyaframı ve pürüzsüz elektrikli zoom mekanizması hem fotoğraf hem akıcı video çekimleri için ideal.',
    icon: 'disc',
    thumb: 'sony-18-105.png'
  },
  {
    id: 'insta360',
    name: 'Insta360 GO 3S',
    category: 'Aksiyon & POV Kamera',
    tag: 'Minyatür 4K Kamera',
    specsList: [
      '4K 30fps Ultra Net Video Kaydı',
      'Manyetik Gövde & Giysi Klipsi ile Giyilebilir Tasarım',
      'FlowState Gelişmiş Sarsıntı Engelleme Stabilizasyonu',
      '360° Otomatik Ufuk Kilidi',
      'Su Geçirmez Gövde (5 Metreye Kadar)',
      'Ultra Hafif (Sadece 39 gram)'
    ],
    why: 'Farklı açılardan dinamik POV (birinci şahıs) ve yaratıcı b-roll sahneleri yakalamak için kullandığım ultra hafif minyatür kamera. Manyetik yapısı sayesinde her yere kolayca monte edilebiliyor.',
    icon: 'video',
    thumb: 'insta360-go3s.png'
  }
];

const softwareItems = [
  {
    name: 'Adobe Premiere Pro',
    category: 'Video Kurgu & Montaj',
    desc: 'Zaman çizelgesi kurgusu, çoklu kamera montajı, ses miksajı ve dinamik geçişler.',
    icon: 'film'
  },
  {
    name: 'Adobe Lightroom',
    category: 'RAW İşleme & Renk',
    desc: 'RAW fotoğrafların işlenmesi, renk tonlaması, pozlama düzenlemeleri ve kataloglama.',
    icon: 'sliders'
  },
  {
    name: 'Adobe Photoshop',
    category: 'İleri Düzey Rötuş & Tasarım',
    desc: 'Detaylı görsel manipülasyon, kapak tasarımları, katman tabanlı rötuş ve temizleme.',
    icon: 'image'
  }
];

function initGearAndSoftwareExplorer() {
  const container = document.getElementById('gearListContainer');
  const detailPanel = document.getElementById('gearDetailPanel');
  const softwareContainer = document.getElementById('softwareListContainer');

  if (container && detailPanel) {
    function selectGear(gear) {
      playDialClick();

      const specsHtml = gear.specsList.map(spec => `
        <li class="flex items-start gap-2 text-slate-200">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0"></span>
          <span>${spec}</span>
        </li>
      `).join('');

      detailPanel.innerHTML = `
        <div class="relative overflow-hidden rounded-2xl border border-white/15 bg-surface-elevated p-6 md:p-8">
          <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/10">
            <div>
              <span class="hud-badge text-emerald-400 mb-2 inline-block text-xs">${gear.category} // ${gear.tag}</span>
              <h3 class="font-display text-2xl md:text-3xl font-bold text-white">${gear.name}</h3>
            </div>
            <div class="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border border-white/20 shrink-0 bg-black/60 shadow-xl p-1">
              <img src="${gear.thumb}" alt="${gear.name}" class="w-full h-full object-cover rounded-xl" />
            </div>
          </div>

          <div class="space-y-5 text-sm font-sans">
            <div>
              <h4 class="font-mono text-xs uppercase tracking-wider text-amber-400 mb-2.5 flex items-center gap-1.5">
                <i data-lucide="check-circle-2" class="w-3.5 h-3.5 text-amber-400"></i>
                <span>ÖNE ÇIKAN TEKNİK ÖZELLİKLER</span>
              </h4>
              <ul class="space-y-2 bg-black/40 p-4 rounded-xl border border-white/5 font-mono text-xs">
                ${specsHtml}
              </ul>
            </div>

            <div>
              <h4 class="font-mono text-xs uppercase tracking-wider text-emerald-400 mb-1.5 flex items-center gap-1.5">
                <i data-lucide="compass" class="w-3.5 h-3.5 text-emerald-400"></i>
                <span>KULLANIM AMACIM & SAHA DENEYİMİ</span>
              </h4>
              <p class="text-slate-300 leading-relaxed text-sm">${gear.why}</p>
            </div>
          </div>
        </div>
      `;

      document.querySelectorAll('.gear-item-card').forEach(c => {
        c.classList.remove('border-amber-500');
        if (c.getAttribute('data-gear-id') === gear.id) {
          c.classList.add('border-amber-500');
        }
      });

      if (window.lucide) window.lucide.createIcons();
    }

    container.innerHTML = '';
    gearItems.forEach((gear) => {
      const card = document.createElement('div');
      card.className = 'gear-item-card p-4 flex items-center justify-between group';
      card.setAttribute('data-gear-id', gear.id);
      card.setAttribute('data-focal', 'Ekipman');

      card.innerHTML = `
        <div class="flex items-center gap-4">
          <div class="w-10 h-10 rounded-lg bg-black/50 border border-white/10 flex items-center justify-center text-amber-500 group-hover:text-emerald-400 group-hover:border-emerald-400 transition">
            <i data-lucide="${gear.icon}" class="w-5 h-5"></i>
          </div>
          <div>
            <h4 class="font-display text-base font-semibold text-white group-hover:text-amber-400 transition">${gear.name}</h4>
            <p class="font-mono text-xs text-slate-400">${gear.category}</p>
          </div>
        </div>
        <i data-lucide="chevron-right" class="w-5 h-5 text-slate-500 group-hover:text-white transition"></i>
      `;

      card.addEventListener('click', () => selectGear(gear));
      container.appendChild(card);
    });

    selectGear(gearItems[0]);
  }

  if (softwareContainer) {
    softwareContainer.innerHTML = '';
    softwareItems.forEach(sw => {
      const card = document.createElement('div');
      card.className = 'p-4 rounded-xl bg-surface border border-white/10 flex items-start gap-3.5 hover:border-amber-500/40 transition';
      card.innerHTML = `
        <div class="w-9 h-9 rounded-lg bg-black/60 border border-white/15 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
          <i data-lucide="${sw.icon}" class="w-4 h-4"></i>
        </div>
        <div>
          <h4 class="font-display text-sm font-bold text-white">${sw.name}</h4>
          <span class="font-mono text-[11px] text-emerald-400 block mb-1">${sw.category}</span>
          <p class="text-xs text-slate-400 leading-relaxed">${sw.desc}</p>
        </div>
      `;
      softwareContainer.appendChild(card);
    });
  }

  if (window.lucide) window.lucide.createIcons();
}

/* ==========================================================================
   7. "Manuel Odak Ustası" Mini Oyun
   ========================================================================== */
function initFocusMiniGame() {
  const canvas = document.getElementById('gameCanvas');
  const shootBtn = document.getElementById('gameShootBtn');
  const flashOverlay = document.getElementById('gameFlash');
  const resultCard = document.getElementById('gameResultCard');
  const scoreBadge = document.getElementById('gameScoreBadge');
  const scorePercent = document.getElementById('gameScorePercent');
  const scoreMsg = document.getElementById('gameScoreMsg');
  const focusMeterBar = document.getElementById('gameFocusMeter');
  const playAgainBtn = document.getElementById('gamePlayAgainBtn');
  const highScoreEl = document.getElementById('gameHighScore');

  if (!canvas || !shootBtn) return;

  const ctx = canvas.getContext('2d');
  let animationId = null;
  let targetFocusPlane = 50;
  let currentFocusPlane = 0;
  let focusSpeed = 0.85;
  let direction = 1;
  let isGameActive = true;

  const savedHigh = localStorage.getItem('fk_focus_highscore') || '0';
  if (highScoreEl) highScoreEl.textContent = `En Yüksek: %${savedHigh} Netlik`;

  function resizeCanvas() {
    canvas.width = canvas.parentElement.clientWidth || 600;
    canvas.height = canvas.parentElement.clientHeight || 360;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const gameSubject = new Image();
  gameSubject.src = 'game-subject.jpg';

  function drawGameFrame() {
    if (!isGameActive) return;

    currentFocusPlane += focusSpeed * direction;
    if (currentFocusPlane >= 100 || currentFocusPlane <= 0) {
      direction *= -1;
    }

    const focusDistance = Math.abs(currentFocusPlane - targetFocusPlane);
    const blurAmount = (focusDistance / 100) * 16;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.filter = `blur(${blurAmount.toFixed(1)}px)`;
    if (gameSubject.complete) {
      const scale = Math.max(canvas.width / gameSubject.width, canvas.height / gameSubject.height);
      const x = (canvas.width - gameSubject.width * scale) / 2;
      const y = (canvas.height - gameSubject.height * scale) / 2;
      ctx.drawImage(gameSubject, x, y, gameSubject.width * scale, gameSubject.height * scale);
    } else {
      ctx.fillStyle = '#14171b';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    ctx.restore();

    if (focusDistance < 12) {
      ctx.save();
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2.5;
      ctx.shadowColor = '#10b981';
      ctx.shadowBlur = 10;

      const boxW = 140, boxH = 140;
      const bx = (canvas.width - boxW) / 2;
      const by = (canvas.height - boxH) / 2;

      ctx.strokeRect(bx, by, boxW, boxH);
      ctx.fillStyle = '#10b981';
      ctx.font = '12px "JetBrains Mono", monospace';
      ctx.fillText('[ ODAK KİLİTLENDİ: %100 NET ]', bx + 2, by - 10);
      ctx.restore();
    }

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 3, 0); ctx.lineTo(canvas.width / 3, canvas.height);
    ctx.moveTo((canvas.width / 3) * 2, 0); ctx.lineTo((canvas.width / 3) * 2, canvas.height);
    ctx.moveTo(0, canvas.height / 3); ctx.lineTo(canvas.width, canvas.height / 3);
    ctx.moveTo(0, (canvas.height / 3) * 2); ctx.lineTo(canvas.width, (canvas.height / 3) * 2);
    ctx.stroke();

    if (focusMeterBar) {
      focusMeterBar.style.width = `${currentFocusPlane}%`;
      focusMeterBar.style.backgroundColor = focusDistance < 10 ? '#10b981' : '#e67e22';
    }

    animationId = requestAnimationFrame(drawGameFrame);
  }

  animationId = requestAnimationFrame(drawGameFrame);

  function captureShot() {
    if (!isGameActive) return;
    isGameActive = false;
    cancelAnimationFrame(animationId);

    playShutterSound();
    if (flashOverlay) {
      flashOverlay.classList.add('flash-active');
      setTimeout(() => flashOverlay.classList.remove('flash-active'), 300);
    }

    const focusDistance = Math.abs(currentFocusPlane - targetFocusPlane);
    const score = Math.max(0, Math.round(100 - (focusDistance * 2.2)));

    let badge = 'FLÛ KARE: ODAK KAÇTI';
    let message = 'Odak halkasını kaçırdın! Obje alan derinliğinin dışına çıktı.';
    let badgeColor = 'text-red-500 border-red-500';

    if (score >= 95) {
      badge = 'KUSURSUZ ODAK: %100 NET';
      message = 'Efsanevi Göz! Jilet gibi keskin bir kare yakaladın.';
      badgeColor = 'text-emerald-500 border-emerald-500';
    } else if (score >= 80) {
      badge = 'PROFESYONEL SİNEMACI';
      message = 'Harika zamanlama! Ticari kalitede netlik ve harika arka plan ayrımı.';
      badgeColor = 'text-amber-500 border-amber-500';
    } else if (score >= 60) {
      badge = 'NOSTALJİK RÜYA ODAK';
      message = 'Hafif yumuşak ama nostaljik ve sinematik bir his yakaladın.';
      badgeColor = 'text-yellow-400 border-yellow-400';
    }

    const prevHigh = parseInt(localStorage.getItem('fk_focus_highscore') || '0', 10);
    if (score > prevHigh) {
      localStorage.setItem('fk_focus_highscore', String(score));
      if (highScoreEl) highScoreEl.textContent = `En Yüksek: %${score} Netlik (YENİ REKOR!)`;
    }

    if (scorePercent) scorePercent.textContent = `%${score}`;
    if (scoreBadge) {
      scoreBadge.textContent = badge;
      scoreBadge.className = `hud-badge font-mono text-xs ${badgeColor}`;
    }
    if (scoreMsg) scoreMsg.textContent = message;
    if (resultCard) resultCard.classList.remove('hidden');
  }

  function resetGame() {
    playDialClick();
    targetFocusPlane = Math.floor(Math.random() * 60) + 20;
    focusSpeed = 0.85 + (Math.random() * 0.35);
    if (resultCard) resultCard.classList.add('hidden');
    isGameActive = true;
    animationId = requestAnimationFrame(drawGameFrame);
  }

  shootBtn.addEventListener('click', captureShot);
  if (playAgainBtn) playAgainBtn.addEventListener('click', resetGame);

  window.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && !e.target.closest('input, textarea, select')) {
      const minigameSection = document.getElementById('minigame');
      if (minigameSection) {
        const rect = minigameSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          e.preventDefault();
          if (isGameActive) {
            captureShot();
          } else if (resultCard && !resultCard.classList.contains('hidden')) {
            resetGame();
          }
        }
      }
    }
  });
}

/* ==========================================================================
   8. Formspree Altyapılı İletişim / Klaket Formu (https://formspree.io/f/xjyvgged)
   ========================================================================== */
function initContactForm() {
  const clapperTop = document.getElementById('clapperTop');
  const form = document.getElementById('contactForm');
  const successState = document.getElementById('contactSuccessState');
  const submitBtn = document.getElementById('contactSubmitBtn');
  const submitText = document.getElementById('contactSubmitText');
  const submitSpinner = document.getElementById('contactSubmitSpinner');
  const errorBox = document.getElementById('contactErrorMessage');
  const errorText = document.getElementById('contactErrorText');
  const resetBtn = document.getElementById('contactResetBtn');

  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xjyvgged';

  if (clapperTop) {
    clapperTop.addEventListener('click', () => {
      playClapperSnap();
      clapperTop.classList.add('clapper-snap');
      setTimeout(() => clapperTop.classList.remove('clapper-snap'), 250);
    });
  }

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      playClapperSnap();

      if (clapperTop) {
        clapperTop.classList.add('clapper-snap');
        setTimeout(() => clapperTop.classList.remove('clapper-snap'), 300);
      }

      // Hata kutusunu gizle
      if (errorBox) errorBox.classList.add('hidden');

      // Buton Yükleme (Loading) Durumu
      if (submitBtn) submitBtn.disabled = true;
      if (submitText) submitText.classList.add('hidden');
      if (submitSpinner) {
        submitSpinner.classList.remove('hidden');
        submitSpinner.classList.add('flex');
      }

      const formData = new FormData(form);

      try {
        const response = await fetch(FORMSPREE_ENDPOINT, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          playFocusBeep();
          form.reset();
          form.classList.add('hidden');
          if (successState) successState.classList.remove('hidden');
        } else {
          const data = await response.json().catch(() => ({}));
          let errorMsg = 'Mesaj gönderilemedi, lütfen tekrar deneyin.';
          if (data && data.errors && data.errors.length > 0) {
            errorMsg = data.errors.map(err => err.message).join(', ');
          }
          throw new Error(errorMsg);
        }
      } catch (err) {
        console.error('Formspree gönderim hatası:', err);
        if (errorBox) {
          if (errorText) errorText.textContent = err.message || 'Mesaj gönderilemedi, lütfen tekrar deneyin.';
          errorBox.classList.remove('hidden');
        }
      } finally {
        // Butonu eski haline döndür
        if (submitBtn) submitBtn.disabled = false;
        if (submitText) submitText.classList.remove('hidden');
        if (submitSpinner) {
          submitSpinner.classList.add('hidden');
          submitSpinner.classList.remove('flex');
        }
        if (window.lucide) window.lucide.createIcons();
      }
    });
  }

  // Yeni Mesaj Gönder Butonu
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      playDialClick();
      if (successState) successState.classList.add('hidden');
      if (form) {
        form.reset();
        form.classList.remove('hidden');
      }
      if (errorBox) errorBox.classList.add('hidden');
    });
  }
}

/* ==========================================================================
   9. Ses Düğmesi
   ========================================================================== */
function initGrainAndSoundToggles() {
  const soundToggleBtn = document.getElementById('soundToggleBtn');
  const soundIcon = document.getElementById('soundToggleIcon');
  const soundLabel = document.getElementById('soundToggleLabel');

  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      if (soundEnabled) {
        playFocusBeep();
        if (soundIcon) soundIcon.setAttribute('data-lucide', 'volume-2');
        if (soundLabel) soundLabel.textContent = 'SES: AÇIK';
        soundToggleBtn.classList.add('hud-badge-active');
      } else {
        if (soundIcon) soundIcon.setAttribute('data-lucide', 'volume-x');
        if (soundLabel) soundLabel.textContent = 'SES: KAPALI';
        soundToggleBtn.classList.remove('hud-badge-active');
      }
      if (window.lucide) window.lucide.createIcons();
    });
  }
}

/* ==========================================================================
   10. Tema Değiştirici (Dark / Light Mode)
   ========================================================================== */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeToggleIcon');
  const themeLabel = document.getElementById('themeToggleLabel');

  const savedTheme = localStorage.getItem('fk_theme') || 'dark';

  function applyTheme(theme) {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
      if (themeIcon) themeIcon.setAttribute('data-lucide', 'moon');
      if (themeLabel) themeLabel.textContent = 'GECE';
      themeToggleBtn?.classList.add('hud-badge-active');
    } else {
      document.documentElement.classList.remove('light');
      if (themeIcon) themeIcon.setAttribute('data-lucide', 'sun');
      if (themeLabel) themeLabel.textContent = 'GÜNDÜZ';
      themeToggleBtn?.classList.remove('hud-badge-active');
    }
    if (window.lucide) window.lucide.createIcons();
  }

  applyTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      playDialClick();
      const isCurrentlyLight = document.documentElement.classList.contains('light');
      const newTheme = isCurrentlyLight ? 'dark' : 'light';
      localStorage.setItem('fk_theme', newTheme);
      applyTheme(newTheme);
    });
  }
}

/* ==========================================================================
   11. Mobil Burger Menü
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const menuIcon = document.getElementById('mobileMenuIcon');
  const overlay = document.getElementById('mobileMenuOverlay');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !overlay) return;

  function toggleMenu(forceClose = false) {
    playDialClick();
    const isOpen = forceClose ? false : !overlay.classList.contains('menu-open');
    if (isOpen) {
      overlay.classList.add('menu-open');
      if (menuIcon) menuIcon.setAttribute('data-lucide', 'x');
      document.body.style.overflow = 'hidden';
    } else {
      overlay.classList.remove('menu-open');
      if (menuIcon) menuIcon.setAttribute('data-lucide', 'menu');
      document.body.style.overflow = '';
    }
    if (window.lucide) window.lucide.createIcons();
  }

  toggleBtn.addEventListener('click', () => toggleMenu());

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggleMenu(true);
    });
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('menu-open')) {
      toggleMenu(true);
    }
  });
}

/* ==========================================================================
   12. Yukarı Çıkma Kısayol Tuşu (Scroll to Top)
   ========================================================================== */
function initScrollToTop() {
  const scrollBtn = document.getElementById('scrollToTopBtn');
  if (!scrollBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollBtn.classList.add('btn-visible');
    } else {
      scrollBtn.classList.remove('btn-visible');
    }
  }, { passive: true });

  scrollBtn.addEventListener('click', () => {
    playDialClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ==========================================================================
   13. Pürüzsüz Kaydırma
   ========================================================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        playDialClick();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}
