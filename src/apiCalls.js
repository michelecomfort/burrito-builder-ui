export const getOrders = () => {
  return fetch('http://localhost:3001/api/v1/orders')
      .then(response => response.json())
}

export const addNewOrder = (newOrder) => {
  fetch('http://localhost:3001/api/v1/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newOrder)
  })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error('Error fetching:', err))
}