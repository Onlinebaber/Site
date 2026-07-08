/* ==========================================================================
   ONLINE BARBER — Booking form
   Sends the booking request straight to WhatsApp (same no-backend approach
   as the shop checkout). If you later want automatic calendar bookings,
   see the note in README.md about wiring up a Google Apps Script backend.
   ========================================================================== */

const TIME_SLOTS = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"];
let selectedSlot = null;

function renderSlots() {
  const wrap = document.getElementById("slotsContainer");
  if (!wrap) return;
  wrap.innerHTML = TIME_SLOTS.map(t => `<button type="button" class="slot-btn" data-slot="${t}">${t}</button>`).join("");
  wrap.querySelectorAll(".slot-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      wrap.querySelectorAll(".slot-btn").forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
      selectedSlot = btn.dataset.slot;
    });
  });
}

function handleBookingSubmit(e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const service = document.getElementById("service");
  const serviceLabel = service.options[service.selectedIndex] ? service.options[service.selectedIndex].text : "";
  const date = document.getElementById("date").value;
  const notes = document.getElementById("notes").value.trim();

  if (!name || !phone || !service.value || !date || !selectedSlot) {
    showToast("Please fill in all required fields and pick a time slot");
    return;
  }

  let msg = `Hi Online Barber! I'd like to book an appointment.\n\n`;
  msg += `Name: ${name}\nPhone: ${phone}\nService: ${serviceLabel}\nDate: ${date}\nTime: ${selectedSlot}\n`;
  if (notes) msg += `Notes: ${notes}\n`;

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank");
  showToast("Opening WhatsApp to confirm your booking…");
}

document.addEventListener("DOMContentLoaded", () => {
  renderSlots();
  const form = document.getElementById("bookingForm");
  if (form) form.addEventListener("submit", handleBookingSubmit);

  // set min date to today
  const dateInput = document.getElementById("date");
  if (dateInput) {
    const today = new Date().toISOString().split("T")[0];
    dateInput.setAttribute("min", today);
  }
});
