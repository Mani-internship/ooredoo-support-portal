document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("support-form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    document.querySelectorAll(".error").forEach(el => el.remove());
    let isValid = true;

    function showError(input, message) {
      const error = document.createElement("div");
      error.className = "error";
      error.textContent = message;
      input.insertAdjacentElement("afterend", error);
      isValid = false;
    }

    const name = document.getElementById("name");
    if (name.value.trim() === "") {
      showError(name, "Name is required.");
    }

    const email = document.getElementById("email");
    const emailPattern = /^[^\s@]+@[^\s@]+\.com$/;
    if (!emailPattern.test(email.value.trim())) {
      showError(email, "Enter a valid email ending with .com");
    }

    const phone = document.getElementById("phone");
    const phonePattern = /^[0-9]{4,15}$/;
    if (!phonePattern.test(phone.value.trim())) {
      showError(phone, "Enter a valid phone number (4-15 digits)");
    }

    const description = document.getElementById("description");
    if (description.value.trim() === "") {
      showError(description, "Please enter a description.");
    }

    const priority = document.querySelector('input[name="priority"]:checked');
    if (!priority) {
      const radioGroup = document.querySelector(".radio-group");
      showError(radioGroup, "Please select a priority.");
    }

    if (isValid) {
      alert("Thank you! Your support ticket has been submitted.");
      form.reset();
    }
  });
});
