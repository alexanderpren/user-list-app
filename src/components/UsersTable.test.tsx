import { UsersTable } from './UsersTable';
import { render } from '@testing-library/react';

describe('UsersTable', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <UsersTable
        changeSorting={() => {}}
        deleteUser={() => {}}
        users={[]}
        showColors={false}
        isLoading={false}
      />,
    );
    expect(container).toBeInTheDocument();
  });
});
