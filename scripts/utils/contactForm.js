export function displayModal() {
  const modal = document.getElementById("contact_modal");
  document.addEventListener("keyup", countChar, true);
  modal.classList.remove("hidden");
}

export function closeModal() {
  const modal = document.getElementById("contact_modal");
  document.removeEventListener("keyup", countChar, true);
  modal.classList.add("hidden");
}

const countChar = () => {
  const textarea = document.querySelector("textarea");
  count.innerText = textarea.value.replace(/[- ]/g, "").length;
};
