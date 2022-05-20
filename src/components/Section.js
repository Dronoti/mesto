export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._itemsArray = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderItems() {
    this._itemsArray.forEach(item => this._renderer(item));
  }

  updateSection(cards) {
    this._itemsArray = cards;
    Array.from(this._container.children).forEach(item => item.remove());
    this.renderItems();
  }
}
