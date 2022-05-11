export default class UserInfo {
  constructor({userNameSelector, userJobSelector}) {
    this._userName = document.querySelector(userNameSelector);
    this._userJob = document.querySelector(userJobSelector);
  }

  setUserInfo({profileName, profileJob}) {
    this._userName.textContent = profileName;
    this._userJob.textContent = profileJob;
  }

  getUserInfo() {
    return {
      profileName: this._userName.textContent,
      profileJob: this._userJob.textContent
    }
  }
}