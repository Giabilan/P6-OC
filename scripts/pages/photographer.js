let name = "";
let photographerPrice = 0;

function getPhotographerIdFromUrl() {
  const searchParams = new URLSearchParams(window.location.search);
  const id = searchParams.get("id");
  return id;
}

/**
 * Charge le fichier JSON contenant la liste des photographes.
 * On retourne ici directement le tableau de photographes.
 */
async function getPhotographer(id) {
  let response = await fetch("../data/photographers.json");
  let data = await response.json();
  console.log(data);
  const photographer = data.photographers.find((p) => p.id == id);
  return photographer;
}

function displayPhotographerData(photographer) {
  const header = document.querySelector(".photograph-header");
  const photographerModel = photographerTemplate(photographer);
  const userHeaderDom = photographerModel.getHeaderUserDOM();
  name = photographerModel.name;
  photographerPrice = photographer.price;
  header.appendChild(userHeaderDom);
}

async function init() {
  const id = getPhotographerIdFromUrl();

  const photographer = await getPhotographer(id);

  if (photographer) {
    // Si trouvé, afficher les informations du photographe
    displayPhotographerData(photographer, name);
    // Afficher les médias du photographe
    await displayPhotographerMedia(id, name);
    // Ajouter cet événement après avoir initialisé la page
    document
      .getElementById("sorting-select")
      .addEventListener("change", (e) => {
        displayPhotographerMedia(id, name, e.target.value);
      });

    updateTotalLikes();
  } else {
    // Sinon, afficher une erreur dans la console (ou gérer le cas d'erreur)
    console.error("Photographe non trouvé pour l'ID :", id);
  }
}
// Fonction pour mettre à jour le total des likes
function updateTotalLikes() {
  const likesCounts = document.querySelectorAll(".likes-count");
  let total = 0;
  console.log(likesCounts);
  likesCounts.forEach((count) => {
    total += parseInt(count.textContent);
  });

  document.getElementById("total-likes").textContent = total;

  // Ajouter le prix du photographe
  const priceElement = document.getElementById("photographer-price");
  if (priceElement) {
    priceElement.textContent = photographerPrice + "€ / jour";
  } else {
    // Créer l'élément de prix s'il n'existe pas encore
    const likesCounter = document.querySelector(".total-likes-counter");
    if (likesCounter) {
      const priceDiv = document.createElement("div");
      priceDiv.classList.add("photographer-price-display");

      const priceText = document.createElement("span");
      priceText.id = "photographer-price";
      priceText.textContent = photographerPrice + "€ / jour";

      priceDiv.appendChild(priceText);

      // Ajouter le prix juste après le compteur de likes
      likesCounter.appendChild(priceDiv);
    }
  }
}

init();
