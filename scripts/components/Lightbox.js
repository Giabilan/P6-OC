class Lightbox {
  // Initialise la lightbox avec les médias et le nom du photographe
  constructor(medias, photographerName) {
    this.medias = medias; // Tableau de tous les médias
    this.currentIndex = 0; // Index du média actuel
    this.photographerName = photographerName;
    this.modal = this.createModal();
  }

  // Crée la structure HTML de la modal
  createModal() {
    const modal = document.createElement("div");
    modal.classList.add("lightbox-modal");
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-label", "Image en plein écran");

    // Conteneur principal
    const container = document.createElement("div");
    container.classList.add("lightbox-container");

    // Bouton fermer
    const closeBtn = document.createElement("button");
    closeBtn.classList.add("lightbox-close");
    closeBtn.setAttribute("aria-label", "Fermer la lightbox");

    // Ajouter une image pour le bouton de fermeture
    const closeImg = document.createElement("img");
    closeImg.src = "assets/icons/close_lightbox.png";
    closeImg.alt = "Fermer la lightbox";
    closeBtn.appendChild(closeImg);

    closeBtn.onclick = () => this.close();

    // Boutons navigation
    const prevBtn = document.createElement("button");
    prevBtn.classList.add("lightbox-prev");
    prevBtn.setAttribute("aria-label", "Image précédente");

    // Ajouter une image pour le bouton précédent
    const prevImg = document.createElement("img");
    prevImg.src = "assets/icons/arrow_left.png";
    prevImg.alt = "Précédent";
    prevBtn.appendChild(prevImg);

    prevBtn.onclick = () => this.showPrevious();

    const nextBtn = document.createElement("button");
    nextBtn.classList.add("lightbox-next");
    nextBtn.setAttribute("aria-label", "Image suivante");

    // Ajouter une image pour le bouton suivant
    const nextImg = document.createElement("img");
    nextImg.src = "assets/icons/arrow_right.png";
    nextImg.alt = "Suivant";
    nextBtn.appendChild(nextImg);

    nextBtn.onclick = () => this.showNext();

    // Conteneur média
    const mediaContainer = document.createElement("div");
    mediaContainer.classList.add("lightbox-media-container");

    // Titre
    const title = document.createElement("p");
    title.classList.add("lightbox-title");

    // Assemblage
    container.appendChild(closeBtn);
    container.appendChild(prevBtn);
    container.appendChild(mediaContainer);
    container.appendChild(nextBtn);
    container.appendChild(title);
    modal.appendChild(container);

    return modal;
  }

  // Affiche la lightbox à l'index spécifié
  show(index) {
    this.currentIndex = index;
    this.updateMedia();
    document.body.appendChild(this.modal);
    this.setupKeyboardNavigation();
  }

  // Met à jour le média affiché dans la lightbox
  updateMedia() {
    const mediaContainer = this.modal.querySelector(
      ".lightbox-media-container"
    );
    const titleElement = this.modal.querySelector(".lightbox-title");
    const currentMedia = this.medias[this.currentIndex];

    mediaContainer.innerHTML = "";

    if (currentMedia.image) {
      const img = document.createElement("img");
      img.src = `assets/photographers/media/${
        this.photographerName.split(" ")[0]
      }/${currentMedia.image}`;
      img.alt = currentMedia.title;
      mediaContainer.appendChild(img);
    } else if (currentMedia.video) {
      const video = document.createElement("video");
      video.src = `assets/photographers/media/${
        this.photographerName.split(" ")[0]
      }/${currentMedia.video}`;
      video.controls = true;
      mediaContainer.appendChild(video);
    }

    titleElement.textContent = currentMedia.title;
  }

  // Affiche le média suivant
  showNext() {
    this.currentIndex = (this.currentIndex + 1) % this.medias.length;
    this.updateMedia();
  }

  // Affiche le média précédent
  showPrevious() {
    this.currentIndex =
      (this.currentIndex - 1 + this.medias.length) % this.medias.length;
    this.updateMedia();
  }

  // Ferme la lightbox
  close() {
    this.modal.remove();
  }

  // Configure la navigation au clavier
  setupKeyboardNavigation() {
    const handleKeyboard = (e) => {
      switch (e.key) {
        case "Escape":
          this.close();
          break;
        case "ArrowLeft":
          this.showPrevious();
          break;
        case "ArrowRight":
          this.showNext();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyboard);
    this.modal._handleKeyboard = handleKeyboard; // Stocker la référence pour le nettoyage
  }
}
