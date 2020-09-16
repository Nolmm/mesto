export class Api {
  constructor (baseUrl) { 
    this._baseUrl = baseUrl
    //this.headers = headers
    
  }

  getItems(url) {
    return fetch(/*`${this.baseUrl}/users/me`*/this._baseUrl + url, {
        method: 'GET',
        headers: {
            authorization: 'ec958303-2883-4fc9-affb-18ff9d007ba6',
            'Content-Type': 'application/json'
        }
    })

    .then((res) => {
        if(res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    })
}

  patchUserInfo(url, value) {
    return fetch(/*`${this.baseUrl}/users/me`*/this._baseUrl + url, {
        method: 'PATCH',
        headers: {
            authorization: 'ec958303-2883-4fc9-affb-18ff9d007ba6',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: /*'Marie Skłodowska Curie',*/value.name,
          about: /*'Physicist and Chemist'*/value.job
        })
    })
    .then(res => {
      if(res.ok) {
          return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`)
  })
}


postNewCard(url, values) {
  return fetch(this._baseUrl + url, {
      method: 'POST',
      headers: {
          authorization: 'ec958303-2883-4fc9-affb-18ff9d007ba6',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          name: values.placename,
          link:  values.placeimg
      })
  })
  .then(res => {
    if(res.ok) {
        return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
})
}

patchAvatar(url, item) {
  return fetch(this._baseUrl + url, {
      method: 'PATCH',
      headers: {
          authorization: 'ec958303-2883-4fc9-affb-18ff9d007ba6',
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
}


deleteItems(url) {
  return fetch(this._baseUrl + url, {
      method: 'DELETE',
      headers: {
          authorization: 'ec958303-2883-4fc9-affb-18ff9d007ba6',
          'Content-Type': 'application/json'
      }
  })
  .then(res => {
    if(res.ok) {
        return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
})
}

putLike(url) {
  return fetch(this._baseUrl + url, {
      method: 'PUT',
      headers: {
          authorization: 'ec958303-2883-4fc9-affb-18ff9d007ba6',
          'Content-Type': 'application/json'
      }
  })
  .then(res => {
    if(res.ok) {
        return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
})
}
} 

