document.componentRegistry = { };
document.nextId = 0;

class Component {
  constructor() {
    this.id = ++document.nextId;
    document.componentRegistry[this.id] = this;
    this.component = document.componentRegistry[this.id]
  }
}

function getComp(id) {
  return document.componentRegistry[id];
}