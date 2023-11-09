const dataURL =
  "https://raw.githubusercontent.com/Chaomans/Front-End-Fisheye/main/data/photographers.json";

async function getPhotographers() {
  try {
    const data = await fetch(dataURL, {
      method: "GET",
    });
    if (!data.ok) {
      throw new Error("Fetch response not OK");
    }
    const photographers = await data.json();
    return photographers;
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function getOnePhotographer(id) {
  try {
    const data = await fetch(dataURL, {
      method: "GET",
    });
    if (!data.ok) {
      throw new Error("Fetch response not OK");
    }
    const photographers = await data.json();
    photographers.photographers = photographers.photographers.filter(
      (p) => p.id === id
    );
    photographers.media = photographers.media.filter(
      (m) => m.photographerId === id
    );
    return photographers;
  } catch (error) {
    console.error(error);
    return [];
  }
}
