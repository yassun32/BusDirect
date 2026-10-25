// tableau d'exemple
let livres = [];

const form = document.querySelector('#formLivre');
const liste = document.querySelector('#listeLivres');

// ajouter un livre depuis le formulaire
form.addEventListener('submit', e => {
  e.preventDefault();
  const titre = document.querySelector('#titre').value.trim();
  const auteur = document.querySelector('#auteur').value.trim();
  const annee = parseInt(document.querySelector('#annee').value);
  if (titre && auteur && annee) {
    livres.push({ titre, auteur, annee });
    renderList(livres);
    form.reset();
  }
});

// fonction de rendu de la liste
function renderList(collection) {
  liste.innerHTML = '';
  collection.map(l => {
    const div = document.createElement('div');
    div.className = 'livre';
    div.textContent = `${l.titre} – ${l.auteur} (${l.annee})`;
    liste.appendChild(div);
  });
}

// filtre simple : afficher les livres post‑2000
const filtre2000 = () => {
  const recent = livres.filter(l => l.annee >= 2000);
  renderList(recent);
};

// bouton de filtre ajouté dynamiquement
const btnFiltre = document.createElement('button');
btnFiltre.textContent = 'Livres >= 2000';
btnFiltre.type = 'button';
btnFiltre.addEventListener('click', filtre2000);
form.appendChild(btnFiltre);
