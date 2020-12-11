import Head from 'next/head';
import { useSession, signIn } from 'next-auth/client';
import { useRouter } from 'next/router';

import styles from '../styles/Questions.module.css';
import QuestionForm from '../components/question_form/question_form';
import Navbar from '../components/common/navbar/navbar';

export default function Questions() {
    const [session, loading] = useSession();
    const router = useRouter();
    if (loading) return null;
    if (!loading && session) {
        console.log(session);
    }
    return (
        <div className={styles.container}>
            <Head>
                <title>Home Monitor</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <Navbar />
                <QuestionForm className={styles.question_form} />
                {session ?
                    <button onClick={() =>
                        router.push({
                            pathname: '/service',
                            query: { serviceID: 'qweasdzxc' }
                        })} className={styles.createButton}>Submit</button>
                    : <button onClick={() => signIn("auth0")} className={styles.loginButton}>Login To Submit</button>
                }
            </main>

            <footer className={styles.footer}>
            </footer>
        </div>
    )
}