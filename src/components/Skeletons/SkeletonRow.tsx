import React from 'react';
import SkeletonBlock from './SkeletonBlock'; // Importa el nuevo componente
interface Props {
  columns: number;
}
const SkeletonRow = ({ columns }: Props) => (
  <tr>
    {Array.from({ length: columns }).map((_, colIndex) => (
      <td key={colIndex} style={{ padding: '12px 15px', borderBottom: '1px solid #ddd' }}>
        {/* Usa SkeletonBlock para cada celda */}
        <SkeletonBlock width={`${Math.random() * (90 - 50) + 50}%`} height="20px" />
      </td>
    ))}
  </tr>
);

export default SkeletonRow;
