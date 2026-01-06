import { Link } from 'react-router-dom';
import { ThemeToggle } from '../components/ThemeToggle';
import { DataTable } from '../components/DataTable';
import { useTheme } from '../contexts/ThemeContext';

export function Level3_4() {
  const { themeStyles } = useTheme();

  const containerStyle = {
    minHeight: '100vh',
    backgroundColor: themeStyles.background,
    color: themeStyles.text,
    padding: '2rem',
    transition: 'all 0.3s',
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const sampleData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', age: 30, department: 'Engineering', salary: 75000 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 28, department: 'Design', salary: 68000 },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', age: 35, department: 'Marketing', salary: 62000 },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', age: 32, department: 'Engineering', salary: 80000 },
    { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', age: 29, department: 'Sales', salary: 55000 },
    { id: 6, name: 'Diana Davis', email: 'diana@example.com', age: 31, department: 'HR', salary: 58000 },
    { id: 7, name: 'Eve Miller', email: 'eve@example.com', age: 27, department: 'Design', salary: 65000 },
    { id: 8, name: 'Frank Garcia', email: 'frank@example.com', age: 33, department: 'Engineering', salary: 78000 },
    { id: 9, name: 'Grace Lee', email: 'grace@example.com', age: 26, department: 'Marketing', salary: 60000 },
    { id: 10, name: 'Henry Taylor', email: 'henry@example.com', age: 34, department: 'Sales', salary: 57000 },
    { id: 11, name: 'Ivy Anderson', email: 'ivy@example.com', age: 30, department: 'HR', salary: 59000 },
    { id: 12, name: 'Jack Thomas', email: 'jack@example.com', age: 28, department: 'Engineering', salary: 76000 }
  ];

  const columns = [
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' },
    { key: 'age', header: 'Age' },
    { key: 'department', header: 'Department' },
    { key: 'salary', header: 'Salary' }
  ];

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <Link to="/" style={{ color: themeStyles.primary, textDecoration: 'none' }}>← Back</Link>
          <h1 style={{ margin: '0.5rem 0' }}>DataTable Demo</h1>
        </div>
        <ThemeToggle />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <p style={{ opacity: 0.8 }}>
          Features: Sorting, Filtering, Pagination, Row Selection, Expandable Rows, CSV Export
        </p>
      </div>

      <DataTable 
        data={sampleData} 
        columns={columns} 
        pageSize={5} 
      />

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <Link 
          to="/level3.5" 
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: themeStyles.secondary,
            color: '#fff',
            textDecoration: 'none',
            borderRadius: '6px',
            display: 'inline-block',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          Level 3.5 - Form Builder →
        </Link>
      </div>
    </div>
  );
}