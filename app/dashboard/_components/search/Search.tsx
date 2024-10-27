'use client';
import { MdSearch } from 'react-icons/md';
import styles from './search.module.css';
import React from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

const Search = ({ placeholder }: { placeholder: string }) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleSearch = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const params = new URLSearchParams(searchParams);

      params.set('page', '1');

      if (e.target.value) {
        if (e.target.value.length) {
          params.set('q', e.target.value);
        }
      } else {
        params.delete('q');
      }

      replace(`${pathname}?${params}`);
    },
    300
  );

  return (
    <div className={styles.container}>
      <MdSearch />
      <input
        type="text"
        placeholder={placeholder}
        className={styles.input}
        onChange={handleSearch}
      />
    </div>
  );
};

export default Search;
