// components/RegisterForm.js
import React, { useState } from 'react';
import authService from '../services/authService';

const RegisterForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await authService.register(email, password);
            setMessage(res.data.message);
            // Optional: Redirect user to another page here, e.g., using `useRouter` from Next.js
        } catch (error) {
            // Improved error handling
            setMessage(error.response?.data?.error || "An unexpected error occurred. Please try again.");
        }
    };

    return (
        <form onSubmit={handleRegister}>
            <div>
                <label>Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Register</button>
            {message && <p>{message}</p>}
        </form>
    );
};

export default RegisterForm;
