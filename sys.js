// Nombre de rangées dans le tableau du détail des produits facturés.
var nombre_rangees;



// Cette fonction calcule le montant pour la rangée 'i' dans le tableau du détail des produits facturés.
// Puis, elle lance la fonction verifierValiditeMontants(), et enfin la fonction totaux().
function montant(i) {
	// Récupere la quantitie et le prix unitaire, et en fait le produit.
	var qte = document.getElementById("qte-" + i).value;
	var prix = Number(document.getElementById("price-" + i).innerHTML);
	var z = (qte * prix).toFixed(2)
	
	// Affiche le produit s'il est valide.
	document.getElementById("mnt-" + i).innerHTML = (isNaN(z) || qte > 100) ? "-" : z;

	// Suite logique : verifier validite des montants, calculer totaux
	verifierValiditeMontants();
	totaux();
}



// Cette fonction affiche un message d'erreur à l'utilisateur dans le cas ou il n'a pas entré une quantité valide.
function verifierValiditeMontants() {
	// Définition variables
	var pasUnChiffre, auDessusDe100, texte = "";
	pasUnChiffre = auDessusDe100 = false;

	// Pour chaque rangée dans le tableau du détail des produits facturés: 
	for(var i = 0; i < nombre_rangees; i++) {

		// Récuperer la quantitié
		var qte = document.getElementById("qte-" + i).value;
		qte = (qte == "") ? 0 : qte;

		// Tester si quantité n'est un chiffre, ou si elle est supérieure à 100.
		if(isNaN(qte)) pasUnChiffre = true;
		else if(qte > 100) auDessusDe100 = true;
	}

	// Si au moins une des quantités n'est pas un chiffre, assigner message d'erreur.
	if(pasUnChiffre)
		texte += "La quantité inscrite n'est pas un nombre, veuillez entrer un nombre.";
	// S'il y a deux messages d'erreur a afficher, sauter une ligne.
	if(auDessusDe100 && pasUnChiffre)
		texte += "<br/>";
	// Si au moins une des quantités est au dessus de 100, assigner message d'erreur.
	if(auDessusDe100)
		texte += "Il n'y a pas suffisement de stock disponible pour votre commande. Maximum : 100.";
	
	// Si au omins une des quantités n'est pas valide, afficher la boite de message d'erreur,
	if(pasUnChiffre || auDessusDe100) 
		document.getElementById("erreur").style.display = "block";
	// Sinon la cacher.
	else
		document.getElementById("erreur").style.display = "none";

	// Assigner le message d'erreur à la boite de message d'erreur.
	document.getElementById("erreur_msg").innerHTML = texte;

}



// Cette fonction remplit les liste de selections de produits,
//  pour chaque rangée dans le tableau du détail des produits facturés. 
//  Les options sont remplies selon le tableau "donnees" dans 'data.js'
function remplirListes() {
	// Pour chaque rangée dans le tableau du détail des produits facturés,
	for(var i = 0; i < nombre_rangees; i++) {

		// Créer l'option 'zéro' (pour différencier un choix entre
		//   un produit sélectionné et aucun produit séléctionné)
		var opt0 = document.createElement("option");
		opt0.value = "zero";
		opt0.innerHTML = "-";

		// Accorcher l'option 'zéro' a la liste de choix de produit de la rangée i.		
		document.getElementById("code-" + i).appendChild(opt0);

		// Pour chaque produit j dans le tableau "donnees" dans 'data.js'
		var opti;
		for(var j = 0; j < donnees.length; j++) {

			// Créer l'option j (qui correspond au produit j du tableau "donnees")
			opti = document.createElement("option");
			opti.value = j;
			opti.innerHTML = donnees[j][0];

			// Accorcher l'option j a la liste de choix de produit de la rangée i.
			document.getElementById("code-" + i).appendChild(opti);
		}	
	}
}



// Cette fonction remplit la liste des clients connus à facturer.
//  Les options sont remplies selon le tableau "clients" dans 'data.js'
function remplirListeClient() {

	// Créer l'option 'zéro' (pour différencier la sélection entre
	//   un nouveau client à rentrer soi-même et un client déja existant)
	var opt0 = document.createElement("option");
	opt0.value = "zero";
	opt0.innerHTML = "Nouveau client";

	// Accorcher l'option 'zero' a la liste de choix de clients.	
	document.getElementById("choix_facture").appendChild(opt0);

	// Pour chaque client j dans le tableau "clients" dans 'data.js'
	var opti;
	for(var j = 0; j < clients.length; j++) {

		// Créer l'option j (qui correspond au client j du tableau "clients")
		opti = document.createElement("option");
		opti.value = j;
		opti.innerHTML = clients[j][0];

		// Accorcher l'option j a la liste de choix de clients.
		document.getElementById("choix_facture").appendChild(opti);
	}	
}



// Cette fonction remplit les informations du client facturé en fonction du client séléctionné.
//  Puis elle lance la fonctions remplirRecepteur()
function remplirClient() {
	// Récupérer l'indice du client séléctionné.
	var j = document.getElementById("choix_facture").value;

	// Remplir les informations clients, si le client séléctionné n'est pas un nouveau client, 
	//  avec les informations du tableau "clients" dans 'data.js'
	document.getElementById("nom_facture").value = (j === "zero") ? "" : clients[j][0];
	document.getElementById("nom_societe_facture").value = (j === "zero") ? "" : clients[j][1];
	document.getElementById("rue_1").value = (j === "zero") ? "" : clients[j][2];
	document.getElementById("ville_1").value = (j === "zero") ? "" : clients[j][3];
	document.getElementById("tel_societe_facture").value = (j === "zero") ? "" : clients[j][4];
	
	// Si le client séléctionné n'est pas un nouveau client, alors empécher l'édition
	//   des champs d'information du client. Sinon, autoriser l'édition des champs d'information du client.
	document.getElementById("nom_facture").disabled = (j != "zero");
	document.getElementById("nom_societe_facture").disabled = (j != "zero");
	document.getElementById("rue_1").disabled = (j != "zero");
	document.getElementById("ville_1").disabled = (j != "zero");
	document.getElementById("tel_societe_facture").disabled = (j != "zero");
	
	// Suite logique : remplir recepteur aussi si besoin
	remplirRecepteur();
}



// Cette fonction remplit les informations du client pour l'expedition, en fonction du client séléctionné,
//  dans le cas ou la case "Idem" a été cochée.
function remplirRecepteur() {
	// Récupérer si la case "Idem" a été cochée.
	var copier = document.getElementById("copier").checked;

	// Si la case "Idem" a été cochée, remplir les informations d'expedition avec les information de facturation.
	//  Sinon, remplir avec rien.
	document.getElementById("nom_facture_2").value = !copier ? "" :
		document.getElementById("nom_facture").value;
	document.getElementById("nom_societe_facture_2").value = !copier ? "" : 
		document.getElementById("nom_societe_facture").value;
	document.getElementById("rue_1_2").value = !copier ? "" :
		document.getElementById("rue_1").value;
	document.getElementById("ville_1_2").value = !copier ? "" :
		document.getElementById("ville_1").value;
	document.getElementById("tel_societe_facture_2").value = !copier ? "" : 
		document.getElementById("tel_societe_facture").value;

	// Si la case "Idem" a été cochée, alors empécher l'édition des informations d'expedition.
	//  Sinon, autoriser l'édition des champs d'information d'expedition.
	document.getElementById("nom_facture_2").disabled = copier;
	document.getElementById("nom_societe_facture_2").disabled = copier;
	document.getElementById("rue_1_2").disabled = copier;
	document.getElementById("ville_1_2").disabled = copier;
	document.getElementById("tel_societe_facture_2").disabled = copier;

}



// Cette fonction rempli les informartions de libéllé produit, et de prix unitaire
//  en fonction du produit séléctionné pour la rangée i. Remets aussi la quantité à 0.
//  Puis lance la fonction montant(), et la fonction gererLigne() si un produit est séléctionné.
function remplir(i) {
	// Récupérer l'indice du produit séléctionné pour la rangée i.
	var j = document.getElementById("code-" + i).value;

	// Si un produit est séléctionné, alors remplir les case libéllé et prix unitaire
	//    avec le tableau "donnees" dans 'data.js'. Sinon remplir avec '-'.
	// -> pour la rangée i.
	document.getElementById("lib-" + i).innerHTML = (j === "zero") ? "-" : donnees[j][1];
	document.getElementById("price-" + i).innerHTML = (j === "zero") ? "-" : donnees[j][2];

	// Remettre la quantité à zéro  pour la rangée i.
	document.getElementById("qte-" + i).value = "";

	// Suite logique : calculer le montant pour la rangée i, et si nécessaire langer le gestion de lignes.
	montant(i);
	if(j !== "zero") gererLigne();

}



// Cette fonction se charge d'ajouter une rangée au tableau du détail des produits facturés.
function clonerLigne() {
	// Séléctionner la dèrnière rangée.
	var line = document.getElementById("ligne-" + (nombre_rangees-1));

	// Cloner la dernière rangée dans newLine.
	newLine = line.cloneNode(true);

	// Attacher la nouvelle rangée au parent de la vieille rangée.
	// (L'accrocher au tableau)
	line.parentNode.appendChild(newLine);

	// Mettre a jour l'attribut 'id' de la nouvelle rangée.
	newLine.id = "ligne-" + nombre_rangees; 

	// Sélectionner les enfants de la nouvelle rangée.
	var enfants = newLine.children;

	// Pour chaque enfant de la nouvelle rangée,
	for (var i =0; i < enfants.length; i++) {
		// Comme chaque attribut 'id' suit le modèle -> id="AAA-i"
		// Séparer la partie AAA et la partie i de l'attribut id de l'enfant.
		var ref = enfants[i].children[0].id.split("-");
		// Mettre a jour l'attribut 'id' de l'enfant avec -> "AAA" + "-" + (i + 1)
		enfants[i].children[0].id = ref[0] + "-" + (Number(ref[1]) + 1);
	}
	
	// Attacher les évenements de mise à jour de contenu et de montant de la rangée pour la nouvelle rangée.
	document.getElementById("code-" + nombre_rangees).setAttribute("onchange", "remplir(" + nombre_rangees +")");
	document.getElementById("qte-" + nombre_rangees).setAttribute("onkeyup", "montant(" + nombre_rangees +")");
	
	// Sélectionner l'option 'zero', c'est à dire comme si on avait pas séléctionné de produit.
	document.getElementById("code-" + nombre_rangees).value = "zero";
	// Mettre a jour le libéllé, prix unitaire, et le quantité à 'rien'.
	remplir(nombre_rangees);
	
	// Augmenter le nombre total de rangées.
	nombre_rangees++;
}



// Cette fonction se charge d'ajouter une rangée au tableau du détail des produits facturés
//   quand nécéssaire, c'est à dire quand toutes les rangées disponibles contiennet déja un produit.
//   (Dans le cas ou l'utilisateur souhaiterais ajouter encore des produits.)
function gererLigne (){
	// INitialisation variables.
	var besoinajouter = true;

		// Pour toutes les rangées du tableau du détail des produits facturés:
		for (var i =0; i < nombre_rangees; i++) {
			// Si il y a au moins une rangée qui n'a pas de produit séléctioné,
			//   alors ne pas ajouter de rangée.
			if (document.getElementById("code-" + i).value == "zero")
				besoinajouter = false;
		}

		// Si il y a besoin d'ajouter une rangée, alors lancer la fonction clonerLigne()
		if (besoinajouter)
			clonerLigne();
}



// Cette fonction calcule les totaux à afficher en dessous et en fonction
//  du tableau du détail des produits facturés.
//    Puis lance la fonction remise()
function totaux() {
	// Initialisation variables.
	var x, ttc, sstt = 0;

	// Pour chaque rangée du tableau du détail des produits facturés,
	//   ajouter le montant au sous-total (sstt)
	for(var i = 0; i < nombre_rangees; i++)
		sstt += isNaN(x = Number(document.getElementById("mnt-" + i).innerHTML)) ? 0 : x;

	// Calculer ttc, tva et frais de port en fonction du sous-total
	var tva = sstt * 0.196;
	var port = sstt * 0.1;
	ttc = sstt + tva + port;
	
	// Accrocher les valeurs (2 décimales) calculées dans les cases de sous-total, tva, port, et ttc.
	document.getElementById("soustotal").innerHTML = sstt.toFixed(2) + " €";
	document.getElementById("tva").innerHTML = tva.toFixed(2) + " €";
	document.getElementById("port").innerHTML = port.toFixed(2) + " €";
	document.getElementById("ttc").innerHTML = ttc.toFixed(2) + " €";

	// Suite logique : calculer et afficher la remise si nécéssaire avec remise()
	remise(ttc);
}



// Cette fonction calcule la remise, et l'affiche si nécéssaire.
function remise(ttc) {
	// Assigner la valeur de la remise ((5% de ttc) 2 décimales).
	document.getElementById("remiseValue").innerHTML = (ttc * 0.05).toFixed(2);

	// Si la valeur ttc est supérieur à 1000, afficher la div avec le texte de la remise.
	if(ttc > 1000)
		document.getElementById("remise").style.display = "block";
	// Sinon, cacher la div avec le texte de la remise.
	else 
		document.getElementById("remise").style.display = "none";
}



// Cette fonction se charge de préparer le code JS.
function initSys() {
	// Initialisation nombre de rangées du tableau du détail des produits facturés.
	nombre_rangees = 1;

	// Remplissage des sélections initales.
	remplirListes();
	remplirListeClient();

	// Clonage des lignes afin d'en avoir 4.
	clonerLigne();
	clonerLigne();
	clonerLigne();

	// Ajout de date, et mise à jour à la date actuelle.
	date();
}



// Cette fonction se charge de mettre à jour le nom de la société, l'email,
// ainsi que le numéro de téléphone dans la section d'informations pour rédiger les chèques.
function infos() {
	// Récupération des informations entrées par l'utilisateur.
	var nom = document.getElementById("nom_societe").value;
	var tel = document.getElementById("tel_societe").value;
	var email = nom.toLowerCase() + "@gmail.com";
	// Si les informations ne sont pas vides, les assigner au texte d'information
	//  dans la section d'informations pour rédiger les chèques. sinon assigner des valeurs standard.
	document.getElementById("discname").innerHTML = (nom == "") ? "[Nom de la société]": nom;
	document.getElementById("disctel").innerHTML = (tel == "") ? "[Numéro de téléphone]": tel;
	document.getElementById("disaddr").innerHTML = (nom == "") ? "[Addresse de messagerie]": email;
}

// Cette fonction de charge d'attacher des menus déroulants pour la date,
//   et de sélectionner par défaut la date actuelle.
function date(){

	// Calculer jour, mois, et année actuels.
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1;
	var yyyy = today.getFullYear();

	// Assigner variables pour écriture plus rapide.
	var selected, zeroEsthetique, date;
	selected = zeroEsthetique = "";

	// Pour les jour, de 1 à 31
	date = "<SELECT>";
	for (var j = 1; j <= 31; j++) {

		// Si le jour est inférieur à 10, ajouter un zéro pour esthétique.
		// Si le jour est egal au jour actuel, ajouter 'selected' pour le sélectionner.
		zeroEsthetique = (j < 10) ? "0": "";
		selected = (dd == j) ? " selected ": "";

		// Ajouter une option avec le jour, le zéro esthétique si nécessaire, et le
		// 'selected' si c'est le joueur actuel.
		date += "<OPTION" + selected + ">" + zeroEsthetique + j + "</OPTION>";		

	}

	// Pour les mois, de 1 à 12
	date  += "</SELECT> / <SELECT>";
	for (var m = 1; m <= 12; m++) {

		// Si le mois est inférieur à 10, ajouter un zéro pour esthétique.
		// Si le mois est egal au mois actuel, ajouter 'selected' pour le sélectionner.
		zeroEsthetique = (m < 10) ? "0": "";
		selected = (mm == m) ? " selected ": "";

		// Ajouter une option avec le mois, le zéro esthétique si nécessaire, et le
		// 'selected' si c'est le mois actuel.
		date += "<OPTION" + selected + ">" + zeroEsthetique + m + "</OPTION>";	

	}

	// Pour les annees, de 2000 à 2020
	date  += "</SELECT> / <SELECT>";
	for (var a = 2000; a <= 2020; a++) {
		 
		// Si le mois est egal au mois actuel, ajouter 'selected' pour le sélectionner.
		selected = (yyyy == a) ? " selected ": "";

		// Ajouter une option avec l'année, et le 'selected' si c'est l'année actuelle.
		date += "<OPTION" + selected + ">" + a + "</OPTION>";
	}
	date  += "</SELECT>";
	
	// Accrocher toutes les listes déroulantes dans le span prévu à cet effet.
	document.getElementById("date_bill").innerHTML += date;
}






// Lancement de la fonction d'initialisation ainf de parametrer le code JS.
initSys();
