'use strict';


/* DÉBUT variables globales */ 
// ##########################



/* FIN variables globales */ 
// ##########################

function afficherChoixJeu()
{
	// Vide le <main> et affiche le choix du jeu
	// Il faut prévoir une image, un titre et une description pour chaque jeu
	// Il faut savoir quel jeu a été choisi par l'utilisateur, et ensuite appeler soit fonction init_jeu_memoire() ou init_quiz()
	// Ces fonctions sont le point d'entrée pour le jeu choisi par l'utilisateur et se trouvent respectivement 
	// dans les fichiers js/jeu_memoire.js et js/quiz.js
	// À la fin de cette fonction, on doit vider le <main> et afficher le jeu choisi par l'utilisateur
}

function validerPrenom(){
	let prenom = document.getElementById.value;

		if (prenom == "" || prenom === document.getElementById("nom").value) {
			return false;
		} 
		else{
			return true;
		}
}

function validerFormulaire()
{
	console.log('validerFormulaire() : à la fin de cette fonction, si tout est valide, on peut appeler afficherChoixJeu()');

	let courriel = document.getElementById("courriel").value;
	let confirmCourriel = document.getElementById("confirmCourriel").value;
	let regexCourriel = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	if (!(regexCourriel.test(courriel) && courriel === confirmCourriel)){
		alert("Le courriel doit être exacte dans les deux champs");
		return false;
	}

	let pseudo = document.getElementById("pseudo").value;
	let regexPseudo = /^[A-Za-zÀ-ÖØ-öø-ÿ]{3,25}$/;
	
	if (!regexPseudo.test(pseudo)) {
        alert("Le pseudo doit contenir uniquement des lettres entre 3 et 25.");
        return false;
    }
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

	let btnCommencer = document.getElementById("btnCommencer");
	btnCommencer.addEventListener("click", validerFormulaire);
	// Simple bouton pour passer le formulaire et aller au jeu de mémoire directement
	let btnInvite = document.getElementById("btnInvite");
	btnInvite.addEventListener("click", gererBtnInvite, false);
}

	
addEventListener('load', init_formulaire, false);