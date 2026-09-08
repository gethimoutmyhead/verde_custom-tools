function updateScriptCalculations(scriptType){
	tableName = `${scriptType}Table`
	const tableDOM = document.getElementById(tableName)
	const arrayOfScriptDOMs = [...tableDOM.querySelectorAll('.scriptForm')]
		// arrayOfScriptObjects = arrayOfScriptDOMs.map(dict_readAndsumTHCContentInScript)

		// const THCSums = arrayOfScriptObjects.reduce((sumTHC, scriptObject) => scriptObject['sumTHCTotal'] + sumTHC, 0,)
		// const sumTotalQty = arrayOfScriptObjects.reduce((sumQty, scriptObject) => scriptObject['sumQty'] + sumQty, 0,)
	tableSums = dict_sumScriptsInTable(tableName)

	tableDOM.querySelector('.sumUnitTotals').innerText = `${tableSums['sumTotalQty']} ${tableSums['unitMeasure']}`
	tableDOM.querySelector('.sumTHCTotals').innerText = `${tableSums['THCSums']} mg`

	arrayOfScriptDOMs.forEach((scriptDOM, idx) => {
		scriptSums = dict_readAndsumTHCContentInScript(scriptDOM)
		scriptDOM.querySelector('.unitQtyTotal').innerHTML = `${scriptSums['sumQty']} ${scriptSums['unitMeasure']}`
		scriptDOM.querySelector('.THCTotal').innerHTML = `${scriptSums['sumTHCTotal']} mg`
	})

	matchedGroups = Object.keys(productTypeGroups).filter(productTypeGroup => {
		return productTypeGroups[productTypeGroup]['scriptTypes'].includes(scriptType)
	})
	console.log(matchedGroups)
	matchedProductTypes = matchedGroups.reduce((matchedList, curGroup) => {
		// console.log(curGroup)
		// console.log(matchedList, productTypeGroups[curGroup]['scriptTypes'])
		j = new Set([...matchedList, ...productTypeGroups[curGroup]['scriptTypes']])
		console.log(j)
		return [...j]
	}, [])
	// console.log(matchedProductTypes)
	j = document.querySelector(productTypeGroups[matchedGroups[0]]['doseSettingsSelector'])
	console.log(j)
	maxDose= j.querySelector('input.maxDose.dosePerDay').value

	updateRepeatIntervals(matchedProductTypes, maxDose)

}

function updateRepeatIntervals(productTypes, max_dosage){
	scriptList = Array.from(document.querySelectorAll('.scriptForm'))
	filteredScriptList = Array.from(scriptList.filter(script => {
		return productTypes.includes(script.getAttribute('productType'))
	}))

	repeatIntervals = calculateTHCRepeatIntervals(filteredScriptList, max_dosage)
	repeatIntervals.forEach((interval, idx) => {
		repeatInterval = typeof interval['repeatInterval'] != 'undefined' ? `${interval['repeatInterval']} days` : 'N/A'
		filteredScriptList[idx].querySelector('.repeatInterval').innerHTML = repeatInterval
	})
}