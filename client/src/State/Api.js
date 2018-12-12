
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

export async function createDriver(data) {
  console.log(`[API] Called createDriver with:`, data);
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
    body: JSON.stringify({ query, variables: { data } })
  }).then(r => r.json());
}

export async function createVehicle(data) {
  console.log(`[API] Called createVehicle with `, data);

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