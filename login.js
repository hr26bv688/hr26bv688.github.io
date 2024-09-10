const signInForm = document.getElementById('signInForm');
        const signUpForm = document.getElementById('signUpForm');
        const toggleFormText = document.getElementById('toggleForm');
        const switchFormLink = document.getElementById('switchFormLink');
        const formTitle = document.getElementById('form-title');

        // Toggle between Sign In and Sign Up forms
        switchFormLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (signInForm.style.display === 'none') {
                signUpForm.style.display = 'none';
                signInForm.style.display = 'block';
                toggleFormText.innerHTML = `Don't have an account? <a href="#" id="switchFormLink">Sign Up</a>`;
                formTitle.textContent = 'Sign In';
                gsap.fromTo(signInForm, {opacity: 0}, {opacity: 1, duration: 1});
            } else {
                signInForm.style.display = 'none';
                signUpForm.style.display = 'block';
                toggleFormText.innerHTML = `Already have an account? <a href="#" id="switchFormLink">Sign In</a>`;
                formTitle.textContent = 'Sign Up';
                gsap.fromTo(signUpForm, {opacity: 0}, {opacity: 1, duration: 1});
            }
        });

        // Sign In form submission
        signInForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('signInEmail').value;
            const password = document.getElementById('signInPassword').value;

            const response = await fetch('/signIn', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const result = await response.json();
            alert(result.message);
        });

        // Sign Up form submission
        signUpForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('signUpName').value;
            const email = document.getElementById('signUpEmail').value;
            const password = document.getElementById('signUpPassword').value;

            const response = await fetch('/signUp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            const result = await response.json();
            alert(result.message);
        });

        // Forgot Password Link
        document.getElementById('forgotPasswordLink').addEventListener('click', (e) => {
            e.preventDefault();
            alert("Forgot password functionality to be added");
        });