'use strict';

// /* DÉBUT variables globales */
// 

// Variables globale qui contient les données du quiz
// Il s'agit d'un tableau d'objets, chaque objet contient une question, un tableau de réponses et l'indice de la bonne réponse
// Vous remplacer son contenu par votre propre quiz, vos questions et réponses, etc.
// Vous pouvez même modifier entièrement la structure de cette variable si vous le désirez
let donnees = [
    {
        question: "Dans quelle région de Runeterra se déroule principalement la série Arcane ?",
        réponses: [
            "Noxus",
            "Ionia",
            "Piltover et Zaun",
            "Freljord"
        ],
        réponse: 2
    },
    {
        question: "Quel champion était autrefois un soldat de Demacia, aujourd'hui devenu un hôte pour un Aspect ?",
        réponses: [
            "Garen",
            "Sett",
            "Galio",
            "Pantheon"
        ],
        réponse: 3
    },
    {
        question: "De quelle région vient Yasuo",
        réponses: [
            "Noxus",
            "Ionia",
            "Shurima",
            "Bilgewater"
        ],
        réponse: 1
    },
    {
        question: "Quel champion a pour titre La Main de Noxus ?",
        réponses: [
            "Swain",
            "Darius",
            "Draven",
            "Sion"
        ],
        réponse: 0
    },
    {
        question: "Qui est la soeur jumelle de Kayle ?",
        réponses: [
            "Leona",
            "Diana",
            "Morgana",
            "Zoe"
        ],
        réponse: 2
    },
    {
        question: "Quelle champion est responsable de la corruption connue sous le nom de la Brume noire ?",
        réponses:[
            "Hecarim",
            "Karthus",
            "Mordekaiser",
            "Viego"
        ],
        réponse:3
    }
];

let indexQuestion = 0;
let score = 0;
const musiqueBon = new Audio("sons/bon.mp3");
const musiqueMauvais = new Audio("sons/mauvais.mp3");
//* FIN variables globales */	
// // ##########################

function init_quiz() {
    let main = document.getElementById("main");
    main.innerHTML = "";

    if (indexQuestion >= donnees.length)
    {
        afficherResultat();
        return;
    }

    let tableau = donnees[indexQuestion];
    let div = document.createElement("div");
    div.className = "fade-in";
    let h2 = document.createElement("h2");
    h2.textContent = `Question ${indexQuestion + 1} / ${donnees.length}`;
    div.appendChild(h2);

    let p = document.createElement("p");
    p.textContent = tableau.question;
    div.appendChild(p);

    let ol = document.createElement("ol");
    for (let i = 0; i < tableau.réponses.length; i++)
    {
        let li = document.createElement("li");
        li.textContent = tableau.réponses[i];
        ol.appendChild(li);
    }
    div.appendChild(ol);

    let label = document.createElement("label");
    label.setAttribute("for", "reponseUtilisateur");
    label.textContent = "Réponse :";
    div.appendChild(label);

    let input = document.createElement("input");
    input.type = "text";
    input.id = "reponseUtilisateur";
    input.className = "form-control w-25 mb-2";
    div.appendChild(input);

    let boutonSuivant = document.createElement("button");
    boutonSuivant.textContent = "Suivant";
    boutonSuivant.className = "btn btn-primary";
    boutonSuivant.addEventListener("click", bouttonSuivant);
    div.appendChild(boutonSuivant);

    main.appendChild(div);
}

function bouttonSuivant() {
    let input = document.getElementById("reponseUtilisateur");
    let valeur = input.value.trim();
    let numero = parseInt(valeur);
    
    let question = donnees[indexQuestion];
    
    if (numero >= 1 && numero <= question.réponses.length)
    {
        if (numero - 1 === question.réponse)
            {
            score++;
            console.log("C'est la bonne réponse");
        }
        else
        {
            console.log("C'est la mauvaise réponse");
        }
    }

    
    indexQuestion++;
    init_quiz();
}

function afficherResultat() {
    let main = document.getElementById("main");
    main.innerHTML = "";
    let div = document.createElement("div");
    div.className = "text-center";
    let pourcentage = Math.round((score / donnees.length) * 100);

    let h2 = document.createElement("h2");
    h2.textContent = `Score final : ${pourcentage}%`;
    div.appendChild(h2);

    let p = document.createElement("p");
    let img = document.createElement("img");
    if (pourcentage >= 60)
    {
        p.textContent = "Vous avez réussi";
        img.src = "images/victory.jpg";
        img.alt = "Résultat";
        img.className ="img animate__animated animate__bounceIn";
        musiqueBon.play();
    }
    else
    {
        p.textContent = "Vous avez échoué";
        img.src = "images/defeat.jpg";
        img.alt = "Résultat";
        img.className = "img animate__animated animate__bounceIn";
        musiqueMauvais.play();

    }
    div.append(p , img);
    main.appendChild(div);
}

// Ce fichier est inclu dans le fichier index.html et n'a pas besoin d'un addEventListener('load') car
// son point d'entrée init_quiz() sera appelé dans le fichier formulaire.js via la fonction afficherChoixJeu()