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
