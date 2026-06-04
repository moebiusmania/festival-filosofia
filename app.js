function toggle(id) {
  document.querySelectorAll(".ff-section").forEach((s) => {
    const isOpen = s.classList.contains("open");
    const shouldOpen = s.dataset.id === id && !isOpen;
    s.classList.toggle("open", shouldOpen);
    const btn = s.querySelector(".ff-section-header");
    if (btn) btn.setAttribute("aria-expanded", shouldOpen);
  });
}

const ta = document.getElementById("ff-notes");
try {
  const v = localStorage.getItem("ff2026-notes");
  if (v) ta.value = v;
} catch (e) {}

ta.addEventListener("input", () => {
  try {
    localStorage.setItem("ff2026-notes", ta.value);
  } catch (e) {}
});
