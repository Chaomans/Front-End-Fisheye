export function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.classList.remove("hidden");
}

export function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.classList.add("hidden");
}
