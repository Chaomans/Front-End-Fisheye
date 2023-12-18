export const cardTemplate = (name, media) => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.setAttribute("tabIndex", "0");
  card.setAttribute("id", media.id);

  // get img src
  let imgsrc = "";
  let isvideo = false;
  const path = `./assets/photographers/${name.split(" ")[0]}/`;

  if (media.hasOwnProperty("image")) {
    imgsrc = path + media.image;
  }
  if (media.hasOwnProperty("video")) {
    imgsrc = path + media.video;
    isvideo = true;
  }

  //img
  const imgContainer = document.createElement("div");
  imgContainer.title = `Voir ${media.title}`;
  imgContainer.classList.add("imgContainer");
  let img;
  if (!isvideo) {
    img = document.createElement("img");
    img.setAttribute("src", imgsrc);
    img.setAttribute("alt", `photo named as ${media.title}`);
  }
  if (isvideo) {
    img = document.createElement("video");
    img.removeAttribute("controls");
    img.setAttribute("width", "350px");
    img.setAttribute("height", "350px");
    const src = document.createElement("source");
    src.setAttribute("src", imgsrc);
    src.setAttribute("type", `video/${imgsrc.split(".").slice(-1)}`);
    img.appendChild(src);
  }

  const infos = document.createElement("div");
  infos.classList.add("infos");
  const title = document.createElement("p");
  title.classList.add("title");
  title.innerHTML = media.title;
  const likes = document.createElement("p");
  likes.classList.add("likes");
  likes.innerHTML = `<span class="likesCount">${media.likes}</span> <i class="fa-regular fa-heart" title="J'aime"></i> <i class="fa-solid fa-heart hidden" title="Je n'aime plus"></i>`;

  //construction
  card.appendChild(imgContainer);
  imgContainer.appendChild(img);
  card.appendChild(infos);
  infos.appendChild(title);
  infos.appendChild(likes);

  //events
  card.addEventListener("keydown", (e) => {
    if (["ArrowLeft", "ArrowUp"].includes(e.code)) {
      card.previousElementSibling?.focus();
    }
    if (["ArrowRight", "ArrowDown"].includes(e.code)) {
      card.nextElementSibling?.focus();
    }
    if (["Enter"].includes(e.code)) {
      imgContainer.click();
    }
  });

  const likedIcon = likes.querySelector(".fa-solid");
  const dislikedIcon = likes.querySelector(".fa-regular");

  likedIcon.addEventListener("click", () => {
    fadeLikeIcons(likedIcon, dislikedIcon);
    const likesCount = card.querySelector(".likesCount");
    const allLikes = document.querySelector("#allLikesCount");
    likesCount.innerHTML = +likesCount.innerHTML - 1;
    allLikes.innerHTML = +allLikes.innerHTML - 1;
  });

  dislikedIcon.addEventListener("click", () => {
    fadeLikeIcons(dislikedIcon, likedIcon);
    const likesCount = card.querySelector(".likesCount");
    const allLikes = document.querySelector("#allLikesCount");
    likesCount.innerHTML = +likesCount.innerHTML + 1;
    allLikes.innerHTML = +allLikes.innerHTML + 1;
  });

  /**
   *
   * @param {Element} target
   */
  const fadeLikeIcons = (toHide, toShow) => {
    toHide.classList.add("fadeOutLike");
    setTimeout(() => {
      toHide.classList.add("hidden");
      toHide.classList.remove("fadeOutLike");
      toShow.classList.remove("hidden");
    }, 150);
  };

  img.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });

  return card;
};
