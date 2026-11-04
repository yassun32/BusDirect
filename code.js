const ticket = JSON.parse(localStorage.getItem("userInfermation")) || [];

let totales = 0;
let Recette = 0;
let Disponibles = 20;

const prix = 80;
const nombreSieges = 20;

// Les formulaires
const ajout = document.querySelector("#ajout");
const modification = document.querySelector("#modification");
const supprition = document.querySelector("#supprition");

// Les éléments HTML
const siege = document.getElementById("siege");
const choix = document.getElementById("choix");
const choixSupp = document.getElementById("choixSupp");
const places = document.getElementById("availbelseats");
const totalp = document.getElementById("totalp");

// Sauvegarder les données
function sauvegarder() {
    localStorage.setItem("userInfermation", JSON.stringify(ticket));
}

// Afficher les sièges
function afficher() {
    places.innerHTML = "";
    choix.innerHTML = "";
    choixSupp.innerHTML = "";

    for (let i = 1; i <= nombreSieges; i++) {
        const reservation = ticket.find(t => Number(t.place) === i);
        const seat = document.getElementById(i);

        if (reservation) {
            seat.className = "bg-red-100 p-4 rounded shadow border border-red-200";

            seat.innerHTML = `
                <div class="text-lg font-bold text-red-700">${i}</div>
                <p class="text-xs text-black-700">${reservation.nome}</p>
            `;

            // Liste des réservations pour la modification
            const option = document.createElement("option");
            option.value = i;
            option.textContent = reservation.nome + " - Siège " + i;
            choix.appendChild(option);

            // Liste des réservations pour la suppression
            const optionSupp = document.createElement("option");
            optionSupp.value = i;
            optionSupp.textContent = reservation.nome + " - Siège " + i;
            choixSupp.appendChild(optionSupp);

        } else {
            seat.className = "bg-white p-4 rounded shadow border border-black-200 cursor-pointer hover:bg-black-50";

            seat.innerHTML = `
                <div class="text-lg font-bold text-green-700">${i}</div>
                <p class="text-xs text-black-400">Libre</p>
            `;

            // Liste des sièges disponibles
            const option = document.createElement("option");
            option.value = i;
            option.textContent = "Siège " + i;
            places.appendChild(option);
        }
    }

    afficherSiegesLibres();
    afficherStatistiques();
    sauvegarder();
}

// Afficher les sièges disponibles pour la modification
function afficherSiegesLibres() {
    const ancienSiege = Number(choix.value);

    siege.innerHTML = "";

    for (let i = 1; i <= nombreSieges; i++) {
        let occupe = false;

        for (let j = 0; j < ticket.length; j++) {
            if (Number(ticket[j].place) === i) {
                occupe = true;
            }
        }

        // On affiche les sièges libres et l'ancien siège
        if (occupe === false || i === ancienSiege) {
            const option = document.createElement("option");
            option.value = i;
            option.textContent = "Siège " + i;
            siege.appendChild(option);
        }
    }
}

choix.addEventListener("change", afficherSiegesLibres);

// Afficher les statistiques
function afficherStatistiques() {
    totales = ticket.length;
    Disponibles = nombreSieges - totales;
    Recette = totales * prix;

    totalp.innerHTML = `
        <p>Places réservées : ${totales}</p>
        <p class="text-green-600 font-semibold">
            Places disponibles : ${Disponibles}
        </p>
        <p>Recette : ${Recette} DH</p>
    `;
}

// Ajouter une réservation
ajout.addEventListener("submit", function(e) {
    e.preventDefault();

    const nom = document.getElementById("nome").value.trim();
    const placeChoisie = places.value;

    if (nom === "") {
        notification(ajout, 2);
        return;
    }

    if (placeChoisie === "") {
        notification(ajout, 3);
        return;
    }

    // Vérifier si le nom existe déjà
    for (let i = 0; i < ticket.length; i++) {
        if (ticket[i].nome.toLowerCase() === nom.toLowerCase()) {
            notification(ajout, 4);
            return;
        }
    }

    // Ajouter la réservation dans le tableau
    ticket.push({
        nome: nom.toLowerCase(),
        place: Number(placeChoisie)
    });

    afficher();
    ajout.reset();

    notification(ajout, 1);
});

// Modifier une réservation
modification.addEventListener("submit", function(e) {
    e.preventDefault();

    const nouveauNom = document.getElementById("nvnome").value.trim();
    const ancienSiege = Number(choix.value);
    const nouveauSiege = Number(siege.value);

    if (nouveauNom === "" || choix.value === "" || siege.value === "") {
        notification(modification, 2);
        return;
    }

    // Chercher la réservation à modifier
    const index = ticket.findIndex(function(t) {
        return Number(t.place) === ancienSiege;
    });

    if (index === -1) {
        notification(modification, 2);
        return;
    }

    // Vérifier si le nom appartient à un autre passager
    for (let i = 0; i < ticket.length; i++) {
        if (i !== index &&
            ticket[i].nome.toLowerCase() === nouveauNom.toLowerCase()) {
            notification(modification, 2);
            return;
        }
    }

    // Vérifier si le nouveau siège est occupé
    for (let i = 0; i < ticket.length; i++) {
        if (i !== index &&
            Number(ticket[i].place) === nouveauSiege) {
            notification(modification, 2);
            return;
        }
    }

    // Modifier l'objet directement dans le tableau
    ticket[index].nome = nouveauNom.toLowerCase();
    ticket[index].place = nouveauSiege;

    afficher();

    notification(modification, 1);
});

// Supprimer une réservation
supprition.addEventListener("submit", function(e) {
    e.preventDefault();

    const placeChoisie = Number(choixSupp.value);

    const index = ticket.findIndex(function(t) {
        return Number(t.place) === placeChoisie;
    });

    if (index === -1) {
        notification(supprition, 2);
        return;
    }

    // Supprimer la réservation du tableau
    ticket.splice(index, 1);

    afficher();

    notification(supprition, 1);
});

// Afficher les notifications
function notification(formulaire, numero) {
    const p = document.createElement("p");

    if (formulaire === ajout) {
        if (numero === 1) {
            p.textContent = "Réservation ajoutée avec succès !";
        } else if (numero === 2) {
            p.textContent = "Entre un nom !";
        } else if (numero === 3) {
            p.textContent = "Choisis un siège !";
        } else {
            p.textContent = "Ce nom est déjà enregistré !";
        }

    } else if (formulaire === modification) {
        if (numero === 1) {
            p.textContent = "Modification réussie !";
        } else {
            p.textContent = "Échec de la modification !";
        }

    } else {
        if (numero === 1) {
            p.textContent = "Réservation supprimée avec succès !";
        } else {
            p.textContent = "Échec de la suppression !";
        }
    }

    if (numero === 1) {
        p.className = "bg-green-600 text-white px-4 py-2 rounded";
    } else {
        p.className = "bg-red-600 text-white px-4 py-2 rounded";
    }

    formulaire.appendChild(p);

    setTimeout(function() {
        p.remove();
    }, 3000);
}

// Charger et afficher les données au démarrage
afficher();
