'use strict';


/* DÉBUT variables globales */ 
// ##########################
let estValide = true;
let champsprenom = document.getElementById("prenom");
let champsnom = document.getElementById("nom");
let champscourriel = document.getElementById("courriel");
let champsconfirmation = document.getElementById("confirmation");
let champspseudo = document.getElementById("pseudo");


/* FIN variables globales */ 
// ##########################
function validerPrenom(prenom) {
	let msgErreur = document.getElementById("msgErreurPrenom");
	msgErreur.textContent = "";
	if(prenom.trim().length === 0) {
		msgErreur.textContent = "Le prénom est requis.";
		estValide = false;
	}
}
function validerNom(nom) {
	let msgErreur = document.getElementById("msgErreurNom");
	msgErreur.textContent = "";
	if(nom.trim().length === 0) {
		msgErreur.textContent = "Le nom est requis.";
		estValide = false;
	}
}
function validerCourriel(courriel) {
	let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	let msgErreur = document.getElementById("msgErreurMail");
	msgErreur.textContent = "";
	if (!regex.test(courriel)) {
		msgErreur.textContent = "Le courriel est invalide.";
		estValide = false;
	}
}
function validerConfirmation(confirmation) {
	let msgErreur = document.getElementById("msgErreurConfirmation");
	msgErreur.textContent = "";
	if (!(confirmation.value === courriel.value)) {
		
		msgErreur.textContent = "Les courriels ne correspondent pas.";
		estValide = false;
	}
}

function validerPseudo(pseudo) {
	let regex = /^[a-zA-Z]{3,25}$/;
	let msgErreur = document.getElementById("msgErreurPseudo");
	msgErreur.textContent = "";
	if (regex.test(pseudo)) {
		msgErreur.textContent = "Le pseudo doit contenir entre 3 et 25 caractères.";
		estValide = false;
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

function validerFormulaire(e)
{
	e.preventDefault();
	if(!validerNom) {
		alert("Le formulaire est valide !");
	}

	console.log('validerFormulaire() : à la fin de cette fonction, si tout est valide, on peut appeler afficherChoixJeu()');
	afficherChoixJeu();
	return true;
}

function gererBtnInvite()
{
	// Test direct au quiz
	// init_quiz();

	// Test direct au jeu de mémoire
	// init_jeu_memoire();
}


function init_formulaire() {

	champsnom.addEventListener("input", validerNom);

	// Simple bouton pour passer le formulaire et aller au jeu de mémoire directement
	let btnInvite = document.getElementById("btnInvite");
	btnInvite.addEventListener("click", gererBtnInvite, false);

	let btnSoumettre = document.getElementById("btnSoumettre");
	btnSoumettre.addEventListener("click", validerFormulaire, false);
	
}

	
addEventListener('load', init_formulaire);