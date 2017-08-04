/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(1);

const functionsToRun = [];

window.$l = arg => {
  if(typeof arg === 'string') {
    if(arg[0] === '<'){
      return new DOMNodeCollection([createElement(arg)]);
    } else {
      const DOMNodes = [];
      const nodeList = document.querySelectorAll(arg);
      nodeList.forEach( node => {
        DOMNodes.push(node);
      });
      return new DOMNodeCollection(DOMNodes);
    }
  } else if(arg instanceof HTMLElement){
    return new DOMNodeCollection([arg]);
  } else if(typeof arg === 'function') {
    if (document.readyState === "complete") {
      arg();
    } else {
      functions.push(arg);
    }
  }
};

$l.extend = function(...objects) {
  return Object.assign({}, ...objects);
};


$l.ajax = options => {
  return new Promise((resolve, reject) => {
    const resolvefuncPresent = typeof(resolve) ==='function';
    const rejectfuncPresent = typeof(reject) ==='function';
    const request = new XMLHttpRequest();
    const defaults = {
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      method: 'GET',
      url: '',
      success: () => {},
      error: () => {},
      data: {}
    };

    options = $l.extend(defaults, options);

    options.method = options.method.toUpperCase();

    request.open(options.method, options.url, true);
    request.onload = (e) => {
      if (request.status >= 200 && request.status < 300) {
          resolve(request.response);
      } else {
          reject(request.response);
          reject({
            status: request.status,
            statusText: request.response
          });
        }
    };

    request.send(JSON.stringify(options.data));
  });
};



document.addEventListener("DOMContentLoaded", () => {
  functionsToRun.forEach(func => func());
});

//helper methods
const runCallback = func => {
  if (document.readyState === 'complete') {
    func();
  }
  else{
    functionsToRun.push(func);
  }
};


const elementTag = arg => {
  let tag = '';
  for (var i = 1; arg[i] !== '>'; i++) {
    tag += arg[i];
  }
  return tag;
};

const elementHtml = arg => {
  let html = '';
  let readText = false;
  for (var i = 1; arg[i] !== '<'; i++) {
    if(readText) {
       html += arg[i];
    }
    if( arg[i] === '>') {
      readText = true;
    }
  }
  return html;
};

const createElement = arg => {
  let element = document.createElement(elementTag(arg));
  element.innerHTML = elementHtml(arg);
  return element;
};

const nodeFromDom = string => {
  const nodes = document.querySelectorAll(string);
  const nodesArray = Array.from(nodes);
  return new DOMNodeCollection(nodesArray);
};


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class DOMNodeCollection {
  constructor(htmlElements) {
    this.htmlElements = htmlElements;
  }

  html(string) {
    if (typeof string === 'undefined') {
      return this.htmlElements[0].innerHTML;
    }
    else {
      this.htmlElements.forEach(el => {
        el.innerHTML = string;
      });
    }
  }

  empty() {
    this.htmlElements.forEach((el) => {
      el.innerHTML = "";
    });
  }

  append(content) {
    if(content instanceof DOMNodeCollection) {
      content.htmlElements.forEach( node => {
          this.append(node);
      });
    } else if(content instanceof HTMLElement) {
      this.htmlElements.forEach( node => {
        const clone = content.cloneNode(true);
        node.appendChild(clone);
      });
      content.remove();
    } else if(typeof content === 'string') {
      this.htmlElements.forEach( node => {
        node.innerHTML += content;
      });
    }
  }

  attr(key, value) {
    if (typeof value === 'undefined') {
      return this.htmlElements[0].getAttribute(key);
    }
    else {
      this.htmlElements.forEach(el => {
        el.setAttribute(key, value);
      });
    }
  }

  addClass (className) {
    this.htmlElements.forEach(el => {
      el.classList.add(className);
    });
  }

  removeClass (className) {
    this.htmlElements.forEach(el => {
      el.classList.remove(className);
    });
  }

  children(){
    let allChildren = [];
    this.htmlElements.forEach(el => {
      allChildren = allChildren.concat(Array.from(el.children));
    });
    return new DOMNodeCollection(allChildren);
  }

  parent(){
    let Parents = [];
    this.htmlElements.forEach(el => {
      Parents.push(el.parentNode);
    });
    return new DOMNodeCollection(Parents);
  }

  find(selector){
    let foundElements = [];
    this.htmlElements.forEach(parentNode => {
      const selectedElements = parentNode.querySelectorAll(selector);
      foundElements = foundElements.concat(Array.from(selectedElements));
    });

    return new DOMNodeCollection(foundElements);
  }

  remove(){
    this.htmlElements.forEach(el => {
      el.remove();
    });
  }

  on(type, func) {
    const eventType = `dom-helper-${type}`;
    this.htmlElements.forEach((el) => {
      el.addEventListener(type, func);
      if (Array.isArray(el[eventType])) {
        el[eventType].push(func);
      } else {
        el[eventType] = [func];
      }

    });
  }

  off(type) {
    this.htmlElements.forEach((el) => {
      const eventType = `dom-helper-${type}`;
      el[eventType].forEach((func) => {
        el.removeEventListener(type, func);
      });
      el[eventType] = undefined;
    });
  }
}


module.exports = DOMNodeCollection;


/***/ })
/******/ ]);
//# sourceMappingURL=domod.js.map