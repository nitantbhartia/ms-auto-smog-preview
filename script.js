(function () {
  var PHONE = "+17605363202";
  var root = document.documentElement;
  function applyLang(lang) {
    root.setAttribute("data-lang", lang);
    root.lang = lang;
    document.querySelectorAll("[data-en]").forEach(function (el) {
      var v = el.getAttribute("data-" + lang);
      if (v != null) el.textContent = v;
    });
    document.querySelectorAll("[data-en-placeholder]").forEach(function (el) {
      var v = el.getAttribute("data-" + lang + "-placeholder");
      if (v != null) el.setAttribute("placeholder", v);
    });
    document.querySelectorAll(".lang button").forEach(function (btn) {
      btn.setAttribute("aria-pressed", btn.getAttribute("data-set") === lang ? "true" : "false");
    });
    try { localStorage.setItem("msauto-lang", lang); } catch (e) {}
  }
  document.querySelectorAll(".lang button").forEach(function (btn) {
    btn.addEventListener("click", function () { applyLang(btn.getAttribute("data-set")); });
  });
  var saved = null;
  try { saved = localStorage.getItem("msauto-lang"); } catch (e) {}
  applyLang(saved === "es" ? "es" : "en");
  var form = document.getElementById("job-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = (form.elements.name.value || "").trim();
      var need = (form.elements.need.value || "").trim();
      var err = document.getElementById("job-err");
      if (!name || !need) { if (err) err.hidden = false; return; }
      if (err) err.hidden = true;
      var body = "MS Auto & Smog job\nName: " + name + "\nNeed: " + need;
      window.location.href = "sms:" + PHONE + "?body=" + encodeURIComponent(body);
    });
  }
  var printBtn = document.getElementById("print-card");
  if (printBtn) printBtn.addEventListener("click", function () { window.print(); });
})();
