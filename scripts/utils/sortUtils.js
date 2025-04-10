// Fonction pour trier les médias
export function sortMedias(medias, sortBy) {
  switch (sortBy) {
    case "title":
      return [...medias].sort((a, b) => a.title.localeCompare(b.title));
    case "popularity":
      return [...medias].sort((a, b) => b.likes - a.likes);
    case "date":
      return [...medias].sort((a, b) => new Date(b.date) - new Date(a.date));
    default:
      return medias;
  }
}
