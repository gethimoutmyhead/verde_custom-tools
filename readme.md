# THC calculator

An online calculator that works out
* how much THC content is inside a dry herb product
* how much THC content is in a cartridge product
* how many days the product is expected to last, given the average THC used per day


aim: track how long a patient's script should last, and when to schedule their repeat interval


## Version history

### Dev Fork

2026-03-22
* changed variable names for templates to cannabis@@@ so more flexibility to handle non-cannabis S8 in the future
* autoFill a default variable name, and focuses on the new element. user can press tab and go to the next form element, or immediately type a new name (useful when the product name autofill gets added)
* added a to do list to the readme file 
* some refactoring

2026-03-19
* built DOM deconstructor
* add new script added
* delete existing script added
* automatically recalculates subtotals when things are added and removed

2026-03-18
* template is now working
* auto calculation per line functioning
* to-do - function that deconstructs a DOM element into an key:value paired object
* still to add - add new script, delete existing script, repeat interval calculations, executive summary of scripts
* logins
* search function for script names
* auto-generate names for scripts

2026-03-15
* re-design of the main page using bootstrap css5 to ensure its mobile first, responsive design

## To Do
repeat interval calculations
executive summary of scripts
logins
search function for script names
autofill based on drug formulary
on autofill, cursor jumps straight to repeats


## Completed
function that deconstructs a DOM element into an key:value paired object
add new script
delete existing script
auto-generate names for scripts