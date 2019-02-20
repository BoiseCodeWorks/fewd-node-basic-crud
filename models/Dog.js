class Dog {
  constructor(data) {
    this.name = data.name || 'fido'
    this.colors = data.colors || ["black"]
    this.age = data.age || 5
  }
}

module.exports = Dog