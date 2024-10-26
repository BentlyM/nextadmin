import { MdSearch } from 'react-icons/md'
import styles from './search.module.css'

import React from 'react'

const Search = ({placeholder}:{placeholder: string}) => {
  return (
    <div className={styles.container}>
      <MdSearch />
      <input type="text" placeholder={placeholder} className={styles.input} />
    </div>
  )
}

export default Search