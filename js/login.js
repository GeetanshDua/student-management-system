document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("login-btn");

  if (!localStorage.getItem("adminInfo")) {
    const defaultAdmin = {
      username: "Admin",
      password: "admin",
    };
    localStorage.setItem("adminInfo", JSON.stringify(defaultAdmin));
  }

  loginBtn.addEventListener("click", () => {
    const username = document.getElementById("login-username").value.trim();
    const password = document.getElementById("login-password").value.trim();

    if (username === "" || password === "") {
      alert("Please enter username and password!");
      return;
    }

    const adminData = JSON.parse(localStorage.getItem("adminInfo"));

    if (
      username.toLowerCase() === adminData.username.toLowerCase() &&
      password === adminData.password
    ) {
      window.location.href = "dashboard.html";
    } else {
      alert("Incorrect username or password!");
    }
  });
});
