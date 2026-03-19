Date.prototype.addDays = function(step){
	var date = new Date(this.valueOf())
	date.setDate(date.getDate() + step);
	return date;
}

Date.prototype.minusDays = function(step){
	var date = new Date(this.valueOf())
	date.setDate(date.getDate() - step);
	return date;
}
Date.prototype.giveYYYYMMDD_string = function(){
	var date = new Date(this.valueOf())
	const year = date.getFullYear();
	const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed, add 1, then pad with '0'
	const day = date.getDate().toString().padStart(2, '0'); // Pad with '0'
	const formattedDate = `${year}-${month}-${day}`;
	return formattedDate;
}
function sendFetchRequestWithParams_promise(requestURL, params){
	bodyData = new FormData();
	Object.keys(params).forEach(key => {
		bodyData.append(key, params[key])
	});
	return fetch(requestURL, {method: "POST", body: bodyData})
}
function postFormAndCatchResult_JSON_promise(formId, path){
	dom_elem = document.getElementById(formId);
	data = new FormData(dom_elem)
	return fetch(path,{
		method:'POST',
		body: data,
	}).then(response => response.json())
};

function postFormAndCollectResponse_promise(formId, path){
	dom_elem = document.getElementById(formId);
	data = new FormData(dom_elem)
	return fetch(path,{
		method:'POST',
		body: data,
	})
};


function convertResponseTo_HTML(responseFromFetch){
	return responseFromFetch.then(html => {
		const parser = new DOMParser();
		const doc = parser.parseFromString(html, "text/html")
		return doc
	})
}

function createNewForm_DOMElement(formId, formParams){
	Array.from(document.querySelectorAll('#' + formId)).forEach(elem => elem.remove())
	var newForm = document.createElement("form");
	newForm.setAttribute('method',"post");
	newForm.setAttribute('id', formId);
	Object.keys(formParams).forEach((element) => {
		var newline = document.createElement('input');
		newline.setAttribute('type','hidden')
		newline.setAttribute('name',element);
		newline.setAttribute('value',formParams[element]);
		newForm.appendChild(newline);
	})
	form_DOMelement = document.body.appendChild(newForm);
	return form_DOMelement;
};



// const asyncFilter = async (arr, predicate) => {
// 	const results = await Promise.all(arr.map(predicate));

// 	return arr.filter((_v, index) => results[index]);
// }

function standardiseDateString_string(dateString){
	dateObj = new Date(dateString);
	fullYear_string = String(dateObj.getFullYear());
	monthNumericalPadded_string = String(dateObj.getMonth()+1).padStart(2,'0');
	dateOfMonthNumericalPadded_string = String(dateObj.getDate()).padStart(2,'0');
	standardisedDate = fullYear_string + '-' + monthNumericalPadded_string + '-' + dateOfMonthNumericalPadded_string;
	return (standardisedDate);
}

function makeAnEmail(receiverEmail, SubjectLine, Content, ccemail = ""){
	emailLinkId = 'thury-xestro-email-link';
	elemMatchingId = document.querySelectorAll('#'+emailLinkId).forEach(elem => {elem.remove()});
	emailLink = document.createElement("a");
	hrefString = 'mailto:' + receiverEmail;
	hrefString += '?Subject='+SubjectLine;
	ccEmailArg = '&cc='+ccemail
	hrefString += ccEmailArg.repeat(!!Number(ccemail.length))
	hrefString += '&Body='+Content
	emailLink.setAttribute('href', hrefString);
	emailLink.setAttribute('id', emailLinkId);
	document.body.appendChild(emailLink);
	document.getElementById(emailLinkId).click();
}

function getUniqueKeysFromDict_array(keys_array, new_dict) {
	  newList=keys_array.concat(...Object.keys(new_dict))
    return Array.from(new Set(newList))
}

function exportDictListToCsv(filename, data) {
  header_array = data.reduce(getUniqueKeysFromDict_array, new Array)
  rows_array = data.map(row => header_array.map(columnName => row[columnName]))
  rows_stringify_array = rows_array.map(row => row.join(','))
  header_stringify = header_array.join(',')
  const csvContent = [header_stringify, ...rows_stringify_array].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8,' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.click();
  URL.revokeObjectURL(url); // Clean up the URL
}

function exportDictListToJson(filename, data) {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}`;
    document.body.appendChild(a); // Append to body is often needed for click() to work reliably
    a.click();
    document.body.removeChild(a); // Remove the temporary element
    URL.revokeObjectURL(url);
}

async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

function dumpStringToConsole(mystring_dict){
	mystring = mystring_dict['mystring']
	console.log(mystring)
}

function dumpToConsole(toDump){
	bool_logThisActivity = false
	if (bool_logThisActivity){
		console.log(toDump)	
	}	
}


async function writeStringToClipboard_promise(functionArguments_dict){
	text_string = functionArguments_dict['text_string'];
	sendToClipboard_promise = navigator.clipboard.writeText(text_string).then(
		() => {
			dumpToConsole('success')
			return ({'reply': 'SUCCESS: copypasta sent'})
		},
		() => {
			dumpToConsole('failure')
			return ({'reply': 'FAIL: string not written to clipboard'})
		}
	);
	return sendToClipboard_promise;
}


function makeNewDOMElementFromDict_DOMElem(DOMElem_dict){
		const elemVar = DOMElem_dict;
		const newElem = document.createElement(elemVar['tagName']);
		if (elemVar['properties']){
			Object.keys(elemVar['properties']).forEach(property => {
				newElem[property] = elemVar['properties'][property]
			})
		}
		// if (elemVar['innerHTML']){
		// 	newElem['innerHTML'] = elemVar['innerHTML']
		// 	delete elemVar['innerHTML']
		// }
		if (elemVar['attributes']){
			Object.keys(elemVar['attributes']).forEach(elemAttribute => {
				newElem.setAttribute(elemAttribute, elemVar['attributes'][elemAttribute]);
			})
		}
		if (elemVar['childNodes']){
			array_childNodes = elemVar['childNodes'].map(makeNewDOMElementFromDict_DOMElem)
			array_childNodes.forEach(childNode => newElem.appendChild(childNode))
		}

		return newElem
}

function dict_deconstructDOMElement(DOMElem){
	const tagName = DOMElem.tagName
	const attributes = (DOMElem.attributes) ? [...DOMElem.attributes].reduce((newObj, attribute) => {
		newObj[attribute['name']] = attribute['nodeValue']
		return newObj
	}, {},) : null
	const filteredChildNodes = (DOMElem.childNodes) ? [...DOMElem.childNodes].filter(node => node.nodeType != Node.TEXT_NODE) : []
	childNodes = filteredChildNodes.map(dict_deconstructDOMElement)//(DOMElem.childNodes) ? [...DOMElem.childNodes].map(dict_deconstructDOMElement) : null
	
	const propertyNames = ['innerText']
	const properties = (childNodes.length == 0) ? 
			propertyNames.reduce((newObj, propertyName) => {
			newObj[propertyName] = DOMElem[propertyName]
			return newObj
		}, {}) : null

	return {'tagName': tagName, 'attributes': attributes, 'properties': properties, 'childNodes': childNodes}
}

function removeFadeOut( el, speed ) {
    var seconds = speed/1000;
    el.style.transition = "opacity "+seconds+"s ease";
    el.style.visibility = 'visible';
 	el.style.opacity = 1
    setTimeout(function() {
        el.parentNode.removeChild(el);
    }, speed);
}

function disableKeypressOnElement(DOMElem, arrayOfInts_keyCodes){
	DOMElem.addEventListener('keydown', function(e){
		if ((arrayOfInts_keyCodes).includes(e.keyCode)) {
			e.preventDefault()
		}
	})
}

