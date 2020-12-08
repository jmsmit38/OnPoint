import Head from 'next/head'
import styles from '../styles/Questions.module.css'

import QuestionForm from '../components/question_form/question_form'
import Navbar from '../components/common/navbar/navbar'

export default function Questions() {

    return (
        <div className={styles.container}>
            <Head>
                <title>Home Monitor</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <Navbar />
                <QuestionForm className={styles.question_form} />
                <button className={styles.createButton}>Submit</button>
            </main>

            <footer className={styles.footer}>
            </footer>
        </div>
    )
}