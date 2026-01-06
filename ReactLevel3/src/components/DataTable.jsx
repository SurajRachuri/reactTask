import { useState, useMemo } from 'react';
import { useTheme } from '../contexts/ThemeContext';

function DataTable({ data, columns, pageSize = 10 }) {
  const { theme, themeStyles } = useTheme();
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [expandedRows, setExpandedRows] = useState(new Set());

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data;
    return [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  const filteredData = useMemo(() => {
    return sortedData.filter(row => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        return String(row[key]).toLowerCase().includes(value.toLowerCase());
      });
    });
  }, [sortedData, filters]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredData.slice(startIndex, startIndex + pageSize);
  }, [filteredData, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredData.length / pageSize);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const toggleRowSelection = (id) => {
    setSelectedRows(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const toggleSelectAll = () => {
    if (selectedRows.size === paginatedData.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(paginatedData.map(row => row.id)));
    }
  };

  const exportToCSV = () => {
    const csvContent = [
      columns.map(col => col.header).join(','),
      ...filteredData.map(row => 
        columns.map(col => `"${row[col.key]}"`).join(',')
      )
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: theme === 'light' ? '#fff' : '#2d2d44',
    border: `1px solid ${theme === 'light' ? '#dee2e6' : '#495057'}`
  };

  const thStyle = {
    padding: '0.75rem',
    backgroundColor: theme === 'light' ? '#f8f9fa' : '#1a1a2e',
    border: `1px solid ${theme === 'light' ? '#dee2e6' : '#495057'}`,
    cursor: 'pointer',
    userSelect: 'none'
  };

  const tdStyle = {
    padding: '0.75rem',
    border: `1px solid ${theme === 'light' ? '#dee2e6' : '#495057'}`
  };

  const inputStyle = {
    width: '100%',
    padding: '0.25rem',
    border: `1px solid ${theme === 'light' ? '#ccc' : '#555'}`,
    backgroundColor: theme === 'light' ? '#fff' : '#333',
    color: themeStyles.text,
    fontSize: '12px'
  };

  const buttonStyle = {
    padding: '0.5rem 1rem',
    backgroundColor: themeStyles.primary,
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    margin: '0.25rem',
    fontSize: '14px'
  };

  return (
    <div>
      <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <button onClick={exportToCSV} style={buttonStyle}>
          Export CSV
        </button>
        {selectedRows.size > 0 && (
          <span>Selected: {selectedRows.size} rows</span>
        )}
      </div>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>
              <input
                type="checkbox"
                checked={selectedRows.size === paginatedData.length && paginatedData.length > 0}
                onChange={toggleSelectAll}
              />
            </th>
            {columns.map(column => (
              <th key={column.key} style={thStyle}>
                <div onClick={() => handleSort(column.key)}>
                  {column.header}
                  {sortConfig.key === column.key && (
                    <span style={{ marginLeft: '0.5rem' }}>
                      {sortConfig.direction === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
                <input
                  type="text"
                  placeholder={`Filter ${column.header}`}
                  value={filters[column.key] || ''}
                  onChange={(e) => handleFilter(column.key, e.target.value)}
                  style={inputStyle}
                  onClick={(e) => e.stopPropagation()}
                />
              </th>
            ))}
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map(row => (
            <>
              <tr key={row.id} style={{ backgroundColor: selectedRows.has(row.id) ? (theme === 'light' ? '#e3f2fd' : '#1e3a5f') : 'transparent' }}>
                <td style={tdStyle}>
                  <input
                    type="checkbox"
                    checked={selectedRows.has(row.id)}
                    onChange={() => toggleRowSelection(row.id)}
                  />
                </td>
                {columns.map(column => (
                  <td key={column.key} style={tdStyle}>
                    {row[column.key]}
                  </td>
                ))}
                <td style={tdStyle}>
                  <button
                    onClick={() => setExpandedRows(prev => {
                      const newSet = new Set(prev);
                      if (newSet.has(row.id)) {
                        newSet.delete(row.id);
                      } else {
                        newSet.add(row.id);
                      }
                      return newSet;
                    })}
                    style={{ ...buttonStyle, padding: '0.25rem 0.5rem', fontSize: '12px' }}
                  >
                    {expandedRows.has(row.id) ? '−' : '+'}
                  </button>
                </td>
              </tr>
              {expandedRows.has(row.id) && (
                <tr>
                  <td colSpan={columns.length + 2} style={{ ...tdStyle, backgroundColor: theme === 'light' ? '#f8f9fa' : '#1a1a2e' }}>
                    <div style={{ padding: '1rem' }}>
                      <strong>Details for {row.name || row.id}:</strong>
                      <pre style={{ marginTop: '0.5rem', fontSize: '12px' }}>
                        {JSON.stringify(row, null, 2)}
                      </pre>
                    </div>
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, filteredData.length)} of {filteredData.length} entries
        </div>
        <div>
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            style={{ ...buttonStyle, opacity: currentPage === 1 ? 0.5 : 1 }}
          >
            Previous
          </button>
          <span style={{ margin: '0 1rem' }}>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            style={{ ...buttonStyle, opacity: currentPage === totalPages ? 0.5 : 1 }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export { DataTable };