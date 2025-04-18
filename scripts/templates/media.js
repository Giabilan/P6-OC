function mediaTemplate(data, photographerName) {
  const { id, photographerId, title, image, video, likes } = data;
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
    }
    if (video) {
      mediaElement = document.createElement("video");
      mediaElement.setAttribute("src", `${mediaPath}/${video}`);
      mediaElement.setAttribute("controls", true);
      mediaElement.setAttribute("aria-label", title);
    }
    // Gestion du clic pour la lightbox
    mediaElement.addEventListener("click", function (e) {
      e.preventDefault();
      console.log("ouvrir la lightbox");
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
    heartIcon.addEventListener("click", () => {
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
  function getMediaLightBoxDOM() {
    const content = document.createElement("div");
    content.classList.add("card-lightbox");

    // Création de l'élément média (image ou vidéo)
    let mediaElement;
    if (image) {
      mediaElement = document.createElement("img");
      mediaElement.setAttribute("src", `${mediaPath}/${image}`);
      mediaElement.setAttribute("alt", title);
    }
    if (video) {
      mediaElement = document.createElement("video");
      mediaElement.setAttribute("src", `${mediaPath}/${video}`);
      mediaElement.setAttribute("controls", true);
      mediaElement.setAttribute("aria-label", title);
    }

    // Création du titre sous l'image
    const titleElement = document.createElement("h2");
    titleElement.textContent = title;
    content.appendChild(mediaElement);
    content.appendChild(titleElement);
    
    return content;
  }
  return { getMediaCardDOM, getMediaLightBoxDOM };
}
