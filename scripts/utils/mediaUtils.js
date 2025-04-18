// Fonction pour récupérer les médias d'un photographe
async function getPhotographerMedia(photographerId) {
  try {
    const response = await fetch("../data/photographers.json");
    const data = await response.json();
    return data.media.filter(
      (media) => media.photographerId === parseInt(photographerId)
    );
  } catch (error) {
    console.error("Erreur lors de la récupération des médias:", error);
    return [];
  }
}

// Fonction pour afficher les médias du photographe
async function displayPhotographerMedia(
  photographerId,
  photographerName,
  sortBy = "title"
) {
  const mediaSection =
    document.querySelector(".photographer-media") ||
    document.createElement("section");

  if (!mediaSection.classList.contains("photographer-media")) {
    mediaSection.classList.add("photographer-media");
    const main = document.querySelector("main");
    main.appendChild(mediaSection);
  }

  // Récupérer les médias du photographe
  let media = await getPhotographerMedia(photographerId);

  // Trier les médias selon le critère choisi
  const sortedMedia = sortMedias(media, sortBy);

  // Vider la section avant d'ajouter les nouveaux médias
  mediaSection.innerHTML = "";

  // Créer et ajouter chaque média
  sortedMedia.forEach((mediaItem) => {
    const mediaModel = mediaTemplate(mediaItem, photographerName);
    const mediaCardDOM = mediaModel.getMediaCardDOM();
    mediaSection.appendChild(mediaCardDOM);
  });

  // Calculer et afficher le total des likes
  displayTotalLikes();
}

// Fonction pour calculer et afficher le total des likes
function displayTotalLikes() {
  let likesCounter = document.querySelector(".total-likes-counter");

  if (!likesCounter) {
    likesCounter = document.createElement("div");
    likesCounter.classList.add("total-likes-counter");

    const likesCount = document.createElement("span");
    likesCount.id = "total-likes";

    const heartIcon = document.createElement("i");
    heartIcon.classList.add("fas", "fa-heart");

    likesCounter.appendChild(likesCount);
    likesCounter.appendChild(heartIcon);

    const main = document.querySelector("main");
    main.appendChild(likesCounter);
  }
}

