
arrayOfDOMs_setInhaledTHCButtons = [...document.querySelectorAll('.setMaxInhaledTHC')]
arrayOfDOMs_setInhaledTHCButtons.forEach(DOM_inhaledTHCButton => {
	DOM_inhaledTHCButton.addEventListener('click', () => document.querySelector('input#maxInhaledTHC').value = DOM_inhaledTHCButton.innerText)
})

arrayOfDOMs_setOralTHCButtons = [...document.querySelectorAll('.setMaxOralTHC')]
arrayOfDOMs_setOralTHCButtons.forEach(DOM_oralTHCButton => {
	DOM_oralTHCButton.addEventListener('click', () => document.querySelector('input#maxOralTHC').value = DOM_oralTHCButton.innerText)
})


arrayOfDOMs_jumpToDosageLimitButtons = [...document.querySelectorAll('.set-dosage-limits')]
arrayOfDOMs_jumpToDosageLimitButtons.forEach(DOM_jumpToDosageLimitsButton => {
	DOM_jumpToDosageLimitsButton.addEventListener('click',() => {document.getElementById('avgInhaledTHC').focus()})
})

scriptTableIds.forEach(scriptTableId => {
	document.getElementById(scriptTableId).addEventListener('input', () => {
		updateCalculationsInTable(scriptTableId)
	})
})


Object.keys(scriptTypesAndMeta).forEach(scriptType => 
	{
		const buttonClassName = `add_${scriptType}`
		const tableName = `${scriptType}Table`
		const listName = `${scriptType}List`
		Array.from(document.querySelectorAll(`.${buttonClassName}`)).forEach((elem) => {
			elem.addEventListener('click', () => {
				num_scriptFormsCardinal = document.getElementById(listName).querySelectorAll('form.scriptForm').length
				num_scriptFormsIndex = num_scriptFormsCardinal + 1
				str_newDOMID = `${scriptType}-${num_scriptFormsIndex.toString().padStart(3,"0")}`
				const dict_scriptFormTemplate = {...dict_scriptFormTemplates[scriptType]}
				const DOM_newScriptForm = makeNewDOMElementFromDict_DOMElem(object_deepReplaceStringValues(dict_scriptFormTemplate, `${scriptType}-00`, str_newDOMID))
				DOM_productName = DOM_newScriptForm.querySelector('input.productName')
				DOM_productName.value = `${scriptTypesAndMeta[scriptType]['displayName']} ${num_scriptFormsIndex}`

				DOM_productName.addEventListener('focus', () => {DOM_productName.select()})
				DOM_newScriptForm.querySelector('.deleteForm').addEventListener('click', () => {
					DOM_newScriptForm.closest('form').remove()
					updateCalculationsInTable(tableName)
				})
				document.getElementById(listName).appendChild(DOM_newScriptForm)
				DOM_productName.focus()
				// DOM_newScriptForm.focus()

			})
		})
	})

document.getElementById('prescriptions-summary').addEventListener('click', () => {
	updatePrescriptionSummary()
})


doseInputIds = [
	{'id': 'avgInhaledTHC', 'maxDose': 500}, 
	{'id': 'maxInhaledTHC', 'maxDose': 500},
	{'id': 'avgOralTHC', 'maxDose': 40},
	{'id': 'maxOralTHC', 'maxDose': 40}
]
doseInputIds.forEach(doseInputId => {
	document.getElementById(doseInputId['id']).addEventListener('input', () => {
		dose = document.getElementById(doseInputId['id']).value
		if (Number(dose) > doseInputId['maxDose']){
			// console.log(`${doseInputId} exceeded 500`)
			let displayDict = {}
			displayDict['tagName'] = 'div'
			displayDict['attributes'] = {'class': 'row'}
			displayDict['childNodes'] = []
			displayDict['childNodes'].push({})
			displayDict['childNodes'][0]['tagName'] = 'div'
			displayDict['childNodes'][0]['attributes'] = {'class': 'col justify-content-center'}
			displayDict['childNodes'][0]['childNodes'] = []
			displayDict['childNodes'][0]['childNodes'].push({})
			displayDict['childNodes'][0]['childNodes'].push({})
			displayDict['childNodes'][0]['childNodes'][0]['tagName'] = 'img'
			displayDict['childNodes'][0]['childNodes'][0]['attributes'] = 
			{
				'src': 'https://i.kym-cdn.com/entries/icons/original/000/027/666/crow_of_judgement.jpg',
				'style': 'max-height: 100%; max-width: 100%; object-fit: container;',
			}
			displayDict['childNodes'][0]['childNodes'][1]['tagName'] = 'p'
			displayDict['childNodes'][0]['childNodes'][1]['properties'] = 
			{
				'innerText': `${doseInputId['id']} value ${dose} exceeds ${doseInputId['maxDose']}mg/day`
			}
			displayDict['childNodes'][0]['childNodes'][1]['attributes'] = 
			{
				'class': 'text-center',
			}
			
			
			clearDOMContents(document.getElementById('modal_crowOfJudgment').querySelector('.modal-body'))
			document.getElementById('modal_crowOfJudgment').querySelector('.modal-body').appendChild(makeNewDOMElementFromDict_DOMElem(displayDict))
			// document.getElementById('modal_crowOfJudgment').modal()
			let myModal = new bootstrap.Modal(document.getElementById('modal_crowOfJudgment'), {});
			myModal.show();
		}
	})
	
})