const signInBtn = document.getElementById("sign-in-btn");
const passwordInput = document.getElementById("password-input");
const usernameInput = document.getElementById("username-input");
const copyUsername = document.getElementById("copy-username");
const copyPassword = document.getElementById("copy-password");

copyUsername.addEventListener("click", () => {
  usernameInput.value = "admin";
});

copyPassword.addEventListener("click", () => {
  passwordInput.value = "admin123";
});

const manageSignIn = () => {
  usernameInput.value = "";
  passwordInput.value = "";
  const username = usernameInput.value;
  const password = passwordInput.value;
  if (username == "admin" && password == "admin123") {
    window.location.href = "./main-page.html";
  } else {
    alert("Incorrect Username or Password");
    return;
  }
};

signInBtn.addEventListener("click", () => manageSignIn());

passwordInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    manageSignIn();
  }
});

usernameInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    manageSignIn();
  }
});
