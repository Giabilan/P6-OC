async function getPhotographers() {
  let response = await fetch("../data/photographers.json");
  let data = await response.json();

  return data;
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  const { photographers } = await getPhotographers();
  // pour la page photographers
  //   const { media } = await getPhotographers();
  displayData(photographers);
}

init();
