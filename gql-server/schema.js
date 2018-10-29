const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type Query {
    vehicle(key: String!): Vehicle
    vehicles(filters: VehicleSearch): [Vehicle]
    driver(key: String!): Driver
    drivers(filters: DriverSearch): [Driver]
  }
  
  type Mutation {
    insertVehicle(data: VehicleData!): Vehicle!
    updateVehicle(key: String!, data: VehicleData!): Vehicle
    deleteVehicle(key: String!): Vehicle
    insertDriver(data: DriverData!): Driver!
    updateDriver(key: String!, data: DriverData!): Driver
    deleteDriver(key: String!): Driver
  }

  # VEHICLE type
  type Vehicle {
    key: ID
    vin: String!
    make: String!
    model: String!
    year: String!
    driver: Driver!
  }

  input VehicleData {
    vin: String!
    make: String!
    model: String!
    year: String!
    driverId: String!
  }

  input VehicleSearch {
    vin: String
    make: String
    model: String
    year: String
  }

  # DRIVER type
  type Driver {
    key: ID
    name: String!
    email: String!
    vehicles: [Vehicle]
  }

  input DriverData {
    name: String!
    email: String!
  }
  
  input DriverSearch {
    name: String
    email: String
  }
`);
