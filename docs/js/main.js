/* ==========================================================
   STAY STRUNG — site script
   ========================================================== */

/* ----------------------------------------------------------
   BOOKING SETUP
   Leave FORM_ENDPOINT empty and the booking form opens the
   customer's email app with everything filled in, addressed to you.

   To get bookings straight to your inbox instead (free, no email app
   needed): make a free form at https://formspree.io, copy the
   endpoint URL it gives you (looks like https://formspree.io/f/abcdwxyz),
   and paste it below.
   ---------------------------------------------------------- */
const FORM_ENDPOINT = "https://formspree.io/f/xqpajnlr";
const BOOKING_EMAIL = "staystrungtennis@gmail.com";

/* ---------- mobile nav ---------- */
const toggle = document.querySelector(".nav__toggle");
const links = document.querySelector(".nav__links");
if (toggle && links) {
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  links.querySelectorAll("a").forEach(a => a.addEventListener("click", () => links.classList.remove("open")));
}

/* ---------- remember where a visitor came from (flyer / postcard QR) ---------- */
const params = new URLSearchParams(location.search);
try {
  if (params.get("src")) sessionStorage.setItem("ss_src", params.get("src"));
} catch (e) {}
function source() {
  try { return sessionStorage.getItem("ss_src") || "website"; } catch (e) { return "website"; }
}

/* ---------- booking form ---------- */
const form = document.getElementById("booking-form");
if (form) {
  // Pre-select a service from the link, e.g. index.html?service=session#book
  const svc = params.get("service");
  if (svc) {
    const radio = form.querySelector(`input[name="service"][value="${svc}"]`);
    if (radio) radio.checked = true;
  }
  const srcField = form.querySelector('input[name="source"]');
  if (srcField) srcField.value = source();

  // Don't allow booking dates in the past
  const date = form.querySelector('input[type="date"]');
  if (date) date.min = new Date().toISOString().split("T")[0];

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    if (srcField) data.set("source", source());

    if (FORM_ENDPOINT) {
      const btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      try {
        const res = await fetch(FORM_ENDPOINT, { method: "POST", body: data, headers: { Accept: "application/json" } });
        if (!res.ok) throw new Error("bad response");
        form.classList.add("sent");
      } catch (err) {
        btn.disabled = false;
        alert("Something went wrong sending that. Email us at " + BOOKING_EMAIL + " and we'll get you strung.");
      }
      return;
    }

    // No endpoint yet → open an email with everything filled in
    const labels = {
      service: "Service", name: "Name", email: "Email", phone: "Phone",
      racquets: "Racquets", racquet_model: "Racquet(s)", strings: "Strings",
      tension: "Tension", handoff: "Drop-off / pickup", date: "Preferred date",
      location: "Area / court", notes: "Notes", source: "Found us via"
    };
    const lines = [];
    for (const [k, v] of data.entries()) if (v && labels[k]) lines.push(`${labels[k]}: ${v}`);
    const subject = `Booking request: ${data.get("service") || "stringing"} (${data.get("name") || ""})`;
    location.href = `mailto:${BOOKING_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
    form.classList.add("sent");
  });
}
