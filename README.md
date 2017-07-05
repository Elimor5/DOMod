## DoMod


DoMod is a DOM manipulation library built in vanilla JavaScript that mimics jQuery functionality with respect to DOM manipulation and traversal functions.  


###  The global variable $l

$l acts as a wrapper for all of the methods in the library, returning a DOMNodeCollection object, which stores an array of HTML Elements matching the selector. $l can also be used to create DOMNodeCollection objects from unwrapped HTML Elements, giving these elements access to DoMod methods. Additionally, $l can also take in a string of HTML code, build an HTML Element, and then return a DOMNodeCollection.



### DOM Traversal

DOMNodeCollection methods to navigate DOM elements include:

#### `children`

Returns a DOMNodeCollection object which contains  all child elements of every HTML Element in the DOMNodeCollection object, limited to direct children and not descendants.

#### `parent`

Returns a DOMNodeCollection object which includes the parent element of each HTML Element in the original DOMNodeCollection.  

### DOM Manipulation

DOMNodeCollection methods to view and/or change DOM elements include:

#### `addClass`

Adds a class name to each DOMNodeCollection element.

#### `append`

Takes a single HTML Element, DOMNodeCollection, or string argument and appends it to each DOMNodeCollection element as specified by the selector.

#### `attr`

  If given one argument, the attr method gets the value of the attribute given for the the first element in the DOMNodeCollection.  The method sets the attribute, given as the first argument, to the value, given as the second argument, if given, for each DOMNodeCollection element.

#### `empty`

Empties the innerHTML of each DOMNodeCollection element.

#### `find`

Finds and returns a DOMNodeCollection containing all children and subchildren that match selector.

#### `html`

Returns the "innerHTML" for the first element in the DOMNodeCollection if no argument is given.  If a string argument is given, changes the "innerHTML" of each DOMNodeCollection element to content.

#### `remove`

Remove each DOMNodeCollection element that matches the selector from the DOM.

#### `removeClass`

Removes a class, given as an argument, from each DOMNodeCollection element.

### Event Listeners

#### `on`

Adds event listener to each DOMNodeCollection element.

#### `off`

Removes event listener from each DOMNodeCollection element.

### AJAX

Makes an asynchronous XMLHTTPRequest to request, send, display, and/or use data from a web server. Takes an options object as its arguments -- the options and their defaults include:

option | default
--- | ---
method | `'get'`
url | `document.location.pathname`
contentType | `'application/x-www-form-urlencoded; charset=UTF-8'`
data | `{}`
success | `() => {}`
error | `() => {}`


### Use

To use DoMod, install the library in your project, and include the webpack output file 'domod.js' in your source code.