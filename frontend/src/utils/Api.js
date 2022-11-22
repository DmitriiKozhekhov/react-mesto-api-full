export default class Api {
  constructor(host, headers, corsHeaders) {
    this._host = host;
    this._profileInfoHost = `${this._host}/users/me`;
    this._cardsHost = `${this._host}/cards`;
    this._headers = headers;
    this._corsHeaders = corsHeaders;
  }
  _getResOrError(res){
    if (res.ok){
      return res.json();
    }
    throw new Error('Ошибка при загрузке');
  }
  getUserInfo() {
    return fetch(this._profileInfoHost, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include',
      mode: 'cors',
    }).then((res)=> this._getResOrError(res));
  }

  editProfileData(newName, newAbout) {
    return fetch(this._profileInfoHost, {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      mode: 'cors',
      body: JSON.stringify({
        name: newName,
        about: newAbout
      })
    }).then((res)=> this._getResOrError(res));
  }

  editProfileAvatar(AvatarUrl) {
    return fetch(`${this._profileInfoHost}/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      mode: 'cors',
      body: JSON.stringify({
        avatar: AvatarUrl
      })
    }).then((res)=> this._getResOrError(res));
  }

  getCards() {
    return fetch(this._cardsHost, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include',
      mode: 'cors',
    }).then((res)=> this._getResOrError(res));
  }
  addCard(card) {
    return fetch(this._cardsHost, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      mode: 'cors',
      body: JSON.stringify(card)
    }).then((res)=> this._getResOrError(res));
  }
  removeCard(card) {
    return fetch(`${this._cardsHost}/${card._id}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include',
      mode: 'cors',
    }).then((res)=> this._getResOrError(res));
  }
  setLike(card) {
    return fetch(`${this._cardsHost}/${card._id}/likes`, {
      method: 'PUT',
      headers: this._headers,
      credentials: 'include',
      mode: 'cors',
    }).then((res)=> this._getResOrError(res));
  }
  removeLike(card) {
    return fetch(`${this._cardsHost}/${card._id}/likes`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include',
      mode: 'cors',
    }).then((res)=> this._getResOrError(res));
  }
  changeLikeCardStatus(card, isLiked) {
    return isLiked ? this.setLike(card) : this.removeLike(card);
  }
}
  
export const api = new Api('https://api.kozhekhov.mesto.nomoredomains.club', {'Content-Type': 'application/json'});
