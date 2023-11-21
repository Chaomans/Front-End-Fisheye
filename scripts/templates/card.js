export const cardTemplate = (name, media) => {
  const card = document.createElement("div");
  card.classList.add("card");

  // get img src
  let imgsrc = "";
  const path = `/assets/photographers/${name.split(" ")[0]}/`;

  if (media.hasOwnProperty("image")) {
    imgsrc = path + media.image;
  }
  if (media.hasOwnProperty("video")) {
    imgsrc = getImgFromVideo(path + media.video);
  }

  //img
  const imgContainer = document.createElement("div");
  imgContainer.classList.add("imgContainer");
  const img = document.createElement("img");
  img.setAttribute("src", imgsrc);

  const infos = document.createElement("div");
  infos.classList.add("infos");
  const title = document.createElement("p");
  title.classList.add("title");
  title.innerHTML = media.title;
  const likes = document.createElement("p");
  likes.classList.add("likes");
  likes.innerHTML = `${media.likes} <i class="fa-solid fa-heart"></i>`;

  //display
  card.appendChild(imgContainer);
  imgContainer.appendChild(img);
  card.appendChild(infos);
  infos.appendChild(title);
  infos.appendChild(likes);

  return card;
};

const getImgFromVideo = (path) => {
  const video = document.createElement("video");
  video.setAttribute("src", path);
  const canvas = document.createElement("canvas");
  // scale the canvas accordingly
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  console.log(video.videoWidth);
  // draw the video at that frame
  canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
  // convert it to a usable data URL
  return canvas.toDataURL();
};
