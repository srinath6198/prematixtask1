// Show Sign In Form
function showSignIn() {
    document.getElementById("signInForm").classList.add("active");
    document.getElementById("loginForm").classList.remove("active");
    document.getElementById("signInTab").classList.add("active");
    document.getElementById("loginTab").classList.remove("active");
}

// Show Login Form
function showLogin() {
    document.getElementById("loginForm").classList.add("active");
    document.getElementById("signInForm").classList.remove("active");
    document.getElementById("loginTab").classList.add("active");
    document.getElementById("signInTab").classList.remove("active");
}

// Validate Sign In Form
function validateSignInForm() {
    let isValid = true;
    clearErrors();

    // Get form values
    const firstName = document.getElementById("first-name").value.trim();
    const lastName = document.getElementById("last-name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const dob = document.getElementById("dob").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirm-password").value.trim();

    // Basic Validation for empty fields
    if (!firstName || !lastName || !email || !phone || !dob || !password || !confirmPassword) {
        alert("Please fill all fields.");
        return false;
    }

    const namePattern = /^[A-Za-z\s]+$/;
    if (!namePattern.test(firstName)) {
        document.getElementById("firstNameError").innerText = "First name can only contain letters.";
        isValid = false;
    }
    if (!namePattern.test(lastName)) {
        document.getElementById("lastNameError").innerText = "Last name can only contain letters.";
        isValid = false;
    }

    // Validate Email Format
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        document.getElementById("emailError").innerText = "Please enter a valid email address.";
        return false;
    }

    // Validate Passwords match
    if (password !== confirmPassword) {
        document.getElementById("confirmPasswordError").innerText = "Passwords do not match.";
        return false;
    }

    // Password validation: at least 8 characters, one letter, one number, and one special character
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?/\\|`~-]).{8,}$/;
    if (!passwordPattern.test(password)) {
        document.getElementById("passwordError").innerText = "Password must be at least 8 characters long, include at least one letter, one number, and one special character.";
        return false;
    }

    // Validate Phone (simple check for 10 digits)
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phone)) {
        document.getElementById("phoneError").innerText = "Please enter a valid 10-digit phone number.";
        return false;
    }

    // Retrieve users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if the email is already registered
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        alert("Email is already registered. Please use a different email or log in.");
        return false;
    }

    // Add new user to the array
    users.push({ firstName, lastName, email, phone, dob, password });
    localStorage.setItem("users", JSON.stringify(users));

    // Store current user in sessionStorage
    sessionStorage.setItem("currentUser", JSON.stringify({ firstName, lastName, email }));

    alert("Sign In Successful!");
    showLogin();  // Switch to login form after successful sign in
    return false;
}

// Validate Login Form
function validateLoginForm() {
    clearErrors();

    const loginEmail = document.getElementById("login-email").value.trim();
    const loginPassword = document.getElementById("login-password").value.trim();

    // Basic Validation for empty fields
    if (!loginEmail || !loginPassword) {
        alert("Please fill in both fields.");
        return false;
    }

    // Retrieve users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Find the user with the matching credentials
    const user = users.find(user => user.email === loginEmail && user.password === loginPassword);

    if (!user) {
        document.getElementById("loginEmailError").innerText = "Invalid email or password.";
        return false;
    }

    // Store current user in sessionStorage
    sessionStorage.setItem("currentUser", JSON.stringify(user));

    alert(`Login Successful! Welcome back, ${user.firstName}`);
    window.location.href = "C:/Users/Admin/Desktop/Mini-project/index.html";  // Redirect to homepage
    return false;
}

// Clear Error Messages
function clearErrors() {
    document.querySelectorAll(".error").forEach(error => (error.innerText = ""));
}
document.getElementById('togglePassword').addEventListener('click', function() {
    const passwordField = document.getElementById('password');
    const eyeIcon = document.getElementById('togglePassword');
  
    // Toggle password visibility
    const type = passwordField.type === 'password' ? 'text' : 'password';
    passwordField.type = type;
  
    // Toggle the eye icon
    eyeIcon.innerHTML = type === 'password' ? '&#128065;' : '&#128064;'; // Open and closed eye icons
  });
  
  document.getElementById('toggleConfirmPassword').addEventListener('click', function() {
    const confirmPasswordField = document.getElementById('confirm-password');
    const eyeIcon = document.getElementById('toggleConfirmPassword');
  
    // Toggle confirm password visibility
    const type = confirmPasswordField.type === 'password' ? 'text' : 'password';
    confirmPasswordField.type = type;
  
    // Toggle the eye icon
    eyeIcon.innerHTML = type === 'password' ? '&#128065;' : '&#128064;'; // Open and closed eye icons
  });
  
