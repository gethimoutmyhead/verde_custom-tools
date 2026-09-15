dict_scriptFormTemplates = {}

dict_scriptFormTemplates['cannabisDryHerb'] = {
  "tagName": "TR",
  "attributes": {
    "class": "scriptForm",
    "producttype": "cannabisDryHerb",
    "thcconversionfactor": "10",
    "unitmeasure": "g"
  },
  "properties": null,
  'childNodes': [],
}

dict_scriptFormTemplates['cannabisDryHerb']['childNodes'] = [
    {
      "tagName": "TD",
      "attributes": {},
      "properties": null,
      "childNodes": [
        {
          "tagName": "FORM",
          "attributes": {},
          "properties": null,
          "childNodes": [
            {
              "tagName": "P",
              "attributes": {},
              "properties": null,
              "childNodes": [
                {
                  "tagName": "INPUT",
                  "attributes": {
                    "class": "plainInput productName",
                    "type": "text"
                  },
                  "properties": {
                    "innerText": ""
                  },
                  "childNodes": []
                },
                ', ',
                {
                  "tagName": "SPAN",
                  "attributes": {
                    "class": "nowrap"
                  },
                  "properties": null,
                  "childNodes": [
                    {
                      "tagName": "INPUT",
                      "attributes": {
                        "class": "plainInput strength"
                      },
                      "properties": {
                        "innerText": ""
                      },
                      "childNodes": []
                    },
                    '% THC,',
                  ]
                },
                {
                  "tagName": "SPAN",
                  "attributes": {
                    "class": "nowrap"
                  },
                  "properties": null,
                  "childNodes": [
                    ' ',
                    {
                      "tagName": "INPUT",
                      "attributes": {
                        "class": "plainInput unitQty"
                      },
                      "properties": {
                        "innerText": ""
                      },
                      "childNodes": [
                      ]
                    },
                    'g,',
                  ]
                },
                {
                  "tagName": "SPAN",
                  "attributes": {
                    "class": "nowrap"
                  },
                  "properties": null,
                  "childNodes": [
                    ' qty', 
                    {
                      "tagName": "INPUT",
                      "attributes": {
                        "class": "plainInput unitsPerDispense",
                        "type": "value",
                        "value": "1"
                      },
                      "properties": {
                        "innerText": ""
                      },
                      "childNodes": []
                    },
                    ',',
                  ]
                },
                {
                  "tagName": "SPAN",
                  "attributes": {
                    "class": "nowrap"
                  },
                  "properties": null,
                  "childNodes": [
                    ' with ',
                    {
                      "tagName": "INPUT",
                      "attributes": {
                        "class": "plainInput repeats",
                        "type": "value",
                        "value": "0"
                      },
                      "properties": {
                        "innerText": ""
                      },
                      "childNodes": []
                    },
                    ' repeats',
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "tagName": "TD",
      "attributes": {
        "class": "repeatInterval"
      },
      "properties": {
        "innerText": "N/A"
      },
      "childNodes": []
    },
    {
      "tagName": "TD",
      "attributes": {
        "class": "unitQtyTotal"
      },
      "properties": {
        "innerText": "0 g"
      },
      "childNodes": []
    },
    {
      "tagName": "TD",
      "attributes": {
        "class": "THCTotal"
      },
      "properties": {
        "innerText": "0 mg"
      },
      "childNodes": []
    }
  ]

dict_scriptFormTemplates['cannabisVapeCartridge'] = {
  "tagName": "TR",
  "attributes": {
    "class": "scriptForm",
    "producttype": "cannabisVapeCartridge",
    "thcconversionfactor": "1",
    "unitmeasure": "vials"
  },
  "properties": null,
  "childNodes": [
    {
      "tagName": "TD",
      "attributes": {},
      "properties": null,
      "childNodes": [
        {
          "tagName": "FORM",
          "attributes": {},
          "properties": null,
          "childNodes": [
            {
              "tagName": "P",
              "attributes": {},
              "properties": null,
              "childNodes": [
                {
                  "tagName": "INPUT",
                  "attributes": {
                    "class": "plainInput productName",
                    "type": "text"
                  },
                  "properties": {
                    "innerText": ""
                  },
                  "childNodes": []
                },
                ',',
                {
                  "tagName": "SPAN",
                  "attributes": {
                    "class": "nowrap"
                  },
                  "properties": null,
                  "childNodes": [
                    ' ',
                    {
                      "tagName": "INPUT",
                      "attributes": {
                        "class": "plainInput strength"
                      },
                      "properties": {
                        "innerText": ""
                      },
                      "childNodes": []
                    },
                    'mg/vial,'
                  ]
                },
                {
                  "tagName": "SPAN",
                  "attributes": {
                    "class": "nowrap"
                  },
                  "properties": null,
                  "childNodes": [
                    ' qty ',
                    {
                      "tagName": "INPUT",
                      "attributes": {
                        "class": "plainInput unitsPerDispense",
                        "type": "value",
                        "value": "1"
                      },
                      "properties": {
                        "innerText": ""
                      },
                      "childNodes": []
                    },
                    ',',
                  ]
                },
                {
                  "tagName": "SPAN",
                  "attributes": {
                    "class": "nowrap"
                  },
                  "properties": null,
                  "childNodes": [
                    ' with ',
                    {
                      "tagName": "INPUT",
                      "attributes": {
                        "class": "plainInput repeats",
                        "type": "value",
                        "value": "0"
                      },
                      "properties": {
                        "innerText": ""
                      },
                      "childNodes": []
                    },
                    ' repeats'
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "tagName": "TD",
      "attributes": {
        "class": "repeatInterval"
      },
      "properties": {},
      "childNodes": []
    },
    {
      "tagName": "TD",
      "attributes": {
        "class": "unitQtyTotal"
      },
      "properties": {},
      "childNodes": []
    },
    {
      "tagName": "TD",
      "attributes": {
        "class": "THCTotal"
      },
      "properties": {},
      "childNodes": []
    }
  ]
}

dict_scriptFormTemplates['cannabisOil'] = {
  "tagName": "TR",
  "attributes": {
    "class": "scriptForm",
    "producttype": "cannabisOil",
    "thcconversionfactor": "1",
    "unitmeasure": "mL"
  },
  "properties": null,
  "childNodes": [
    {
      "tagName": "TD",
      "attributes": {},
      "properties": null,
      "childNodes": [
        {
          "tagName": "FORM",
          "attributes": {},
          "properties": null,
          "childNodes": [
            {
              "tagName": "P",
              "attributes": {},
              "properties": null,
              "childNodes": [
                {
                  "tagName": "INPUT",
                  "attributes": {
                    "class": "plainInput productName",
                    "type": "text"
                  },
                  "properties": {
                    "innerText": ""
                  },
                  "childNodes": []
                },
                ',',
                {
                  "tagName": "SPAN",
                  "attributes": {
                    "class": "nowrap"
                  },
                  "properties": null,
                  "childNodes": [
                    ' ',
                    {
                      "tagName": "INPUT",
                      "attributes": {
                        "class": "plainInput strength"
                      },
                      "properties": {
                        "innerText": ""
                      },
                      "childNodes": []
                    },
                    'mg/mL THC,',
                  ]
                },
                {
                  "tagName": "SPAN",
                  "attributes": {
                    "class": "nowrap"
                  },
                  "properties": null,
                  "childNodes": [
                    ' ',
                    {
                      "tagName": "INPUT",
                      "attributes": {
                        "class": "plainInput unitQty"
                      },
                      "properties": {
                        "innerText": ""
                      },
                      "childNodes": []
                    },
                    'mL,',
                  ]
                },
                {
                  "tagName": "SPAN",
                  "attributes": {
                    "class": "nowrap"
                  },
                  "properties": null,
                  "childNodes": [
                    ' qty ',
                    {
                      "tagName": "INPUT",
                      "attributes": {
                        "class": "plainInput unitsPerDispense",
                        "type": "value",
                        "value": "1"
                      },
                      "properties": {
                        "innerText": ""
                      },
                      "childNodes": []
                    },
                    ',',
                  ]
                },
                {
                  "tagName": "SPAN",
                  "attributes": {
                    "class": "nowrap"
                  },
                  "properties": null,
                  "childNodes": [
                    ' with ',
                    {
                      "tagName": "INPUT",
                      "attributes": {
                        "class": "plainInput repeats",
                        "type": "value",
                        "value": "0"
                      },
                      "properties": {
                        "innerText": ""
                      },
                      "childNodes": []
                    },
                    ' repeats',
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "tagName": "TD",
      "attributes": {
        "class": "repeatInterval"
      },
      "properties": {
        "innerText": "N/A"
      },
      "childNodes": []
    },
    {
      "tagName": "TD",
      "attributes": {
        "class": "unitQtyTotal"
      },
      "properties": {},
      "childNodes": []
    },
    {
      "tagName": "TD",
      "attributes": {
        "class": "THCTotal"
      },
      "properties": {},
      "childNodes": []
    }
  ]
}

dict_scriptFormTemplates['cannabisEdibles'] = {
  "tagName": "TR",
  "attributes": {
    "class": "scriptForm",
    "producttype": "cannabisEdibles",
    "thcconversionfactor": "1",
    "unitmeasure": "doses"
  },
  "properties": null,
  "childNodes": [
    {
      "tagName": "TD",
      "attributes": {},
      "properties": null,
      "childNodes": [
        {
          "tagName": "FORM",
          "attributes": {},
          "properties": null,
          "childNodes": [
            {
              "tagName": "P",
              "attributes": {},
              "properties": null,
              "childNodes": [
                {
                  "tagName": "INPUT",
                  "attributes": {
                    "class": "plainInput productName",
                    "type": "text"
                  },
                  "properties": {
                    "innerText": ""
                  },
                  "childNodes": []
                },
                ',',
                {
                  "tagName": "SPAN",
                  "attributes": {
                    "class": "nowrap"
                  },
                  "properties": null,
                  "childNodes": [
                    ' ',
                    {
                      "tagName": "INPUT",
                      "attributes": {
                        "class": "plainInput strength"
                      },
                      "properties": {
                        "innerText": ""
                      },
                      "childNodes": []
                    },
                    ' mg THC/dose,',
                  ]
                },
                {
                  "tagName": "SPAN",
                   "attributes": {
                    "class": "nowrap"
                  },
                  "properties": null,
                  "childNodes": [
                    ' qty ',
                    {
                      "tagName": "INPUT",
                      "attributes": {
                        "class": "plainInput unitsPerDispense",
                        "type": "value",
                        "value": "1"
                      },
                      "properties": {
                        "innerText": ""
                      },
                      "childNodes": []
                    },
                    ',',
                  ]
                },
                {
                  "tagName": "SPAN",
                  "attributes": {
                    "class": "nowrap"
                  },
                  "properties": null,
                  "childNodes": [
                    ' with ',
                    {
                      "tagName": "INPUT",
                      "attributes": {
                        "class": "plainInput repeats",
                        "type": "value",
                        "value": "0"
                      },
                      "properties": {
                        "innerText": ""
                      },
                      "childNodes": []
                    },
                    ' repeats',
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "tagName": "TD",
      "attributes": {
        "class": "repeatInterval"
      },
      "properties": {},
      "childNodes": []
    },
    {
      "tagName": "TD",
      "attributes": {
        "class": "unitQtyTotal"
      },
      "properties": {},
      "childNodes": []
    },
    {
      "tagName": "TD",
      "attributes": {
        "class": "THCTotal"
      },
      "properties": {},
      "childNodes": []
    }
  ]
}