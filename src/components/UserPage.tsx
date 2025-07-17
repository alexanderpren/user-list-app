import { SortBy } from 'api/users.types';
import { useState } from 'react';
import { UsersTable } from './UsersTable';
import styles from './UserPage.module.css';
import { useDebounce } from '../hooks/useDebounce';
import { useUsers } from '../hooks/useUsers';

const UserPage = () => {
  const [showColors, setShowColors] = useState<boolean>(false);
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE);
  const [filter, setFilter] = useState('');
  const debouncedFilter = useDebounce(filter, 300);

  const { sortedUsers, handleDelete, handleReset, isLoading } = useUsers(debouncedFilter, sorting);

  const toggleSortByCountry = () => {
    setSorting((prev) => (prev === SortBy.COUNTRY ? SortBy.NONE : SortBy.COUNTRY));
  };

  return (
    <div>
      <header className={styles.header}>
        <button type="button" onClick={() => setShowColors((prevState) => !prevState)}>
          Row Colors
        </button>
        <button type="button" onClick={toggleSortByCountry}>
          {sorting === SortBy.COUNTRY ? `Don't sort by Country` : 'Sort by Country'}
        </button>
        <button type="button" onClick={handleReset}>
          Reset Users
        </button>
        <input
          id="country-filter"
          type="text"
          placeholder="Filter by Country"
          className={styles.input}
          aria-label="Filter by country"
          role="searchbox"
          autoComplete="off"
          onChange={(e) => setFilter(e.target.value)}
        ></input>
      </header>
      <UsersTable
        changeSorting={setSorting}
        deleteUser={handleDelete}
        users={sortedUsers}
        showColors={showColors}
        isLoading={isLoading}
      />
    </div>
  );
};

export default UserPage;
