import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from '../components/ThemeToggle';
import { useTheme } from '../contexts/ThemeContext';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useDebounce } from '../hooks/useDebounce';
import { useFetch } from '../hooks/useFetch';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { useOnClickOutside } from '../hooks/useOnClickOutside';
import { usePrevious } from '../hooks/usePrevious';

export function Level3_2() {
  const { theme, themeStyles } = useTheme();
  const [name, setName] = useLocalStorage('userName', '');
  const [searchTerm, setSearchTerm] = useState('');
  const [count, setCount] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  
  const debouncedSearch = useDebounce(searchTerm, 300);
  const { data, loading, error } = useFetch('https://jsonplaceholder.typicode.com/posts/1');
  const isMobile = useMediaQuery('(max-width: 768px)');
  const previousCount = usePrevious(count);
  const dropdownRef = useRef();

  useOnClickOutside(dropdownRef, () => setShowDropdown(false));

  const containerStyle = {
    minHeight: '100vh',
    backgroundColor: themeStyles.background,
    color: themeStyles.text,
    padding: '2rem',
    transition: 'all 0.3s',
    maxWidth: '1000px',
    margin: '0 auto'
  };

  const cardStyle = {
    padding: '1.5rem',
    backgroundColor: theme === 'light' ? '#f8f9fa' : '#2d2d44',
    borderRadius: '12px',
    marginBottom: '1.5rem',
    border: `1px solid ${theme === 'light' ? '#e9ecef' : '#495057'}`,
    boxShadow: theme === 'light' ? '0 2px 4px rgba(0,0,0,0.1)' : '0 2px 4px rgba(0,0,0,0.3)'
  };

  const inputStyle = {
    padding: '0.75rem',
    borderRadius: '6px',
    border: `2px solid ${theme === 'light' ? '#dee2e6' : '#495057'}`,
    backgroundColor: theme === 'light' ? '#fff' : '#333',
    color: themeStyles.text,
    width: '250px',
    fontSize: '14px',
    transition: 'border-color 0.2s'
  };

  const buttonStyle = {
    padding: '0.75rem 1.5rem',
    backgroundColor: themeStyles.primary,
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    margin: '0.25rem',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.2s'
  };

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <Link to="/" style={{ color: themeStyles.primary, textDecoration: 'none' }}>← Back</Link>
          <h1 style={{ margin: '0.5rem 0' }}>Custom Hooks Demo</h1>
        </div>
        <ThemeToggle />
      </div>

      <div style={cardStyle}>
        <h3>useLocalStorage</h3>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
          style={inputStyle}
        />
        <p>Stored: {name}</p>
      </div>

      <div style={cardStyle}>
        <h3>useDebounce</h3>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Type to search"
          style={inputStyle}
        />
        <p>Debounced: {debouncedSearch}</p>
      </div>

      <div style={cardStyle}>
        <h3>useFetch</h3>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {data && <p>Title: {data.title?.substring(0, 50)}...</p>}
      </div>

      <div style={cardStyle}>
        <h3>useMediaQuery</h3>
        <p>Device: {isMobile ? 'Mobile' : 'Desktop'}</p>
      </div>

      <div style={cardStyle}>
        <h3>useOnClickOutside</h3>
        <div ref={dropdownRef} style={{ position: 'relative', display: 'inline-block' }}>
          <button onClick={() => setShowDropdown(!showDropdown)} style={buttonStyle}>
            Toggle
          </button>
          {showDropdown && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              backgroundColor: theme === 'light' ? '#fff' : '#333',
              border: '1px solid #ccc',
              borderRadius: '4px',
              padding: '1rem',
              zIndex: 1000,
              whiteSpace: 'nowrap'
            }}>
              Click outside to close
            </div>
          )}
        </div>
      </div>

      <div style={cardStyle}>
        <h3>usePrevious</h3>
        <button onClick={() => setCount(count + 1)} style={buttonStyle}>
          Count: {count}
        </button>
        <p>Previous: {previousCount ?? 'none'}</p>
      </div>

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <Link 
          to="/level3.3" 
          style={{
            ...buttonStyle,
            backgroundColor: themeStyles.secondary,
            textDecoration: 'none',
            display: 'inline-block'
          }}
        >
          Level 3.3 - Accordion →
        </Link>
      </div>
    </div>
  );
}