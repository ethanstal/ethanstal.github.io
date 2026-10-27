// Bouton lecture fait maison : un seul extrait joue à la fois.
// Les événements du <audio> sont la source de vérité pour aria-pressed.
(() => {
  const boutons = [...document.querySelectorAll('.lecture')];
  const audioDe = (bouton) => document.getElementById(bouton.getAttribute('aria-controls'));

  for (const bouton of boutons) {
    const audio = audioDe(bouton);
    const marquer = (enLecture) => bouton.setAttribute('aria-pressed', String(enLecture));
    audio.addEventListener('play', () => marquer(true));
    audio.addEventListener('pause', () => marquer(false));
    audio.addEventListener('ended', () => marquer(false));

    bouton.addEventListener('click', () => {
      if (!audio.paused) return audio.pause();
      for (const autre of boutons) if (autre !== bouton) audioDe(autre).pause();
      audio.play().catch(() => marquer(false)); // fichier absent ou illisible
    });
  }
})();
