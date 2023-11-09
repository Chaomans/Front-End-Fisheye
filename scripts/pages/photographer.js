const params = new URLSearchParams(document.location.search);
const id = params.get("id");

async function displayData({ name, city, country, price, tagline }, media) {
  //name
  const h2 = document.querySelector(".name");
  h2.innerHTML = name;

  //location
  const location = document.querySelector(".location");
  location.innerHTML = `${city}, ${country}`;

  //tagline
  const presentation = document.querySelector(".tagline");
  presentation.innerHTML = tagline;
}

async function init() {
  // Récupère les datas des photographes
  const { photographers, media } = await getOnePhotographer(+id);
  displayData(photographers[0], media);
}

init();
