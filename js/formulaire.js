'use strict';


/* DÉBUT variables globales */ 
// ##########################

/* FIN variables globales */ 
// ##########################
function validerPrenom() {
	let prenom = document.getElementById("prenom").value;
	let msgErreur = document.getElementById("msgErreurPrenom").textContent = "";
	if(prenom.trim().length === 0) {
		msgErreur.textContent = "Le prénom est requis.";
		return  false;
	}
	if (prenom === document.getElementById("nom").value){
		msgErreur.textContent = "Le prénom doit être différent du nom";
		return false;
	}
	return true;

}
function validerNom() {
	let nom = document.getElementById("nom").value;
	let msgErreur = document.getElementById("msgErreurNom").textContent = "";
	if(nom.trim().length === 0) {
		msgErreur.textContent = "Le nom est requis.";
		return false;
	}
	if (nom === document.getElementById("prenom").value){
		msgErreur.textContent = "Le nom doit être différent du prénom";
	}
	return true;
}
function validerCourriel() {
	let courriel = document.getElementById("courriel").value;
	let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	let msgErreur = document.getElementById("msgErreurMail").textContent = "";
	if (!regex.test(courriel)) {
		msgErreur.textContent = "Le courriel est invalide.";
		return false;
	}
	return true;
}
function validerConfirmation() {
	let confirmation = document.getElementById("confirmation");
	let msgErreur = document.getElementById("msgErreurConfirmation").textContent = "";
	if (!(confirmation.value === document.getElementById("courriel").value)) {
		msgErreur.textContent = "Les courriels ne correspondent pas.";
		return false;
	}
	return true;
}

function validerPseudo() {
	let pseudo = document.getElementById("pseudo").value;
	let regex = /^[a-zA-Z]{3,25}$/;
	let msgErreur = document.getElementById("msgErreurPseudo").textContent = "";
	if (!regex.test(pseudo)) {
		msgErreur.textContent = "Le pseudo doit contenir entre 3 et 25 caractères.";
		return false;
	}
	return true;
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
	if(!validerPrenom() || !validerNom ()|| !validerCourriel ()|| !validerConfirmation ()|| ! validerPseudo()) {
		alert("Le formulaire est invalide !");
		return false;
	}

	console.log('validerFormulaire() : à la fin de cette fonction, si tout est valide, on peut appeler afficherChoixJeu()');
	afficherChoixJeu();
	
}

function gererBtnInvite()
{
	// Test direct au quiz
	// init_quiz();

	// Test direct au jeu de mémoire
	// init_jeu_memoire();
}


function init_formulaire() {

	document.getElementById("nom").addEventListener("blur", validerNom);
    document.getElementById("prenom").addEventListener("blur", validerPrenom);
 

	// Simple bouton pour passer le formulaire et aller au jeu de mémoire directement
	let btnInvite = document.getElementById("btnInvite");
	btnInvite.addEventListener("click", gererBtnInvite, false);

	let btnSoumettre = document.getElementById("btnSoumettre");
	btnSoumettre.addEventListener("click", validerFormulaire, false);
	
}

	
addEventListener('load', init_formulaire);