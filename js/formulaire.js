'use strict';


/* DÉBUT variables globales */ 
// ##########################
let prenom = document.getElementById("prenom");
let nom = document.getElementById("nom");
let courriel = document.getElementById("courriel");
let confirmation = document.getElementById("confirmation");
let pseudo = document.getElementById("pseudo");




/* FIN variables globales */ 
// ##########################

function validerCourriel(courriel) {
	let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	let msgErreur = document.getElementById("msgErreurMail");
	msgErreur.textContent = "";
	if (regex.test(courriel)) {
		return true;
	}
	else{
        msgErreur.textContent = "Le courriel n'est pas valide.";
		return false;
	}
}
function validerConfirmation(confirmation) {
	let msgErreur = document.getElementById("msgErreurConfirmation");
	msgErreur.textContent = "";
	if (confirmation.value === courriel.value) {
		return true;
	}
	else{
		msgErreur.textContent = "Les courriels ne correspondent pas.";
		return false;
	}
}

function validerPseudo(pseudo) {
	let regex = /^[a-zA-Z]{3,25}$/;
	let msgErreur = document.getElementById("msgErreurPseudo");
	msgErreur.textContent = "";
	if (regex.test(pseudo)) {
		return true;
	}
	else{
		msgErreur.textContent = "Le pseudo doit contenir entre 3 et 25 caractères.";
		return false;
	}
}

function afficherChoixJeu()
{
	// Vide le <main> et affiche le choix du jeu
	// Il faut prévoir une image, un titre et une description pour chaque jeu
	// Il faut savoir quel jeu a été choisi par l'utilisateur, et ensuite appeler soit fonction init_jeu_memoire() ou init_quiz()
	// Ces fonctions sont le point d'entrée pour le jeu choisi par l'utilisateur et se trouvent respectivement 
	// dans les fichiers js/jeu_memoire.js et js/quiz.js
	// À la fin de cette fonction, on doit vider le <main> et afficher le jeu choisi par l'utilisateur
}

function validerFormulaire()
{
	console.log('validerFormulaire() : à la fin de cette fonction, si tout est valide, on peut appeler afficherChoixJeu()');
}

function gererBtnInvite()
{
	// Test direct au quiz
	// init_quiz();

	// Test direct au jeu de mémoire
	// init_jeu_memoire();
}


function init_formulaire() {

	// Simple bouton pour passer le formulaire et aller au jeu de mémoire directement
	let btnInvite = document.getElementById("btnInvite");
	btnInvite.addEventListener("click", gererBtnInvite, false);

	let btnSoumettre = document.getElementById("btnSoumettre");
	btnSoumettre.addEventListener("click", validerFormulaire, false);
}

	
addEventListener('load', init_formulaire, false);