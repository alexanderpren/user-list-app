import { User } from 'api/users.types';

interface Props {
  deleteUser: (email: string) => void;
  users: User[];
  showColors: boolean;
}

export function UserList({ deleteUser, users, showColors }: Props) {
  return (
    <table>
      <thead>
        <tr>
          <th>Profile</th>
          <th>Name</th>
          <th>Lastname</th>
          <th>Country</th>
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
                  Delete User
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
