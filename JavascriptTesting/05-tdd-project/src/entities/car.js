const Base = require('./base/base');

class Car extends Base {
  constructor({ id, name, releaseYear, isAvailable, isGasAvailable }) {
    super({ id, name });
    this.releaseYear = releaseYear;
    this.isAvailable = isAvailable;
    this.isGasAvailable = isGasAvailable;
  }
}

module.exports = Car;