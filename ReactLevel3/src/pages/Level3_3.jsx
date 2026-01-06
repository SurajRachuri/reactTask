import { Link } from 'react-router-dom';
import { ThemeToggle } from '../components/ThemeToggle';
import { Accordion } from '../components/Accordion';
import { useTheme } from '../contexts/ThemeContext';

export function Level3_3() {
  const { themeStyles } = useTheme();

  const containerStyle = {
    minHeight: '100vh',
    backgroundColor: themeStyles.background,
    color: themeStyles.text,
    padding: '2rem',
    transition: 'all 0.3s',
    maxWidth: '800px',
    margin: '0 auto'
  };

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <Link to="/" style={{ color: themeStyles.primary, textDecoration: 'none' }}>← Back</Link>
          <h1 style={{ margin: '0.5rem 0' }}>Accordion Demo</h1>
        </div>
        <ThemeToggle />
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2>Single Open (Default)</h2>
        <Accordion>
          <Accordion.Item id="item1">
            <Accordion.Header>What is React?</Accordion.Header>
            <Accordion.Panel>
              React is a JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called "components".
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item id="item2">
            <Accordion.Header>What are Hooks?</Accordion.Header>
            <Accordion.Panel>
              Hooks are functions that let you "hook into" React state and lifecycle features from function components. They let you use state and other React features without writing a class.
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item id="item3">
            <Accordion.Header>What is JSX?</Accordion.Header>
            <Accordion.Panel>
              JSX is a syntax extension to JavaScript. It produces React "elements" and allows you to write HTML-like syntax in your JavaScript code.
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </div>

      <div>
        <h2>Multiple Open Allowed</h2>
        <Accordion allowMultiple={true}>
          <Accordion.Item id="multi1">
            <Accordion.Header>Frontend Technologies</Accordion.Header>
            <Accordion.Panel>
              HTML, CSS, JavaScript, React, Vue, Angular, TypeScript, and many more tools and frameworks for building user interfaces.
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item id="multi2">
            <Accordion.Header>Backend Technologies</Accordion.Header>
            <Accordion.Panel>
              Node.js, Python, Java, C#, PHP, databases like MongoDB, PostgreSQL, MySQL, and cloud services like AWS, Azure, GCP.
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item id="multi3">
            <Accordion.Header>Development Tools</Accordion.Header>
            <Accordion.Panel>
              VS Code, Git, npm/yarn, Webpack, Vite, Docker, testing frameworks like Jest, Cypress, and many other productivity tools.
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </div>

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <Link 
          to="/level3.4" 
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
          Level 3.4 - DataTable →
        </Link>
      </div>
    </div>
  );
}