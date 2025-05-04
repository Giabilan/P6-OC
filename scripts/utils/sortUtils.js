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

  // Ajouter les attributs d'accessibilité
  customSelect.setAttribute("tabindex", "0");
  customSelect.setAttribute("role", "combobox");
  customSelect.setAttribute("aria-haspopup", "listbox");
  customSelect.setAttribute("aria-expanded", "false");
  customSelect.setAttribute("aria-label", "Trier les médias");

  // Créer le dropdown
  const dropdown = document.createElement("div");
  dropdown.classList.add("custom-select-dropdown");
  dropdown.setAttribute("role", "listbox");
  dropdown.setAttribute("aria-label", "Options de tri");
  dropdown.style.display = "none";

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
    optionElement.setAttribute("role", "option");
    optionElement.setAttribute("tabindex", "0");
    optionElement.setAttribute("aria-selected", "false");

    // Fonction pour sélectionner une option
    function selectOption() {
      // Mettre à jour la sélection
      select.value = option.value;
      customSelect.textContent = option.textContent;

      // Déclencher l'événement change sur le select original
      const event = new Event("change");
      select.dispatchEvent(event);

      // Fermer le dropdown
      dropdown.style.display = "none";
      customSelect.setAttribute("aria-expanded", "false");

      // Recréer entièrement le dropdown avec les nouvelles options
      sortingContainer.removeChild(dropdown);
      initCustomSelect();

      // Remettre le focus sur le select
      setTimeout(() => {
        const newCustomSelect =
          sortingContainer.querySelector(".custom-select");
        if (newCustomSelect) newCustomSelect.focus();
      }, 0);
    }

    optionElement.addEventListener("click", selectOption);

    // Ajouter un gestionnaire pour la touche Entrée
    optionElement.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        selectOption();
      }
    });

    dropdown.appendChild(optionElement);
  });

  // Fonction pour basculer l'affichage du dropdown
  function toggleDropdown(e) {
    e.stopPropagation();
    const isVisible = dropdown.style.display === "block";
    dropdown.style.display = isVisible ? "none" : "block";
    customSelect.setAttribute("aria-expanded", !isVisible);

    // Si on ouvre le dropdown, mettre le focus sur la première option
    if (!isVisible && dropdown.children.length > 0) {
      setTimeout(() => dropdown.children[0].focus(), 0);
    }
  }

  // Ajouter un événement au clic sur le select personnalisé
  customSelect.addEventListener("click", toggleDropdown);

  // Gestion du clavier pour le custom select
  customSelect.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleDropdown(e);
    } else if (e.key === "Escape" && dropdown.style.display === "block") {
      e.preventDefault();
      dropdown.style.display = "none";
      customSelect.setAttribute("aria-expanded", "false");
      customSelect.focus();
    } else if (e.key === "ArrowDown" && dropdown.style.display === "block") {
      e.preventDefault();
      if (dropdown.children.length > 0) {
        dropdown.children[0].focus();
      }
    }
  });

  // Navigation dans les options avec les flèches
  dropdown.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      dropdown.style.display = "none";
      customSelect.setAttribute("aria-expanded", "false");
      customSelect.focus();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const focused = document.activeElement;
      const options = Array.from(dropdown.children);
      const currentIndex = options.indexOf(focused);
      if (currentIndex < options.length - 1) {
        options[currentIndex + 1].focus();
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const focused = document.activeElement;
      const options = Array.from(dropdown.children);
      const currentIndex = options.indexOf(focused);
      if (currentIndex > 0) {
        options[currentIndex - 1].focus();
      } else {
        customSelect.focus();
      }
    }
  });

  // Fermer le dropdown au clic en dehors
  document.addEventListener("click", () => {
    dropdown.style.display = "none";
    customSelect.setAttribute("aria-expanded", "false");
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
