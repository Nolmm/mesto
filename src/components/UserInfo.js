
export  class UserInfo {
  constructor({name, job, api}, avatar) {
    this._nameInput = name;
    this._jobInput = job;
    this._name = document.querySelector('.profile__title');
    this._job = document.querySelector('.profile__subtitle');
    this._avatar = avatar;
    this._api = api;
  }


  getUserInfo() {
    this._nameInput.value = this._name.textContent; 
    this._jobInput.value = this._job.textContent; 
    
  }

  setUserInfo(values) {
    return this._api.patch('users/me', values)
  

}

getProfile() {
  return this._api.getItems('users/me').then(value => {
      this._nameInput.textContent = value.name;
      this._jobInput.textContent =  value.about;
      this._avatar.setAttribute('src', value.avatar);
      return value._id;
  })
}

getUserAvatar() {
  return {
      link: this._avatar.getAttribute('src')
  }
}

editUserAvatar(url, item) {
  return this._api.patchAvatar(url, item)
}
}