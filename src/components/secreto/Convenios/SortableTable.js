import React, { useState } from 'react';
import classNames from 'classnames';

const SortableTable = ({ data, columns }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const handleSort = (key) => {
    const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });
  };

  const sortedData = [...data].sort((a, b) => {
    if (sortConfig.key) {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
  
      if (typeof aValue === 'string') {
        const comparison = aValue.localeCompare(bValue, undefined, { numeric: true, sensitivity: 'base' });
        return sortConfig.direction === 'asc' ? comparison : -comparison;
      } else {
        // If not a string, compare directly
        const comparison = aValue - bValue;
        return sortConfig.direction === 'asc' ? comparison : -comparison;
      }
    }
    return 0;
  });



  return (
    <table className="min-w-full divide-y divide-gris-600">
      <thead className="bg-gray-50">
        <tr>
          {columns.map((column) => (
            <th
  key={column.key}
  onClick={() => handleSort(column.key)}
  className={classNames(
    'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer min-w-[100px] flex-shrink-0',
    {
      'hover:text-gray-700': column.sortable,
      'cursor-not-allowed': !column.sortable,
      'text-gray-700': sortConfig.key === column.key,
    }
  )}
>
  {column.title}
  {column.sortable && (
    <span className="ml-1">
      {sortConfig.key === column.key && (
        <svg
          className={classNames(
            'h-4 w-4 inline',
            'text-gray-500 transform transition-transform',
            {
              'rotate-180': sortConfig.direction === 'desc',
            }
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      )}
    </span>
  )}
</th>

          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row, index) => (
          <tr key={index}>
            {columns.map((column) => (
              <td key={column.key} className="px-6 py-4 whitespace-nowrap">
                {row[column.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SortableTable;
