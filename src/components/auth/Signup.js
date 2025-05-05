import React, { useState } from 'react';
import './Signup.css';
import * as AuthService from '../../services/auth'; 

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');


    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setSuccessMessage('');

        try {
            await AuthService.signup({ name, email, password});
            setSuccessMessage('Registro exitoso. Por favor, inicia sesión.');
        
        } catch (error) {
            setError(error.message);
        }



    };


    return (
        <section className='signup-page'>
            <h2 className='signup-page__title'>Register</h2>
            <form className='signup-page__form' onSubmit={handleSubmit}>
                <section className='signup-page__input-group'>
                    <label htmlFor='username' className='signup-page__label'>Username</label>
                    <input
                        type='text'
                        _id='username'
                        name='username'
                        className='signup-page__input'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </section>
                <section className='signup-page__input-group'>
                    <label htmlFor='email' className='signup-page__label'>Email</label>
                    <input
                        type='email'
                        id='email'
                        name='email'
                        className='signup-page__input'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </section>
                <section className='signup-page__input-group'>
                    <label htmlFor='password' className='signup-page__label'>Password</label>
                    <input
                        type='password'
                        id='password'
                        name='password'
                        className='signup-page__input'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </section>
                <button type='submit' className='signup-page__button'>Register</button>

                {error && <p className='signup-page__error'>{error}</p>}
                {successMessage && <p className='signup-page__success'>{successMessage}</p>}        
            </form>
        </section>
    );
}

export default Signup;