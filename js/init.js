document.getElementById('prescriptionDate').valueAsDate = new Date();

// [...document.querySelectorAll('.scriptForm')].forEach(scriptForm => {
// 	updateTHCContentInScript(scriptForm)
// 	scriptForm.addEventListener('input', () => {
// 		updateTHCContentInScript(scriptForm)
// 	})
// })

['dryHerbTable', 'vapeCartridgeTable','cannabisOilTable','ediblesTable'].forEach(scriptList =>
	{
		const scriptListDOM = document.getElementById(scriptList)
		const arrayOfScriptDOMs = [...scriptListDOM.querySelectorAll('.scriptForm')]
		arrayOfScriptObjects = arrayOfScriptDOMs.map(dict_readAndsumTHCContentInScript)

		const THCSums = arrayOfScriptObjects.reduce((sumTHC, scriptObject) => scriptObject['sumTHCTotal'] + sumTHC, 0,)
		const sumTotalQty = arrayOfScriptObjects.reduce((sumQty, scriptObject) => scriptObject['sumQty'] + sumQty, 0,)
		scriptListDOM.querySelector('.sumUnitTotals').innerText = `${sumTotalQty} ${arrayOfScriptObjects[0]['unitMeasure']}`
		scriptListDOM.querySelector('.sumTHCTotals').innerText = `${THCSums} mg`

		// console.log(`${scriptList} - ${THCSums}mg - ${sumTotalQty} ${arrayOfScriptObjects[0]['unitMeasure']}`)
		// console.log(arrayOfScriptObjects[0])


		arrayOfScriptDOMs.forEach( (scriptDOM, idx) => {
			updateTHCContentInScript(scriptDOM, arrayOfScriptObjects[idx])
		})

		scriptListDOM.addEventListener('input', () => {
			updateCalculationsInTable(scriptList)
		})

		// arrayOfScriptDOMs.forEach(scriptDOM => {
		// 	// updateTHCContentInScript(scriptForm)
		// 	scriptDOM.addEventListener('input', () => {
		// 		updateTHCContentInScript(scriptDOM)
		// 	})
		// })
		// add code to sum all the individual script tables here
	})