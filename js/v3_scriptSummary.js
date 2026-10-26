function getTreatmentSummary(administrationMethod){
	var linesToMake = []
	const doseSettingsDOM = document.querySelector(`#${administrationMethod}DoseSettings`)
	const title = doseSettingsDOM.querySelector('h4').innerText
	linesToMake.push(title.slice(1))
	const firstDispenseDate = new Date(doseSettingsDOM.querySelector('.prescriptionDate').value)

	linesToMake.push(`First dispense ${firstDispenseDate.toDateString()}`)
	// var avgDosage = doseSettingsDOM.querySelectorAll('div')[3].innerText.split(' ')
	// avgDosage[1] = doseSettingsDOM.querySelectorAll('div')[3].querySelector('input.avgDose').value
	// linesToMake.push(avgDosage.join(' ').replaceAll('\n\n', " "))
	var avgDosage = extractTextFromDOM(doseSettingsDOM.querySelectorAll('div')[3])
	linesToMake.push(avgDosage)
	var maxDosage = extractTextFromDOM(doseSettingsDOM.querySelectorAll('div')[4])
	linesToMake.push(maxDosage)

	scriptList = Array.from(document.querySelector(`.${administrationMethod}Scripts`).querySelectorAll('.scriptForm'))
	scriptStrings = scriptList.map(scriptList => {
		prescription = extractTextFromDOM(scriptList.querySelector('td:nth-of-type(2)'))
		repeatInterval = `. Repeat Interval ${extractTextFromDOM(scriptList.querySelector('td:nth-of-type(3)'))}`
		return `${prescription}${repeatInterval}`
	})
	linesToMake.push(...scriptStrings)
	return linesToMake.join('\n')
}

function extractTextFromDOM(el) {
  const parts = [];

  for (const node of el.childNodes) {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent.replace(/\n\n/g, ' ').trim();
      if (text) parts.push(text);
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      if (node.tagName === 'INPUT') {
        const value = node.value.replace(/\n\n/g, ' ').trim();
        if (value) parts.push(value);
      } else if (node.childNodes.length) {
        const inner = extractTextFromDOM(node);
        if (inner) parts.push(inner);
      }
    }
  }

  return parts.join(' ').replace(/ ([,.])/g, '$1');;
}