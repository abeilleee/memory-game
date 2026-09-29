/**
 * Base class for creating DOM elements with helper setters
 * for classes, text, id, attributes, children and parent mounting
 */
export class BaseComponent {
  /**
   * The created DOM element
   *
   * @type {HTMLElement}
   */
  element;

  /**
   * Creates an instance of BaseComponent.
   *
   * @param {Object} [options={}] - Configuration object
   * @param {string} [options.tagName='div'] - Tag name of the element to create
   * @param {string[]} [options.classNames=[]] - List of CSS classes to add
   * @param {string} [options.textContent] - Text content of the element
   * @param {HTMLElement} [options.parentElement] - Parent element to append to
   * @param {string} [options.id] - Id attribute of the element
   * @param {Object.<string, string>} [options.attributes={}] - Attributes to set on the element
   * @param {HTMLElement[]|HTMLElement} [options.children] - Child element(s) to append
   */
  constructor(options = {}) {
    this.createElement({ tagName: 'div', ...options });
  }

  getElement() {
    return this.element;
  }

  createElement(options) {
    this.element = document.createElement(options.tagName);
    this.setClasses(options.classNames);
    this.setTextContent(options.textContent);
    this.setParentElement(options.parentElement);
    this.setId(options.id);
    this.setAttributes(options.attributes);
    this.appendChildren(options.children);
  }

  setClasses(classNames = []) {
    classNames.forEach((className) => {
      this.element.classList.add(className);
    });
  }

  setTextContent(text) {
    if (text != null) {
      this.element.textContent = text;
    }
  }

  setParentElement(parentElement) {
    if (parentElement) {
      parentElement.appendChild(this.element);
    }
  }

  setId(id) {
    if (id != null) {
      this.element.id = id;
    }
  }

  setAttributes(attributes = {}) {
    Object.entries(attributes).forEach(([key, value]) => {
      this.element.setAttribute(key, value);
    });
  }

  appendChildren(children = []) {
    const list = Array.isArray(children) ? children : [children];

    list.forEach((child) => {
      this.element.appendChild(child);
    });
  }
}
