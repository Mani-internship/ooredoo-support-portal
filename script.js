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

    const issueDescription = document.getElementById("issueDescription");
    if (issueDescription.value.trim() === "") {
      showError(issueDescription, "Please enter a description.");
    }

    const priority = document.querySelector('input[name="priority"]:checked');
    if (!priority) {
      const radioGroup = document.querySelector(".radio-group");
      showError(radioGroup, "Please select a priority.");
    }

    let serviceTypeInput = document.getElementById("serviceType");
    let serviceTypeValue = serviceTypeInput ? serviceTypeInput.value.trim() : "";

    if (serviceTypeValue === "") {
      if (serviceTypeInput) {
        showError(serviceTypeInput, "Service Type is required.");
      }
    }

    if (isValid) {
      const countryCode = document.getElementById("countryCode").value.trim();
      const phoneNumber = phone.value.trim();
      const fullPhone = countryCode + phoneNumber;

      console.log("Sending phone:", fullPhone); // Debug log

      const data = {
        name: name.value.trim(),
        email: email.value.trim(),
        phone: fullPhone,
        serviceType: serviceTypeValue,
        issueDescription: issueDescription.value.trim(), // ✅ Fixed
        priority: priority.value
      };

      fetch('https://support-ticket-api-dqqe.onrender.com/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
        .then(response => {
          if (response.ok) {
            alert("Thank you! Your support ticket has been submitted.");
            form.reset();
          } else {
            alert("Sorry, there was an error submitting your ticket.");
          }
        })
        .catch(() => alert("Network error. Please try again later."));
    }
  });
});
