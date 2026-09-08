document.getElementById('prescriptionDate').valueAsDate = new Date();

['cannabisDryHerb', 'cannabisVapeCartridge', 'cannabisOil', 'cannabisEdibles'].forEach(scriptType => {
	tableId = `${scriptType}Table`
	document.getElementById(tableId).addEventListener('input', () => {
		updateScriptCalculations(scriptType)
	})
})

document.getElementById('inhaledTHCDoseSettings').addEventListener('input', () => {
	updateScriptCalculations('cannabisDryHerb')
})
document.getElementById('oralTHCDoseSettings').addEventListener('input', () => {
	updateScriptCalculations('cannabisOil')
})
z=['cannabisDryHerb', 'cannabisVapeCartridge', 'cannabisOil', 'cannabisEdibles']
z.forEach(scriptType => {
	updateScriptCalculations(scriptType)
})
// scriptTableIds = Object.keys(scriptTypesAndMeta).map(script => script.concat('Table'))
// scriptTableIds.forEach(updateCalculationsInTable)

// z={
// 	'tagName': 'div',
// }
// z['childNodes'] = [
// 	{
// 		'tagName': 'span',
// 		'properties': {
// 			'innerHTML': 'wheat'
// 		}
// 	},
// 	" products ",
// 	{
// 		'tagName': 'span',
// 		'properties': {
// 			'innerHTML': 'contain gluten'
// 		}
// 	},
// ]

// j=makeNewDOMElementFromDict_DOMElem(z)
// document.getElementById('mes').appendChild(j)