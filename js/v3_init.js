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
// z=['cannabisDryHerb', 'cannabisVapeCartridge', 'cannabisOil', 'cannabisEdibles']
// z.forEach(scriptType => {
// 	updateScriptCalculations(scriptType)
// })

z=['cannabisDryHerb', 'cannabisVapeCartridge', 'cannabisOil', 'cannabisEdibles']
// z.forEach(scriptType => {
// 	scriptDOM = makeNewDOMElementFromDict_DOMElem(dict_scriptFormTemplates[scriptType])
// 	document.querySelector(`#${scriptType}Table tbody`).appendChild(scriptDOM)
// })


z.forEach(scriptType => 
	{
		const buttonClassName = `add_${scriptType}`
		const tableName = `${scriptType}Table`
		const listName = `${scriptType}List`
		document.querySelectorAll(`.${buttonClassName}`).forEach(elem => {
				elem.addEventListener('click', () => {
					const dict_scriptFormTemplate = {...dict_scriptFormTemplates[scriptType]}
					const DOM_newScriptForm = makeNewDOMElementFromDict_DOMElem(dict_scriptFormTemplate)
					const DOM_productName = DOM_newScriptForm.querySelector('.productName')
					// DOM_productName.addEventListener('focus', () => {DOM_productName.select()})
		// DOM_newScriptForm.querySelector('.deleteForm').addEventListener('click', () => {
		// 	DOM_newScriptForm.closest('form').remove()
		// 	updateCalculationsInTable(tableName)
		// })
					document.querySelector(`#${tableName} tbody`).appendChild(DOM_newScriptForm)
					DOM_newScriptForm.addEventListener('click', (event) => {
						j = event.target
						if (j.tagName == 'INPUT'){
							return;
						}
						if (j.tagName == 'SPAN'){
							d= j.querySelector('input')
							if (d){
								d.focus()
								return;
							}
						}
						DOM_productName.focus()
					})
					DOM_productName.focus()
				})
			}
		)
		

				// DOM_newScriptForm.focus()
	}
)

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