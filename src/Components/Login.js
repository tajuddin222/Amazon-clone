import React, { useState } from 'react';
import './Login.css';
import { Link, useHistory } from 'react-router-dom';
import { auth } from '../firebase';

function Login() {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = e => {
        e.preventDefault();

        //firebase login
        auth.signInWithEmailAndPassword(email, password)
        .then(auth => {
            history.push('/')
        })
        .catch(error => alert(error.message))
    }

    const register = e => {
        e.preventDefault();

        auth.createUserWithEmailAndPassword(email, password)
        .then((auth) => {
            //it successfully created new user
            console.log(auth);
            if(auth ){
                history.push('/')
            }

        })
        .catch(error => alert(error.message))
        //firebasse register 
    }

    return (
        <div className="login">
            <Link to = '/'>
                <img className="login__logo" src="http://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="name"/>
            </Link>
            <div className="login__container">
                <h1>Signin</h1>

                <form>
                    <h5>Email</h5>
                    <input type="text" value={email} onChange= {e => setEmail(e.target.value)}/>
                    <h5>Password</h5>
                    <input type="password" value={password} onChange= {e => setPassword(e.target.value)}/>
                    <button className="login__signInButton" type="submit" onClick={signIn}>Signin</button> 
                    <p>
                        By signing in you  are agreed to Amazon terms and 
                        conditions of use& sale. Please 
                        see your private notice, our cookies notice 
                        and our Intrest-Based ads 
                        notice.
                    </p>
                    <button className="login__registerButton" onClick={register}>Create your amazon account</button>
                </form>
            </div>
        </div>
    );
}

export default Login;