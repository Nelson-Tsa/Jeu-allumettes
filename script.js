let boiteAllumette = 50;
let nombreDeJoueur ;
const bouton = document.querySelector("button");
bouton.addEventListener("click", choisirNombreDeJoueur);

decompteAllumettes();

const bouton2 = document.getElementById("start2");
bouton2.addEventListener("click", VersionInput);


function decompteAllumettes(){
    document.querySelector("#allumettes").innerHTML = "";
    for (let j=0; j<boiteAllumette; j++){
        let allumette = document.createElement("img");
        allumette.src = "match-stick.svg";
        allumette.style.width = "15px";
        allumette.style.height = "25px";
        allumette.style.margin = "0px";
        allumette.style.padding = "0px";
        allumette.style.border = "0px";
        document.querySelector("#allumettes").appendChild(allumette);
    } 
    console.log(boiteAllumette);
    return boiteAllumette;
}


function choisirNombreDeJoueur(){
    let nbrDeJoueur = Number(prompt("combien de joueurs ?"))
    if (isNaN(nbrDeJoueur)){
        alert("veuillez entrer un nombre");
        nbrDeJoueur = Number(prompt("combien de joueurs ?"));
    }
    else if (nbrDeJoueur === 0){
        location.reload();
    }
    else{
    nombreDeJoueur = nbrDeJoueur;
    console.log(nombreDeJoueur);
    jeux();
    return nombreDeJoueur;
    }
}

function jeux(){
    for (boiteAllumette; boiteAllumette > 0;){
        
    for (let i=1; i<=nombreDeJoueur; i++){
        let joueur = i;
        let choix = Number(prompt(`Joueur ${joueur} combien d'allumettes voulez vous retirer ?"`));
        if (isNaN(choix)){
            alert("veuillez entrer un nombre");
            choix = Number(prompt(`Joueur ${joueur} combien d'allumettes voulez vous retirer ?"`));
        }
            else if (choix < 1 || choix > 6){
                alert("veuillez entrer un nombre entre 1 et 6");
                choix = Number(prompt(`Joueur ${joueur} combien d'allumettes voulez vous retirer ?"`));
            }
        boiteAllumette -= choix;
        finPartie(boiteAllumette, joueur);
        console.log(boiteAllumette);
    }
    }
    
    return boiteAllumette;
}

function finPartie(a, b){
    if ( a === 0 || a < 0){
        alert(`le joueur ${b} a gagner la partie`);
        rejouer();
    }
}

function rejouer(){
    let rejouer = prompt("voulez vous rejouer ? oui ou non");
    if (rejouer === "oui"){
    nombreDeJoueur = 0;
    boiteAllumette = 50;
        choisirNombreDeJoueur();
    }
    else{
    alert("merci d'avoir jouer");
    location.reload();
    }
}

//------------------Version Input-------------------

function VersionInput(){
    let nbrDeJoueur = Number(prompt("combien de joueurs ?"))
    if (isNaN(nbrDeJoueur)){
        alert("veuillez entrer un nombre");
        nbrDeJoueur = Number(prompt("combien de joueurs ?"));
    }
    else if (nbrDeJoueur === 0){
        location.reload();
    }
    else{
    nombreDeJoueur = nbrDeJoueur;
    console.log(nombreDeJoueur);
    inputjoueurs(nombreDeJoueur);
    return nombreDeJoueur;
    }
}

function inputjoueurs(a){
    for (let i=1; i<=a; i++){
       let nbrDeInput = document.createElement("input");
        document.getElementById("players").appendChild(nbrDeInput);
        nbrDeInput.setAttribute("placeholder", `Joueur ${i}`);
        nbrDeInput.setAttribute("type", "text");
    }
    let bouton3 = document.createElement("button");
    bouton3.textContent = "Valider";
    document.getElementById("players").appendChild(bouton3);
    bouton3.addEventListener("click", jeuxInput);
    nombreDeJoueur = a;
    return nombreDeJoueur;
}

function jeuxInput(){
    
    for (let i=1; i<=nombreDeJoueur; i++){  
        let joueur = i;
        let choix = Number(document.querySelector(`input:nth-child(${i})`).value);
        boiteAllumette -= choix;
        finPartieInput(boiteAllumette, joueur);
        console.log(joueur, choix, boiteAllumette);
        decompteAllumettes()
        document.querySelector(`input:nth-child(${i})`).value = "";
        
    }
    return boiteAllumette;
}

    function finPartieInput(a, b){
        if ( a === 0 || a < 0){
            alert(`le joueur ${b} a gagner la partie`);
            rejouerInput();
        }
    }

function rejouerInput(){
    let rejouer = prompt("voulez vous rejouer ? oui ou non");
    console.log(rejouer);
    rejouer = rejouer.toLowerCase();
    if (rejouer === "oui"){
    nombreDeJoueur = 0;
    boiteAllumette = 50;
    document.getElementById("players").innerHTML = "";
        VersionInput();
    }
    else{
    alert("merci d'avoir jouer");
    location.reload();
    }
}



