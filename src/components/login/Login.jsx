import { useFormik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../../contexts/UserProvider';


const Login = () => {
    const [error, setError] = useState(null);
    const navigator = useNavigate();
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
                errors.email = 'Rensignement obligatoire';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Attention aux caracteres speciaux';
            }

            if (!values.password) {
                errors.password = 'Required';
            }

            return errors;
        },
        onSubmit: (values) => {
            axios
            .post(`${process.env.REACT_APP_API_URL}/users/login`, values)
            .then(({ data: { credentials }}) => {
                setUser({
                    token: credentials
                });
                navigator('/');
            })
            .catch(({ response: { data: {message }}}) => {
                setError(message)
            });
        }
    })

    return (
        <div>
            <h1>Connexion</h1>
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

export default Login

