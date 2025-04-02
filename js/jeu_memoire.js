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
function debuterJeuMémoire()
{
	alert("Déclanchement de la fonction debuterJeuMémoire()");
	// Todo : faire la logique
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
	// Affichage de son interface HTML (cartes, etc.) 
	// Voir la documentation de la fonction pour plus de détails
	// Exemple d'utilisation : 
	afficherParametres("main",_paramètres);
	tableauDesCartes = genererCartes(_paramètres.nbPaires * 2);

	console.log("tableauDesCartes : ", tableauDesCartes);


}

// Ce fichier est inclu dans le fichier index.html et n'a pas besoin d'un addEventListener('load') car
// son point d'entrée init_jeu_memoire() sera appelé dans le fichier formulaire.js via la fonction afficherChoixJeu()