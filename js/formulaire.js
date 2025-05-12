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

function validerFormulaire()
{
	if(!validerPrenom() || !validerNom() || !validerCourriel() || !validerConfirmation() || !validerPseudo()) {
		
		return false;
	}

	console.log('validerFormulaire() : à la fin de cette fonction, si tout est valide, on peut appeler afficherChoixJeu()');
	afficherChoixJeu();
}

function afficherChoixJeu() {

    
    let main = document.getElementById("main");
    main.innerHTML = "";
    main.className = "d-flex justify-content-around";

    let principal = document.createElement("div");
    principal.id = "principal";
    principal.className = "row fade-in";

    let div2 = document.createElement("div");
    div2.className = "col-6";
    let titreMemoire = document.createElement("h3");
    titreMemoire.textContent = "Jeu de mémoire";
    div2.appendChild(titreMemoire);
    let imgMemoire = document.createElement("img");
    imgMemoire.src = "../images/memoire.png";
    div2.appendChild(imgMemoire);
    let descriptionMemoire = document.createElement("p");
    div2.appendChild(descriptionMemoire);

    let div3 = document.createElement("div");
    div3.className = "col-6";
    let titreQuiz = document.createElement("h3");
    titreQuiz.textContent = "Jeu de quiz";
    div3.appendChild(titreQuiz);
    let imgQuiz = document.createElement("img");
    imgQuiz.src = "../images/quiz.png";
    div3.appendChild(imgQuiz);
    let descriptionQuiz = document.createElement("p");
    div3.appendChild(descriptionQuiz);

    principal.appendChild(div3);
    principal.appendChild(div2);
    main.appendChild(principal);

    div2.addEventListener("click", init_jeu_memoire);
    div3.addEventListener("click", init_quiz);

    
}

function gererBtnInvite()
{
	document.getElementById("pseudoespace").textContent = "invité";
	afficherChoixJeu();
}

function init_formulaire() {
	let btnInvite = document.getElementById("btnInvite");
	btnInvite.addEventListener("click", gererBtnInvite);

	let btnSoumettre = document.getElementById("btnSoumettre");
	btnSoumettre.addEventListener("click", validerFormulaire);

	document.getElementById("nom").addEventListener("blur", validerNom);
    document.getElementById("prenom").addEventListener("blur", validerPrenom);
	document.getElementById("mail").addEventListener("blur", validerCourriel);
	document.getElementById("confirmation").addEventListener("blur", validerConfirmation);
	document.getElementById("pseudo").addEventListener("blur", validerPseudo);
}

	
addEventListener("load", init_formulaire);