import { SortBy, User } from 'api/users.types';
import { MdOutlineDelete } from 'react-icons/md';
import './DataTable.scss';
import SkeletonBlock from './Skeletons/SkeletonBlock';

interface Props {
  changeSorting: (sort: SortBy) => void;
  deleteUser: (email: string) => void;
  users: User[];
  showColors: boolean;
  isLoading: boolean;
}
const numberOfColumns = 5;
const numberOfSkeletonRows = 5;

export function UsersTable({ changeSorting, deleteUser, users, showColors, isLoading }: Props) {
  console.log('🚀 ~ UsersTable ~ isLoading:', isLoading);
  return (
    <table className="data-table">
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
        {isLoading ? (
          Array.from({ length: numberOfSkeletonRows }).map((_, index) => (
            <tr key={index}>
              {' '}
              {/* Use index as key for skeleton rows as they don't have unique data */}
              <td style={{ padding: '12px 15px', borderBottom: '1px solid #eee' }}>
                {/* Skeleton for Photo - typically a circle */}
                <SkeletonBlock width="40px" height="40px" circle={true} />
              </td>
              <td style={{ padding: '12px 15px', borderBottom: '1px solid #eee' }}>
                {/* Skeleton for Name - varied width for realism */}
                <SkeletonBlock width={`${Math.random() * (70 - 40) + 40}%`} />
              </td>
              <td style={{ padding: '12px 15px', borderBottom: '1px solid #eee' }}>
                {/* Skeleton for Lastname */}
                <SkeletonBlock width={`${Math.random() * (60 - 30) + 30}%`} />
              </td>
              <td style={{ padding: '12px 15px', borderBottom: '1px solid #eee' }}>
                {/* Skeleton for Country */}
                <SkeletonBlock width={`${Math.random() * (60 - 30) + 30}%`} />
              </td>
              <td style={{ padding: '12px 15px', borderBottom: '1px solid #eee' }}>
                {/* Skeleton for Action button/icon */}
                <SkeletonBlock width="24px" height="24px" />
              </td>
            </tr>
          ))
        ) : users.length === 0 ? (
          <tr>
            <td
              colSpan={numberOfColumns}
              style={{ textAlign: 'center', padding: '40px', color: '#666' }}
            >
              😔 No users available. Please try adjusting your filters or add new users.
            </td>
          </tr>
        ) : (
          users.map((user, index) => {
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
          })
        )}
      </tbody>
    </table>
  );
}
