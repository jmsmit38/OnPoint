import styles from '../styles/Home.module.css';
import Navbar from '../components/common/navbar/navbar';
import _ from 'lodash';
import faker from 'faker';
import { useRouter } from 'next/router';
import { Search } from 'semantic-ui-react';
import React from 'react';

const data = _.times(50, () => ({
  title: faker.company.companyName(),
  description: faker.company.bs(),
}));

export default function Home() {
  const router = useRouter();
  const initialState = {
    loading: false,
    results: [],
    value: '',
  }

  const items = data.map((item) => {
    return item.title;
  })

  const source = data.map((item) => {
    return {
      title: item.title,
      description: item.description,
      onClick: () => router.push('/questions')
    };
  })

  function searchReducer(state, action) {
    switch (action.type) {
      case 'CLEAN_QUERY':
        return initialState
      case 'START_SEARCH':
        return { ...state, loading: true, value: action.query }
      case 'FINISH_SEARCH':
        return { ...state, loading: false, results: action.results }
      case 'UPDATE_SELECTION':
        return { ...state, value: action.selection }

      default:
        throw new Error()
    }
  }

  const [state, dispatch] = React.useReducer(searchReducer, initialState)
  const { loading, results, value } = state

  const timeoutRef = React.useRef()
  const handleSearchChange = React.useCallback((e, data) => {
    clearTimeout(timeoutRef.current)
    dispatch({ type: 'START_SEARCH', query: data.value })

    timeoutRef.current = setTimeout(() => {
      if (data.value.length === 0) {
        dispatch({ type: 'CLEAN_QUERY' })
        return
      }

      const re = new RegExp(_.escapeRegExp(data.value), 'i')
      const isMatch = (result) => re.test(result.title)

      dispatch({
        type: 'FINISH_SEARCH',
        results: _.filter(source, isMatch),
      })
    }, 300)
  }, [])
  React.useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current)
    }
  }, [])

  const getInitial = (item) => {
    const characters = item.split('');
    const initials = characters.filter((character) => character >= 'A' && character <= 'Z');
    return initials.join('');
  }

  return (
    <div className={styles.container}>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.searchCardImage}></div>
        <div className={styles.searchCard}>
          <h1 className={styles.searchCardTitle}>
            <span className={styles.searchCardTitleUnderlined}>
              Looking for trusted contractors
            </span>
            &nbsp;
            <span className={styles.searchCardTitleNormal}>
              to improve your home?
            </span>
          </h1>
          <Search
            className={styles.searchCardSearch}
            loading={loading}
            onResultSelect={(e, data) =>
              dispatch({ type: 'UPDATE_SELECTION', selection: data.result.title })
            }
            size={"large"}
            onSearchChange={handleSearchChange}
            results={results}
            value={value}
            input={{ fluid: true }}
            fluid
          />
        </div>
        <div className={styles.industriesGrid}>
          {
            items.map((item) => {
              return <div key={item} className={styles.industriesGridItem}>
                <button onClick={() => router.push('/questions')} className={styles.industriesGridItemButton}>{getInitial(item)}</button>
                <label className={styles.industriesGridItemLabel}>{item}</label>
              </div>
            })
          }
        </div>
      </main>
    </div>
  )
}