export  class UserInfo {
  constructor({name, job}) {
    this._nameInput = name;
    this._jobInput = job;
    this._name = document.querySelector('.profile__title');
    this._job = document.querySelector('.profile__subtitle')
  }

  getUserInfo() {
    this._nameInput.value = this._name.textContent;
    this._jobInput.value = this._job.textContent;
  }

  setUserInfo(value) {
    this._name.textContent = value.name;
    this._job.textContent =  value.job;
}
}