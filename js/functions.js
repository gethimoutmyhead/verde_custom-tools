function calcInhaledTHCContent(){
	THCStrengthList = document.querySelectorAll('input.dryHerbTHCstrength');
	WeightList = document.querySelectorAll('input.dryHerbWeight');
	THCContentList = document.querySelectorAll('div.dryHerbTHCContent');

	let inhaledTHCTotals = 0;
	THCStrengthList.forEach( (element, index) => {
		THCContent = Math.ceil((element.value / 100) * WeightList[index].value * 1000);
		THCContentList[index].innerHTML = THCContent;
		inhaledTHCTotals += THCContent;
	})

	THCStrengthList = document.querySelectorAll('input.inhaledConcentrateTHCConcentration');
	WeightList = document.querySelectorAll('input.inhaledConcentrateQuantity');
	THCContentList = document.querySelectorAll('div.inhaledConcentrateTHCContent');

	THCStrengthList.forEach( (element, index) => {
		THCContent = Math.ceil((element.value) * WeightList[index].value);
		THCContentList[index].innerHTML = THCContent;
		inhaledTHCTotals += THCContent;
	})

	DOMElemsToUpdate = {}


	DOMElemsToUpdate['inhaledTHCTotal'] = inhaledTHCTotals;
	DOMElemsToUpdate['inhaledTHCScriptDuration'] = Math.ceil(inhaledTHCTotals / document.getElementById('averageInhaledTHC').value);

	Object.keys(DOMElemsToUpdate).forEach(DOMElem => {
		document.getElementById(DOMElem).innerText = DOMElemsToUpdate[DOMElem];
	})
	//document.getElementById('inhaledTHCScriptDuration').innerText = Math.ceil(inhaledTHCTotals / document.getElementById('averageInhaledTHC').value);

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

	table = document.getElementById('dryHerbList');
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

	table = document.getElementById('concentratesList');
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