/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
'use strict';

/**
 * FONCTION FOURNIE : permet de faire une pause dans l'exécution du code. La fonction dans laquelle on appel attendre() doit être "async"
 * @param {*} ms milisecondes
 * @returns 
 */
function attendre(ms) {

	document.body.style.pointerEvents = "none"; // Bloque tous les clics
	setTimeout(function() {
		document.body.style.pointerEvents = "auto"; // Réactive après 2s
	}, ms);

    return new Promise(function(resolve) {
        setTimeout(resolve, ms);
    });
}

/**
 * FONCTION FOURNIE : permet de créer un tableau de cartes à partir d'un nombre de cartes (ex: 12 cartes = 6 paires)
 * Une carte est identifiée par une chaîne de caractères (ex: "carte-1", "carte-2", ...)
 * Sa copie est identifiée par la même chaîne de caractères suivie d'un "c" (ex: "carte-1c", "carte-2c", ...)
 * @param {number} nbCartes Le nombre de cartes totale du jeu (ex: 12 cartes = 6 paires)
 * @returns {array} Un tableau ALÉATOIRE contenant les identifiants de chaque carte (ex: ["carte-1", "carte-1c", "carte-2", "carte-2c", ...]) 
 */
function genererCartes(nbCartes)
{
	//Créer un tableau vide
	let tableau = [];

	// Remplir le tableau de chaque identifiant de carte, suivi de sa copie. Il y aura donc (nbCartes x2) au total
	// un indentifiant est simplement une string dans ce cas-ci. l'important est que chaque carte a un identifiant unique (y compris les copies)
	for(var i=1; i<=nbCartes;i++)
	{
		// Créer l'identification de cette carte et l'ajouter au tableau (exemple : "carte-1")
		tableau.push(`carte-${i}`);
		// Créer l'identification de la COPIE de carte et l'ajouter au tableau (exemple : "carte-1c")
		tableau.push(`carte-${i}c`);
	}

	// Trier de façon aléatoire tout le tableau
	tableau.sort(function () {
		return Math.random() - 0.5;
	});

	// Retourner ce tableau
	return tableau;
}


/**
 * FONCTION FOURNIE : permet de créer l'interface HTML des paramètres du jeu à un endroit précis de la page, à partir d'un id fourni d'un élément parent.
 * @param {string} idParent id de l'élément parent où l'on désire créer cette interface HTML
 * @param {object} params objet contenant les paramètres du jeu (cette variable existe déjà dans les variables globales fournies)
 */
function afficherParametres(idParent, params)
{
	let parent = document.getElementById(idParent);

	const divParams = document.createElement("div");
	divParams.className = "parametres";
	
	// Création Nombre de paires
	const divNbPaires = document.createElement("div");
	const lblNbPaires =  document.createElement("label");
	lblNbPaires.textContent = "Nombre de paires"
	const nbPaires = document.createElement("input");
	nbPaires.type="number";
	nbPaires.id = "nbPaires";
	nbPaires.name = "nbPaires";
	nbPaires.value = params.nbPaires;
	nbPaires.min="3";
	nbPaires.max="25";
	divNbPaires.append(lblNbPaires, nbPaires);

	// Création Temps
	const divTemps = document.createElement("div");
	const lblTemps =  document.createElement("label");
	lblTemps.textContent = "Temps (secondes)"
	const temps = document.createElement("input");
	temps.type="number";
	temps.id = "temps";
	temps.name = "temps";
	temps.value = params.temps;
	temps.min="10";
	temps.max="60";
	divTemps.append(lblTemps, temps);

	// Création Difficulté
	const divDiff = document.createElement("div");
	const lblDiff =  document.createElement("label");
	lblDiff.textContent = "Difficulté"
	const diff = document.createElement("select");
	diff.id = "diff";
	diff.name = "diff";
	const optFacile = document.createElement("option");
	optFacile.value = "Facile";
	optFacile.textContent = "Facile";
	const optDifficile = document.createElement("option");
	optDifficile.value = "Difficile";
	optDifficile.textContent = "Difficile";

	if(params.difficulté == "Facile")
	{
		optFacile.selected = true;
	}
	else
	{
		optDifficile.selected = true;
	}

	diff.append(optFacile,optDifficile);

	// Création Minuterie
	const divMinuterie = document.createElement("div");
	const lblMinuterie =  document.createElement("label");
	lblMinuterie.textContent = "Minuterie";
	const Minuterie = document.createElement("div");
	Minuterie.id = "timer";
	Minuterie.textContent = "0";
	divMinuterie.append(lblMinuterie,Minuterie);

	// Création du bouton "Débuter"
	const divButtonStart = document.createElement("div");
	const buttonStart = document.createElement("button");
	buttonStart.textContent = "Débuter";
	buttonStart.id = "startButton";
	buttonStart.addEventListener("click", debuterJeuMémoire, false);
	divButtonStart.appendChild(buttonStart);

	// Création du bouton "Terminer"
	const divButtonEnd = document.createElement("div");
	const buttonEnd = document.createElement("button");
	buttonEnd.textContent = "Terminer";
	buttonEnd.id = "endButton";
	buttonEnd.addEventListener("click", terminerJeuMémoire, false);
	divButtonEnd.appendChild(buttonEnd);
	

	// Ajout à l'interface
	divDiff.append(lblDiff, diff);
	divParams.append(divNbPaires, divTemps, divDiff, divMinuterie, divButtonStart, divButtonEnd);
	parent.appendChild(divParams);
}


