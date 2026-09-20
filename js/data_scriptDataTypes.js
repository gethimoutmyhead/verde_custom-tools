// const scriptTypes = ['cannabisDryHerb', 'cannabisVapeCartridge', 'cannabisOil', 'cannabisEdibles']
const scriptTypesAndMeta = 
{
	'cannabisDryHerb': 
	{
		'displayName': 'Cannabis Dry Herb',
		'S8drugs': ['Tetrahydrocannabinol'],
		'administrationMethod': 'inhalation',
		'strengthUnit': '%',
	},
	'cannabisVapeCartridge': 
	{
		'displayName': 'Cannabis Vape Cartridge',
		'S8drugs': ['Tetrahydrocannabinol'],
		'administrationMethod': 'inhalation',
		'strengthUnit': 'mg/cart',
	},
	'cannabisOil': 
	{
		'displayName': 'Cannabis Oil',
		'S8drugs': ['Tetrahydrocannabinol'],
		'administrationMethod': 'oral',
		'strengthUnit': 'mg/mL',
	},
	'cannabisEdibles': 
	{
		'displayName': 'Cannabis Edibles',
		'S8drugs': ['Tetrahydrocannabinol'],
		'administrationMethod': 'oral',
		'strengthUnit': 'mg/dose',
	},
	'oregano':
	{
		'displayName': 'Oregano Dry Herb',
		'S8drugs': [],
		'administrationMethod': 'oral',
		'strengthUnit': 'mg/g'
	}
}

const productTypesWithTHC = Object.keys(scriptTypesAndMeta).filter(scriptType => {
	return (scriptTypesAndMeta['cannabisDryHerb']['S8drugs']).includes('Tetrahydrocannabinol')
})

const inhaledTHCProductTypes = productTypesWithTHC.filter(productType => {
	return (scriptTypesAndMeta[productType]['administrationMethod'] == 'inhalation')
})

const oralTHCProductTypes = productTypesWithTHC.filter(productType => {
	return (scriptTypesAndMeta[productType]['administrationMethod'] == 'oral')
})

const productTypeGroups = {
	'inhaledTHC': {
		'scriptTypes': Object.keys(scriptTypesAndMeta).filter(scriptType =>
		{
			checks = []
			checks.push(scriptTypesAndMeta[scriptType]['S8drugs'].includes('Tetrahydrocannabinol'))
			checks.push(scriptTypesAndMeta[scriptType]['administrationMethod'] == 'inhalation')
			return !checks.includes(false)
		}),
		'doseSettingsSelector': '#inhaledTHCDoseSettings'
	},
	'oralTHC': {
		'scriptTypes': Object.keys(scriptTypesAndMeta).filter(scriptType =>
		{
			checks = []
			checks.push(scriptTypesAndMeta[scriptType]['S8drugs'].includes('Tetrahydrocannabinol'))
			checks.push(scriptTypesAndMeta[scriptType]['administrationMethod'] == 'oral')
			return !checks.includes(false)
		}),
		'doseSettingsSelector': '#oralTHCDoseSettings'
	}

}

function getMatchingProductGroups(productType){
	z = Object.keys(productTypeGroups)

	matchedGroups = z.filter(productGroup => {
		return productTypeGroups[productGroup]['scriptTypes'].includes(productType)
	})
	return matchedGroups
}