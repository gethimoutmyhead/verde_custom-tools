document.querySelectorAll('.prescriptionDate').forEach(dateElem => {
	dateElem.valueAsDate = new Date()
})

z=['cannabisDryHerb', 'cannabisVapeCartridge', 'cannabisOil', 'cannabisEdibles']
z.forEach(scriptType => {
	tableId = `${scriptType}Table`
	document.getElementById(tableId).addEventListener('input', (event) => {
		scriptDOM = event.target.closest('tr')
		scriptSums = dict_readAndsumTHCContentInScript(scriptDOM)
		scriptDOM.querySelector('.unitQtyTotal').innerHTML = `${scriptSums['sumQty']} ${scriptSums['unitMeasure']}`
		scriptDOM.querySelector('.THCTotal').innerHTML = `${scriptSums['sumTHCTotal']} mg`

		updateScriptCalculations(scriptType)
	})
})

document.getElementById('inhaledTHCDoseSettings').addEventListener('input', () => {
	updateScriptCalculations('cannabisDryHerb')
})
document.getElementById('oralTHCDoseSettings').addEventListener('input', () => {
	updateScriptCalculations('cannabisOil')
})

document.querySelector('.inhaledTHCScripts .repeatCalculator').addEventListener('click', (event) => {
	scriptList = Array.from(document.querySelectorAll('.scriptForm'))
	matchedProductTypes = productTypeGroups['inhaledTHC']['scriptTypes']
	filteredScriptList = Array.from(scriptList.filter(script => {
		return matchedProductTypes.includes(script.getAttribute('productType'))
	}))
	avgDosage= document.querySelector('#inhaledTHCDoseSettings input.avgDose.dosePerDay').value
	duration=document.querySelector('.inhaledTHCScripts span.repeatCalculatosr input').value
	calculateAndUpdateMinRepeatsForDuration(filteredScriptList,avgDosage, duration)
})
// z=['cannabisDryHerb', 'cannabisVapeCartridge', 'cannabisOil', 'cannabisEdibles']
// z.forEach(scriptType => {
// 	updateScriptCalculations(scriptType)
// })


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
					DOM_productName.value = scriptTypesAndMeta[scriptType]['displayName']
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
					DOM_productName.select()
				})
			}
		)
		

				// DOM_newScriptForm.focus()
	}
)


function observeChildChanges(container) {


  const isTextNode = (n) => n.nodeType === Node.TEXT_NODE;

  const observer = new MutationObserver((mutations) => {
    const flashed = new Set();

    const tryFlash = (el) => {
      if (el && el !== container && !flashed.has(el)) {
        flashed.add(el);
        flashDOMElem(el);
      }
    };

    for (const m of mutations) {
      if (m.type === 'characterData') {
        // Existing text node edited in place
        tryFlash(m.target.parentElement);
      } else if (m.type === 'childList') {
        // Text node replaced or newly inserted (e.g. via innerHTML/textContent)
        const textChanged =
          [...m.addedNodes].some(isTextNode) ||
          [...m.removedNodes].some(isTextNode);
        if (textChanged) tryFlash(m.target);
      }
      // Element nodes added/removed with no text involvement: ignored
    }
  });

  observer.observe(container, {
    characterData: true,
    childList: true,   // needed to catch text nodes being replaced
    subtree: true,
  });

  return observer;
}

// Usage:
jj = ['#inhaledTHCDoseSettings', '#oralTHCDoseSettings', ...z.map(elem => `#${elem}Table`)]
jj.map(elem => document.querySelector(elem)).map(observeChildChanges)
// observeChildChanges(document.querySelector('#cannabisDryHerbTable'));
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