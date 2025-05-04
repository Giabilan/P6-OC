function mediaTemplate(data, photographerName) {
  const { title, image, video, likes } = data;
  let mediaLikes = likes;
  const string = photographerName.split(" ")[0].replace("-", " ");
  const mediaPath = `./assets/photographers/media/${string}`;

  function getMediaCardDOM() {
    const article = document.createElement("article");
    article.classList.add("media-card");

    // Création de l'élément média (image ou vidéo)
    let mediaElement;
    if (image) {
      mediaElement = document.createElement("img");
      mediaElement.setAttribute("src", `${mediaPath}/${image}`);
      mediaElement.setAttribute("alt", title);
      mediaElement.setAttribute("tabindex", "0");
      mediaElement.setAttribute("role", "button");
      mediaElement.setAttribute(
        "aria-label",
        `${title}, ouvrir dans la lightbox`
      );
    }
    if (video) {
      mediaElement = document.createElement("video");
      mediaElement.setAttribute("src", `${mediaPath}/${video}`);
      mediaElement.setAttribute("controls", true);
      mediaElement.setAttribute("aria-label", title);
      mediaElement.setAttribute("tabindex", "0");
      mediaElement.setAttribute("role", "button");
    }

    // Fonction pour ouvrir la lightbox
    function openLightbox(e) {
      e.preventDefault();
      // Récupérer tous les médias pour les passer à la lightbox
      const allMedias = Array.from(
        document.querySelectorAll(".media-card")
      ).map((card, index) => {
        const mediaTitle = card.querySelector("h2").textContent;
        const mediaImg = card.querySelector("img");
        const mediaVideo = card.querySelector("video");

        return {
          id: index,
          title: mediaTitle,
          image: mediaImg
            ? mediaImg.getAttribute("src").split("/").pop()
            : null,
          video: mediaVideo
            ? mediaVideo.getAttribute("src").split("/").pop()
            : null,
        };
      });

      // Trouver l'index du média actuel (celui sur lequel on a cliqué)
      const currentIndex = Array.from(
        document.querySelectorAll(".media-card")
      ).indexOf(article);

      // Créer et afficher la lightbox
      const lightbox = new Lightbox(allMedias, photographerName);
      lightbox.show(currentIndex);
    }

    // Gestion du clic pour la lightbox
    mediaElement.addEventListener("click", openLightbox);

    // Gestion du clavier pour la lightbox (accessibilité)
    mediaElement.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        openLightbox(e);
      }
    });

    // Création de la structure d'information du média
    const infoDiv = document.createElement("div");
    infoDiv.classList.add("media-info");

    const titleElement = document.createElement("h2");
    titleElement.textContent = title;

    const statsDiv = document.createElement("div");
    statsDiv.classList.add("media-stats");

    // Gestion des likes
    const likesContainer = document.createElement("div");
    likesContainer.classList.add("likes-container");

    const likesCount = document.createElement("span");
    likesCount.classList.add("likes-count");
    likesCount.textContent = likes;

    const heartIcon = document.createElement("i");
    heartIcon.classList.add("fas", "fa-heart");
    heartIcon.setAttribute("aria-label", "likes");
    heartIcon.setAttribute("role", "button");
    heartIcon.setAttribute("tabindex", "0");

    let isLiked = false;

    // Fonction pour gérer le like/unlike
    function toggleLike() {
      if (!isLiked) {
        mediaLikes++;
        isLiked = true;
        heartIcon.classList.add("liked");
      } else {
        mediaLikes--;
        isLiked = false;
        heartIcon.classList.remove("liked");
      }
      likesCount.textContent = mediaLikes;
      updateTotalLikes();
    }

    // Événement clic sur le cœur
    heartIcon.addEventListener("click", toggleLike);

    // Événement clavier (touche Entrée) pour l'accessibilité
    heartIcon.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        toggleLike();
      }
    });

    // Assemblage des éléments
    likesContainer.appendChild(likesCount);
    likesContainer.appendChild(heartIcon);

    infoDiv.appendChild(titleElement);
    statsDiv.appendChild(likesContainer);
    infoDiv.appendChild(statsDiv);

    article.appendChild(mediaElement);
    article.appendChild(infoDiv);

    return article;
  }

  return { getMediaCardDOM };
}
