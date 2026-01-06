import { Link } from 'react-router-dom';
import { ThemeToggle } from '../components/ThemeToggle';
import { useTheme } from '../contexts/ThemeContext';

export function Home() {
  const { theme, themeStyles } = useTheme();

  const containerStyle = {
    minHeight: '100vh',
    backgroundColor: themeStyles.background,
    color: themeStyles.text,
    padding: '2rem',
    transition: 'all 0.3s'
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem'
  };

  const linkStyle = {
    display: 'inline-block',
    padding: '1rem 2rem',
    backgroundColor: themeStyles.primary,
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '8px',
    transition: 'all 0.3s'
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1>React Level 3</h1>
        <ThemeToggle />
      </div>
      
      <div>
        <h2>Tasks</h2>
        <p style={{ marginBottom: '1rem', opacity: 0.8 }}>
          Navigate to different tasks using the buttons below.
        </p>
        
        <Link to="/level3.2" style={linkStyle}>
          Level 3.2 - Custom Hooks
        </Link>
      </div>
    </div>
  );
}