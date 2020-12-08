import Menu from '../menu/menu';

import styles from './navbar.module.css';
import { useRouter } from 'next/router';

export default function Navbar() {
    const router = useRouter();

    return (
        <div className={styles.root}>
            <img onClick={() => router.push('/')} className={styles.logo} src="logo.png" alt="logo" />
            <Menu />
        </div>
    )
}
