import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserPage from './UserPage';

jest.mock('../src/hooks/useUsuarios', () => ({
  useUsuarios: () => ({
    usuarios: [
      { id: 1, nombre: 'Juan', pais: 'México' },
      { id: 2, nombre: 'Ana', pais: 'Colombia' },
      { id: 3, nombre: 'Luis', pais: 'Argentina' },
    ],
    setFiltro: jest.fn(),
    reset: jest.fn(),
  }),
}));

describe('UserPage', () => {
  test('filtra usuarios por país al escribir en el input', async () => {
    render(<UserPage />);

    const input = screen.getByPlaceholderText(/buscar país/i);

    await userEvent.type(input, 'México');

    const filas = await screen.findAllByRole('row');
    expect(filas.length).toBe(2); // 1 header + 1 fila de datos
    expect(filas[1]).toHaveTextContent('México');
  });
});
