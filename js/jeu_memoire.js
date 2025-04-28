'use strict';
/* DÉBUT variables globales */ 
// ##########################
// Tableaux pour contenir les identifiants des cartes du jeu de mémoire.
// Voir un exemple d'utilisation dans la fonction init_jeu_memoire() au bas de ce fichier
let tableauDesCartes = [];

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
    alert("Déclenchement de la fonction debuterJeuMémoire()");

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

    let main = document.getElementById("main");
    main.innerHTML = "";

    let div = document.getElementById("navigation");
    let titre = document.createElement("h2");
    titre.textContent = "Jeu de mémoire";
    titre.className = "flex justify-content-block";
    div.appendChild(titre);

    let cartes = document.createElement("div");
    cartes.id = "cartes";
    cartes.className = "d-flex flex-wrap justify-content-center";

    for (let i = 0; i < nbPaires; i++) {
        let carte = document.createElement("img");
        carte.src = "../images/Icon.jpg";
        carte.className = "carte bg-black border border-dark rounded m-2";
        carte.style.width = "100px";
        carte.dataset.index = i;
        carte.id = `carte-${i}`;

        let double = document.createElement("img");
        double.className = "carte bg-black border border-dark rounded m-2";
        double.style.width = "100px";
        double.dataset.index = i;
        carte.id = `carte-${i}A`;

        carte.addEventListener("click", gererClickCarte);
        double.addEventListener("click", gererClickCarte);

        cartes.appendChild(carte);
        cartes.appendChild(double);
    }

    main.appendChild(cartes);
}

function gererClickCarte(e){
    console.log("Carte cliquée : ", e.currentTarget.dataset.index);
}

/**
 * Terminer le jeu (le bouton Terminer est cliqué). Cet événement est déjà associé au bon bouton de l'interface
 * car il a été créé dans la fonction afficherParametres() dans le fichier js/utils.js
 */
function terminerJeuMémoire()
{
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

    

	afficherParametres("main",_paramètres);
	tableauDesCartes = genererCartes(_paramètres.nbPaires);
    console.log("paramètres : ", _paramètres);
	console.log("tableauDesCartes : ", tableauDesCartes);
}

// Ce fichier est inclu dans le fichier index.html et n'a pas besoin d'un addEventListener('load') car
// son point d'entrée init_jeu_memoire() sera appelé dans le fichier formulaire.js via la fonction afficherChoixJeu()