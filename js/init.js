document.getElementById('prescriptionDate').valueAsDate = new Date();


// const scriptTypes = ['cannabisDryHerb', 'cannabisVapeCartridge', 'cannabisOil', 'cannabisEdibles']
const scriptTypesAndMeta = 
{
	'cannabisDryHerb': {'displayName': 'Cannabis Dry Herb'},
	'cannabisVapeCartridge': {'displayName': 'Cannabis Vape Cartridge'},
	'cannabisOil': {'displayName': 'Cannabis Oil'},
	'cannabisEdibles': {'displayName': 'Cannabis Edibles'},

}
scriptTableIds = Object.keys(scriptTypesAndMeta).map(script => script.concat('Table'))
scriptTableIds.forEach(updateCalculationsInTable)