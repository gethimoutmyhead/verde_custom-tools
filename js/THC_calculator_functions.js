function dict_calculateDryHerbTotals(listOfDOMElems_dryHerbScripts){
	// returns: {THCTotal: ###, 'dryWeight': ###}

}

function dict_calculateVapeTotals(listOfDOMElems_vapeScripts){
	// returns: {THCTotal: ###, 'qty': ###}
}

function dict_calculateCannabisOilTotals(listOfDOMElems_oilScripts){
	// returns: {THCTotal: ###, 'volume': ###}
}

function dict_calculateEdibleTotals(listOfDOMElems_edibleScripts){
	// returns: {THCTotal: ###, 'qty': ###}
}

function dict_readAndsumTHCContentInScript(formElem_script){
	// takes any valid form Elem and returns
	// {

	// 	'productType': 'text',
	// 	'THCConversionFactor': ###,
	// 	'productName': 'text', 
	// 	'strength': ###,
	// 	'unitQty': ###,
	// 	'unitsPerDispense': ###,
	// 	'repeats': ###,
	// 	'sumTHCTotal': ###, 
	// 	'sumQty': ###, 
	// 	'unitMeasure': 'text',

	// }
	// unitQty, if not found, is assumed 1 (eg vials, pastilles)
	// unitMeasure can be ['g', 'vials', 'mL', 'units']
	// sumTHCTotal, sumQty, are calculated
	// unitMeasure can be ['g', 'vials', 'mL', 'doses']
	const scriptDetails = new Object();
	// scriptDetails['productName'] = formElem_script.getAttribute('productName')
	key1 = ['productType','unitMeasure']
	key2 = ['THCConversionFactor']
	key3 = ['productName']
	key4 = ['strength', 'unitsPerDispense', 'repeats']
	det1 = key1.map(elem => {
		return formElem_script.getAttribute(elem);
	})
	det2 = key2.map(elem => {
		return Number(formElem_script.getAttribute(elem));
	})
	det3 = key3.map(elem => {
		return formElem_script.querySelector(`.${elem}`).value;
	})
	det4 = key4.map(elem => {
		return Number(formElem_script.querySelector(`.${elem}`).value);
	})
	key = key1.concat(key2, key3, key4)
	det = det1.concat(det2, det3, det4)

	key.forEach((elem, idx) => {
		scriptDetails[elem] = det[idx]
	});
	scriptDetails['unitQty'] = formElem_script.querySelector('.unitQty') ? formElem_script.querySelector('.unitQty').value : 1;
	scriptDetails['sumQty'] = scriptDetails['unitsPerDispense'] * scriptDetails['unitQty'] * ((scriptDetails['repeats']) + 1)
	scriptDetails['sumTHCTotal'] = scriptDetails['sumQty'] * scriptDetails['strength'] * eval(scriptDetails['THCConversionFactor'])
	return (scriptDetails)
}


