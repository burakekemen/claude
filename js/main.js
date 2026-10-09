// Denge Marin – sayfa etkileşimleri
(function () {
  "use strict";

  var WHATSAPP_NUMBER = "905332271207";
  var doc = document.documentElement;
  doc.classList.add("js");

  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");

  // Kaydırınca header arka planı
  function onScroll() {
    header.classList.toggle("scrolled", window.scrollY > 40);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobil menü
  function setMenu(open) {
    document.body.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Menüyü kapat" : "Menüyü aç");
    document.body.style.overflow = open ? "hidden" : "";
  }
  toggle.addEventListener("click", function () {
    setMenu(!document.body.classList.contains("menu-open"));
  });
  nav.addEventListener("click", function (e) {
    if (e.target.closest("a")) setMenu(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setMenu(false);
  });

  // Kaydırdıkça belirme + aktif menü bağlantısı
  var reveals = document.querySelectorAll(".reveal");
  var navLinks = nav.querySelectorAll('a[href^="#"]');

  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    // Aynı satırdaki öğeler sırayla gelsin
    reveals.forEach(function (el) {
      var siblings = Array.prototype.filter.call(el.parentElement.children, function (c) {
        return c.classList.contains("reveal");
      });
      var index = siblings.indexOf(el);
      if (index > 0) el.style.transitionDelay = Math.min(index, 6) * 80 + "ms";
      revealObserver.observe(el);
    });

    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (link) {
          link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });

    navLinks.forEach(function (link) {
      var target = document.querySelector(link.getAttribute("href"));
      if (target) sectionObserver.observe(target);
    });
  } else {
    reveals.forEach(function (el) { el.classList.add("visible"); });
  }

  // assets/img altına konan görselleri otomatik kullan
  function loadIfExists(src, onLoad) {
    var img = new Image();
    img.onload = function () { onLoad(img); };
    img.src = src;
  }

  document.querySelectorAll(".service-card[data-img]").forEach(function (card) {
    loadIfExists(card.getAttribute("data-img"), function (img) {
      img.className = "service-photo";
      img.alt = card.querySelector("h3").textContent;
      img.loading = "lazy";
      card.insertBefore(img, card.firstChild);
      card.classList.add("has-photo");
    });
  });

  document.querySelectorAll(".brand-grid li[data-logo]").forEach(function (item) {
    loadIfExists(item.getAttribute("data-logo"), function (img) {
      img.alt = item.textContent.trim() + " logosu";
      item.textContent = "";
      item.appendChild(img);
    });
  });

  // İletişim formu → WhatsApp mesajı
  var form = document.getElementById("contact-form");
  var errorBox = document.getElementById("form-error");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var data = new FormData(form);
    var name = (data.get("name") || "").trim();
    var phone = (data.get("phone") || "").trim();
    var message = (data.get("message") || "").trim();

    if (!name || !phone || !message) {
      errorBox.hidden = false;
      (name ? (phone ? form.message : form.phone) : form.name).focus();
      return;
    }
    errorBox.hidden = true;

    var lines = [
      "Merhaba, web sitenizden yazıyorum.",
      "",
      "Ad Soyad: " + name,
      "Telefon: " + phone
    ];
    var boat = (data.get("boat") || "").trim();
    if (boat) lines.push("Tekne: " + boat);
    lines.push("Konu: " + data.get("topic"), "", message);

    var url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(lines.join("\n"));
    window.open(url, "_blank", "noopener");
  });

  document.getElementById("year").textContent = new Date().getFullYear();
})();
