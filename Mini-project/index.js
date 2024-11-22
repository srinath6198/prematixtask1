// Modal and Sign In Button Logic
window.addEventListener("load", function() {
    const signInBtn = document.getElementById('signInBtn');
    const signInModal = document.getElementById('signInModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const editProfileBtn = document.getElementById('editProfileBtn');
    const editProfileForm = document.getElementById('editProfileForm');
    const profileForm = document.getElementById('profileForm');
    const cancelEditBtn = document.getElementById('cancelEditBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const userNameDisplay = document.getElementById('userName'); // User name element
    
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
 console.log(currentUser);
 
    // Check if user is logged in and show their details in the modal
    if (currentUser) {
        document.getElementById('userFirstName').innerText = currentUser.firstName;
        document.getElementById('userLastName').innerText = currentUser.lastName;
        document.getElementById('userEmail').innerText = currentUser.email;
        document.getElementById('userPhone').innerText = currentUser.phone;
        document.getElementById('userDob').innerText = currentUser.dob;

        editProfileBtn.style.display = 'block';  // Show "Edit Profile" button


        signInBtn.style.display = 'none';
        userNameDisplay.style.display = 'inline';
        userNameDisplay.textContent = ` ${currentUser.firstName}`;

        userNameDisplay.addEventListener('click', () => {
            // Option 1: Open the profile modal (similar to how you show the modal for sign-in)
            signInModal.style.display = 'flex';
            // Option 2: Redirect to a profile editing page (you can replace the current page with the profile edit page)
            // window.location.href = './editProfile.html'; // Uncomment this if you want to redirect
        });
        closeModalBtn.addEventListener('click', () => {
            signInModal.style.display = 'none';
        });
         // Show edit form when "Edit Profile" button is clicked
    editProfileBtn.addEventListener('click', () => {
        document.getElementById('profileDetails').style.display = 'none';
        editProfileForm.style.display = 'block';

        // Pre-fill the form with current user details
        document.getElementById('editFirstName').value = currentUser.firstName;
        document.getElementById('editLastName').value = currentUser.lastName;
        document.getElementById('editEmail').value = currentUser.email;
        document.getElementById('editPhone').value = currentUser.phone;
        document.getElementById('editDob').value = currentUser.dob;
    });
    }

    // Open modal when "Sign In" button is clicked
    signInBtn.addEventListener('click', () => {
        signInModal.style.display = 'flex';
    });
    // Handle saving the profile changes
    profileForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const updatedUser = {
            firstName: document.getElementById('editFirstName').value,
            lastName: document.getElementById('editLastName').value,
            email: document.getElementById('editEmail').value,
            phone: document.getElementById('editPhone').value,
            dob: document.getElementById('editDob').value
        };

        // Save the updated user details to sessionStorage
        sessionStorage.setItem("currentUser", JSON.stringify(updatedUser));
console.log(sessionStorage);

        // Update the displayed profile details
        document.getElementById('userFirstName').innerText = updatedUser.firstName;
        document.getElementById('userLastName').innerText = updatedUser.lastName;
        document.getElementById('userEmail').innerText = updatedUser.email;
        document.getElementById('userPhone').innerText = updatedUser.phone;
        document.getElementById('userDob').innerText = updatedUser.dob;

        // Hide the edit form and show the updated profile details
        editProfileForm.style.display = 'none';
        document.getElementById('profileDetails').style.display = 'block';
    });

    // Cancel editing profile
    cancelEditBtn.addEventListener('click', () => {
        editProfileForm.style.display = 'none';
        document.getElementById('profileDetails').style.display = 'block';
    });

    // Logout functionality
    logoutBtn.addEventListener('click', () => {
        sessionStorage.removeItem("currentUser"); // Remove user data from sessionStorage
        alert("You have been logged out!"); // Display logout message
        window.location.href = './loginPage/signin.html'; // Redirect to login page
    });
});









// Image Slider logic
let index = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function moveSlide(step) {
    index += step;
    if (index < 0) {
        index = totalSlides - 1;
    } else if (index >= totalSlides) {
        index = 0;
    }
    updateSlider();
}

function updateSlider() {
    const slider = document.querySelector('.slider');
    slider.style.transform = `translateX(-${index * 100}%)`;
}

// Optional: Auto slide every 3 seconds
setInterval(() => {
    moveSlide(1);
}, 3000);
