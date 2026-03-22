document.getElementById('prescriptionDate').valueAsDate = new Date();


scriptTableIds = Object.keys(scriptTypesAndMeta).map(script => script.concat('Table'))
scriptTableIds.forEach(updateCalculationsInTable)