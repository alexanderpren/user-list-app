import { useEffect, useMemo, useRef, useState } from 'react';
import { ApiResults, SortBy, User } from 'api/users.types';

const URL = 'https://randomuser.me/api/';

export const useUsers = (filterCountry: string, sorting: SortBy) => {
  const [users, setUsers] = useState<User[]>([]);
  const originalUsersArray = useRef<User[]>([]);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const newController = new AbortController();
    abortControllerRef.current = newController;
    fetch(`${URL}?results=100`, { signal: newController.signal })
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json() as Promise<ApiResults>;
      })
      .then((res) => {
        setUsers(res.results);
        originalUsersArray.current = res.results;
      })
      .catch((err) => {
        if (err.name === 'AbortError') {
          console.log('request aborted');
        } else {
          console.error(err);
        }
      });
    return () => {
      // Abort when component unmounts
      newController.abort();
    };
  }, []);

  const handleDelete = (email: string) => {
    setUsers((prev) => prev.filter((user) => user.email !== email));
  };

  const handleReset = () => {
    setUsers(originalUsersArray.current);
  };

  const filteredUsers = useMemo(() => {
    return filterCountry.length > 0
      ? users.filter((user) =>
          user.location.country.toLowerCase().includes(filterCountry.toLowerCase()),
        )
      : users;
  }, [users, filterCountry]);

  const sortedUsers = useMemo(() => {
    if (sorting === SortBy.NONE) return filteredUsers;

    const compareProperties: Record<SortBy, (user: User) => string> = {
      [SortBy.COUNTRY]: (user) => user.location.country,
      [SortBy.NAME]: (user) => user.name.first,
      [SortBy.LASTNAME]: (user) => user.name.last,
      [SortBy.NONE]: () => '',
    };

    return filteredUsers.toSorted((a, b) =>
      compareProperties[sorting](a).localeCompare(compareProperties[sorting](b)),
    );
  }, [filteredUsers, sorting]);

  return { sortedUsers, handleDelete, handleReset };
};
