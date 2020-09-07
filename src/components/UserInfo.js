
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
    /*return {
      name: this._nameInput.textContent,
      job: this._jobInput.textContent
    }*/
    this._nameInput.value = this._name.textContent; 
    this._jobInput.value = this._job.textContent; 
    
  }

  setUserInfo(values) {
    return this._api.patch('users/me', values)
  

}

getProfile() {
  return this._api.getItems('users/me').then(data => {
      this._nameInput.textContent = data.name;
      this._jobInput.textContent =  data.about;
      this._avatar.setAttribute('src', data.avatar);
      return data._id;
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