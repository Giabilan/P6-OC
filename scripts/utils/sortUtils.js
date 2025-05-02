// Fonction pour initialiser le select personnalisé
function initCustomSelect() {
  const select = document.getElementById("sorting-select");
  const sortingContainer = document.querySelector(".sorting-container");

  if (!select || !sortingContainer) return;

  // Créer un élément pour afficher la valeur sélectionnée
  const customSelect = document.createElement("div");
  customSelect.classList.add("custom-select");
  customSelect.style.width = "170px";
  customSelect.style.backgroundColor = "#901c1c";
  customSelect.style.color = "white";
  customSelect.style.padding = "15px";
  customSelect.style.borderRadius = "5px";
  customSelect.style.cursor = "pointer";
  customSelect.style.position = "relative";
  customSelect.style.fontWeight = "500";
  customSelect.style.fontSize = "18px";
  customSelect.style.backgroundImage =
    "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>\")";
  customSelect.style.backgroundRepeat = "no-repeat";
  customSelect.style.backgroundPosition = "right 10px center";
  customSelect.style.userSelect = "none";

  // Créer le dropdown
  const dropdown = document.createElement("div");
  dropdown.classList.add("custom-select-dropdown");

  // Remplir le dropdown avec les options du select
  const selectedOption = select.options[select.selectedIndex];
  customSelect.textContent = selectedOption.textContent;

  // Créer les options personnalisées (seulement pour les options non sélectionnées)
  Array.from(select.options).forEach((option, index) => {
    // Ne pas créer d'élément pour l'option actuellement sélectionnée
    if (index === select.selectedIndex) {
      return; // Skip this iteration
    }

    const optionElement = document.createElement("div");
    optionElement.textContent = option.textContent;
    optionElement.dataset.value = option.value;

    optionElement.addEventListener("click", () => {
      // Mettre à jour la sélection
      select.value = option.value;
      customSelect.textContent = option.textContent;

      // Déclencher l'événement change sur le select original
      const event = new Event("change");
      select.dispatchEvent(event);

      // Fermer le dropdown
      dropdown.style.display = "none";

      // Recréer entièrement le dropdown avec les nouvelles options
      sortingContainer.removeChild(dropdown);
      initCustomSelect();
    });

    dropdown.appendChild(optionElement);
  });

  // Ajouter un événement au clic sur le select personnalisé
  customSelect.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdown.style.display =
      dropdown.style.display === "block" ? "none" : "block";
  });

  // Fermer le dropdown au clic en dehors
  document.addEventListener("click", () => {
    dropdown.style.display = "none";
  });

  // Cacher le select original
  select.style.display = "none";

  // Supprimer les éléments existants s'ils existent
  const existingCustomSelect = sortingContainer.querySelector(".custom-select");
  const existingDropdown = sortingContainer.querySelector(
    ".custom-select-dropdown"
  );

  if (existingCustomSelect) {
    sortingContainer.removeChild(existingCustomSelect);
  }

  if (existingDropdown) {
    sortingContainer.removeChild(existingDropdown);
  }

  sortingContainer.appendChild(customSelect);
  sortingContainer.appendChild(dropdown);
}

// Initialiser le select personnalisé après le chargement du DOM
document.addEventListener("DOMContentLoaded", initCustomSelect);

function sortMedias(mediaArray, sortBy = "title") {
  const sortedArray = [...mediaArray];

  switch (sortBy) {
    case "title":
      sortedArray.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "date":
      sortedArray.sort((a, b) => new Date(a.date) - new Date(b.date));
      break;
    case "popularity":
      sortedArray.sort((a, b) => b.likes - a.likes);
      break;
    default:
      sortedArray.sort((a, b) => a.title.localeCompare(b.title));
  }

  return sortedArray;
}
