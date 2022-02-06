class AuthService {
    login(id, email, token) {
      sessionStorage.setItem("id", JSON.stringify(id));
      sessionStorage.setItem("token", JSON.stringify(token));
      sessionStorage.setItem("email", JSON.stringify(email))
    }
  
    logout() {
      sessionStorage.removeItem("id");
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("email");
    }
  
    getCurrentToken() {
      return JSON.parse(sessionStorage.getItem("token"));
    }
  
    getCurrentId() {
      return JSON.parse(sessionStorage.getItem("id"));
    }

    getCurrentEmail() {
      return JSON.parse(sessionStorage.getItem("email"));
    }
  }
  export default new AuthService();