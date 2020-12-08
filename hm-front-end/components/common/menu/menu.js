import React, { useRef, useEffect } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import styles from './menu.module.css';
import { useRouter } from 'next/router';

export default function Menu() {
    const [menuVisible, setMenuVisible] = React.useState(false);
    const ref = useRef(null);
    const router = useRouter();

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

    const items = [
        ['Login', '/login'],
        ['Sign up', '/signup'],
        ['Questions', '/questions']
    ]

    const menuItems = []
    for (const [index, value] of items.entries()) {
        const [name, path] = value;
        menuItems.push(<button key={name} onClick={() => router.push(path)} className={index === items.length - 1 ? styles.lastMenuItem : styles.menuItem}>{name}</button>)
    }


    return (
        <div ref={ref} className={styles.root}>
            <button className={styles.menuButton} onClick={() => setMenuVisible(!menuVisible)}><MenuIcon className={styles.menuIcon} /></button>
            { menuVisible &&
                <div className={styles.menu}>
                    {
                        menuItems
                    }
                </div>
            }
        </div>
    )
}
