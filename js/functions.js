
Date.prototype.addDays = function(step){
	var date = new Date(this.valueOf())
	date.setDate(date.getDate() + step);
	return date;
}

function calcInhaledTHCContent(){

	inhaledTHCStrengthDOMList = Array.from(document.querySelectorAll('.inhaledTHCStrength'));
	inhaledQuantityDOMList = document.querySelectorAll('.inhaledQuantity');
	inhaledRepeatsDOMList = document.querySelectorAll('.inhaledScriptRepeats');
	inhaledTHCContentDOMList = document.querySelectorAll('.inhaledTHCContent');

	inhaledTHCContentIncRepeatsList = inhaledTHCStrengthDOMList.map( (elem, idx) => {
		return elem.value * eval(elem.getAttribute('standardise')) * inhaledQuantityDOMList[idx].value * eval(inhaledQuantityDOMList[idx].getAttribute('standardise')) * (Number(inhaledRepeatsDOMList[idx].value)+1);
	})

	inhaledTHCContentIncRepeatsList.forEach( (elem, index) => {
		inhaledTHCContentDOMList[index].innerHTML = elem;
	})
	inhaledTHCTotalsIncRepeats = inhaledTHCContentIncRepeatsList.reduce( (accumulator, currentvalue) => {return accumulator + currentvalue}, 0);
	
	inhaledTHCContentPerDispenseList = inhaledTHCStrengthDOMList.map( (elem, idx) => {
		return elem.value * eval(elem.getAttribute('standardise')) * inhaledQuantityDOMList[idx].value * eval(inhaledQuantityDOMList[idx].getAttribute('standardise'));
	})
	inhaledTHCTotalsPerDispense = inhaledTHCContentPerDispenseList.reduce( (accumulator, currentvalue) => {return accumulator + currentvalue}, 0);
	
	//inhaledTHCScriptDuration = inhaledTHCTotalsIncRepeats / ;
	prescribeDate = document.getElementById('prescriptionDate').valueAsDate;
	inhaledTHCScriptDuration = Math.ceil(inhaledTHCTotalsIncRepeats / document.getElementById('averageInhaledTHC').value);
	inhaledDurationPerDispense = Math.ceil(inhaledTHCTotalsPerDispense / document.getElementById('averageInhaledTHC').value);
	scriptFinishDate = prescribeDate.addDays(inhaledTHCScriptDuration)

	DOMElemsToUpdate = {};
	DOMElemsToUpdate['inhaledTHCTotal'] = inhaledTHCTotalsIncRepeats;
	DOMElemsToUpdate['inhaledTHCTotalScriptDuration'] = scriptFinishDate.toLocaleString('en-UK', {'weekday': 'short', 'day': 'numeric', 'month': 'short', 'year': 'numeric'}) + "(" + inhaledTHCScriptDuration.toString() + " days)"; //Math.ceil(inhaledTHCTotals / document.getElementById('averageInhaledTHC').value);
	DOMElemsToUpdate['inhaledTHCPerDispenseScriptDuration'] = "(" + inhaledDurationPerDispense.toString() + " days)"
	Object.keys(DOMElemsToUpdate).forEach(DOMElem => {
		document.getElementById(DOMElem).innerText = DOMElemsToUpdate[DOMElem];
	})
}

function addExtraHerb(){
	row = document.createElement('tr');
	let vals = []
	let DOMelems = []
	DOMelems.push({'DOMElement': 'input', 'class': 'inhaledTHCstrength', 'type': 'number', 'standardise': '10**-2'})
	DOMelems.push({'DOMElement': 'input', 'class': 'inhaledQuantity', 'type': 'number', 'standardise': '10**3'})
	DOMelems.push({'DOMElement': 'input', 'class': 'inhaledScriptRepeats', 'type': 'number', 'value': '0'})
	DOMelems.push({'DOMElement': 'div', 'class': 'inhaledTHCContent'})


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
	DOMelems.push({'DOMElement': 'input', 'class': 'inhaledTHCStrength', 'type': 'number', 'standardise': '1'})
	DOMelems.push({'DOMElement': 'input', 'class': 'inhaledQuantity', 'type': 'number','standardise':'1'})
	DOMelems.push({'DOMElement':'input','class':'inhaledScriptRepeats','type':'number','value':'0'})
	DOMelems.push({'DOMElement': 'div', 'class': 'inhaledTHCContent'})

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
