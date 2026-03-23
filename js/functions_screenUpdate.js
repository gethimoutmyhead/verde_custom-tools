
function updateTHCContentInScript(formElem_script, scriptSumAndDetail = dict_readAndsumTHCContentInScript(formElem_script)){
	// const details = (scriptSumAndDetail) ? scriptSumAndDetail : dict_readAndsumTHCContentInScript(formElem_script)
	// const details = dict_readAndsumTHCContentInScript(formElem_script)
	formElem_script.querySelector('.THCTotal').innerText = `${scriptSumAndDetail['sumTHCTotal']} mg`
}

function updateCalculationsInTable(tableName){
		const tableDOM = document.getElementById(tableName)
		const arrayOfScriptDOMs = [...tableDOM.querySelectorAll('.scriptForm')]
		// arrayOfScriptObjects = arrayOfScriptDOMs.map(dict_readAndsumTHCContentInScript)

		// const THCSums = arrayOfScriptObjects.reduce((sumTHC, scriptObject) => scriptObject['sumTHCTotal'] + sumTHC, 0,)
		// const sumTotalQty = arrayOfScriptObjects.reduce((sumQty, scriptObject) => scriptObject['sumQty'] + sumQty, 0,)
		tableSums = dict_sumScriptsInTable(tableName)

		tableDOM.querySelector('.sumUnitTotals').innerText = `${tableSums['sumTotalQty']} ${tableSums['unitMeasure']}`
		tableDOM.querySelector('.sumTHCTotals').innerText = `${tableSums['THCSums']} mg`

		arrayOfScriptDOMs.forEach((scriptDOM, idx) => updateTHCContentInScript(scriptDOM, tableSums[idx]))
		// arrayOfScriptDOMs.forEach( (scriptDOM, idx) => {
		// 	updateTHCContentInScript(scriptDOM, tableDOM['scriptObjectArray'])
		// })

}

function updatePrescriptionSummary(){
	summaryDOM = document.getElementById('summary')
	clearDOMContents(summaryDOM)
	summaryTemplate = 
	{
		'tagName': 'DIV',
		'attributes': 
		{
			'class':'row',
		},
		'childNodes': 
		[
			{
				'tagName': 'DIV',
				'attributes': 
				{
					'class': 'col'
				},
				'childNodes': 
				[

				],
			},
		],
	}
	scriptSummariser(dictList_readAggregatePrescriptionData()).then(summaryData => {
		prescriptionDate = new Date(document.getElementById('prescriptionDate').value)
		administrationTypes = Object.keys(summaryData)
		if (administrationTypes.includes('inhaledCannabis')){
			headerDict = 
			{
				'tagName': 'h4',
				'properties':
				{
					'innerText': 'Inhaled Cannabis Scripts'
				}
			}
			summaryTemplate.childNodes[0].childNodes.push(headerDict)
			THCSum = summaryData['inhaledCannabis']['THCSum']
			para1 = 
			{
				'tagName': 'p',
				'properties':
				{
					'innerText': `Total of ${THCSum} mg of THC\n`
				},
			}
			// para1['properties']['innerText'] += Object.keys(summaryData['oralCannabis'])
			avgDosage = `${summaryData['inhaledCannabis']['doseRange']['average']['dosage']}`
			avgDosageDays = `${summaryData['inhaledCannabis']['doseRange']['average']['durationOfSupply_days']}`
			maxDosage = `${summaryData['inhaledCannabis']['doseRange']['maximum']['dosage']}`
			maxDosageDays = `${summaryData['inhaledCannabis']['doseRange']['maximum']['durationOfSupply_days']}`
			// avgDateOfLastSupply = (new Date(document.getElementById('prescriptionDate').value)).addDays(avgDosageDays).toDateString()
			// maxDateOfLastSupply = (new Date(document.getElementById('prescriptionDate').value)).addDays(maxDosageDays).toDateString()
			avgDateOfLastSupply = (new Date(document.getElementById('prescriptionDate').value)).addDays(Number(avgDosageDays)).toDateString()
			// console.log(avgDosageDays)
			maxDateOfLastSupply = (new Date(document.getElementById('prescriptionDate').value)).addDays(Number(maxDosageDays)).toDateString()
			// console.log(avgDateOfLastSupply)
			// console.log(document.getElementById('prescriptionDate').value)
			// console.log((new Date(document.getElementById('prescriptionDate').value)))
			// console.log((new Date(document.getElementById('prescriptionDate').value)).addDays(avgDosageDays))
			// console.log(avgDosageDays)
			para1['properties']['innerText'] += `At ${avgDosage} mg/day of THC, prescriptions will last to ${avgDateOfLastSupply} (${avgDosageDays} days)\n`
			para1['properties']['innerText'] += `At ${maxDosage} mg/day of THC, prescriptions will last to ${maxDateOfLastSupply} (${maxDosageDays} days)\n`
			summaryTemplate.childNodes[0].childNodes.push(para1)

			subHead1 = 	
			{
				'tagName': 'h5',
				'properties':
				{
					'innerText': 'Estimated Usage'
				}
			}
			summaryTemplate.childNodes[0].childNodes.push(subHead1)
			para2 = 
			{
				'tagName': 'p',
				'properties':
				{
					'innerText': ``
				},
			}
			productTypes = inhaledTHCProductTypes.filter(productType => Object.keys(summaryData['inhaledCannabis']).includes(productType))
			para2['properties']['innerText'] = 'Prescription contains '
			productQuantities = productTypes.map(productType => {
				let sumQty = summaryData['inhaledCannabis'][productType]['sumQty']
				let unitMeasure = summaryData['inhaledCannabis'][productType]['unitType']
				let scriptType = scriptTypesAndMeta[summaryData['inhaledCannabis'][productType]['scriptList'][0]['productType']]['displayName']
				return (`${sumQty} ${unitMeasure} of ${scriptType}`)
			})
			para2['properties']['innerText'] += productQuantities.join(', ') + '.\n'
			productTypes.forEach(product => {
				para2['properties']['innerText'] += summaryData['inhaledCannabis'][product]['usageNotes']
			})
			summaryTemplate.childNodes[0].childNodes.push(para2)
			subHead2 = 
			{
				'tagName': 'h5',
				'properties':
				{
					'innerText': 'Script Intervals'
				}
			}
			subline = 
			{
				'tagName':'p',
				'properties': {'innerText': `based on ${maxDosage} mg/day THC`}
			}

			summaryTemplate.childNodes[0].childNodes.push(subHead2)
			summaryTemplate.childNodes[0].childNodes.push(subline)

			table1 = 
			{
				'tagName': 'table',
				'attributes': {
					'class': 'table table-striped'
				},
				'childNodes': 
				[
					{
						'tagName': 'thead',
						'childNodes': 
						[							
							{
								'tagName': 'tr',
								'childNodes': 
								[
									{
										'tagName': 'th',
										'attributes': {'scope': 'col'},
										'properties': {'innerText': 'Product Name'},
									},
									{
										'tagName': 'th',
										'attributes': {'scope': 'col'},
										'properties': {'innerText': 'Script Details'},
									},
									{
										'tagName': 'th',
										'attributes': {'scope': 'col'},
										'properties': {'innerText': 'Repeat Intervals'},
									}														
								],
							},
						]
					},
					{
						'tagName': 'tbody',
						'childNodes':
						[
						],
					}
				]
			}
			productTypes.forEach(productType =>
			{
				summaryData['inhaledCannabis'][productType]['scriptList'].forEach(script => {
					scrProductName = script['productName']
					scrStrengthValue = script['strength']
					scrStrengthUnitMeasure = scriptTypesAndMeta[script['productType']]['strengthUnit']
					unitsPerDispense = script['unitsPerDispense']
					unitQty = script['unitQty']
					doseUnitMeasure = script['unitMeasure']
					repeats = script['repeats']
					dosageString = `${Math.max(unitQty, unitsPerDispense)} ${doseUnitMeasure}`
					if ((unitQty > 1) && (unitsPerDispense) > 1 ){
						dosageString = `${unitQty} ${doseUnitMeasure} * ${unitsPerDispense}`
					}

					repeatInterval = script['repeatInterval']
					scriptString = `${scrStrengthValue} ${scrStrengthUnitMeasure}, ${dosageString}, ${repeats} repeats`

					scriptRow = 
					{
						'tagName': 'tr',
						'childNodes':
						[
							{
								'tagName': 'td',
								'properties': {'innerText': scrProductName}
							},
							{
								'tagName': 'td',
								'properties': {'innerText': scriptString}
							},
							{
								'tagName': 'td',
								'properties': {'innerText': `${repeatInterval} days`}
							},
						]
					}
					table1['childNodes'][1]['childNodes'].push(scriptRow)
				})
			
			})
			summaryTemplate.childNodes[0].childNodes.push(table1)
		}

		if (administrationTypes.includes('oralCannabis')){
			headerDict = 
			{
				'tagName': 'h4',
				'properties':
				{
					'innerText': 'Oral Cannabis Scripts'
				}
			}
			summaryTemplate.childNodes[0].childNodes.push(headerDict)
			THCSum = summaryData['oralCannabis']['THCSum']
			para1 = 
			{
				'tagName': 'p',
				'properties':
				{
					'innerText': `Total of ${THCSum} mg of THC\n`
				},
			}
			// para1['properties']['innerText'] += Object.keys(summaryData['oralCannabis'])
			avgDosage = `${summaryData['oralCannabis']['doseRange']['average']['dosage']}`
			avgDosageDays = `${summaryData['oralCannabis']['doseRange']['average']['durationOfSupply_days']}`
			maxDosage = `${summaryData['oralCannabis']['doseRange']['maximum']['dosage']}`
			maxDosageDays = `${summaryData['oralCannabis']['doseRange']['maximum']['durationOfSupply_days']}`
			avgDateOfLastSupply = (new Date(document.getElementById('prescriptionDate').value)).addDays(Number(avgDosageDays)).toDateString()
			maxDateOfLastSupply = (new Date(document.getElementById('prescriptionDate').value)).addDays(Number(maxDosageDays)).toDateString()

			para1['properties']['innerText'] += `At ${avgDosage} mg/day of THC, prescriptions will last to ${avgDateOfLastSupply} (${avgDosageDays} days)\n`
			para1['properties']['innerText'] += `At ${maxDosage} mg/day of THC, prescriptions will last to ${maxDateOfLastSupply} (${maxDosageDays} days)\n`
			summaryTemplate.childNodes[0].childNodes.push(para1)

			subHead1 = 	
			{
				'tagName': 'h5',
				'properties':
				{
					'innerText': 'Estimated Usage'
				}
			}
			summaryTemplate.childNodes[0].childNodes.push(subHead1)
			para2 = 
			{
				'tagName': 'p',
				'properties':
				{
					'innerText': ``
				},
			}
			productTypes = oralTHCProductTypes.filter(productType => Object.keys(summaryData['oralCannabis']).includes(productType))
			para2['properties']['innerText'] = 'Prescription contains '
			productQuantities = productTypes.map(productType => {
				let sumQty = summaryData['oralCannabis'][productType]['sumQty']
				let unitMeasure = summaryData['oralCannabis'][productType]['unitType']
				let scriptType = scriptTypesAndMeta[summaryData['oralCannabis'][productType]['scriptList'][0]['productType']]['displayName']
				return (`${sumQty} ${unitMeasure} of ${scriptType}`)
			})
			para2['properties']['innerText'] += productQuantities.join(', ') + '.\n'
			productTypes.forEach(product => {
				para2['properties']['innerText'] += summaryData['oralCannabis'][product]['usageNotes']
			})
			summaryTemplate.childNodes[0].childNodes.push(para2)
			subHead2 = 
			{
				'tagName': 'h5',
				'properties':
				{
					'innerText': 'Script Intervals'
				}
			}
			subline = 
			{
				'tagName':'p',
				'properties': {'innerText': `based on ${maxDosage} mg/day THC`}
			}

			summaryTemplate.childNodes[0].childNodes.push(subHead2)
			summaryTemplate.childNodes[0].childNodes.push(subline)

			table1 = 
			{
				'tagName': 'table',
				'attributes': {
					'class': 'table table-striped'
				},
				'childNodes': 
				[
					{
						'tagName': 'thead',
						'childNodes': 
						[							
							{
								'tagName': 'tr',
								'childNodes': 
								[
									{
										'tagName': 'th',
										'attributes': {'scope': 'col'},
										'properties': {'innerText': 'Product Name'},
									},
									{
										'tagName': 'th',
										'attributes': {'scope': 'col'},
										'properties': {'innerText': 'Script Details'},
									},
									{
										'tagName': 'th',
										'attributes': {'scope': 'col'},
										'properties': {'innerText': 'Repeat Intervals'},
									}														
								],
							},
						]
					},
					{
						'tagName': 'tbody',
						'childNodes':
						[
						],
					}
				]
			}
			productTypes.forEach(productType =>
			{
				summaryData['oralCannabis'][productType]['scriptList'].forEach(script => {
					scrProductName = script['productName']
					scrStrengthValue = script['strength']
					scrStrengthUnitMeasure = scriptTypesAndMeta[script['productType']]['strengthUnit']
					unitsPerDispense = script['unitsPerDispense']
					unitQty = script['unitQty']
					doseUnitMeasure = script['unitMeasure']
					repeats = script['repeats']
					dosageString = `${Math.max(unitQty, unitsPerDispense)} ${doseUnitMeasure}`
					if ((unitQty > 1) && (unitsPerDispense) > 1 ){
						dosageString = `${unitQty} ${doseUnitMeasure} * ${unitsPerDispense}`
					}

					repeatInterval = script['repeatInterval']
					scriptString = `${scrStrengthValue} ${scrStrengthUnitMeasure}, ${dosageString}, ${repeats} repeats`

					scriptRow = 
					{
						'tagName': 'tr',
						'childNodes':
						[
							{
								'tagName': 'td',
								'properties': {'innerText': scrProductName}
							},
							{
								'tagName': 'td',
								'properties': {'innerText': scriptString}
							},
							{
								'tagName': 'td',
								'properties': {'innerText': `${repeatInterval} days`}
							},
						]
					}
					table1['childNodes'][1]['childNodes'].push(scriptRow)
				})
			
			})
			summaryTemplate.childNodes[0].childNodes.push(table1)
		}

		summaryDOM.appendChild(makeNewDOMElementFromDict_DOMElem(summaryTemplate))
	})
}

//function to add new scripts to table
