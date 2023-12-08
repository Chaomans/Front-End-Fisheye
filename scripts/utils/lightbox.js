import { lightboxTemplate } from "../templates/lightbox.js";

export class Lightbox {
  static init() {
    const cards = document.querySelectorAll(".card");
    cards.forEach((card, i) => {
      card.addEventListener("click", () => {
        const media = card.firstElementChild.firstElementChild;
        if (media.tagName === "VIDEO") {
          new Lightbox(media.firstElementChild.src, i, true);
          return;
        }
        new Lightbox(media.src, i);
      });
    });
  }

  /**
   *
   * @param {string} src path of the media
   */
  constructor(src, index, isvideo = false) {
    this.index = index;
    const lightbox = lightboxTemplate();
    document.body.appendChild(lightbox);
    this.lightbox = lightbox;

    if (isvideo) {
      this.loadVideo(src);
    }
    if (!isvideo) {
      this.loadImage(src);
    }

    // event
    this.onKeyUp = this.onKeyUp.bind(this);
    const close = document.querySelector(".lightbox_close");
    close.addEventListener("click", () => {
      this.close(lightbox);
    });
    const next = document.querySelector(".lightbox_next");
    next.addEventListener("click", () => {
      this.next();
    });

    const prev = document.querySelector(".lightbox_prev");
    prev.addEventListener("click", () => {
      this.prev();
    });

    window.addEventListener("keyup", this.onKeyUp);
  }

  /**
   *
   * @param {HTMLDivElement} lightbox
   */
  close(lightbox) {
    lightbox.classList.add("fadeOut");
    setTimeout(() => {
      lightbox.remove();
      window.removeEventListener("keyup", this.onKeyUp);
    }, 500);
  }

  onKeyUp(e) {
    if (e.code === "Escape") {
      this.close(this.lightbox);
    }
    if (e.code === "ArrowRight") {
      this.next();
    }
    if (e.code === "ArrowLeft") {
      this.prev();
    }
  }

  loadVideo(src) {
    const imgDiv = document.querySelector(".lightbox_imgDiv");
    const video = document.createElement("video");
    const source = document.createElement("source");
    source.src = src;
    video.autoplay = true;
    video.controls = true;
    video.appendChild(source);
    video.load();
    video.onloadeddata = () => {
      imgDiv.classList.remove("loader");
      imgDiv.appendChild(video);
    };
  }

  loadImage(src) {
    const imgDiv = document.querySelector(".lightbox_imgDiv");
    const image = document.createElement("img");
    image.src = src;
    image.onload = () => {
      imgDiv.classList.remove("loader");
      imgDiv.appendChild(image);
    };
  }

  next() {
    const media = this.getAllMediaSrc();
    const nextIndex = (this.index + 1) % media.length;
    const imgDiv = document.querySelector(".lightbox_imgDiv");
    imgDiv.innerHTML = "";
    imgDiv.classList.add("loader");
    if (media[nextIndex][1]) {
      this.loadVideo(media[nextIndex][0]);
      this.index = nextIndex;
      return;
    }
    this.loadImage(media[nextIndex][0]);
    this.index = nextIndex;
  }

  prev() {
    const media = this.getAllMediaSrc();
    const prevIndex = this.index === 0 ? media.length - 1 : this.index - 1;
    const imgDiv = document.querySelector(".lightbox_imgDiv");
    imgDiv.innerHTML = "";
    imgDiv.classList.add("loader");
    if (media[prevIndex][1]) {
      this.loadVideo(media[prevIndex][0]);
      this.index = prevIndex;
      return;
    }
    this.loadImage(media[prevIndex][0]);
    this.index = prevIndex;
  }

  /**
   *
   * @returns {string[]} List of all media src
   */
  getAllMediaSrc() {
    const cards = document.querySelectorAll(".card");
    const srcs = [];
    cards.forEach((card) => {
      const media = card.firstElementChild.firstElementChild;
      if (media.tagName === "VIDEO") {
        srcs.push([media.firstElementChild.src, true]);
        return;
      }
      srcs.push([media.src, false]);
    });
    return srcs;
  }
}
