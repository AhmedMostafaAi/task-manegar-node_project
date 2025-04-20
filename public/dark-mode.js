const darkModeToggle = document.getElementById("dark-mode-toggle");
const body = document.body;

// Check if a preference exists; if not, set a default
if (!localStorage.getItem("dark-mode")) {
  localStorage.setItem("dark-mode", "disabled"); // Default to light mode
}

const darkMode = localStorage.getItem("dark-mode");

// Apply stored preference on page load
if (darkMode === "enabled") {
  body.classList.add("dark-mode");
} else {
  body.classList.remove("dark-mode"); // Force light mode if not set
}

darkModeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");

  // Save the updated preference
  if (body.classList.contains("dark-mode")) {
    localStorage.setItem("dark-mode", "enabled");
  } else {
    localStorage.setItem("dark-mode", "disabled");
  }
});