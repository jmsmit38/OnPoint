import styles from './login_form.module.css';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function LoginForm(props) {
    const router = useRouter();

    const checkLoggedIn = () => {
        if (typeof document !== 'undefined') {
            const cookies = Object.fromEntries(document.cookie.split(/; */).map(c => {
                const [key, v] = c.split('=', 2);
                return [key, decodeURIComponent(v)];
            }));
            return cookies["loggedin"] == 'true';
        }
        return false;
    }

    const [isLoggedIn, setIsLoggedIn] = useState(checkLoggedIn());

    const fakeUsers = {
        'user1': 'password',
        'user2': '123456'
    }

    const authenticate = () => {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        if (fakeUsers[username] === password) {
            document.cookie = "loggedin=true";
        }
        setIsLoggedIn(checkLoggedIn());
    }

    return (
        <div className={props.className}>
            {!isLoggedIn &&
                <div className={styles.root}>
                    <form className={styles.form} method="post" action="/api/login" id="login">
                        <h1 className={styles.title}>Log In</h1>
                        <input className={styles.input} required name="username" id="username" placeholder="Username" type="text" />
                        <input className={styles.input} required name="password" id="password" placeholder="Password" type="password" />
                    </form>
                    <button onClick={authenticate} className={styles.loginButton}>Log In</button>
                    <a className={styles.forgot} href="/">Forgot Password?</a>
                    <div className={styles.divider}></div>
                    <button className={styles.createButton}>Create New Account</button>
                </div>
            }
            {isLoggedIn && <p>Logged In</p>}
        </div>
    )
}
