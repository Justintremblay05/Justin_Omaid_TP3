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
}

	
addEventListener('load', init_formulaire, false);