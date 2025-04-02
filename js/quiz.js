'use strict';

// /* DÉBUT variables globales */
// 

// Variables globale qui contient les données du quiz
// Il s'agit d'un tableau d'objets, chaque objet contient une question, un tableau de réponses et l'indice de la bonne réponse
// Vous remplacer son contenu par votre propre quiz, vos questions et réponses, etc.
// Vous pouvez même modifier entièrement la structure de cette variable si vous le désirez
let donnees = [
    {
        question: "À quoi sert un aria-label?",
        réponses: [
            "Ajouter du contenu sur une balise pour aider les lecteurs d'écran",
            "À rien",
            "Je ne sais pas"
        ],
        réponse: 0
    },
    {
        question: "HTML vient de :",
        réponses: [
            "Hyper Typo Meta Lol",
            "Hypertext markup language",
            "Je ne sais pas"
        ],
        réponse: 1
    }
];



//* FIN variables globales */	
// // ##########################


function init_quiz() {

	// On doiter vider le <main> et on affiche le quiz, à partir de votre source de données "donnees", qui est une variable globale
	// Vous remplacer son contenu par le contenu de votre quiz, vos questions et réponses, etc.
	console.log("init_quiz() : initialisation du quiz");
	console.log("donnees : ", donnees);
	

}


// Ce fichier est inclu dans le fichier index.html et n'a pas besoin d'un addEventListener('load') car
// son point d'entrée init_quiz() sera appelé dans le fichier formulaire.js via la fonction afficherChoixJeu()