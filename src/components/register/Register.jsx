import { useFormik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../../contexts/UserProvider';

const Register = () => {
    const navigator = useNavigate();
    const [error, setError] = useState('');
    const { setUser } = useUser();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validateOnChange: false,
        validate: (values) => {
            const errors = {};

            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'email address is invalid';
            }

            if (!values.password) {
                errors.password = 'Required';
            }

            return errors;
        },
        onSubmit: (values) => {
            axios
            .post(`${process.env.REACT_APP_API_URL}/users`, values)
            .then(({ data: { credential }}) => {
                setUser({
                    token: credential
                })
                navigator('/')
            })
            .catch((err) => {
                setError(err.response.data.message);
            })
        }
    })

    return (
        <div>
            <h1>Creer votre compte</h1>
            <span>{error}</span>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="email">
                email
                {formik.errors.email ? <span>{formik.errors.email}</span> : null}    
                </label>
                <input 
                    type="email"
                    id='email'
                    name='email'
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />
                <label htmlFor="password">
                password
                {formik.errors.password ? <span>{formik.errors.password}</span> : null}    
                </label>
                <input 
                    type="password" 
                    id="password"
                    name="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                />
                <button type="submit">Envoyer</button>
            </form>
        </div>
    )
}

export default Register