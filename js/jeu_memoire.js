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
let body = document.getElementById("body");

let nbviesrestant = 5;
const musiquejeu = new Audio("../sons/jeu.mp3");
const musiqueVictoire = new Audio("sons/victoire.mp3");
const musiqueDefaite = new Audio("sons/defaite.mp3");
const musiqueBon = new Audio("../sons/bon.mp3");
const musiqueMauvais = new Audio("../sons/mauvais.mp3");
/* FIN variables globales */
// ##########################

/**
 * Débuter le jeu de mémoire (le bouton "Débuter" est cliqué). Cet événement est déjà associé au bon bouton de l'interface
 * car il a été créé dans la fonction afficherParametres() dans le fichier js/utils.js
*/

///soccupe de faire apparaitre les cartes et de gerer le jeu
///genere les cartes et demarre le jeu
function debuterJeuMémoire() {
    if (intervalID) {
        clearInterval(intervalID);
    }
    musiquejeu.currentTime = 0;
    musiquejeu.play();
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
    let nbPaires = parseInt(nbPairesElement.value, 10);
    let temps = parseInt(tempsElement.value, 10);
    let difficulte = difficulteElement.value;

    if (!nbPairesElement || !tempsElement || !difficulteElement) {
        console.error("Un ou plusieurs éléments nécessaires (#nbPaires, #temps, #diff) n'existent pas dans le DOM.");
        return;
    }
    
    if (difficulte === "Difficile") {
        
        nbPaires = 10;
        temps = 40;

        body.style.backgroundImage = "url('../images/bg.jpg')";
        body.style.backgroundSize = "cover";
        body.style.backgroundPosition = "center";
        body.style.backgroundRepeat = "no-repeat";
        body.style.minHeight = "100vh";

        let nbvies = document.getElementById("nbvies");
        if (nbvies) {
            nbvies.remove();
        }

        nbvies = document.createElement("div");
        nbvies.id = "nbvies";
        nbvies.className = "d-flex flex-wrap justify-content-center";

        let nbimages = document.createElement("img");
        nbimages.id = "imgvies";
        nbimages.src = "../images/" + nbviesrestant + ".png";
        nbimages.className = "border border-dark rounded";

        let parametres = document.getElementById("parametres");
        parametres.className = "bg-light border border-dark rounded m-2";

        nbvies.appendChild(nbimages);
        main.appendChild(nbvies);
         
    }

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

    for (let i = 0; i < lesCartes.length; i++) {
        cartes.appendChild(lesCartes[i]);
    }

    main.appendChild(cartes);

    let timerElement = document.getElementById("timer");
    timerElement.textContent = temps;

    intervalID = setInterval(decrementerTimer, 1000);
}

///fait diminuer le timer
///et verifie si il est a 0 pour arreter le jeu
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

///Melanger les cardes pour pas qu'ils soit en ordre
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
///Gere tout ce qui peut arriver après le click sur une carte
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
            musiqueBon.play();
        } 
        else {
            console.log("Les cartes ne correspondent pas !");
            musiqueMauvais.play();
            setTimeout(function () {
                carte1.src = "../images/Icon.jpg";
                carte2.src = "../images/Icon.jpg";
                cartesSelectionnées = [];
                verrouillage = false;
            }, 500);

            let difficulteElement = document.getElementById("diff");
            let difficulte = difficulteElement.value;
            if (difficulte === "Difficile") {
                nbviesrestant--;
            
                let nbvies = document.getElementById("nbvies");
                if (!nbvies) {
                    nbvies = document.createElement("div");
                    nbvies.id = "nbvies";
                    main.appendChild(nbvies);
                }
                
                let nbimages = document.getElementById("imgvies");
                if (!nbimages) {
                    nbimages = document.createElement("img");
                    nbimages.id = "imgvies";
                    nbimages.className = "border border-dark rounded";
                    nbvies.appendChild(nbimages);
                }
            
                let cheminImage = "../images/" + nbviesrestant + ".png";
                nbimages.src = cheminImage;
            
                nbimages.onerror = function () {
                    console.error("Image introuvable : " + cheminImage);
                };
            
                if (nbviesrestant === 0) {
                    console.log("Vous avez perdu !");
                    clearInterval(intervalID);
                    terminerJeuMémoire();
                }
            }
        }
    }
}

/**
 * Terminer le jeu (le bouton Terminer est cliqué). Cet événement est déjà associé au bon bouton de l'interface
 * car il a été créé dans la fonction afficherParametres() dans le fichier js/utils.js
 */
function terminerJeuMémoire() {
    musiquejeu.pause();
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

function Gagner(){
	let main = document.getElementById("main");
	main.innerHTML = "";
	let div = document.createElement("div");
	div.className = "text-center";
	let h2 = document.createElement("h2");
	h2.textContent = "Vous avez gagné !";
	div.appendChild(h2);
	let img = document.createElement("img");
	img.src = "../images/victory.jpg";
	img.alt = "Résultat";
	img.className ="img animate__animated animate__bounceIn";
	div.appendChild(img);
	main.appendChild(div);
	musiqueVictoire.play();
}

function Perdre(){
	let main = document.getElementById("main");
	main.innerHTML = "";
	let div = document.createElement("div");
	div.className = "text-center";
	let h2 = document.createElement("h2");
	h2.textContent = "Vous avez perdu !";
	div.appendChild(h2);
	let img = document.createElement("img");
	img.src = "../images/defeat.jpg";
	img.alt = "Résultat";
	img.className ="img animate__animated animate__bounceIn";
	div.appendChild(img);
	main.appendChild(div);
	musiqueDefaite.play();
}

function init_jeu_memoire() {
    main.innerHTML = "";

    main.className = "grid container";

    afficherParametres("main", _paramètres);

    tableauDesCartes = genererCartes(_paramètres.nbPaires);
}

// Ce fichier est inclu dans le fichier index.html et n'a pas besoin d'un addEventListener('load') car
// son point d'entrée init_jeu_memoire() sera appelé dans le fichier formulaire.js via la fonction afficherChoixJeu()