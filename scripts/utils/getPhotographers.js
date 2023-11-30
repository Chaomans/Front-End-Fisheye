import { notFound } from "../templates/404.js";
const dataURL = "../../../data/photographers.json";

export async function getPhotographers() {
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

export async function getOnePhotographer(id) {
  try {
    const res = await fetch(dataURL, {
      method: "GET",
    });
    if (!res.ok) {
      throw new Error("Fetch response not OK");
    }
    const data = await res.json();
    const photographer = data.photographers.filter((p) => p.id === id)[0] ?? {};
    if (!photographer.hasOwnProperty("id")) {
      notFound();
      throw new Error(`Photographer with id ${id} does not exist`);
    }
    photographer.media = data.media.filter((m) => m.photographerId === id);
    return photographer;
  } catch (error) {
    console.error(error);
    return {};
  }
}
