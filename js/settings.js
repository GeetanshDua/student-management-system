document.addEventListener("DOMContentLoaded", () => {
  const nameInput = document.getElementById("admin-name");
  const currentPassInput = document.getElementById("current-pass");
  const newPassInput = document.getElementById("new-pass");
  const confirmPassInput = document.getElementById("confirm-pass");
  const updateBtn = document.getElementById("update-settings");

  const adminData = JSON.parse(localStorage.getItem("adminInfo")) || {
    username: "Admin",
    password: "admin",
  };

  nameInput.value = adminData.username;

  updateBtn.addEventListener("click", () => {
    const currentPass = currentPassInput.value.trim();
    const newPass = newPassInput.value.trim();
    const confirmPass = confirmPassInput.value.trim();

    if (currentPass !== adminData.password) {
      alert("Current password is incorrect!");
      return;
    }

    if (newPass === "" || confirmPass === "") {
      alert("Please fill in all password fields!");
      return;
    }

    if (newPass !== confirmPass) {
      alert("New passwords do not match!");
      return;
    }

    adminData.username = nameInput.value.trim() || adminData.username;
    adminData.password = newPass;
    localStorage.setItem("adminInfo", JSON.stringify(adminData));

    alert("Settings updated successfully!");
    currentPassInput.value = "";
    newPassInput.value = "";
    confirmPassInput.value = "";
  });
});
