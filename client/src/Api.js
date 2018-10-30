
export async function query(q) {
  return await fetch('http://localhost:4000/api', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({query: q })
  }).then(r => r.json());
}

export async function createDriver(name, email) {
  const query = `
  mutation insertDriver($data: DriverData!) {
    insertDriver(data: $data) {
      key
      name
      email
    }
  }
  `;

  return await fetch('http://localhost:4000/api', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({ query, variables: { data: { name, email } } })
  }).then(r => r.json());
}

export async function createVehicle(vin, year, make, model, driverId) {
  const data = { vin, year, make, model, driverId };
  const query = `
  mutation insertVehicle($data: VehicleData!) {
    insertVehicle(data: $data) {
      key
    }
  }
  `;

  return await fetch('http://localhost:4000/api', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({ query, variables: { data } })
  }).then(r => r.json());
}