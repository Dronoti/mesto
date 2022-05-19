export default class UserInfo {
  constructor({userNameSelector, userJobSelector, userAvatarSelector}) {
    this._userName = document.querySelector(userNameSelector);
    this._userJob = document.querySelector(userJobSelector);
    this._userAvatar = document.querySelector(userAvatarSelector);
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

  setUserAvatar(link) {
    this._userAvatar.src = link;
  }

  setUserId(id) {
    this._userId = id;
  }

  getUserId() {
    return this._userId;
  }
}
