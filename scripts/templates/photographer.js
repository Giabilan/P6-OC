function photographerTemplate(data) {
  // Récupérer toute la data
  const { name, id, city, country, tagline, price, portrait } = data;

  const picture = `./assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const link = document.createElement("a");
    link.setAttribute("href", `./photographer.html?id=${id}`);
    const article = document.createElement("article");
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", "Portrait de " + name);

    const nameTxt = document.createElement("h2");
    const divDetail = document.createElement("div");
    const divLocation = document.createElement("div");
    divLocation.classList.add("photographer-location");
    const cityTxt = document.createElement("h3");
    const countryTxt = document.createElement("h4");
    const taglineTxt = document.createElement("p");
    const priceTxt = document.createElement("h5");

    nameTxt.textContent = name;
    cityTxt.textContent = city + ", ";
    countryTxt.textContent = country;
    taglineTxt.textContent = tagline;
    priceTxt.textContent = price ;

    article.appendChild(img);
    article.appendChild(divDetail);
    divDetail.appendChild(nameTxt);
    divDetail.appendChild(divLocation);
    divLocation.appendChild(cityTxt);
    divLocation.appendChild(countryTxt);
    divDetail.appendChild(taglineTxt);
    divDetail.appendChild(priceTxt);
    link.appendChild(article);
    return link;
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
