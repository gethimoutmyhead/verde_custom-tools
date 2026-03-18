
function updateTHCContentInScript(formElem_script, scriptSumAndDetail = null){
	const details = (scriptSumAndDetail) ? scriptSumAndDetail : dict_readAndsumTHCContentInScript(formElem_script)
	formElem_script.querySelector('.THCTotal').innerText = `${details['sumTHCTotal']} mg`
}

function updateCalculationsInTable(tableName){
		const tableDOM = document.getElementById(tableName)
		const arrayOfScriptDOMs = [...tableDOM.querySelectorAll('.scriptForm')]
		arrayOfScriptObjects = arrayOfScriptDOMs.map(dict_readAndsumTHCContentInScript)

		const THCSums = arrayOfScriptObjects.reduce((sumTHC, scriptObject) => scriptObject['sumTHCTotal'] + sumTHC, 0,)
		const sumTotalQty = arrayOfScriptObjects.reduce((sumQty, scriptObject) => scriptObject['sumQty'] + sumQty, 0,)
		tableDOM.querySelector('.sumUnitTotals').innerText = `${sumTotalQty} ${arrayOfScriptObjects[0]['unitMeasure']}`
		tableDOM.querySelector('.sumTHCTotals').innerText = `${THCSums} mg`

		arrayOfScriptDOMs.forEach( (scriptDOM, idx) => {
			updateTHCContentInScript(scriptDOM, arrayOfScriptObjects[idx])
		})

}