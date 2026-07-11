/* =========================================================
   Grace Cleaning Services — vanilla JS interactivity
   No frameworks, no build step. Loaded with `defer`.
   ========================================================= */

/* ---------- sticky header on scroll ---------- */
(function stickyHeader() {
  var header = document.getElementById("site-header");
  if (!header) return;
  function onScroll() {
    if (window.scrollY > 20) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
})();

/* ---------- mobile menu ---------- */
(function mobileMenu() {
  var toggle = document.getElementById("menu-toggle");
  var menu = document.getElementById("mobile-menu");
  var icon = document.getElementById("menu-icon");
  if (!toggle || !menu || !icon) return;

  var open = false;
  function setOpen(next) {
    open = next;
    menu.classList.toggle("hidden", !open);
    toggle.setAttribute("aria-expanded", String(open));
    icon.innerHTML = open ? '<use href="#icon-x"></use>' : '<use href="#icon-menu"></use>';
  }

  toggle.addEventListener("click", function () { setOpen(!open); });
  menu.querySelectorAll(".mobile-link").forEach(function (link) {
    link.addEventListener("click", function () { setOpen(false); });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && open) setOpen(false);
  });
})();

/* ---------- FAQ accordion (one open at a time, first open by default) ---------- */
(function faqAccordion() {
  var items = document.querySelectorAll(".faq-item");
  if (!items.length) return;

  function closeAll() {
    items.forEach(function (item) {
      item.classList.remove("open");
      var q = item.querySelector(".faq-question");
      if (q) q.setAttribute("aria-expanded", "false");
    });
  }
  function openItem(item) {
    item.classList.add("open");
    var q = item.querySelector(".faq-question");
    if (q) q.setAttribute("aria-expanded", "true");
  }

  items.forEach(function (item) {
    var question = item.querySelector(".faq-question");
    if (!question) return;
    question.addEventListener("click", function () {
      var isOpen = item.classList.contains("open");
      closeAll();
      if (!isOpen) openItem(item);
    });
  });

  openItem(items[0]);
})();

/* ---------- footer year ---------- */
(function footerYear() {
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();

/* ---------- quote form -> opens a pre-filled email ---------- */
(function quoteForm() {
  var form = document.getElementById("quote-form");
  var status = document.getElementById("quote-status");
  if (!form || !status) return;

  function showStatus(message, isError) {
    status.textContent = message;
    status.style.color = isError ? "#e15555" : "var(--accent)";
    status.classList.remove("hidden");
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var data = Object.fromEntries(new FormData(form).entries());

    var subject = "Quote request from " + (data.name || "website visitor");

    var body =
      "Name: " + (data.name || "-") +
      "\nPhone: " + (data.phone || "-") +
      "\nEmail: " + (data.email || "-") +
      "\nProperty Type: " + (data.property_type || "-") +
      "\nService Needed: " + (data.service_type || "-") +
      "\nMessage: " + (data.message || "-");

    var mailtoLink =
      "mailto:gracecleaningservices@gmail.com" +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body);

    window.location.href = mailtoLink;

    showStatus(
      "Opening your email app to send this through — if nothing opens, WhatsApp or call us directly.",
      false
    );
  });
})();
