import { User, SortBy } from 'api/users.types';
import { useEffect, useRef, useState } from 'react';
import { UserList } from './UserList';
import styles from './Form.module.css';

const URL = 'https://randomuser.me/api/';

const Form = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [showColors, setShowColors] = useState<boolean>(false);
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE);
  const originalUsersArray = useRef<User[]>([]);

  const handleDelete = (email: string) => {
    const filteredUsers = users.filter((user) => user.email !== email);
    setUsers(filteredUsers);
  };

  const toogleSortByCountry = () => {
    const newSortingValue = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSorting(newSortingValue)
  }

  const handleReset = () => {
    setUsers(originalUsersArray.current);
  };

  useEffect(() => {
    fetch(`${URL}?results=100`)
      .then((res) => res.json())
      .then((res) => {
        setUsers(res.results);
        originalUsersArray.current = res.results;
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const filteredBy = 

  const sortedUsers = sortByCountry
    ? users.toSorted((a, b) => {
        return a.location.country.localeCompare(b.location.country);
      })
    : users;

  return (
    <div>
      <header className={styles.header}>
        <button type="button" onClick={() => setShowColors((prevState) => !prevState)}>
          Row Colors
        </button>
        <button type="button" onClick={toogleSortByCountry}>
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
        ></input>
      </header>
      <UserList deleteUser={handleDelete} users={sortedUsers} showColors={showColors} />
    </div>
  );
};

export default Form;
