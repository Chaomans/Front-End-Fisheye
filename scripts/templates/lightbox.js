export const lightboxTemplate = () => {
  //container
  const lightbox = document.createElement("div");
  lightbox.classList.add("lightbox");

  //buttons
  const close = document.createElement("button");
  close.classList.add("lightbox_close");
  const next = document.createElement("button");
  next.classList.add("lightbox_next");
  const prev = document.createElement("button");
  prev.classList.add("lightbox_prev");

  //img Container
  const imgDiv = document.createElement("div");
  imgDiv.classList.add("lightbox_imgDiv");
  imgDiv.classList.add("loader");

  // title
  const p = document.createElement("p");

  //construction
  lightbox.appendChild(close);
  lightbox.appendChild(prev);
  lightbox.appendChild(next);
  lightbox.appendChild(imgDiv);
  lightbox.appendChild(p);

  return lightbox;
};
