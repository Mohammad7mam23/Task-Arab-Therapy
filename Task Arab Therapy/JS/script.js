const phoneInput = document.querySelector("#phone");
  
// Initialize the intl-tel-input plugin
const iti = intlTelInput(phoneInput, {
  initialCountry: "auto",
  geoIpLookup: (callback) => {
    fetch("https://ipinfo.io/json?token=<YOUR_TOKEN>")
      .then((response) => response.json())
      .then((data) => callback(data.country))
      .catch(() => callback("us"));
  },
  utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
});

  // Listen for changes in the input field
phoneInput.addEventListener("input", () => {
let enteredValue = phoneInput.value.trim();

// Add "+" if not present and ensure it's numeric
if (!enteredValue.startsWith("+") && /^\d+$/.test(enteredValue)) {
enteredValue = `+${enteredValue}`;
phoneInput.value = enteredValue; // Update input value
}

// Extract country data based on the entered dial code
if (enteredValue.startsWith("+")) {
const matchedCountry = iti.getCountryData().find((country) =>
  enteredValue.startsWith(`+${country.dialCode}`)
);
if (matchedCountry) {
  iti.setCountry(matchedCountry.iso2); // Update the selected country
}
}
});


// Handle form submission
const form = document.getElementById("form");
form.addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevent default form submission

  // Get form data
  const data = {
    email: document.getElementById("email").value,
    first_name: document.getElementById("first-name").value,
    last_name: document.getElementById("last-name").value,
    mobile: iti.getNumber(),
    organization_name: document.getElementById("company-name").value,
    company_size: document.getElementById("company-size").value,
  };

  // Send data to API
  try {
    const response = await fetch("https://stg.arabtherapy.com/api/v1/forms/submit/9", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert("تم إرسال البيانات بنجاح!");
    } else {
      alert("حدث خطأ أثناء إرسال البيانات. حاول مرة أخرى.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("تعذر الاتصال بالخادم.");
  }
});
/*   const phoneInput = document.querySelector("#phone");

// Initialize the intl-tel-input plugin
const iti = intlTelInput(phoneInput, {
initialCountry: "auto",
geoIpLookup: (callback) => {
fetch("https://ipinfo.io/json?token=<YOUR_TOKEN>")
  .then((response) => response.json())
  .then((data) => callback(data.country))
  .catch(() => callback("us"));
},
utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
});

// Listen for changes in the input field
phoneInput.addEventListener("input", () => {
let enteredValue = phoneInput.value.trim();

// Add "+" if not present and ensure it's numeric
if (!enteredValue.startsWith("+") && /^\d+$/.test(enteredValue)) {
enteredValue = `+${enteredValue}`;
phoneInput.value = enteredValue; // Update input value
}

// Extract country data based on the entered dial code
if (enteredValue.startsWith("+")) {
const matchedCountry = iti.getCountryData().find((country) =>
  enteredValue.startsWith(`+${country.dialCode}`)
);
if (matchedCountry) {
  iti.setCountry(matchedCountry.iso2); // Update the selected country
}
}
});
*/
