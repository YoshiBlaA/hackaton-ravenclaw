
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
const formEl = document.getElementById("formAlbum");
const listValiras = [
    {
        "name": "Michael Corner",
        "wand": {
            "wood": "",
            "core": "",
            "length": null
        }
    },
    {
        "name": "Filius Flitwick",
        "wand": {
            "wood": "",
            "core": "",
            "length": null
        }
    },
    {
        "name": "Zacharias Smith",
        "wand": {
            "wood": "",
            "core": "",
            "length": null,
            "img": "assets/sauco.jpg"
        }
    }
];

console.log("listValiras ", listValiras);


/* ================== Function varitas ================== */
function getCardsVaritas(listValiras) {

    for (const varita in listValiras) {

    }

};

