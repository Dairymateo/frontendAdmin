import React, { useState } from "react";
import './Login.css';
import * as AuthService from '../../services/auth';
import { useNavigate } from 'react-router-dom';
import f1Image from '../../Images/Login.jpg';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        try {
            const response = await AuthService.login({ email, password });
            console.log('Login exitoso:', response);

            localStorage.setItem('authToken', response.accesstoken); 
            localStorage.setItem('isAdmin', response.isAdmin); 
            localStorage.setItem('userId', response.userId); 

            navigate('/vehicles');

        } catch (error) {
            setError(error.message || 'Error al iniciar sesión verifica tus credenciales.');
        }
    };

    return (
        <section className='login-page'>
            <div className='login-page__form-container'>
                <h2 className='login-page__title'>Sign In</h2>
                <form className='login-page__form' onSubmit={handleSubmit}>
                    <section className='login-page__input-group'>
                        <input
                            type='text'
                            id='identifier'
                            name='identifier'
                            className='login-page__input'
                            placeholder='Username'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </section>
                    <section className='login-page__input-group'>
                        <input
                            type='password'
                            id='password'
                            name='password'
                            className='login-page__input'
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </section>
                    <button type="submit" className="login-page__button">Enter</button>
                    <button type="button" className="login-page__register-button">Register</button>
                    {error && <p className="error-message">{error}</p>}
                </form>
            </div>
            
            <div className='login-page__image-container'>
                <div 
                    className='f1-image'
                    style={{ backgroundImage: `url(${f1Image})` }}
                >
                </div>
            </div>
        </section>
    );
}

export default Login;