import React, {useState} from "react";
import './Login.css';
import * as AuthService from '../../services/auth';
//import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    //const navigagate = useNavigate();
    
    

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        try {
            const response = await AuthService.login({ email, password });
            console.log('Login exitoso:', response);

            localStorage.setItem('token', response.token); 

            //navigate('/');
        } catch (error) {
            setError(error.message || 'Error al iniciar sesión verifica tus credenciales.');
        }
    }

    return (
        <section className='login-page'>
            <h2 className='login-page__title'>Login</h2>
            <form className='login-page__form' onSubmit={handleSubmit}>
                <section className='login-page__input-group'>
                    <label htmlFor='identifier' className='login-page__label'>Username or Email</label>
                    <input
                        type='text'
                        id='identifier'
                        name='identifier'
                        className='login-page__input'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </section>
                <section className='login-page__input-group'>
                    <label htmlFor='password' className='login-page__label'>Password</label>
                    <input
                        type='password'
                        id='password'
                        name='password'
                        className='login-page__input'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </section>
                <button type="submit" className="login-page__button">Enter</button>
                {error && <p className="error-message">{error}</p>}
            </form>
            <p className="login-page__text">Don't have an account? <a href="/signup" className="login-page__link">Sign up</a></p>
        </section>
    )
}

export default Login;