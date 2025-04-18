'use strict';


/* DÉBUT variables globales */ 
// ##########################

/* FIN variables globales */ 
// ##########################
function validerPrenom() {
	let prenom = document.getElementById("prenom").value;
	document.getElementById("msgErreurPrenom").textContent = "";
	if(prenom === "") {
		document.getElementById("msgErreurPrenom").textContent = "Le prénom est requis.";
		return  false;
	}
	if (prenom === document.getElementById("nom").value){
		document.getElementById("msgErreurPrenom").textContent = "Le prénom doit être différent du nom";
		return false;
	}
	return true;
}
function validerNom() {
	let nom = document.getElementById("nom").value;
	document.getElementById("msgErreurNom").textContent = "";
	if(nom === "") {
		document.getElementById("msgErreurNom").textContent = "Le nom est requis.";
		return false;
	}
	if (nom === document.getElementById("prenom").value){
		document.getElementById("msgErreurNom").textContent = "Le nom doit être différent du prénom";
		return false;
	}
	return true;
}
function validerCourriel() {
    let courriel = document.getElementById("mail").value;
    let regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    document.getElementById("msgErreurMail").textContent = "";
    if (!regex.test(courriel)) {
        document.getElementById("msgErreurMail").textContent = "Le courriel est invalide.";
        return false;
    }
    return true;
}
function validerConfirmation() {
	let confirmation = document.getElementById("confirmation").value;
	document.getElementById("msgErreurConfirmation").textContent = "";
	if (!(confirmation === document.getElementById("mail").value)) {
		document.getElementById("msgErreurConfirmation").textContent = "Les courriels ne correspondent pas.";
		return false;
	}
		return true;
}

function validerPseudo() {
	let pseudo = document.getElementById("pseudo").value;
	let regex = /^[a-zA-Z0-9._-]{3,20}$/;
	document.getElementById("msgErreurPseudo").textContent = "";
	if (!regex.test(pseudo)) {
		document.getElementById("msgErreurPseudo").textContent = "Le pseudo doit contenir entre 3 et 25 caractères.";
		return false;
	}
	return true;
}


function afficherChoixJeu()
{
	// Vide le <main> et affiche le choix du jeu
	document.querySelector('main').innerHTML = '';
	document.getElementById('pseudoespace').textContent = pseudo;
	// Il faut prévoir une image, un titre et une description pour chaque jeu
	///Jeu mémoire
	let jeuMemoire = document.createElement('div');
	let imgMemoire = document.createElement('img');
	imgMemoire.src = 'images/img_jeu_memoire.png';
	imgMemoire.alt = 'Jeu de mémoire';
	// Il faut savoir quel jeu a été choisi par l'utilisateur, et ensuite appeler soit fonction init_jeu_memoire() ou init_quiz()
	// Ces fonctions sont le point d'entrée pour le jeu choisi par l'utilisateur et se trouvent respectivement 
	// dans les fichiers js/jeu_memoire.js et js/quiz.js
	// À la fin de cette fonction, on doit vider le <main> et afficher le jeu choisi par l'utilisateur
}

function validerFormulaire(e)
{
	document.getElementById('pseudoespace').textContent = document.getElementById("pseudo").value;

	e.preventDefault();
	if(!validerPrenom() || !validerNom() || !validerCourriel() || !validerConfirmation() || !validerPseudo()) {
		
		return false;
	}

	console.log('validerFormulaire() : à la fin de cette fonction, si tout est valide, on peut appeler afficherChoixJeu()');
	afficherChoixJeu();
}

function afficherChoixJeu()
{
	// Vide le <main> et affiche le choix du jeu
	document.querySelector('main').innerHTML = '';
	// Il faut prévoir une image, un titre et une description pour chaque jeu
	///Jeu mémoire
	let jeuMemoire = document.createElement('div');
	let imgMemoire = document.createElement('img');
	imgMemoire.src = 'images/img_jeu_memoire.png';
	imgMemoire.alt = 'Jeu de mémoire';
	// Il faut savoir quel jeu a été choisi par l'utilisateur, et ensuite appeler soit fonction init_jeu_memoire() ou init_quiz()
	// Ces fonctions sont le point d'entrée pour le jeu choisi par l'utilisateur et se trouvent respectivement 
	// dans les fichiers js/jeu_memoire.js et js/quiz.js
	// À la fin de cette fonction, on doit vider le <main> et afficher le jeu choisi par l'utilisateur
}

function gererBtnInvite()
{
	document.getElementById('pseudoespace').textContent = "invité";

	afficherChoixJeu();
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

	document.getElementById("nom").addEventListener("blur", validerNom);
    document.getElementById("prenom").addEventListener("blur", validerPrenom);
	document.getElementById("mail").addEventListener("blur", validerCourriel);
	document.getElementById("confirmation").addEventListener("blur", validerConfirmation);
	document.getElementById("pseudo").addEventListener("blur", validerPseudo);
	
}

	
addEventListener('load', init_formulaire);