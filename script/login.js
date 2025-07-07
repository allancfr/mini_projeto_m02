// EXERCÍCIO 03: Funcionalidades da tela de login
document.addEventListener("DOMContentLoaded", function () {
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const loginButton = document.getElementById("login-button");
  const loginForm = document.getElementById("login-form");

  if (loginForm) {
    function validateForm() {
      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();
      loginButton.disabled = !(email && password);
    }

    emailInput.addEventListener("input", validateForm);
    passwordInput.addEventListener("input", validateForm);

    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = emailInput.value.trim();
      localStorage.setItem("userEmail", email);
      window.location.href = "parceiros.html";
    });

    validateForm();
  }
});
