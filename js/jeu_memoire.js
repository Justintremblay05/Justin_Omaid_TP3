'use strict';
/* DÉBUT variables globales */
// ##########################
// Tableaux pour contenir les identifiants des cartes du jeu de mémoire.
// Voir un exemple d'utilisation dans la fonction init_jeu_memoire() au bas de ce fichier
let tableauDesCartes = [];
let cartesSelectionnées = [];
let tableauImages = [
    "../images/jeu/AatroxSquare.webp",
    "../images/jeu/AhriSquare.webp",
    "../images/jeu/AkaliSquare.webp",
    "../images/jeu/AkshanSquare.webp",
    "../images/jeu/AlistarSquare.webp",
    "../images/jeu/AmbessaSquare.webp",
    "../images/jeu/AmumuSquare.webp",
    "../images/jeu/AniviaSquare.webp",
    "../images/jeu/AnnieSquare.webp",
    "../images/jeu/ApheliosSquare.webp",
    "../images/jeu/AsheSquare.webp",
    "../images/jeu/Aurelion_SolSquare.webp",
    "../images/jeu/AuroraSquare.webp",
    "../images/jeu/AzirSquare.webp",
    "../images/jeu/BardSquare.webp",
    "../images/jeu/Bel%27VethSquare.webp",
    "../images/jeu/BlitzcrankSquare.webp",
    "../images/jeu/BrandSquare.webp",
    "../images/jeu/BraumSquare.webp",
    "../images/jeu/CaitlynSquare.webp",
    "../images/jeu/CamilleSquare.webp",
    "../images/jeu/CassiopeiaSquare.webp",
    "../images/jeu/Cho%27GathSquare.webp",
    "../images/jeu/CorkiSquare.webp",
    "../images/jeu/DariusSquare.webp"
];
console.log("tableauImages : ", tableauImages);
// Paramètres par défaut du jeu de mémoire. Ce sont les paramètres qui seront affichés à l'utilisateur la première fois
// Voir un exemple d'utilisation dans la fonction init_jeu_memoire() au bas de ce fichier
let _paramètres = {
    nbPaires: 12,
    temps: 60,
    age: 30,
    difficulté: "Facile"
};

let intervalID;
let main = document.getElementById("main");

/* FIN variables globales */
// ##########################

/**
 * Débuter le jeu de mémoire (le bouton "Débuter" est cliqué). Cet événement est déjà associé au bon bouton de l'interface
 * car il a été créé dans la fonction afficherParametres() dans le fichier js/utils.js
 */
function debuterJeuMémoire() {
    let cartes = document.getElementById("cartes");
    if (!cartes) {
        cartes = document.createElement("div");
        cartes.id = "cartes";
        cartes.className = "d-flex flex-wrap justify-content-center";
    }

    cartes.innerHTML = "";

    let nbPairesElement = document.getElementById("nbPaires");
    let tempsElement = document.getElementById("temps");
    let difficulteElement = document.getElementById("diff");

    if (!nbPairesElement || !tempsElement || !difficulteElement) {
        console.error("Un ou plusieurs éléments nécessaires (#nbPaires, #temps, #diff) n'existent pas dans le DOM.");
        return;
    }

    let nbPaires = parseInt(nbPairesElement.value, 10);
    let temps = parseInt(tempsElement.value, 10);
    let difficulte = difficulteElement.value;
    // if (difficulte === "Difficile") {
    //     main.
    // }

    console.log(`Nombre de paires : ${nbPaires}, Temps : ${temps}, Difficulté : ${difficulte}`);

    let lesCartes = [];

    for (let i = 0; i < nbPaires; i++) {
        let carte = document.createElement("img");
        carte.src = "../images/Icon.jpg";
        carte.className = "carte bg-black border border-dark rounded m-2";
        carte.style.width = "100px";
        carte.dataset.index = i;
        carte.dataset.image = tableauImages[i];
        carte.id = `carte-${i}`;

        let double = document.createElement("img");
        double.src = "../images/Icon.jpg";
        double.className = "carte bg-black border border-dark rounded m-2";
        double.style.width = "100px";
        double.dataset.index = i;
        double.dataset.image = tableauImages[i];
        double.id = `carte-${i}A`;

        carte.addEventListener("click", gererClickCarte);
        double.addEventListener("click", gererClickCarte);

        lesCartes.push(carte);
        lesCartes.push(double);
    }

    melangerElements(lesCartes);

    lesCartes.forEach((carte) => {
        cartes.appendChild(carte);
    });

    main.appendChild(cartes);

    let timerElement = document.getElementById("timer");
    timerElement.textContent = temps;

    intervalID = setInterval(decrementerTimer, 1000);
}

function decrementerTimer() {
    let timerElement = document.getElementById("timer");
    let timerValue = parseInt(timerElement.textContent, 10);

    if (timerValue > 0) {
        timerValue--;
        timerElement.textContent = timerValue;
    } else {
        console.log("Le timer est fini");
        clearInterval(intervalID);
        terminerJeuMémoire();
    }
}

function melangerElements(tableau) {
    let currentIndex = tableau.length;

    while (currentIndex !== 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [tableau[currentIndex], tableau[randomIndex]] = [
            tableau[randomIndex],
            tableau[currentIndex],
        ];
    }

    return tableau;
}

let verrouillage = false;
let pair = 0;
function gererClickCarte(e) {
    if (verrouillage) {
        console.log("Action bloquée : Attendez que les cartes soient retournées.");
        return;
    }

    let carte = e.currentTarget;

    if (cartesSelectionnées.includes(carte)) {
        console.log("Vous avez cliqué deux fois sur la même carte !");
        return;
    }

    carte.src = carte.dataset.image;

    cartesSelectionnées.push(carte);

    if (cartesSelectionnées.length === 2) {
        let carte1 = cartesSelectionnées[0];
        let carte2 = cartesSelectionnées[1];

        verrouillage = true;
        
        if (carte1.dataset.index === carte2.dataset.index) {
            console.log("Les cartes correspondent !");
            cartesSelectionnées = [];
            verrouillage = false;
            pair++;
            if (pair === parseInt(document.getElementById("nbPaires").value)) {
                terminerJeuMémoire();
            }
        } else {
            console.log("Les cartes ne correspondent pas !");
            setTimeout(() => {
                carte1.src = "../images/Icon.jpg";
                carte2.src = "../images/Icon.jpg";
                cartesSelectionnées = [];
                verrouillage = false;
            }, 1000);
        }
    }
}

/**
 * Terminer le jeu (le bouton Terminer est cliqué). Cet événement est déjà associé au bon bouton de l'interface
 * car il a été créé dans la fonction afficherParametres() dans le fichier js/utils.js
 */
function terminerJeuMémoire() {
    let nbPaires = parseInt(document.getElementById("nbPaires").value, 10);
    console.log(`Paires trouvées : ${pair}, Nombre de paires total : ${nbPaires}`);

    if (pair === nbPaires) {
        console.log("Vous avez gagné !");
        Gagner();
    } else {
        console.log("Vous avez perdu !");
        Perdre();
    }
}


function init_jeu_memoire() {
    // On vide le <main> et on affiche le jeu de mémoire
    main.innerHTML = "";

    // Ajout des classes pour le style
    main.className = "grid container";

    // Création des divs pour les paramètres et le bouton
    let div1 = document.createElement("div");
    div1.className = "col-12";

    let div2 = document.createElement("div");
    div2.className = "col-12";

    // Appel de la fonction afficherParametres
    afficherParametres("main", _paramètres); // Appel direct sans appendChild

    // Ajout des divs au <main>
    main.appendChild(div1);
    main.appendChild(div2);

    // Génération des cartes
    tableauDesCartes = genererCartes(_paramètres.nbPaires);
}

// Ce fichier est inclu dans le fichier index.html et n'a pas besoin d'un addEventListener('load') car
// son point d'entrée init_jeu_memoire() sera appelé dans le fichier formulaire.js via la fonction afficherChoixJeu()