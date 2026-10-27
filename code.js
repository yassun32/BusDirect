const { createElement } = require("react");

const ticket = [];
const x = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
let totales = 0;
let Recette = 80;
let Disponibles = 20;


const ajout = document.querySelector('#ajout')
const modification = document.querySelector('#modification')
const supprition = document.querySelector('#supprition')
const succsus = document.getElementById("succsus");
const fals = document.getElementById("false");
const falsNome = document.getElementById("falseNome");
const choixSupp = supprition.querySelector("select");

ajout.addEventListener('submit', e => {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    let place = document.getElementById("availbelseats").value;

    if (nome !== "") {
        if (place === "") {
            place = x[0]
        }
        for (let i = 0; i < ticket.length; i++) {
            if (nome === ticket[i].nome) {
                ajout.innerHTML =
                    `<p class="bg-red-600 text-white px-4 py-2 rounded ">le nome est deja engestrie !</p>`

                setTimeout(() => {
                    falsNome.innerHTML = "";
                }, 1500);
                return
            }

        }
        const seats = document.getElementById(place)
        const totalp = document.getElementById("totalp")
        place = Number(place)
        ticket.push({
            nome: nome,
            place: place,
        });

        const index = x.indexOf(place); 
        if (index !== -1) {
            x.splice(index, 1);
        }

        seats.className = "bg-red-100 p-4 rounded shadow border border-red-200";
        seats.innerHTML = `
        <div class="text-lg font-bold text-red-700">${place}</div>
        <p class="text-xs text-black-700">${nome}</p>`;
        document.getElementById("availbelseats").querySelector(`option[value="${place}"]`).remove();
        document.getElementById("siege").querySelector(`option[value="${place}"]`).remove();

        totales++;
        Recette += 80;
        Disponibles--;

        totalp.innerHTML = `
        <p>• places totales: ${totales}</p>
        <p class="text-green-600 font-semibold">• ${Disponibles} Disponibles</p>
        <p>• Recette:  ${Recette}DH</p>`
        const sucses = document.createElement('p')
        sucses.className="bg-green-600 text-white px-4 py-2 rounded "
        sucses.textContent ="le siege est selectione avec sucses"
        const aside = document.getElementsByTagName('aside');
        aside.appendChild(sucses)


        const option = document.createElement("option");
        option.value = place;
        option.textContent = nome;
        document.getElementById('choix').appendChild(option);


        const optionSupp = document.createElement("option");
        optionSupp.value = place;
        optionSupp.textContent = nome;
        choixSupp.appendChild(optionSupp);


    }
    else (fals.innerHTML =  
        `<p class="bg-red-600 text-white px-4 py-2 rounded ">le nome est obligatouir !</p>`
    )
    setTimeout(() => {
        sucses="";
        fals.innerHTML = "";


    }, 1500);

})

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
    const passager = document.getElementById(nvplace)
    const oldSeats = document.getElementById('choix').value.trim();
    const vide = document.getElementById(oldSeats)

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
        <p class="text-xs text-black-700">${nvnome}</p>`;


    vide.className = "bg-white p-4 rounded shadow border border-black-200 cursor-pointer hover:bg-black-50";
    vide.innerHTML = `
        <div class="text-lg font-bold text-green-700">${oldSeats}</div>
        <p class="text-xs text-black-400">Libre</p>`;
})


supprition.addEventListener('submit', e => {
    e.preventDefault();

            succsus.innerHTML = `
                <p class="bg-green-600 text-white px-4 py-2 rounded">
                    Reservation supprimee avec succès !
                </p>
            `;
            setTimeout(() => {
        succsus.innerHTML = "";
    }, 1500);

});

function notification(id, stant) {
    const p = document.createElement('p');

    if (id === ajout) {
        if (stant === true) {
            p.className = "bg-green-600 text-white px-4 py-2 rounded";
            p.textContent = "Le siege est selectionne avec succes !";
        }
        else {
            p.className = "bg-red-600 text-white px-4 py-2 rounded";
            p.textContent = "Le nom est deja enregistre !";
        }

        return id.appendChild(p);
    }

    if (id === modification) {
        if (stant === true) {
            p.className = "bg-green-600 text-white px-4 py-2 rounded";
            p.textContent = "Modification reussie !";
        }
        else {
            p.className = "bg-red-600 text-white px-4 py-2 rounded";
            p.textContent = "echec de la modification !";
        }

        return id.appendChild(p);
    }

    if (id === supprition) {
        if (stant === true) {
            p.className = "bg-green-600 text-white px-4 py-2 rounded";
            p.textContent = "Réservation supprimée avec succès !";
        } else {
            p.className = "bg-red-600 text-white px-4 py-2 rounded";
            p.textContent = "Échec de la suppression !";
        }
    }

    setTimeout(() => {
        p.remove();
    }, 1500);
}