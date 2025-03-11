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
    nommerInput(nombreDeJoueur);
    return nombreDeJoueur;
    }
}

function inputjoueurs(a){
    for (let i=0; i<nomDesJoueurs.length; i++){
       let nbrDeInput = document.createElement("input");
        document.getElementById("players").appendChild(nbrDeInput);
        nbrDeInput.setAttribute("placeholder", `${nomDesJoueurs[i]}`);
        nbrDeInput.setAttribute("type", "text");
    }
    let bouton3 = document.createElement("button");
    bouton3.textContent = "Valider";
    document.getElementById("players").appendChild(bouton3);
    bouton3.addEventListener("click", jeuxInput);
    alert(`C'est au joueur 1 de jouer`);
    nombreDeJoueur = a;
    for (let j=1; j<=nombreDeJoueur; j++){
        document.querySelector(`input:nth-child(${j})`).style.display = "none";
    }
    document.querySelector(`input:nth-child(${joueurActuel})`).style.display = "block";
    return nombreDeJoueur;
}

let nomDesJoueurs = [];

function nommerInput(a){
nombreDeJoueur = a;
    for (let i=1; i<=a; i++){
        let nomJoueur = prompt(`Quel est le nom du joueur ${i}`);
        nomDesJoueurs.push(nomJoueur);
    }
    console.log(nomDesJoueurs);
    inputjoueurs(nombreDeJoueur);
return nombreDeJoueur;

}

function valeurInput(){
    

    for (let j=joueurActuel; j<=nombreDeJoueur; j++){
        document.querySelector(`input:nth-child(${j})`).style.display = "none";
    }
    let choix = Number(document.querySelector(`input:nth-child(${joueurActuel})`).value);
    verifierInput(choix);
}

function verifierInput(choix){
    
   


    if (isNaN(choix)){
        alert("veuillez entrer un nombre");
            document.querySelector(`input:nth-child(${joueurActuel})`).value = "";
            document.querySelector(`input:nth-child(${joueurActuel})`).style.display = "block"
        return ;
    }
        else if (choix < 1 || choix > 6){
            alert("veuillez entrer un nombre entre 1 et 6");
            document.querySelector(`input:nth-child(${joueurActuel})`).value = "";
            document.querySelector(`input:nth-child(${joueurActuel})`).style.display = "block"
        return ;
            
        }
        else {
            boiteAllumette -= choix;
            finPartieInput(boiteAllumette, joueurActuel);
            console.log(joueurActuel, choix, boiteAllumette);
            decompteAllumettes()
            document.querySelector(`input:nth-child(${joueurActuel})`).value = "";
            joueurSuivant(joueurActuel);
        }
    
}

function joueurSuivant(a){
    joueurActuel=a;
    joueurActuel++;

    if (joueurActuel <= nombreDeJoueur){
        alert(`C'est au joueur ${joueurActuel} de jouer`);
        document.querySelector(`input:nth-child(${joueurActuel})`).style.display = "block";
    }
    else if (joueurActuel === nombreDeJoueur + 1){
        joueurActuel = 1;
        alert(`C'est au joueur ${joueurActuel} de jouer`);
        document.querySelector(`input:nth-child(${joueurActuel})`).style.display = "block";
    }
    return joueurActuel;

}



let joueurActuel = 1; // 1

function jeuxInput(){
    valeurInput();
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



