const DOMNodeCollection = require("./dom_node_collection.js");

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
