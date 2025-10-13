const loginbtn = document.getElementById("login-btn");

loginbtn.addEventListener("click", () => {
  const username = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value.trim();

  if (username === "" || password === "") {
    alert("Please enter username and password!");
    return;
  }

  if (username === "Admin" && password === "admin") {
    window.location.href = "dashboard.html";
  } else {
    alert("Incorrect Password");
  }
});
