
import { API_HECHIZOS } from "./env.js";
import { API_POCIONES } from "./env.js";
import { API_PERSONAJES } from "./env.js";


export async function getSpells() {
    const response = await fetch(API_HECHIZOS);
    const data = await response.json();
    console.log(data);
}

export async function getPotions() {
    const response = await fetch(API_POCIONES);
    const data = await response.json();
    console.log(data.data);
}

export async function getCharacters() {
    const response = await fetch(API_PERSONAJES);
    const data = await response.json();
    console.log(data);
}


getSpells();
getPotions();
getCharacters();



/* ================== Variables varitas ================== */
let listValiras = [
    {
        "name": "Michael Corner",
        "wood": "Manzano",
        "core": "Cuerno de unicornio",
        "lengthV": "assets/vatia1.jpg"

    },
    {
        "name": "Filius Flitwick",
        "wood": "",
        "core": "Pluma de Fenix",
        "lengthV": "assets/vatia2.jpg"
    },
    {
        "name": "Zacharias Smith",
        "wood": "Sauce",
        "core": "",
        "lengthV": null,
        "img": "assets/vatia3.jpg"

    }
];
const cardsVaritas = document.getElementById("cardsVaritas");

console.log("listValiras ", listValiras);


/* ================== Function varitas ================== */
const createCard = (varita, htmlElement) => {
    const card = `<div class="col">
                <div class="card cardVarita" style="max-width: 18rem;">
                    <div class="card-header cardVaritaEncabezado">
                        <h4> ${varita.name} </h4>
                    </div>
                    <div class="divImgFormat">
                        <img src="${varita.img}" class="rounded float-start imgVarita" alt="...">
                    </div>

                    <div class="card-body ">
                        <h5 class="card-title">Descripcion:</h5>
                        <p class="card-text">
                        <ul>
                            <li> Nucleo: ${varita.core}</li>
                            <li> Madera:  ${varita.wood} </li>
                            <li> Largo:  ${varita.lengthV} </li>
                            <li> Precio: $ 32.00</li>
                        </ul>
                        </p>
                    </div>
                    <div class="card-footer cardVaritaPie">
                        <button type="button" class="btn btn-warning btnFormat ">Comprar</button>
                    </div>
                </div>
            </div>`;
    htmlElement.insertAdjacentHTML("beforeend", card);
};


function getCardsVaritas(listValiras) {
    listValiras.map((varita) => createCard(varita, cardsVaritas));
};

getCardsVaritas(listValiras);