import { getOnePhotographer } from "../utils/getPhotographers.js";
import { displayModal, closeModal } from "../utils/contactForm.js";
import { cardTemplate } from "../templates/card.js";

const params = new URLSearchParams(document.location.search);
const id = params.get("id");

const contactButton = document.querySelector(".contact_button");
contactButton.addEventListener("click", () => {
  displayModal();
});

const closeImg = document.querySelector(".modal img");
closeImg.addEventListener("click", () => {
  closeModal();
});

async function displayData({
  name,
  city,
  country,
  price,
  tagline,
  portrait,
  media,
}) {
  //name
  const h2 = document.querySelector(".name");
  h2.innerHTML = name;

  //location
  const location = document.querySelector(".location");
  location.innerHTML = `${city}, ${country}`;

  //tagline
  const presentation = document.querySelector(".tagline");
  presentation.innerHTML = tagline;

  //photo
  const imgdiv = document.querySelector(".photographer-img");
  const img = document.createElement("img");
  img.setAttribute(
    "src",
    `/assets/photographers/Photographers_ID_Photos/${portrait}`
  );
  imgdiv.appendChild(img);

  // stats
  const allLikes = document.querySelector(".stats .likes");
  allLikes.innerHTML = `${media.reduce((acc, media) => acc + media.likes, 0)} ${
    allLikes.innerHTML
  }`;

  const pricing = document.querySelector(".stats .price");
  pricing.innerHTML = `${price}€ / jour`;

  //all media
  const mediaContainer = document.querySelector(".media");
  media.forEach((m) => {
    const card = cardTemplate(name, m);
    mediaContainer.appendChild(card);
  });
}

async function init() {
  // Récupère les datas des photographes
  const photographer = await getOnePhotographer(+id);
  console.log(photographer);
  if (Object.keys(photographer).length != 0) {
    displayData(photographer);
  }
}

init();
