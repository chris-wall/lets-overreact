const uuid = require('uuid/v4');
const Database = require('./database');

class VehicleType {
  constructor(obj) {
    obj = (typeof obj === 'object' && obj !== null ? obj : {});
    this.key = obj.key;
    this.vin = obj.vin;
    this.make = obj.make;
    this.year = obj.year;
    this.model = obj.model;
    this.driverId = obj.driverId;
  }

  driver() {
    console.log('[VehicleType] driver field resolver has fired');
    return db.from('driver').select({ key: this.driverId }) || {};
  }
}

class DriverType {
  constructor(obj) {
    obj = (typeof obj === 'object' && obj !== null ? obj : {});
    this.key = obj.key;
    this.name = obj.name;
    this.email = obj.email;
  }

  vehicles() {
    console.log(`[DriverType] vehicles field resolver has fired`);
    return db.from('vehicle').select({ driverId: this.key });
  }
}

const driverid = uuid();
const db = new Database({
  'vehicle': [{
    vin: 'KL4CJFSB5FB090801',
    year: '2018',
    model: 'MDX',
    make: 'Acura',
    driverId: driverid
  }],
  'driver': [{
    key: driverid,
    name: 'Chris Wall',
    email: 'chris@aftermansoftware.com',
  }],
});

module.exports.vehicle = function ({ key = null } = {}) {
  console.log('[Resolver] vehicle function has fired.');
  return new VehicleType(db.from('vehicle').select({ key }));
}

module.exports.vehicles = function ({ filters = null } = {}) {
  console.log('[Resolver] vehicles function has fired.');
  return db.from('vehicle').select(filters).map(v => new VehicleType(v));
}

module.exports.insertVehicle = function ({ data }) {
  return db.from('vehicle').insert(data);
}

module.exports.updateVehicle = function ({ key, data }) {
  return db.from('vehicle').update(key, data);
}

module.exports.deleteVehicle = function ({ key }) {
  db.from('vehicle').delete(key);
}

module.exports.driver = function ({ key = null } = {}) {
  console.log('[Resolver] driver function has fired.');
  return new DriverType(db.from('driver').select({ key }));
}

module.exports.drivers = function ({ filters = null } = {}) {
  console.log('[Resolver] drivers function has fired.');
  const d = db.from('driver').select(filters).map(v => new DriverType(v));
  console.log(d);
  return d;
}

module.exports.insertDriver = function ({ data }) {
  return db.from('driver').insert(data);
}

module.exports.updateDriver = function ({ key, data }) {
  return db.from('driver').update(key, data);
}

module.exports.deleteDriver = function ({ key }) {
  return db.from('driver').delete(key);
}