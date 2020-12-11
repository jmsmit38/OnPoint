import React, { useRef, useEffect } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import {
    signIn,
    signOut,
    useSession
} from 'next-auth/client';

import styles from './menu.module.css';

export default function Menu({ data }) {
    const [menuVisible, setMenuVisible] = React.useState(false);
    const [session] = useSession();
    const ref = useRef(null);

    const handleHideDropdown = (event) => {
        if (event.key === 'Escape') {
            setMenuVisible(false);
        }
    };

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setMenuVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleHideDropdown, true);
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('keydown', handleHideDropdown, true);
            document.removeEventListener('click', handleClickOutside, true);
        };
    });

    return (
        <div ref={ref} className={styles.root}>
            <button className={styles.menuButton} onClick={() => setMenuVisible(!menuVisible)}><MenuIcon className={styles.menuIcon} /></button>
            { menuVisible && (
                <div className={styles.menu}>
                    { !session ?
                        <button onClick={() => signIn("auth0")} className={styles.lastMenuItem}>Login</button>
                        : <button onClick={() => signOut("auth0")} className={styles.lastMenuItem}>Logout</button>
                    }
                </div>
            )}
        </div>
    );
}