const ticket = [];
const x = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

let totales = 0;
let Recette = 80;
let Disponibles = 20;

const ajout = document.querySelector('#ajout');
const modification = document.querySelector('#modification');
const supprition = document.querySelector('#supprition');
const siege = document.getElementById("siege");
const choixSupp = document.getElementById("choixSupp");

ajout.addEventListener('submit', e => {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    let place = document.getElementById("availbelseats").value;

    if (nome !== "") {

        if (place === "") {
            place = x[0];
        }

        for (let i = 0; i < ticket.length; i++) {
            if (nome === ticket[i].nome) {
                notification(ajout, false);
                return;
            }
        }

        const seats = document.getElementById(place);
        const totalp = document.getElementById("totalp");

        place = Number(place);

        ticket.push({
            nome: nome,
            place: place
        });

        const index = x.indexOf(place);

        if (index !== -1) {
            x.splice(index, 1);
        }

        seats.className = "bg-red-100 p-4 rounded shadow border border-red-200";

        seats.innerHTML = `
            <div class="text-lg font-bold text-red-700">${place}</div>
            <p class="text-xs text-black-700">${nome}</p>
        `;

        document.getElementById("availbelseats")
            .querySelector(`option[value="${place}"]`)?.remove();

        siege.querySelector(`option[value="${place}"]`)?.remove();

        totales++;
        Recette += 80;
        Disponibles--;

        totalp.innerHTML = `
            <p>• places totales: ${totales}</p>
            <p class="text-green-600 font-semibold">• ${Disponibles} Disponibles</p>
            <p>• Recette: ${Recette} DH</p>
        `;

        const option = document.createElement("option");
        option.value = place;
        option.textContent = nome;

        document.getElementById('choix').appendChild(option);

        const optionSupp = document.createElement("option");
        optionSupp.value = place;
        optionSupp.textContent = nome;

        choixSupp.appendChild(optionSupp);

        notification(ajout, true);

    } else {
        notification(ajout, false);
    }
});
//afichage
x.forEach(place => {
    const option = document.createElement("option");

    option.value = place;
    option.textContent = `Siège: ${place}`;

    siege.appendChild(option);
});

modification.addEventListener('submit', e => {
    e.preventDefault();

    const nvnome = document.getElementById('nvnome').value.trim();
    const nvplace = document.getElementById('siege').value.trim();
    const passager = document.getElementById(nvplace);
    const oldSeats = document.getElementById('choix').value.trim();
    const vide = document.getElementById(oldSeats);
    ticket.push({
        nome: nvnome,
        place: nvplace
    });
    const current = x.indexOf(nvplace);
    if (current !== -1) {
        x.splice(current, 1);
    }
    passager.className = "bg-red-100 p-4 rounded shadow border border-red-200";

    passager.innerHTML = `
        <div class="text-lg font-bold text-red-700">${nvplace}</div>
        <p class="text-xs text-black-700">${nvnome}</p>
    `;

    vide.className = "bg-white p-4 rounded shadow border border-black-200 cursor-pointer hover:bg-black-50";

    vide.innerHTML = `
        <div class="text-lg font-bold text-green-700">${oldSeats}</div>
        <p class="text-xs text-black-400">Libre</p>
    `;

    notification(modification, true);
});


supprition.addEventListener('submit', e => {
    e.preventDefault();

    const place =(choixSupp.value);
    const index = ticket.findIndex(t =>(t.place) === place);

    if (index === -1) {
        notification(supprition, false);
        return;
    }
    ticket.splice(index, 1);


    const seat = document.getElementById(place);
    seat.className = "bg-white p-4 rounded shadow border border-black-200 cursor-pointer hover:bg-black-50";
    seat.innerHTML = `
        <div class="text-lg font-bold text-green-700">${place}</div>
        <p class="text-xs text-black-400">Libre</p>
    `
    x.unshift(place);// push like first element

    const option = document.createElement("option");
    option.value = place;
    option.textContent = `Siège: ${place}`;

    document.getElementById("availbelseats").appendChild(option);

    // Supprimer le siège de la liste de modification
    const optionModif = document.querySelector(`#choix option[value="${place}"]`);
    if (optionModif) optionModif.remove();

    // Supprimer le passager de la liste de suppression
    const optionSupp = choixSupp.querySelector(`option[value="${place}"]`);
    if (optionSupp) optionSupp.remove();

    totales--;
    Recette -= 80;
    Disponibles++;

    const totalp = document.getElementById("totalp");
    totalp.innerHTML = `
        <p>• places totales: ${totales}</p>
        <p class="text-green-600 font-semibold">• ${Disponibles} Disponibles</p>
        <p>• Recette: ${Recette} DH</p>
    `;
    notification(supprition, true);
});

function notification(id, stant) {
    const p = document.createElement('p');

    if (id === ajout) {
        if (stant === true) {
            p.className = "bg-green-600 text-white px-4 py-2 rounded";
            p.textContent = "Le siège est sélectionné avec succès !";
        } else {
            p.className = "bg-red-600 text-white px-4 py-2 rounded";
            p.textContent = "Le nom est déjà enregistré ou invalide !";
        }
    }

    else if (id === modification) {
        if (stant === true) {
            p.className = "bg-green-600 text-white px-4 py-2 rounded";
            p.textContent = "Modification réussie !";
        } else {
            p.className = "bg-red-600 text-white px-4 py-2 rounded";
            p.textContent = "Échec de la modification !";
        }
    }

    else if (id === supprition) {
        if (stant === true) {
            p.className = "bg-green-600 text-white px-4 py-2 rounded";
            p.textContent = "Réservation supprimée avec succès !";
        } else {
            p.className = "bg-red-600 text-white px-4 py-2 rounded";
            p.textContent = "Échec de la suppression !";
        }
    }

    id.appendChild(p);

    setTimeout(() => {
        p.remove();
    }, 3000);
}