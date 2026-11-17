// --- İLETİŞİM BİLGİLERİNİ BURADAN GÜNCELLE ---
const INSTAGRAM_URL = "https://instagram.com/furkankarakuss0";
const EMAIL_ADDRESS = "info@furkankarakus.com";

document.addEventListener("DOMContentLoaded", () => {
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

  // Mobilde / dokunmatikte zarfa tıklayarak açıp kapatma
  if (zarfButon) {
    zarfButon.addEventListener("click", (e) => {
      if (e.target.closest(".mail-kutu")) return;
      zarfButon.classList.toggle("acik");
    });

    zarfButon.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        zarfButon.classList.toggle("acik");
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
