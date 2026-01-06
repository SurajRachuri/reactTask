import { createContext, useContext, useState, useRef, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const AccordionContext = createContext();
const AccordionItemContext = createContext();

function Accordion({ children, allowMultiple = false }) {
  const [openItems, setOpenItems] = useState(new Set());

  const toggleItem = (id) => {
    setOpenItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        if (!allowMultiple) {
          newSet.clear();
        }
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem, allowMultiple }}>
      <div role="tablist">
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

function AccordionItem({ children, id }) {
  const { openItems } = useContext(AccordionContext);
  const isOpen = openItems.has(id);

  return (
    <AccordionItemContext.Provider value={{ id, isOpen }}>
      <div>
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
}

function AccordionHeader({ children }) {
  const { theme, themeStyles } = useTheme();
  const { toggleItem } = useContext(AccordionContext);
  const { id, isOpen } = useContext(AccordionItemContext);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleItem(id);
    }
  };

  const headerStyle = {
    padding: '1rem',
    backgroundColor: theme === 'light' ? '#f8f9fa' : '#2d2d44',
    border: `1px solid ${theme === 'light' ? '#dee2e6' : '#495057'}`,
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    transition: 'background-color 0.2s'
  };

  return (
    <button
      role="tab"
      aria-expanded={isOpen}
      aria-controls={`panel-${id}`}
      id={`header-${id}`}
      onClick={() => toggleItem(id)}
      onKeyDown={handleKeyDown}
      style={headerStyle}
    >
      <span>{children}</span>
      <span style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
        ▼
      </span>
    </button>
  );
}

function AccordionPanel({ children }) {
  const { theme } = useTheme();
  const { id, isOpen } = useContext(AccordionItemContext);
  const panelRef = useRef();
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (panelRef.current) {
      setHeight(isOpen ? panelRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  const panelStyle = {
    height: `${height}px`,
    overflow: 'hidden',
    transition: 'height 0.3s ease',
    backgroundColor: theme === 'light' ? '#fff' : '#1a1a2e',
    border: `1px solid ${theme === 'light' ? '#dee2e6' : '#495057'}`,
    borderTop: 'none'
  };

  const contentStyle = {
    padding: isOpen ? '1rem' : '0 1rem'
  };

  return (
    <div
      role="tabpanel"
      id={`panel-${id}`}
      aria-labelledby={`header-${id}`}
      style={panelStyle}
    >
      <div ref={panelRef} style={contentStyle}>
        {children}
      </div>
    </div>
  );
}

Accordion.Item = AccordionItem;
Accordion.Header = AccordionHeader;
Accordion.Panel = AccordionPanel;

export { Accordion };