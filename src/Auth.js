import ApiUtils from './ApiUtils';

const Auth = {
  isAuthenticated: false,
  authenticate(cb, password) {
    fetch('/auth', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password: password,
      })
    })
      .then(ApiUtils.checkStatus)
      .then(response => response.json()
      )
      .then(response => {
        this.isAuthenticated = response.success;
        cb();
      })
      .catch(e => {
        console.error(e);
        this.isAuthenticated = false;
        cb();
      });
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}

export default Auth;