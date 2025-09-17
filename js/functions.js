
Date.prototype.addDays = function(step){
	var date = new Date(this.valueOf())
	date.setDate(date.getDate() + step);
	return date;
}

function calcInhaledTHCContent(){
	// dryHerbTable = document.getElementById('dryHerbTable');

	// THCStrengthDOMList = Array.from(dryHerbTable.querySelectorAll('input.dryHerbTHCstrength'));
	// WeightDOMList = Array.from(dryHerbTable.querySelectorAll('input.dryHerbWeight'));
	// THCContentDOMList = Array.from(dryHerbTable.querySelectorAll('div.dryHerbTHCContent'));
	// scriptRepeatsDOMList = Array.from(dryHerbTable.querySelectorAll('.scriptRepeats'))
	// THCStrengthList = THCStrengthDOMList.map(elem => {
	// 	return elem.value;
	// })
	// WeightList = WeightDOMList.map(elem => {
	// 	return elem.value;
	// })
	// scriptRepeatList = scriptRepeatsDOMList.map(elem => {return (Number(elem.value) + 1)})

	// let TotalTHCContentList = []
	// TotalTHCContentList = TotalTHCContentList.concat(THCStrengthList.map( (element, index) => {
	// 	return Math.ceil((element / 100) * WeightList[index] * (10 ** 3)) * scriptRepeatList[index];
	// }))
	// concentratesTable = document.getElementById('concentratesTable');
	// THCStrengthDOMList = Array.from(concentratesTable.querySelectorAll('input.inhaledConcentrateTHCConcentration'));
	// WeightDOMList = Array.from(concentratesTable.querySelectorAll('input.inhaledConcentrateQuantity'));
	// THCContentDOMList = THCContentDOMList.concat(Array.from(concentratesTable.querySelectorAll('div.inhaledConcentrateTHCContent')));

	// THCStrengthList = THCStrengthDOMList.map(elem => {
	// 	return elem.value;
	// })
	// WeightList = WeightDOMList.map(elem => {
	// 	return elem.value;
	// })

	// TotalTHCContentList = TotalTHCContentList.concat(THCStrengthList.map( (element, index) => {
	// 	return Math.ceil((element) * WeightList[index]);
	// }))

	// THCContentDOMList.forEach((elem, index) => {
	// 	elem.innerHTML = TotalTHCContentList[index];
	// })

	// inhaledTHCTotals = TotalTHCContentList.reduce( (partialSum, a) => {
	// 	return partialSum + a;
	// }, 0);

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
	DOMElemsToUpdate['inhaledTHCTotalScriptDuration'] = "(" + inhaledTHCScriptDuration.toString() + " days)" + scriptFinishDate.toLocaleString('en-UK', {'weekday': 'short', 'day': 'numeric', 'month': 'short', 'year': 'numeric'});//Math.ceil(inhaledTHCTotals / document.getElementById('averageInhaledTHC').value);
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
