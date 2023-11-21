export const notFound = () => {
  const p404 = document.createElement("p");
  p404.classList.add("notFound");
  p404.innerHTML = "404";
  const msg404 = document.createElement("p");
  msg404.classList.add("notFoundMsg");
  msg404.innerHTML = "Désolé, cette page n'existe pas.";

  main.innerHTML = "";
  main.appendChild(p404);
  main.appendChild(msg404);
};
