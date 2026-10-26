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
                falsNome.innerHTML =
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
            place: place
        });
        console.log(place)
        const index = x.indexOf(place);

        if (index !== -1) {
            x.splice(index, 1);
        }
        console.log(x)
        console.log(ticket)
        // x.forEach(a => {

        seats.className = "bg-red-100 p-4 rounded shadow border border-red-200";
        seats.innerHTML = `
        <div class="text-lg font-bold text-red-700">${place}</div>
        <p class="text-xs text-black-700">${nome}</p>`;
        document.getElementById("availbelseats").querySelector(`option[value="${place}"]`).remove();

        totalp.innerHTML = `
        <p>• places totales: ${totales}</p>
        <p class="text-green-600 font-semibold">• ${Disponibles} Disponibles</p>
        <p>• Recette:  ${Recette}DH</p>`
        succsus.innerHTML =
            `<p class="bg-green-600 text-white px-4 py-2 rounded ">le siege est selectioné avec sucses</p>`


        totales++;
        Recette += 80;
        Disponibles--;


    }
    else (fals.innerHTML =
        `<p class="bg-red-600 text-white px-4 py-2 rounded ">le nome est obligatouir !</p>`
    )
    setTimeout(() => {
        succsus.innerHTML = "";
        fals.innerHTML = "";
        

    }, 1500);
})
function list() {

    console.log(ticket)
    ticket.forEach(ticket => {
        const text = ticket.nome + " - Siège: " + ticket.place;

        // Liste de modification
        const option = document.createElement("option");
        option.value = ticket.place;
        option.textContent = text;
        modification.appendChild(option);
        console.log(option)

        // Liste de suppression
        const suppop = document.createElement("option");
        suppop.value = ticket.place;
        suppop.textContent = text;
        modification.appendChild(suppop);
    });
}


modification.addEventListener('submit', e => {
    e.preventDefault();


})
supprition.addEventListener('submit', e => {
    e.preventDefault();
    const passenger = document.createElement("p");
    passenger.className = "text-xs text-black-700";
    passenger.textContent = nome;

    seats.replaceChildren(number, passenger);
})
