function photographerTemplate(data) {
  // Récupérer toute la data
  const { name, id, city, country, tagline, price, portrait } = data;

  const picture = `./assets/photographers/${portrait}`;

  function getUserCardDOM() {
    // Créer le conteneur principal (wrapper)
    const wrapper = document.createElement("div");
    wrapper.classList.add("photographer-card-wrapper");

    // Créer l'article qui contiendra tous les éléments
    const article = document.createElement("article");
    article.classList.add("photographer-card");

    // Créer un conteneur cliquable pour l'image et le nom
    const clickableContainer = document.createElement("div");
    clickableContainer.classList.add("photographer-clickable-area");
    clickableContainer.setAttribute("tabindex", "0");
    clickableContainer.setAttribute("role", "link");
    clickableContainer.setAttribute("aria-label", `Voir le profil de ${name}`);
    clickableContainer.style.cursor = "pointer";

    // Gestionnaire d'événement pour la navigation clavier
    clickableContainer.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        window.location.href = `./photographer.html?id=${id}`;
      }
    });

    // Gestionnaire d'événement pour le clic
    clickableContainer.addEventListener("click", function (e) {
      window.location.href = `./photographer.html?id=${id}`;
    });

    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", "Portrait de " + name);

    const nameTxt = document.createElement("h2");
    nameTxt.textContent = name;

    // Ajouter l'image et le nom au conteneur cliquable
    clickableContainer.appendChild(img);
    clickableContainer.appendChild(nameTxt);

    // Créer le conteneur pour les autres informations (non cliquables)
    const divDetail = document.createElement("div");
    divDetail.classList.add("photographer-details");

    const divLocation = document.createElement("div");
    divLocation.classList.add("photographer-location");
    const cityTxt = document.createElement("h3");
    const countryTxt = document.createElement("h4");
    const taglineTxt = document.createElement("p");
    const priceTxt = document.createElement("h5");

    cityTxt.textContent = city + ", ";
    countryTxt.textContent = country;
    taglineTxt.textContent = tagline;
    priceTxt.textContent = price + "€/jour";

    // Assembler les éléments non cliquables
    divLocation.appendChild(cityTxt);
    divLocation.appendChild(countryTxt);
    divDetail.appendChild(divLocation);
    divDetail.appendChild(taglineTxt);
    divDetail.appendChild(priceTxt);

    // Ajouter tout à l'article
    article.appendChild(clickableContainer);
    article.appendChild(divDetail);

    wrapper.appendChild(article);

    // Pour le référencement SEO, on ajoute quand même un lien invisible
    const hiddenLink = document.createElement("a");
    hiddenLink.setAttribute("href", `./photographer.html?id=${id}`);
    hiddenLink.setAttribute("aria-hidden", "true");
    hiddenLink.setAttribute("tabindex", "-1");
    hiddenLink.style.position = "absolute";
    hiddenLink.style.width = "1px";
    hiddenLink.style.height = "1px";
    hiddenLink.style.padding = "0";
    hiddenLink.style.margin = "-1px";
    hiddenLink.style.overflow = "hidden";
    hiddenLink.style.clip = "rect(0, 0, 0, 0)";
    hiddenLink.style.whiteSpace = "nowrap";
    hiddenLink.style.border = "0";
    hiddenLink.textContent = `Voir le profil de ${name}`;

    wrapper.appendChild(hiddenLink);

    return wrapper;
  }

  function getHeaderUserDOM() {
    // Création d'un container pour les informations (nom, localisation, tagline)
    const infoContainer = document.createElement("div");
    infoContainer.classList.add("info-container");

    const firstContainer = document.createElement("div");
    firstContainer.classList.add("photograph-info");

    // Création et remplissage des éléments HTML
    const nameElement = document.createElement("h1");
    nameElement.classList.add("photograph-name");

    nameElement.textContent = name;

    const locationElement = document.createElement("p");
    locationElement.classList.add("photograph-location");
    locationElement.textContent = city + ", " + country;

    const taglineElement = document.createElement("p");
    taglineElement.classList.add("photograph-tagline");
    taglineElement.textContent = tagline;

    // Ajout des informations dans le container
    firstContainer.appendChild(nameElement);
    firstContainer.appendChild(locationElement);
    firstContainer.appendChild(taglineElement);

    // Création du bouton de contact
    const contactButton = document.createElement("button");
    contactButton.classList.add("contact_button");
    contactButton.textContent = "Contactez-moi";
    contactButton.onclick = function () {
      displayModal(name);
    };

    // Création de l'image portrait du photographe
    const portraitImage = document.createElement("img");
    portraitImage.src = `./assets/photographers/${portrait}`;
    portraitImage.alt = "Portrait de " + name;

    infoContainer.appendChild(firstContainer);
    infoContainer.appendChild(contactButton);
    infoContainer.appendChild(portraitImage);
    return infoContainer;
  }

  return {
    getUserCardDOM,
    getHeaderUserDOM,
    name,
  };
}
