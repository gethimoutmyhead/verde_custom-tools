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
	vals = []
	THCStrength = document.createElement('input');
	THCStrength.setAttribute('class', 'THCstrength');
	THCStrength.setAttribute('type', 'number');
	THCWeight = document.createElement('input');
	THCWeight.setAttribute('class', 'THCweight');
	THCWeight.setAttribute('type', 'number');
	THCContent = document.createElement('div');
	THCContent.setAttribute('class', 'dryHerbTHCContent');
	vals.push(THCStrength, THCWeight, THCContent);

	vals.forEach(elem => {
		column = document.createElement('td');
		column.appendChild(elem);
		row.appendChild(column);
	})

	table = document.getElementById('dryherblist');
	table.appendChild(row);

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