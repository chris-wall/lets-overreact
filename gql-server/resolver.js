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
    this.name = `${obj.year} ${obj.make} ${obj.model}`;
  }

  driver() {
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
    return db.from('vehicle').select({ driverId: this.key });
  }
}

const driverid = uuid();
const driver2id = uuid();
const driver3id = uuid();

const db = new Database({
  'vehicle': [{
    vin: 'KL4CJFSB5FB090801',
    year: '2018',
    model: 'MDX',
    make: 'Acura',
    driverId: driverid
  },
  {
    vin: '1GKER13727J154406',
    year: '2015',
    model: 'MDX',
    make: 'Acura',
    driverId: driverid
  },
  {
    vin: '1HSMMAAN39H005639',
    year: '2003',
    model: '6',
    make: 'Mazda',
    driverId: driver2id
  },
  {
    vin: '3VWDP7AJ5CM303206',
    year: '1972',
    model: 'Pinto',
    make: 'Ford',
    driverId: driver3id
  },
  {
    vin: '5XYKW4A25BG128357',
    year: '2010',
    model: 'Silverado',
    make: 'Chevy',
    driverId: driver3id
  }],
  'driver': [{
    key: driverid,
    name: 'Chris Wall',
    email: 'chris@aftermansoftware.com',
  },
  {
    key: driver2id,
    name: 'John Doe',
    email: 'jdoe@example.com',
  },
  {
    key: driver3id,
    name: 'Jim Bob Tucker',
    email: 'jbtucker@example.com',
  }],
});

module.exports.vehicle = function ({ key = null } = {}) {
  return new VehicleType(db.from('vehicle').select({ key }));
}

module.exports.vehicles = function ({ filters = null } = {}) {
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
  return new DriverType(db.from('driver').select({ key }));
}

module.exports.drivers = function ({ filters = null } = {}) {
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