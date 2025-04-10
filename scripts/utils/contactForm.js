function displayModal(photographerName) {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
  modal.setAttribute("aria-hidden", "false");

  // Mettre à jour le nom du photographe dans la modale
  const photographerNameSpan = modal.querySelector(".photographer-name");
  photographerNameSpan.textContent = photographerName;

  // Focus sur le premier champ
  document.getElementById("firstname").focus();

  // Empêcher le scroll de la page
  document.body.style.overflow = "hidden";

  // Garder le focus dans la modale
  trapFocus(modal);
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");

  // Réactiver le scroll
  document.body.style.overflow = "auto";
}

// Gestion du focus dans la modale
function trapFocus(modal) {
  const focusableElements = modal.querySelectorAll(
    'button, [href], input, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];

  modal.addEventListener("keydown", function (e) {
    if (e.key === "Tab") {
      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    }
    if (e.key === "Escape") {
      closeModal();
    }
  });
}

// Gestion de la soumission du formulaire
document
  .getElementById("contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = {
      firstname: document.getElementById("firstname").value,
      lastname: document.getElementById("lastname").value,
      email: document.getElementById("email").value,
      message: document.getElementById("message").value,
    };

    console.log("Données du formulaire :", formData);

    // Réinitialiser le formulaire et fermer la modale
    this.reset();
    closeModal();
  });
