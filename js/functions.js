function calcInhaledTHCContent(){
	THCStrengthList = document.querySelectorAll('input.THCstrength');
	THCWeightList = document.querySelectorAll('input.THCWeight');
	THCContentList = document.querySelectorAll('div.dryHerbTHCContent');

	let inhaledTHCTotals = 0;
	THCStrengthList.forEach( (element, index) => {
		THCContent = Math.ceil((element.value / 100) * THCWeightList[index].value * 1000);
		THCContentList[index].innerHTML = THCContent;
		inhaledTHCTotals += THCContent;
	})

	document.getElementById('inhaledTHCScriptDuration').innerText = Math.ceil(inhaledTHCTotals / document.getElementById('averageInhaledTHC').value);

}

function addExtraHerb(){
	row = document.createElement('tr');
	let vals = []
	let DOMelems = []
	DOMelems.push({'DOMElement': 'input', 'class': 'THCstrength', 'type': 'number'})
	DOMelems.push({'DOMElement': 'input', 'class': 'THCweight', 'type': 'number'})
	DOMelems.push({'DOMElement': 'div', 'class': 'dryHerbTHCContent'})

	vals = makeNewDOMElementFromDictList(DOMelems);
	vals.forEach(elem => {
		column = document.createElement('td');
		column.appendChild(elem);
		row.appendChild(column);
	})

	table = document.getElementById('dryherblist');
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
	setTHCLimit(500,50);
}