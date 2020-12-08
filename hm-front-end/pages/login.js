import Head from 'next/head'

import LoginForm from '../components/login_form/login_form'
import Navbar from '../components/common/navbar/navbar'

import styles from '../styles/Login.module.css'

export default function Login() {

    return (
        <div className={styles.container}>
            <Head>
                <title>Home Monitor</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <Navbar />
                <LoginForm className={styles.loginForm} />
            </main>

            <footer className={styles.footer}>
            </footer>
        </div>
    )
}
