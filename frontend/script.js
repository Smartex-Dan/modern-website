const container = document.getElementById('container');
const loginBtn = document.getElementById('login');
const registerBtn = document.getElementById('register');

registerBtn.addEventListener('click', () => container.classList.add('active'));
loginBtn.addEventListener('click', () => container.classList.remove('active'));

class AuthRoutes {
    async register(name, email, password) {
        try {
            const res = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });
            const data = await res.json();
            if (res.ok) {
                localStorage.setItem('token', data.token);
                alert(data.message);
            } else {
                alert(data.message);
            }
        } catch (err) {
            console.error('Register error:', err);
        }
    }

    async login(email, password) {
        try {
            const res = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            if (res.ok) {
                localStorage.setItem('token', data.token);
                alert(data.message);
            } else {
                alert(data.message);
            }
        } catch (err) {
            console.error('Login error:', err);
        }
    }
}

const auth = new AuthRoutes();

// Sign Up button
document.querySelector('.sign-up button[type="button"]').addEventListener('click', () => {
    const name = document.querySelector('.sign-up input[type="text"]').value;
    const email = document.querySelector('.sign-up input[type="email"]').value;
    const password = document.querySelector('.sign-up input[type="password"]').value;
    auth.register(name, email, password);
});

// Login button
document.querySelector('.login button[type="button"]').addEventListener('click', () => {
    const email = document.querySelector('.login input[type="email"]').value;
    const password = document.querySelector('.login input[type="password"]').value;
    auth.login(email, password);
});