import styles from '../styles/Home.module.css';
import Navbar from '../components/common/navbar/navbar';
import SearchIcon from '@material-ui/icons/Search';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const items = ['Electricity', 'Solar', 'Plumbing', 'Electricity', 'Solar', 'Plumbing', 'Electricity', 'Solar'];
  const [keyword, setKeyword] = useState('');
  const filtered = items.filter((item) => item.toLowerCase().includes(keyword));
  const router = useRouter();

  const updateKeyword = () => {
    setKeyword(document.getElementById("searchInput").value.toLowerCase())
  };

  const onKeyDown = (e) => {
    if (e.keyCode == 13) {
      updateKeyword();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown, true);
    return () => {
      document.removeEventListener('keydown', onKeyDown, true);
    };
  });

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Navbar />
        <div className={styles.searchCard}>
          <h1 className={styles.searchCardTitle}>Look for trusted contractors for your home improvement project?</h1>
          <div className={styles.searchCardSearch}>
            <SearchIcon className={styles.searchIcon} />
            <input id="searchInput" className={styles.searchCardInput} placeholder="What industry are you looking for?" />
            <button onClick={updateKeyword} className={styles.searchCardButton}>Search</button>
          </div>
        </div>
        <div className={styles.industriesGrid}>
          {
            filtered.map((item) => {
              return <div className={styles.industriesGridItem}>
                <button onClick={() => router.push('/questions')} className={styles.industriesGridItemButton}>B</button>
                <label className={styles.industriesGridItemLabel}>{item}</label>
              </div>
            })
          }
        </div>
      </main>
    </div>
  )
}