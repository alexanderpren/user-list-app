import { SortBy, User } from 'api/users.types';
import { MdOutlineDelete } from 'react-icons/md';

interface Props {
  changeSorting: (sort: SortBy) => void;
  deleteUser: (email: string) => void;
  users: User[];
  showColors: boolean;
}

export function UsersTable({ changeSorting, deleteUser, users, showColors }: Props) {
  return (
    <table>
      <thead>
        <tr>
          <th>Photo</th>
          <th
            className="pointer"
            onClick={() => {
              changeSorting(SortBy.NAME);
            }}
          >
            Name
          </th>
          <th
            className="pointer"
            onClick={() => {
              changeSorting(SortBy.LASTNAME);
            }}
          >
            Lastname
          </th>
          <th
            className="pointer"
            onClick={() => {
              changeSorting(SortBy.COUNTRY);
            }}
          >
            Country
          </th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => {
          const backgroundColor = index % 2 === 0 ? '#333' : '#555';
          const color = showColors ? backgroundColor : 'transparent';
          return (
            <tr key={user.email} style={{ backgroundColor: color }}>
              <td>
                <img src={user.picture.thumbnail}></img>
              </td>
              <td>{user.name.first}</td>
              <td>{user.name.last}</td>
              <td>{user.location.country}</td>
              <td>
                <button
                  type="button"
                  onClick={() => {
                    deleteUser(user.email);
                  }}
                >
                  <MdOutlineDelete />
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
