// const scriptTypes = ['cannabisDryHerb', 'cannabisVapeCartridge', 'cannabisOil', 'cannabisEdibles']
const scriptTypesAndMeta = 
{
	'cannabisDryHerb': 
	{
		'displayName': 'Cannabis Dry Herb',
		'S8drugs': ['Tetrahydrocannabinol'],
		'administrationMethod': 'inhalation',
	},
	'cannabisVapeCartridge': 
	{
		'displayName': 'Cannabis Vape Cartridge',
		'S8drugs': ['Tetrahydrocannabinol'],
		'administrationMethod': 'inhalation',
	},
	'cannabisOil': 
	{
		'displayName': 'Cannabis Oil',
		'S8drugs': ['Tetrahydrocannabinol'],
		'administrationMethod': 'oral',
	},
	'cannabisEdibles': 
	{
		'displayName': 'Cannabis Edibles',
		'S8drugs': ['Tetrahydrocannabinol'],
		'administrationMethod': 'oral',
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