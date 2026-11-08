// Site « Fiscalité de l'Alyah » · CBA · menu mobile, bandeau cookies, formulaires (aperçu : rien n'est transmis)
(function () {
  var burger = document.querySelector('.burger');
  if (burger) burger.addEventListener('click', function () { document.querySelector('nav').classList.toggle('ouvert'); });

  // Bandeau cookies : choix mémorisé dans le navigateur, rouvert par « Gérer mes cookies »
  var bandeau = document.getElementById('cookies');
  var CLE = 'cba-cookies';
  function ouvrir() { bandeau.hidden = false; }
  function fermer(choix) { try { localStorage.setItem(CLE, JSON.stringify(choix)); } catch (e) {} bandeau.hidden = true; }
  var deja = null;
  try { deja = localStorage.getItem(CLE); } catch (e) {}
  if (!deja && !/[?&]capture/.test(location.search)) ouvrir();
  document.querySelectorAll('[data-cookies]').forEach(function (b) {
    b.addEventListener('click', function (e) { e.preventDefault(); ouvrir(); });
  });
  bandeau.querySelectorAll('[data-c]').forEach(function (b) {
    b.addEventListener('click', function () {
      var c = b.getAttribute('data-c');
      var choix = bandeau.querySelector('.cookies-choix');
      if (c === 'tout') fermer({ mesure: true, video: true });
      else if (c === 'rien') fermer({ mesure: false, video: false });
      else if (choix.hidden) { choix.hidden = false; b.textContent = 'Enregistrer mes choix'; }
      else fermer({ mesure: choix.querySelector('[name=mesure]').checked, video: choix.querySelector('[name=video]').checked });
    });
  });

  // Livre blanc pas encore fourni
  document.querySelectorAll('[data-bientot]').forEach(function (b) {
    b.addEventListener('click', function (e) { e.preventDefault(); alert(b.getAttribute('data-bientot')); });
  });

  // Formulaires : contrôle des champs obligatoires et messages du document du cabinet
  var mail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  document.querySelectorAll('.formulaire').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true;
      f.querySelectorAll('[required]').forEach(function (c) {
        var bon = c.type === 'email' ? mail.test(c.value.trim()) : c.value.trim() !== '';
        c.classList.toggle('invalide', !bon);
        if (!bon) ok = false;
      });
      var m = f.querySelector('.message');
      m.className = 'large message ' + (ok ? 'ok' : 'erreur');
      m.textContent = ok ? f.getAttribute('data-ok') + ' (Aperçu : aucune donnée n’est transmise.)' : f.getAttribute('data-incomplet');
      if (ok) f.querySelectorAll('input:not([type=checkbox]),textarea,select').forEach(function (c) { c.value = ''; });
    });
  });
})();
