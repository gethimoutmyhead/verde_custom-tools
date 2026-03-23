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