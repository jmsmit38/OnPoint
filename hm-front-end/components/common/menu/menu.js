import React, { useRef, useEffect } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import styles from './menu.module.css';

export default function Menu({ data }) {
    const [menuVisible, setMenuVisible] = React.useState(false);
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
                    <a href={"/api/login"} className={styles.lastMenuItem}>Login</a>
                    <a href={"/api/logout"} className={styles.lastMenuItem}>Logout</a>
                    <a href={"/api/me"} className={styles.lastMenuItem}>Me</a>
                </div>
            )}
        </div>
    );
}

export async function getServerSideProps() {
    const res = await fetch('/api/me');
    const data = await res.json();
    console.log(data);
    return {
        props: { data }, // will be passed to the page component as props
    }
}