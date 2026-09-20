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

	// arrayOfScriptDOMs.forEach((scriptDOM, idx) => {
	// 	scriptSums = dict_readAndsumTHCContentInScript(scriptDOM)
	// 	scriptDOM.querySelector('.unitQtyTotal').innerHTML = `${scriptSums['sumQty']} ${scriptSums['unitMeasure']}`
	// 	scriptDOM.querySelector('.THCTotal').innerHTML = `${scriptSums['sumTHCTotal']} mg`
	// })

	matchedGroups = Object.keys(productTypeGroups).filter(productTypeGroup => {
		return productTypeGroups[productTypeGroup]['scriptTypes'].includes(scriptType)
	})

	matchedProductTypes = matchedGroups.reduce((matchedList, curGroup) => {
		j = new Set([...matchedList, ...productTypeGroups[curGroup]['scriptTypes']])
		return [...j]
	}, [])
	j = document.querySelector(productTypeGroups[matchedGroups[0]]['doseSettingsSelector'])
	avgDose = j.querySelector('input.avgDose.dosePerDay').value
	maxDose= j.querySelector('input.maxDose.dosePerDay').value
	updateRepeatIntervals(matchedProductTypes, maxDose)

	scriptList = Array.from(document.querySelectorAll('.scriptForm'))
	filteredScriptList = Array.from(scriptList.filter(script => {
		return matchedProductTypes.includes(script.getAttribute('productType'))
	}))
	firstDispenseDate = new Date(j.querySelector('.prescriptionDate').value)
	avgDoseDuration=calculateTHCScriptsDuration(filteredScriptList, avgDose)
	maxDoseDuration=calculateTHCScriptsDuration(filteredScriptList, maxDose)
	avgDoseFinishDate = firstDispenseDate.addDays(avgDoseDuration)
	maxDoseFinishDate = firstDispenseDate.addDays(maxDoseDuration)
	j.querySelector(`.avgScriptDuration`).innerHTML = `lasts to ${avgDoseFinishDate.toDateString()}(${avgDoseDuration} days)`
	j.querySelector(`.maxScriptDuration`).innerHTML = `lasts to ${maxDoseFinishDate.toDateString()}(${maxDoseDuration} days)`
	console.log(avgDoseDuration, maxDoseDuration, firstDispenseDate)
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

function calculateAndUpdateMinRepeatsForDuration(listOfDOMElems_scriptList, dosage_per_day, scriptDuration){
	const scriptList = Array.from(listOfDOMElems_scriptList)
	scriptList.forEach(script => {
		script.querySelector('.repeats').value = 0
	})
	calculatedContent = scriptList.map(dict_readAndsumTHCContentInScript)
	totalTHC = calculatedContent.reduce((sumTHC, script) => {
		return sumTHC + script['sumTHCTotal']
	}, 0)
	// durationToLast = Math.ceil(totalTHC / dosage_per_day)
	minTHCTotal = dosage_per_day * scriptDuration

	repeatsNeeded = Math.floor(minTHCTotal / totalTHC)
	scriptList.forEach(script => {
		script.querySelector('.repeats').value = repeatsNeeded
		flashDOMElem(script.querySelector('.repeats').parentNode)
		scriptSums = dict_readAndsumTHCContentInScript(script)
		script.querySelector('.unitQtyTotal').innerHTML = `${scriptSums['sumQty']} ${scriptSums['unitMeasure']}`
		script.querySelector('.THCTotal').innerHTML = `${scriptSums['sumTHCTotal']} mg`

	})
	producttype = Array.from(new Set(scriptList.map(script => script.getAttribute('producttype'))))
	console.log(producttype)
	producttype.map(updateScriptCalculations)
	// updateScriptCalculations(scriptList[0].getAttribute('producttype'))
}