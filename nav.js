// Souligne dans le menu la section en cours : la dernière dont le haut a passé le milieu de l'écran.
// Les expériences (Sercel…) suivent #parcours dans la page, donc elles gardent « Parcours » souligné.
(() => {
  const liens = [...document.querySelectorAll('.nav li a[href^="#"]')];
  const cibles = liens.map((lien) => document.querySelector(lien.hash));
  const liste = document.querySelector('.nav ul');

  let precedent = -1;
  const marquer = () => {
    let courant = -1;
    cibles.forEach((cible, i) => { if (cible.getBoundingClientRect().top <= innerHeight / 2) courant = i; });
    if (courant === precedent) return;
    precedent = courant;
    liens.forEach((lien, i) => {
      if (i === courant) lien.setAttribute('aria-current', 'location');
      else lien.removeAttribute('aria-current');
    });
    // Sur téléphone, le menu défile : centrer le lien souligné, sans toucher au défilement de la page
    // (scrollIntoView décale la page à cause de scroll-padding).
    const lien = liens[courant];
    if (lien) liste.scrollLeft = lien.offsetLeft - liste.offsetLeft - (liste.clientWidth - lien.offsetWidth) / 2;
  };

  addEventListener('scroll', marquer, { passive: true });
  addEventListener('resize', marquer);
  marquer();
})();
