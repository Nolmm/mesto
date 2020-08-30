export class Api {
  constructor (baseUrl) { 
    this._baseUrl = baseUrl
    //this.headers = headers
    
  }

  getItems(url) {
      return fetch(/*`${this.baseUrl}/users/me`*/this._baseUrl + url, {
          method: 'GET',
          headers: {
              authorization: '8845167f-d5ed-44fc-9a4e-114019c410b1',
              'Content-Type': 'application/json'
          }
      })
      .then((res) => {
        if(res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    })
    .catch((err) => {
        console.log(err)
    })
          

          
  }

  patch(url, values) {
    return fetch(/*`${this.baseUrl}/users/me`*/this._baseUrl + url, {
        method: 'PATCH',
        headers: {
            authorization: '8845167f-d5ed-44fc-9a4e-114019c410b1',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: /*'Marie Skłodowska Curie',*/values.name,
          about: /*'Physicist and Chemist'*/values.job
        })
    })
    .then(res => {
      if(res.ok) {
          return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`)
  })
  .catch((err) => {
      console.log(err)
  })
}


post(url, item) {
  return fetch(this._baseUrl + url, {
      method: 'POST',
      headers: {
          authorization: '8845167f-d5ed-44fc-9a4e-114019c410b1',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          name: item.placename,
          link:  item.placeimg
      })
  })
  .then(res => {
    if(res.ok) {
        return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
})
.catch((err) => {
    console.log(err)
})
}

patchAvatar(url, item) {
  return fetch(this._baseUrl + url, {
      method: 'PATCH',
      headers: {
          authorization: '8845167f-d5ed-44fc-9a4e-114019c410b1',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
            avatar: item.link
      })
  })
  .then(res => {
    if(res.ok) {
        return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
})
.catch((err) => {
    console.log(err)
})
}


delete(url) {
  return fetch(this._baseUrl + url, {
      method: 'DELETE',
      headers: {
          authorization: '8845167f-d5ed-44fc-9a4e-114019c410b1',
          'Content-Type': 'application/json'
      }
  })
  .then(res => {
    if(res.ok) {
        return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
})
.catch((err) => {
    console.log(err)
})
}

put(url) {
  return fetch(this._baseUrl + url, {
      method: 'PUT',
      headers: {
          authorization: '8845167f-d5ed-44fc-9a4e-114019c410b1',
          'Content-Type': 'application/json'
      }
  })
  .then(res => {
    if(res.ok) {
        return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
})
.catch((err) => {
    console.log(err)
})
}
} 

