var num_elements;

function addTableRow() {
	var trow = document.createElement('tr');
	trow.id = "trow_" + num_elements;

	var rcode = document.createElement('td');
	var rlibelle = document.createElement('td');
	var rprix = document.createElement('td');
	var rquant = document.createElement('td');
	var rmontant = document.createElement('td');

	var slibelle = document.createElement('span');
	var smontant = document.createElement('span');
	var sprix = document.createElement('span');

	slibelle.id = "libelle_" + num_elements;
	smontant.id = "montant_" + num_elements;
	sprix.id = "prix_" + num_elements;

	slibelle.innerHTML = "-";
	smontant.innerHTML = "0";
	sprix.innerHTML = "-";

	var iquant = document.createElement('input');
	iquant.type = "text";
	iquant.id = "quantite_" + num_elements;
	iquant.setAttribute("placeholder", "Quantité");
	iquant.setAttribute("onchange", "updatePriceFor(" + num_elements + ")");

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

	var ccode = document.createElement('select');
	ccode.id = "code_" + num_elements;
	ccode.setAttribute("onchange", "updateDataFor(" + num_elements + ")");

	ccode = rcode.appendChild(ccode);

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

	num_elements++;
}

function updateRemise(ttc) {
	// TODO
}

function updateRowMgr() {
	// alert("rowMgr");

	// ESTIMATE SITUATION
	var i, stupidityCount;
	i = stupidityCount = 0;
	for(i = 0; i < num_elements; i++) {
		if(document.getElementById("code_" + i).value === "zero") stupidityCount++;
	}

	// SITUTATION ALPHA ALPHA - Simply add one more row, user is smart
	if(stupidityCount == 0)
		addTableRow();

	// STILL TONS OF STUPIDITY CHECKS TO ENGAGE, UGH

}

function updateTotals() {
	var sstotal, tva, port, ttc;
	sstotal = tva = port = ttc = 0;

	for(var i = 0; i < num_elements; i++) 
		sstotal = sstotal + Number(document.getElementById("montant_" + i).innerHTML);

	document.getElementById("soustotal").innerHTML = sstotal.toFixed(2);
	document.getElementById("tva").innerHTML = (tva = sstotal * 0.196).toFixed(2);
	document.getElementById("port").innerHTML = (port = 0).toFixed(2);		// QUERY PROF FOR THIS HUGE STUPIDITY
	document.getElementById("ttc").innerHTML = ttc = (sstotal + tva + port).toFixed(2);
	updateRemise(ttc);
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
	// alert("updatePrice");
	p = Number(document.getElementById("prix_" + i).innerHTML);
	p = p * Number(document.getElementById("quantite_" + i).value);
	document.getElementById("montant_" + i).innerHTML = (isNaN(p)) ? 0 : p;
	updateTotals();
}

function initSystem() {
	num_elements = 0;
	addTableRow();
}
