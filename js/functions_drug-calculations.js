function dict_sumScriptsInTable(tableName){
		const tableDOM = document.getElementById(tableName)
		const arrayOfScriptDOMs = [...tableDOM.querySelectorAll('.scriptForm')]
		arrayOfScriptObjects = arrayOfScriptDOMs.map(dict_readAndsumTHCContentInScript)

		const THCSums = arrayOfScriptObjects.reduce((sumTHC, scriptObject) => scriptObject['sumTHCTotal'] + sumTHC, 0,)
		const sumTotalQty = arrayOfScriptObjects.reduce((sumQty, scriptObject) => scriptObject['sumQty'] + sumQty, 0,)

		return {'THCSums': THCSums, 'sumTotalQty': sumTotalQty, 'unitMeasure': arrayOfScriptObjects[0]['unitMeasure']}
}

function dict_readAndsumTHCContentInScript(formElem_script){
	// takes any valid form Elem and returns
	// {

	// 	'productType': 'text',
	// 	'THCConversionFactor': ###,
	// 	'productName': 'text', 
	// 	'strength': ###,
	// 	'unitQty': ###,
	// 	'unitsPerDispense': ###,
	// 	'repeats': ###,
	// 	'sumTHCTotal': ###, 
	// 	'sumQty': ###, 
	// 	'unitMeasure': 'text',

	// }
	// unitQty, if not found, is assumed 1 (eg vials, pastilles)
	// unitMeasure can be ['g', 'vials', 'mL', 'units']
	// sumTHCTotal, sumQty, are calculated
	// unitMeasure can be ['g', 'vials', 'mL', 'doses']
	const scriptDetails = new Object();
	// scriptDetails['productName'] = formElem_script.getAttribute('productName')
	key1 = ['productType','unitMeasure']
	key2 = ['THCConversionFactor']
	key3 = ['productName']
	key4 = ['strength', 'unitsPerDispense', 'repeats']
	det1 = key1.map(elem => {
		return formElem_script.getAttribute(elem);
	})
	det2 = key2.map(elem => {
		return Number(formElem_script.getAttribute(elem));
	})
	det3 = key3.map(elem => {
		return formElem_script.querySelector(`.${elem}`).value;
	})
	det4 = key4.map(elem => {
		return Number(formElem_script.querySelector(`.${elem}`).value);
	})
	key = key1.concat(key2, key3, key4)
	det = det1.concat(det2, det3, det4)

	key.forEach((elem, idx) => {
		scriptDetails[elem] = det[idx]
	});
	scriptDetails['unitQty'] = formElem_script.querySelector('.unitQty') ? formElem_script.querySelector('.unitQty').value : 1;
	scriptDetails['sumQty'] = scriptDetails['unitsPerDispense'] * scriptDetails['unitQty'] * ((scriptDetails['repeats']) + 1)
	scriptDetails['sumTHCTotal'] = scriptDetails['sumQty'] * scriptDetails['strength'] * eval(scriptDetails['THCConversionFactor'])
	return (scriptDetails)
}

// function to calculate intervals

// function to write executive summary of scripts

function dictList_readAggregatePrescriptionData(){
	const arrayOfScriptDOMs = [...document.querySelectorAll('.scriptForm')]

	const arrayOfDOMs_THCScripts = arrayOfScriptDOMs.filter(scriptDOM => {
		return (productTypesWithTHC.includes(scriptDOM.getAttribute('productType')))
	})

	const cannabisScripts = arrayOfDOMs_THCScripts.map(dict_readAndsumTHCContentInScript)
	return cannabisScripts
}

function dictList_readDrugDoseRange(){
	const doseRange = {}
	doseRange['inhaledTHC'] = {}
	doseRange['inhaledTHC']['average'] = Number(document.getElementById('avgInhaledTHC').value)
	doseRange['inhaledTHC']['maximum'] = Number(document.getElementById('maxInhaledTHC').value)
	doseRange['inhaledTHC']['unitMeasure'] = 'mg'

	doseRange['oralTHC'] = {}
	doseRange['oralTHC']['average'] = Number(document.getElementById('avgOralTHC').value)
	doseRange['oralTHC']['maximum'] = Number(document.getElementById('maxOralTHC').value)
	doseRange['oralTHC']['unitMeasure'] = 'mg'

	return doseRange
}

async function scriptSummariser(aggregatePrescriptionData, drugDosageRange = dictList_readDrugDoseRange()){
	const inhaledCannabisScripts = aggregatePrescriptionData.filter(script => {
		return (inhaledTHCProductTypes.includes(script['productType']))
	})
	const scriptSummary = {}
	if (inhaledCannabisScripts.length > 0){
		avgDosage = drugDosageRange['inhaledTHC']['average'] || 150
		maxDosage = drugDosageRange['inhaledTHC']['maximum'] || 300
		
		scriptSummary['inhaledCannabis'] = {}
		scriptSummary['inhaledCannabis']['THCSum'] = inhaledCannabisScripts.reduce((sumTHC, script) => sumTHC + script['sumTHCTotal'], 0)

		scriptSummary['inhaledCannabis']['doseRange'] = {}
		scriptSummary['inhaledCannabis']['doseRange']['average'] = {}
		scriptSummary['inhaledCannabis']['doseRange']['maximum'] = {}
		
		scriptSummary['inhaledCannabis']['doseRange']['average']['dosage'] = avgDosage
		scriptSummary['inhaledCannabis']['doseRange']['maximum']['dosage'] = maxDosage
		scriptSummary['inhaledCannabis']['doseRange']['average']['durationOfSupply_days'] = Math.ceil(scriptSummary['inhaledCannabis']['THCSum'] / avgDosage)
		scriptSummary['inhaledCannabis']['doseRange']['maximum']['durationOfSupply_days']  = Math.ceil(scriptSummary['inhaledCannabis']['THCSum'] / maxDosage)

		inhaledCannabisScripts.forEach(script => {
			script['repeatInterval'] = 	Math.ceil(scriptSummary['inhaledCannabis']['doseRange']['maximum']['durationOfSupply_days'] / (script['repeats'] + 1))
		})
		// scriptSummary['inhaledCannabis']['scriptList'] = inhaledCannabisScripts

		inhaledTHCProductTypes.forEach(productType => {
			const scriptOfType = inhaledCannabisScripts.filter(script => {return (script['productType'] == productType)})
			if (scriptOfType.length > 0){
				scriptSummary['inhaledCannabis'][productType] = {}
				scriptSummary['inhaledCannabis'][productType]['scriptList'] = scriptOfType
				scriptSummary['inhaledCannabis'][productType]['unitType'] = scriptOfType[0]['unitMeasure']
				scriptSummary['inhaledCannabis'][productType]['sumQty'] = scriptOfType.reduce((sumQty, script) => sumQty + script['sumQty'], 0)
				scriptSummary['inhaledCannabis'][productType]['usageNotes'] = ''
				averageUse = scriptSummary['inhaledCannabis'][productType]['sumQty'] / scriptSummary['inhaledCannabis']['doseRange']['average']['durationOfSupply_days']
				let usageNotes = ''
				console.log(productType)
				usageNotes += `At average use, consumes ${averageUse} ${scriptSummary['inhaledCannabis'][productType]['unitType']} per day of ${scriptTypesAndMeta[productType]['displayName']}\n`.repeat((averageUse >= 1))
				usageNotes += `At average use, 5 ${scriptSummary['inhaledCannabis'][productType]['unitType']} of ${scriptTypesAndMeta[productType]['displayName']} is consumed every ${Math.ceil(averageUse * 5)}  days \n`.repeat((averageUse < 1 && averageUse > 0.5))
				usageNotes += `At average use, 1 ${scriptSummary['inhaledCannabis'][productType]['unitType']} of ${scriptTypesAndMeta[productType]['displayName']} is consumed every ${Math.ceil(1 / averageUse)}  days \n`.repeat((averageUse <= 0.5))
				scriptSummary['inhaledCannabis'][productType]['usageNotes'] += usageNotes

			}
		})
	}

	const oralCannabisScripts = aggregatePrescriptionData.filter(script => {
		return (oralTHCProductTypes.includes(script['productType']))
	})
	if (oralCannabisScripts.length > 0){
		avgDosage = drugDosageRange['oralTHC']['average'] || 10
		maxDosage = drugDosageRange['oralTHC']['maximum'] || 40
		
		scriptSummary['oralCannabis'] = {}
		scriptSummary['oralCannabis']['THCSum'] = oralCannabisScripts.reduce((sumTHC, script) => sumTHC + script['sumTHCTotal'], 0)

		scriptSummary['oralCannabis']['doseRange'] = {}
		scriptSummary['oralCannabis']['doseRange']['average'] = {}
		scriptSummary['oralCannabis']['doseRange']['maximum'] = {}
		
		scriptSummary['oralCannabis']['doseRange']['average']['dosage'] = avgDosage
		scriptSummary['oralCannabis']['doseRange']['maximum']['dosage'] = maxDosage
		scriptSummary['oralCannabis']['doseRange']['average']['durationOfSupply_days'] = Math.ceil(scriptSummary['oralCannabis']['THCSum'] / avgDosage)
		scriptSummary['oralCannabis']['doseRange']['maximum']['durationOfSupply_days']  = Math.ceil(scriptSummary['oralCannabis']['THCSum'] / maxDosage)

		oralCannabisScripts.forEach(script => {
			script['repeatInterval'] = 	Math.ceil(scriptSummary['oralCannabis']['doseRange']['maximum']['durationOfSupply_days'] / (script['repeats'] + 1))
		})
		// scriptSummary['oralCannabis']['scriptList'] = oralCannabisScripts

		oralTHCProductTypes.forEach(productType => {
			const scriptOfType = oralCannabisScripts.filter(script => {return (script['productType'] == productType)})
			if (scriptOfType.length > 0){
				scriptSummary['oralCannabis'][productType] = {}
				scriptSummary['oralCannabis'][productType]['scriptList'] = scriptOfType
				scriptSummary['oralCannabis'][productType]['unitType'] = scriptOfType[0]['unitMeasure']
				scriptSummary['oralCannabis'][productType]['sumQty'] = scriptOfType.reduce((sumQty, script) => sumQty + script['sumQty'], 0)
			}
		})
	}
	return scriptSummary
}
