const USERS = {
  admin: {username:"admin", password:"1234"},
  staff: {username:"staff", password:"1234"}
};

function login(role){

  if(username.value === USERS[role].username &&
     password.value === USERS[role].password){

    localStorage.setItem("role", role);

    location.href = role === "admin"
      ? "admin-dashboard.html"
      : "staff-dashboard.html";

  } else {
    alert("Invalid login");
  }
}
