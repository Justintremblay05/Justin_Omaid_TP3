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

/* FIN variables globales */
// ##########################

/**
 * Débuter le jeu de mémoire (le bouton "Débuter" est cliqué). Cet événement est déjà associé au bon bouton de l'interface
 * car il a été créé dans la fonction afficherParametres() dans le fichier js/utils.js
 */
function debuterJeuMémoire() {

    let nbPairesElement = document.getElementById("nbPaires");
    let tempsElement = document.getElementById("temps");
    let difficulteElement = document.getElementById("diff");

    if (!nbPairesElement || !tempsElement || !difficulteElement) {
        console.error("Un ou plusieurs éléments nécessaires (#nbPaires, #temps, #diff) n'existent pas dans le DOM.");
        return;
    }

    let nbPaires = nbPairesElement.value;
    let temps = tempsElement.value;
    let difficulte = difficulteElement.value;

    console.log(`Nombre de paires : ${nbPaires}, Temps : ${temps}, Difficulté : ${difficulte}`);


    let div = document.getElementById("navigation");
    let titre = document.createElement("h2");
    titre.textContent = "Jeu de mémoire";
    titre.className = "flex justify-content-block";
    div.appendChild(titre);

    let cartes = document.createElement("div");
    cartes.id = "cartes";
    cartes.className = "d-flex flex-wrap justify-content-center ";

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
    let valeurtemps = document.getElementById("temps").value;
    timerElement.textContent = valeurtemps;

    intervalID = setInterval(decrementerTimer, 1000);
}

function decrementerTimer() {
    let timerValue = parseInt(document.getElementById("timer").textContent, 10);
    if (timerValue > 0) {
        timerValue--;
        document.getElementById("timer").textContent = timerValue;
    } else {

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

function finPartie() {
    if(pair === document.getElementById("nbPaires").value) {
        alert("Vous avez gagné !");
        clearInterval(intervalID);
    }
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
            if (pair === document.getElementById("nbPaires").value) {
                finPartie();
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
    alert("Déclanchement de la fonction terminerJeuMémoire()");
    // Todo : faire la logique
}


function init_jeu_memoire() {
    // On doiter vider le <main> et on affiche le jeu de mémoire
    let main = document.getElementById("main");
    main.innerHTML = "";
    // Affichage de son interface HTML (cartes, etc.) 
    // Voir la documentation de la fonction pour plus de détails
    // Exemple d'utilisation : 


    main.className = "grid container";
    let div1 = document.createElement("div");
    div1.className = "col-12"
    let div2 = document.createElement("div");
    div2.className = "col-12"
    div1.appendChild(afficherParametres("main", _paramètres));
    div2.appendChild(debuterJeuMémoire);
    main.appendChild(div1);
    main.appendChild(div2);
    tableauDesCartes = genererCartes(_paramètres.nbPaires);
}

// Ce fichier est inclu dans le fichier index.html et n'a pas besoin d'un addEventListener('load') car
// son point d'entrée init_jeu_memoire() sera appelé dans le fichier formulaire.js via la fonction afficherChoixJeu()