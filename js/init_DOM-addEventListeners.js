
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

