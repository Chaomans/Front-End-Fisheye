import { getOnePhotographer } from "../utils/getPhotographers.js";
import { displayModal, closeModal } from "../utils/contactForm.js";
import { cardTemplate } from "../templates/card.js";
import { Lightbox } from "../utils/lightbox.js";

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
  contactName.innerHTML = name;

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
    `assets/photographers/Photographers_ID_Photos/${portrait}`
  );
  imgdiv.appendChild(img);

  // stats
  const allLikes = document.querySelector(".stats .likes");
  allLikes.innerHTML = `<span id="allLikesCount">${media.reduce(
    (acc, media) => acc + media.likes,
    0
  )}</span> ${allLikes.innerHTML}`;

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
          const card_a = media.filter((card) => +card.id === a.id)[0];
          const card_b = media.filter((card) => +card.id === b.id)[0];
          const likes_a = card_a.querySelector(".likesCount");
          const likes_b = card_b.querySelector(".likesCount");
          return Number(likes_b.innerHTML) - Number(likes_a.innerHTML);
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

const formfields = [
  ...document.querySelectorAll(".formData input"),
  document.querySelector("textarea"),
];
const formDataAll = document.querySelectorAll(".formData");
const errorMessage = (id) => {
  switch (id) {
    case "firstname":
      return "Au moins deux charactères";
    case "lastname":
      return "Au moins deux charactères";
    case "email":
      return "exemple: 'dupont.jean@mail.com'.";
    case "message":
      return "Au moins 20 charactères";
    default:
      return "not valid.";
  }
};

// validation function
const isValid = (toValidate, value) => {
  switch (toValidate) {
    case "firstname":
      // at least 2 letters
      return value.replace(/[- ]/g, "").length >= 2;
    case "lastname":
      // at least 2 letters
      return value.replace(/[- ]/g, "").length >= 2;
    case "email":
      const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (!regex.test(value)) return false;

      // avoiding nonsense ---@--.--
      let isEmail = true;
      const emailParts = [
        value.split("@")[0] ?? "",
        ...(value?.split("@")[1].split(".") ?? ""),
      ];
      emailParts.forEach((part) => {
        if (!/[a-z0-9]/i.test(part)) isEmail = false;
      });
      return isEmail;
    case "message":
      return value.replace(/[- ]/g, "").length >= 20;
    case "data":
      for (const [k, v] of value.entries()) {
        if (!isValid(k, v)) return false;
      }
      return true;
    default:
      break;
  }
};

// Display message if invalid
const invalid = (i, msg) => {
  formDataAll[i].setAttribute("data-error", msg);
  formDataAll[i].setAttribute("data-error-visible", "true");
};

// Remove error message if valid
const valid = (i) => {
  formDataAll[i].removeAttribute("data-error");
  formDataAll[i].removeAttribute("data-error-visible");
};

const sendBtn = document.querySelector(".send");

formfields.forEach((elem, i) => {
  elem.addEventListener("change", (e) => {
    const btn = document.querySelector(".send");
    if (!isValid(e.target.id, e.target.value)) {
      invalid(i, errorMessage(e.target.id));
      btn.disabled = true;
      return;
    }
    valid(i);
    const data = new FormData(contactForm, sendBtn);
    if (isValid("data", data)) {
      btn.disabled = false;
    }
  });
});

sendBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const data = new FormData(contactForm, sendBtn);
  if (!isValid("data", data)) return;
  console.log("Data send:");
  const dataToLog = {};
  for (const [k, v] of data.entries()) {
    dataToLog[k] = v;
  }
  console.table(dataToLog);
  contactForm.reset();
  sendBtn.disabled = true;
  closeModal();
});

async function init() {
  const params = new URLSearchParams(document.location.search);
  const id = params.get("id");
  // Récupère les datas des photographes
  const photographer = await getOnePhotographer(+id);
  if (Object.keys(photographer).length != 0) {
    displayData(photographer);
    Lightbox.init();
  }
}

init();
