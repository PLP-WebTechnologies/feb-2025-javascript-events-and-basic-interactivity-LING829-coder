document.addEventListener('DOMContentLoaded', function() {
    // --------------------------
    // 1. Event Handling Section
    // --------------------------
    
    // Button click event
    const clickBtn = document.getElementById('click-btn');
    const clickOutput = document.getElementById('click-output');
    
    clickBtn.addEventListener('click', function() {
        clickOutput.textContent = "Button was clicked! 🎉";
        clickOutput.style.color = "#2ecc71";
        
        // Reset after 2 seconds
        setTimeout(() => {
            clickOutput.textContent = "Button not clicked yet";
            clickOutput.style.color = "";
        }, 2000);
    });
    
    // Hover effect
    const hoverBox = document.querySelector('.hover-box');
    const hoverOutput = document.getElementById('hover-output');
    
    hoverBox.addEventListener('mouseenter', function() {
        hoverOutput.classList.remove('hidden');
    });
    
    hoverBox.addEventListener('mouseleave', function() {
        hoverOutput.classList.add('hidden');
    });
    
    // Keypress detection
    const keypressInput = document.getElementById('keypress-input');
    const keypressOutput = document.getElementById('keypress-output');
    let keypressCount = 0;
    
    keypressInput.addEventListener('keypress', function() {
        keypressCount++;
        keypressOutput.textContent = `Key presses: ${keypressCount}`;
        
        // Change color based on count
        if (keypressCount > 10) {
            keypressOutput.style.color = "#e74c3c";
        } else if (keypressCount > 5) {
            keypressOutput.style.color = "#f39c12";
        } else {
            keypressOutput.style.color = "#2ecc71";
        }
    });
    
    // Secret action (double click or long press)
    const secretBox = document.querySelector('.secret-box');
    const secretOutput = document.getElementById('secret-output');
    let pressTimer;
    
    // Double click
    secretBox.addEventListener('dblclick', function() {
        showSecret();
    });
    
    // Long press
    secretBox.addEventListener('mousedown', function() {
        pressTimer = setTimeout(() => {
            showSecret();
        }, 1000); // 1 second press
    });
    
    secretBox.addEventListener('mouseup', function() {
        clearTimeout(pressTimer);
    });
    
    secretBox.addEventListener('mouseleave', function() {
        clearTimeout(pressTimer);
    });
    
    function showSecret() {
        secretOutput.classList.remove('hidden');
        
        // Hide after 3 seconds
        setTimeout(() => {
            secretOutput.classList.add('hidden');
        }, 3000);
    }
    
    // --------------------------
    // 2. Interactive Elements Section
    // --------------------------
    
    // Button that changes text and color
    const colorChanger = document.getElementById('color-changer');
    const colors = ['#3498db', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6'];
    let colorIndex = 0;
    
    colorChanger.addEventListener('click', function() {
        colorIndex = (colorIndex + 1) % colors.length;
        this.style.backgroundColor = colors[colorIndex];
        this.textContent = `Color Changed! (${colorIndex + 1}/${colors.length})`;
        
        // Reset text after 1 second
        setTimeout(() => {
            this.textContent = "Change My Color";
        }, 1000);
    });
    
    // Image gallery/slideshow
    const images = document.querySelectorAll('.gallery-img');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let currentImageIndex = 0;
    
    function showImage(index) {
        images.forEach(img => img.classList.remove('active'));
        images[index].classList.add('active');
        currentImageIndex = index;
    }
    
    nextBtn.addEventListener('click', function() {
        let nextIndex = (currentImageIndex + 1) % images.length;
        showImage(nextIndex);
    });
    
    prevBtn.addEventListener('click', function() {
        let prevIndex = (currentImageIndex - 1 + images.length) % images.length;
        showImage(prevIndex);
    });
    
    // Auto-advance gallery every 5 seconds
    setInterval(() => {
        let nextIndex = (currentImageIndex + 1) % images.length;
        showImage(nextIndex);
    }, 5000);
    
    // Tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Update buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update panels
            tabPanels.forEach(panel => panel.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // --------------------------
    // 3. Form Validation Section
    // --------------------------
    
    const form = document.getElementById('validation-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const strengthBar = document.querySelector('.strength-bar');
    const strengthText = document.querySelector('.strength-text');
    
    // Real-time validation
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        
        if (isNameValid && isEmailValid && isPasswordValid) {
            alert('Form submitted successfully!');
            form.reset();
            strengthBar.style.width = '0%';
            strengthText.textContent = 'Password strength';
        } else {
            alert('Please fix the errors before submitting.');
        }
    });
    
    function validateName() {
        const name = nameInput.value.trim();
        
        if (name === '') {
            nameError.textContent = 'Name is required';
            return false;
        } else if (name.length < 2) {
            nameError.textContent = 'Name must be at least 2 characters';
            return false;
        } else {
            nameError.textContent = '';
            return true;
        }
    }
    
    function validateEmail() {
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email === '') {
            emailError.textContent = 'Email is required';
            return false;
        } else if (!emailRegex.test(email)) {
            emailError.textContent = 'Please enter a valid email';
            return false;
        } else {
            emailError.textContent = '';
            return true;
        }
    }
    
    function validatePassword() {
        const password = passwordInput.value;
        
        // Calculate password strength
        let strength = 0;
        if (password.length > 0) strength += 1;
        if (password.length >= 8) strength += 1;
        if (/[A-Z]/.test(password)) strength += 1;
        if (/[0-9]/.test(password)) strength += 1;
        if (/[^A-Za-z0-9]/.test(password)) strength += 1;
        
        // Update strength bar and text
        const width = (strength / 5) * 100;
        strengthBar.style.width = `${width}%`;
        
        let color, text;
        switch(strength) {
            case 0:
                color = 'transparent';
                text = '';
                break;
            case 1:
                color = '#e74c3c';
                text = 'Very Weak';
                break;
            case 2:
                color = '#f39c12';
                text = 'Weak';
                break;
            case 3:
                color = '#f1c40f';
                text = 'Medium';
                break;
            case 4:
                color = '#2ecc71';
                text = 'Strong';
                break;
            case 5:
                color = '#27ae60';
                text = 'Very Strong';
                break;
        }
        
        strengthBar.style.backgroundColor = color;
        strengthText.textContent = text;
        strengthText.style.color = color;
        
        // Validate password
        if (password === '') {
            passwordError.textContent = 'Password is required';
            return false;
        } else if (password.length < 8) {
            passwordError.textContent = 'Password must be at least 8 characters';
            return false;
        } else {
            passwordError.textContent = '';
            return true;
        }
    }
});