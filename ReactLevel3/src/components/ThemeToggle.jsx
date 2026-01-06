import { useTheme } from '../contexts/ThemeContext';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  const buttonStyle = {
    padding: '8px 12px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: theme === 'light' ? '#f0f0f0' : '#333',
    color: theme === 'light' ? '#000' : '#fff',
    cursor: 'pointer',
    fontSize: '18px',
    transition: 'all 0.3s'
  };

  return (
    <button
      onClick={toggleTheme}
      style={buttonStyle}
      aria-label="Toggle theme"
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}