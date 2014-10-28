var num_elements;

function addTableRow() {

	// Creates HTML Elements
	var trow = document.createElement('tr');
	var rcode = document.createElement('td');
	var rlibelle = document.createElement('td');
	var rprix = document.createElement('td');
	var rquant = document.createElement('td');
	var rmontant = document.createElement('td');
	var slibelle = document.createElement('span');
	var smontant = document.createElement('span');
	var sprix = document.createElement('span');
	var iquant = document.createElement('input');
	var ccode = document.createElement('select');

	// Attaches HTML id attributes
	trow.id = "trow_" + num_elements;
	slibelle.id = "libelle_" + num_elements;
	smontant.id = "montant_" + num_elements;
	sprix.id = "prix_" + num_elements;
	iquant.id = "quantite_" + num_elements;
	ccode.id = "code_" + num_elements;
	
	// Attaches other HTML attributes & attaches events
	iquant.type = "text";
	iquant.setAttribute("placeholder", "Quantité");
	iquant.setAttribute("onchange", "updatePriceFor(" + num_elements + ")");
	ccode.setAttribute("onchange", "updateDataFor(" + num_elements + ")");

	// Adds content to HTML elements
	slibelle.innerHTML = "-";
	smontant.innerHTML = "0";
	sprix.innerHTML = "-";
	
	// Attaches HTML elements to #tableau, now they appear on the page
	trow = document.getElementById("tableau").appendChild(trow);
	rcode = trow.appendChild(rcode);
	rlibelle = trow.appendChild(rlibelle);
	rprix = trow.appendChild(rprix);
	rquant = trow.appendChild(rquant);
	rmontant = trow.appendChild(rmontant);
	slibelle = rlibelle.appendChild(slibelle);
	smontant = rmontant.appendChild(smontant);
	sprix = rprix.appendChild(sprix);
	iquant = rquant.appendChild(iquant);
	ccode = rcode.appendChild(ccode);
	
	// Attaches options to the select list : adds code produit to the list
	var tzero = document.createElement('option');
	tzero.value = "zero";
	tzero.innerHTML = "-";
	tzero = ccode.appendChild(tzero);
	for(var i = 0; i < data.length; i++) {
		var txi = document.createElement('option');
		txi.value = i;
		txi.innerHTML = data[i][0];
		txi = ccode.appendChild(txi);
	}
	
	// Increments total number of rows in #tableau
	num_elements++;
}

function updateRowMgr() {
	var i, x;
	for(i = 0; i < num_elements; i++) {
		x = document.getElementById("code_" + i).value;
		if(x === "zero" && i < (num_elements - 1) && num_elements > 1)
			return removeRow(i);
	}
	if(document.getElementById("code_" + (num_elements-1)).value !== "zero")
		addTableRow();
}

function removeRow(i) {
	var bybye = document.getElementById("trow_" + i);
	document.getElementById("tableau").removeChild(bybye);
	for(var i = i + 1; i < num_elements; i++)
	decrementRow(i);
	num_elements--;
}

function decrementRow(i) {
	document.getElementById("trow_" + i).id = "trow_" + (i - 1);
	document.getElementById("code_" + i).setAttribute("onchange", "updateDataFor(" + (i - 1) + ")");
	document.getElementById("code_" + i).id = "code_" + (i - 1);
	document.getElementById("libelle_" + i).id = "libelle_" + (i - 1);
	document.getElementById("quantite_" + i).setAttribute("onchange", "updatePriceFor(" + (i - 1) + ")");
	document.getElementById("quantite_" + i).id = "quantite_" + (i - 1);
	document.getElementById("montant_" + i).id = "montant_" + (i - 1);
	document.getElementById("prix_" + i).id = "prix_" + (i - 1);
}

function updateRemise(ttc, sstt) {
	if(ttc > 1000) { 
		document.getElementById("remise").style.display = "block";
		document.getElementById("remiseValue").innerHTML = (sstt * 0.05);
		var nom = document.getElementById("nom_societe").value;
		var tel = document.getElementById("tel_societe").value;
		var email = nom + "@gmail.com";
		if(nom != "" && tel != "") {
			document.getElementById("discname").innerHTML = nom;
			document.getElementById("disctel").innerHTML = tel;
			document.getElementById("disaddr").innerHTML = email;
		} else {
			document.getElementById("discname").innerHTML = "[nomsociété]";
			document.getElementById("disctel").innerHTML = "[telsociété]";
			document.getElementById("disaddr").innerHTML = "[emailsociété]";
		}
	} else document.getElementById("remise").style.display = "none";
}

function updateTotals() {
	var sstotal, tva, port, ttc;
	sstotal = tva = port = ttc = 0;

	for(var i = 0; i < num_elements; i++) 
		sstotal = sstotal + Number(document.getElementById("montant_" + i).innerHTML);

	document.getElementById("soustotal").innerHTML = sstotal.toFixed(2);
	document.getElementById("tva").innerHTML = (tva = sstotal * 0.196).toFixed(2);
	document.getElementById("port").innerHTML = (port = sstotal * 0.1).toFixed(2);		// QUERY PROF FOR THIS HUGE STUPIDITY
	document.getElementById("ttc").innerHTML = (ttc = (sstotal + tva + port)).toFixed(2);
	updateRemise(ttc, sstotal);
}

function updateDataFor(i) {
	var j = document.getElementById("code_" + i).value;
	if(j === "zero") {
		document.getElementById("libelle_" + i).innerHTML = "-";
		document.getElementById("prix_" + i).innerHTML = "-";
		document.getElementById("quantite_" + i).value = "";
		document.getElementById("montant_" + i).innerHTML = 0;
	} else {
		document.getElementById("libelle_" + i).innerHTML = data[j][1];
		document.getElementById("prix_" + i).innerHTML = data[j][2];
		document.getElementById("quantite_" + i).value = "";
		document.getElementById("montant_" + i).innerHTML = 0;
	}
	updatePriceFor(i);
	updateRowMgr();
}

function updatePriceFor(i) {
	p = Number(document.getElementById("prix_" + i).innerHTML);
	p = p * Number(document.getElementById("quantite_" + i).value);
	document.getElementById("montant_" + i).innerHTML = (isNaN(p)) ? 0 : p;
	updateTotals();
}

function initSystem() {
	num_elements = 0;
	addTableRow();
}
