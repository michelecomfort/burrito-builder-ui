export const getOrders = () => {
  return fetch('http://localhost:3001/api/v1/orders')
  .then(res => {
    if(res.ok) {
      return res.json()
    } else {
      throw new Error()
  }
  }).catch(err => console.log(err))
}

export const addNewOrder = (newOrder) => {
  return fetch('http://localhost:3001/api/v1/orders', {
    method: 'POST',
    body: JSON.stringify(newOrder),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => {
    if(res.ok) {
      return res.json()
    } else {
      throw new Error()
  }
})
}