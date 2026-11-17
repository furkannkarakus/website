// --- İLETİŞİM BİLGİLERİNİ BURADAN GÜNCELLE ---
const INSTAGRAM_URL = "https://instagram.com/furkankarakuss0";
const EMAIL_ADDRESS = "info@furkankarakus.com";

document.addEventListener("DOMContentLoaded", () => {
  const cayButon = document.querySelector(".cay-buton");
  const igLinks = document.querySelectorAll("[data-instagram-link]");
  const emailLink = document.getElementById("email-link");
  const zarfButon = document.getElementById("zarf-buton");
  const kopyalaBtn = document.getElementById("kopyala-btn");

  igLinks.forEach((el) => {
    el.href = INSTAGRAM_URL;
  });

  if (emailLink) {
    emailLink.href = `mailto:${EMAIL_ADDRESS}`;
    emailLink.textContent = EMAIL_ADDRESS;
  }

  // --- SES EFEKTLERİ ---
  // 1. Zarf (Kağıt sesi): Sesi yumuşatıldı (0.30) ve baştaki sessizlik atlandı
  const zarfSes = new Audio("zarf-ses.mp3");
  zarfSes.preload = "auto";
  let zarfTimer = null;

  function zarfSesiCal() {
    clearTimeout(zarfTimer);
    try {
      zarfSes.pause();
      zarfSes.currentTime = 1.83;
      zarfSes.volume = 0.30;
      const p = zarfSes.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
      zarfTimer = setTimeout(() => {
        zarfSes.pause();
      }, 820);
    } catch {}
  }

  // 2. Çay Bardağı: Orijinal kaydın desibeli düşük olduğu için Web Audio GainNode ile ~3x güçlendirildi
  const caySes = new Audio("cay-ses.ogg");
  caySes.preload = "auto";
  let cayTimer = null;
  let cayFadeTimer = null;
  let audioCtx = null;
  let cayGain = null;

  function baglaCayAmfi() {
    if (audioCtx) {
      if (audioCtx.state === "suspended") audioCtx.resume();
      return;
    }
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      audioCtx = new Ctx();
      const source = audioCtx.createMediaElementSource(caySes);
      cayGain = audioCtx.createGain();
      cayGain.gain.value = 3.0; // %300 ses güçlendirme
      source.connect(cayGain);
      cayGain.connect(audioCtx.destination);
    } catch {}
  }

  function caySesiCal() {
    baglaCayAmfi();
    clearTimeout(cayTimer);
    clearInterval(cayFadeTimer);
    try {
      caySes.pause();
      caySes.currentTime = 0.42;
      caySes.playbackRate = 1.12;
      caySes.volume = 1.0;
      if (cayGain) cayGain.gain.value = 3.0;
      const p = caySes.play();
      if (p && typeof p.catch === "function") p.catch(() => {});

      // Kısa ve yumuşak bitiş
      cayTimer = setTimeout(() => {
        cayFadeTimer = setInterval(() => {
          if (caySes.volume > 0.15) {
            caySes.volume = Math.max(0, caySes.volume - 0.18);
          } else {
            clearInterval(cayFadeTimer);
            caySes.pause();
          }
        }, 25);
      }, 580);
    } catch {}
  }

  // Tarayıcı otomatik ses kısıtlamasını ilk tıklama/dokunuşta sessizce aç
  let sesKilidiAcildi = false;
  function sesKilidiniAc() {
    if (sesKilidiAcildi) return;
    sesKilidiAcildi = true;
    baglaCayAmfi();
    [zarfSes, caySes].forEach((s) => {
      s.muted = true;
      const p = s.play();
      if (p && typeof p.then === "function") {
        p.then(() => {
          s.pause();
          s.muted = false;
        }).catch(() => {
          s.muted = false;
        });
      } else {
        s.muted = false;
      }
    });
  }
  window.addEventListener("pointerdown", sesKilidiniAc, { once: true });
  window.addEventListener("keydown", sesKilidiniAc, { once: true });

  if (cayButon) {
    cayButon.addEventListener("mouseenter", caySesiCal);
  }

  if (zarfButon) {
    zarfButon.addEventListener("mouseenter", zarfSesiCal);

    // Mobilde / dokunmatikte zarfa tıklayarak açıp kapatma + ses
    zarfButon.addEventListener("click", (e) => {
      if (e.target.closest(".mail-kutu")) return;
      const aciliyor = !zarfButon.classList.contains("acik");
      zarfButon.classList.toggle("acik");
      if (aciliyor) zarfSesiCal();
    });

    zarfButon.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        zarfButon.classList.toggle("acik");
        zarfSesiCal();
      }
    });
  }

  // Dışarı tıklayınca zarfı kapat
  document.addEventListener("click", (e) => {
    if (zarfButon && !zarfButon.contains(e.target)) {
      zarfButon.classList.remove("acik");
    }
  });

  // E-postayı panoya kopyalama
  if (kopyalaBtn) {
    kopyalaBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(EMAIL_ADDRESS);
        kopyalaBtn.textContent = "Kopyalandı!";
        setTimeout(() => {
          kopyalaBtn.textContent = "Kopyala";
        }, 1800);
      } catch {
        window.location.href = `mailto:${EMAIL_ADDRESS}`;
      }
    });
  }
});
