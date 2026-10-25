const { push } = require("node:stream/iter");

const form = document.querySelector('#formule') 

form.addEventListener('submit', e => {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const place = document.getElementById("availbelseats").value;


    if (place !== "" && nome !== "") {
        push.
        const seats = document.getElementById(place)
        console.log(seats)

        seats.className = "bg-red-100 p-4 rounded shadow border border-red-200";
        seats.innerHTML = `
        <div class="text-lg font-bold text-red-700">${place}</div>
        <p class="text-xs text-black-700">${nome}</p>`;
        document.getElementById("availbelseats").querySelector(`option[value="${place}"]`).remove();
    }
    else(alert("Choix invalide"))
})

// function affiche(params) {
    
// }