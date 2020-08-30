export class Section {
  constructor({renderer},containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(itemArray, id) {
    itemArray.forEach(item => this._renderer(item, id))
}

addItem(element) {
    this._container.prepend(element);
}

  }