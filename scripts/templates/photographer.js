export function photographerTemplate(data) {
  const { name, portrait, id, city, country, tagline, price } = data;

  const picture = `assets/photographers/Photographers_ID_Photos/${portrait}`;

  function getUserCardDOM() {
    /* CREATION */

    // article
    const article = document.createElement("article");
    article.title = `Voir la page de ${name}`;
    article.setAttribute("tabindex", "0");

    // img
    const portraitContainer = document.createElement("div");
    portraitContainer.classList.add("portraitContainer");
    const img = document.createElement("img");
    img.setAttribute("src", picture);

    // h2
    const h2 = document.createElement("h2");
    h2.textContent = name;

    // infos
    const infos = document.createElement("div");
    infos.classList.add("infos");

    // location
    const location = document.createElement("p");
    location.classList.add("location");
    location.innerHTML = `${city}, ${country}`;

    // tagline
    const presentation = document.createElement("p");
    presentation.classList.add("tagline");
    presentation.innerHTML = tagline;

    // price
    const pricePerDay = document.createElement("p");
    pricePerDay.classList.add("price");
    pricePerDay.innerHTML = `${price}€/jour`;

    /* CONSTRUCTION */
    article.appendChild(portraitContainer);
    portraitContainer.appendChild(img);
    article.appendChild(h2);
    article.appendChild(infos);
    infos.appendChild(location);
    infos.appendChild(presentation);
    infos.appendChild(pricePerDay);

    article.addEventListener("click", (e) => {
      // const baseURL = "https://chaomans.github.io/Front-End-Fisheye/";
      window.location.href = `./photographer.html?id=${id}`;
    });

    article.addEventListener("keydown", (e) => {
      if (e.key === "enter") {
      }
    });

    return article;
  }
  return { name, picture, getUserCardDOM };
}
