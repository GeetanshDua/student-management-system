document.addEventListener("DOMContentLoaded", () => {
  // Get the elements
  const profileSpan = document.querySelector(".span-admin");
  const welcomeSpan = document.querySelector(".welcome-admin");

  // Get admin data from localStorage
  const adminData = JSON.parse(localStorage.getItem("adminInfo")) || {
    username: "Admin",
  };

  // Update the dashboard elements
  profileSpan.textContent = adminData.username;
  welcomeSpan.textContent = adminData.username;
});
