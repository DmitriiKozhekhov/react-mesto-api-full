export const BASE_URL = "https://api.kozhekhov.mesto.nomoredomains.club";

function request({ url, method = "POST", data }) {
  return fetch(`${BASE_URL}${url}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: 'include',
    mode: 'cors',
    ...(!!data && { body: JSON.stringify(data) }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(res.status);
  });
}

export function register(email, password) {
  return request({
    url: "/signup",
    data: { email, password },
  });
}

export function authorize(email, password) {
  return request({
    url: "/signin",
    data: { email, password },
  });
}

export function getContent() {
  return request({
    url: "/users/me",
    method: "GET",
    credentials: 'include',
  });
}
