function calcInhaledTHCContent(){
	dryHerbTable = document.getElementById('dryHerbTable');

	THCStrengthDOMList = Array.from(document.querySelectorAll('input.dryHerbTHCstrength'));
	WeightDOMList = Array.from(document.querySelectorAll('input.dryHerbWeight'));
	THCContentDOMList = Array.from(document.querySelectorAll('div.dryHerbTHCContent'));

	THCStrengthList = THCStrengthDOMList.map(elem => {
		return elem.value;
	})
	WeightList = WeightDOMList.map(elem => {
		return elem.value;
	})

	let THCContentList = []
	THCContentList = THCContentList.concat(THCStrengthList.map( (element, index) => {
		return Math.ceil((element / 100) * WeightList[index] * 1000);
	}))
	concentratesTable = Array.from(document.getElementById('concentratesTable'));
	THCStrengthDOMList = Array.from(document.querySelectorAll('input.inhaledConcentrateTHCConcentration'));
	WeightDOMList = Array.from(document.querySelectorAll('input.inhaledConcentrateQuantity'));
	THCContentDOMList = THCContentDOMList.concat(Array.from(document.querySelectorAll('div.inhaledConcentrateTHCContent')));

	THCStrengthList = THCStrengthDOMList.map(elem => {
		return elem.value;
	})
	WeightList = WeightDOMList.map(elem => {
		return elem.value;
	})

	THCContentList = THCContentList.concat(THCStrengthList.map( (element, index) => {
		return Math.ceil((element) * WeightList[index]);
	}))

	THCContentDOMList.forEach((elem, index) => {
		elem.innerHTML = THCContentList[index];
	})

	inhaledTHCTotals = THCContentList.reduce( (partialSum, a) => {
		return partialSum + a;
	}, 0);


	DOMElemsToUpdate = {};
	DOMElemsToUpdate['inhaledTHCTotal'] = inhaledTHCTotals;
	DOMElemsToUpdate['inhaledTHCScriptDuration'] = Math.ceil(inhaledTHCTotals / document.getElementById('averageInhaledTHC').value);

	Object.keys(DOMElemsToUpdate).forEach(DOMElem => {
		document.getElementById(DOMElem).innerText = DOMElemsToUpdate[DOMElem];
	})
}

function addExtraHerb(){
	row = document.createElement('tr');
	let vals = []
	let DOMelems = []
	DOMelems.push({'DOMElement': 'input', 'class': 'dryHerbTHCstrength', 'type': 'number'})
	DOMelems.push({'DOMElement': 'input', 'class': 'dryHerbWeight', 'type': 'number'})
	DOMelems.push({'DOMElement': 'div', 'class': 'dryHerbTHCContent'})

	vals = makeNewDOMElementFromDictList(DOMelems);
	vals.forEach(elem => {
		column = document.createElement('td');
		column.appendChild(elem);
		row.appendChild(column);
	})

	table = document.getElementById('dryHerbTable');
	table.appendChild(row);

}

function addExtraConcentrate(){
	row = document.createElement('tr');
	let vals = []
	let DOMelems = []
	DOMelems.push({'DOMElement': 'input', 'class': 'inhaledConcentrateTHCConcentration', 'type': 'number'})
	DOMelems.push({'DOMElement': 'input', 'class': 'inhaledConcentrateQuantity', 'type': 'number'})
	DOMelems.push({'DOMElement': 'div', 'class': 'inhaledConcentrateTHCContent'})

	vals = makeNewDOMElementFromDictList(DOMelems);
	vals.forEach(elem => {
		column = document.createElement('td');
		column.appendChild(elem);
		row.appendChild(column);
	})

	table = document.getElementById('concentratesTable');
	table.appendChild(row);
}

function makeNewDOMElementFromDictList(DOMElemList){
	let vals = [];
	DOMElemList.forEach(elem => {
		let elemVar = elem;
		newElem = document.createElement(elemVar['DOMElement']);
		delete elemVar['DOMElement'];
		Object.keys(elemVar).forEach(elemAttribute => {
			newElem.setAttribute(elemAttribute, elemVar[elemAttribute]);
		})
		vals.push(newElem);
	})
	return vals;
}

function setTHCLimit(inhaledTHC, oralTHC){
	DOMIds = ['averageInhaledTHC', 'averageOralTHC'];

	argList = Array.from(arguments);
	argList.forEach((arg, index) => {
		DOMElem = document.getElementById(DOMIds[index]);
		DOMElem.value = arg;
	})
}

function WAHealthLimit(){
	setTHCLimit(300,40);
}
function NIIMLimit(){
	setTHCLimit(500,40);
}