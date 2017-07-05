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

$l.ajax = function(options) {
  const defaults = {
    method: 'GET',
    url: window.location.href,
    data: {},
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    success: null,
    error: null
  };

  options = $l.extend(defaults, options);

  const xhr = new XMLHttpRequest();

  xhr.open(options.method, options.url);
  xhr.setRequestHeader('Content-Type', options.contentType);
  xhr.onload = () => {
    if (xhr.status === 200) {
      options.success(xhr.response);
    } else {
      options.error(xhr.response);
    }
  };
  xhr.send(options.data);

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
