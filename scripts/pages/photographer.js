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

const sortInputs = document.querySelectorAll("input[name='sortradio']");

sortInputs.forEach((inp) => {
  inp.addEventListener("change", (e) => {
    Array.from(sortlist.getElementsByTagName("li"))
      .sort((a, b) => {
        if (a.firstElementChild.checked) return -1;
        if (b.firstElementChild.checked) return 1;
        return 0;
      })
      .forEach((li) => {
        sortlist.appendChild(li);
      });
    const selected = document.querySelector("input:checked");
    sortMedia(selected.value);
  });

  inp.addEventListener("click", () => {
    toggleSelect();
  });
});

const listitems = document.querySelectorAll("li");

listitems.forEach((li) => {
  li.addEventListener("keydown", (e) => {
    if (["ArrowLeft", "ArrowUp"].includes(e.code)) {
      li.previousElementSibling?.focus();
    }
    if (["ArrowRight", "ArrowDown"].includes(e.code)) {
      li.nextElementSibling?.focus();
    }
    if (["Space", "Enter"].includes(e.code)) {
      //TODO
    }
  });
});

const toggleSelect = () => {
  sortlistdiv.classList.toggle("inactive");
  const arrows = document.querySelectorAll(".arrow");
  arrows.forEach((elem) => elem.classList.toggle("hidden"));
};

const mediaArray = [];

async function displayData({
  name,
  city,
  country,
  price,
  tagline,
  portrait,
  media,
}) {
  //store media
  mediaArray.push(...media);

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
  media
    .sort((a, b) => b.likes - a.likes)
    .forEach((m) => {
      const card = cardTemplate(name, m);
      mediaContainer.appendChild(card);
    });
}

const sortMedia = (filterValue) => {
  const mediaContainer = document.querySelector(".media");
  const media = Array.from(document.querySelectorAll(".card"));
  mediaArray
    .sort((a, b) => {
      switch (filterValue) {
        case "popularity":
          return b.likes - a.likes;
        case "date":
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateA - dateB;
        case "title":
          return a.title.localeCompare(b.title);
      }
    })
    .forEach((m) => {
      mediaContainer.appendChild(media.filter((card) => +card.id === m.id)[0]);
    });
};

async function init() {
  // Récupère les datas des photographes
  const photographer = await getOnePhotographer(+id);
  console.log(photographer);
  if (Object.keys(photographer).length != 0) {
    displayData(photographer);
  }
}

init();
