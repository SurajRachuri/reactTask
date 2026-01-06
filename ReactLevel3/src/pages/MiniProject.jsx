import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from '../components/ThemeToggle';
import { useTheme } from '../contexts/ThemeContext';

const priorityColors = {
  high: '#ef4444',
  medium: '#f59e0b',
  low: '#10b981'
};

const statusColors = {
  todo: '#6b7280',
  progress: '#3b82f6',
  done: '#10b981'
};

function KanbanBoard() {
  const { themeStyles } = useTheme();
  const [columns, setColumns] = useState({
    'todo': { 
      id: 'todo', 
      title: '📋 To Do', 
      cards: [
        {
          id: '1',
          title: 'Design Landing Page',
          description: 'Create wireframes and mockups for the new product landing page',
          priority: 'high',
          labels: ['Design', 'Frontend'],
          assignee: 'Sarah Chen',
          dueDate: '2024-01-15',
          createdAt: '2024-01-01T10:00:00Z',
          estimatedHours: 8
        },
        {
          id: '2',
          title: 'Setup Database Schema',
          description: 'Design and implement the database structure for user management',
          priority: 'medium',
          labels: ['Backend', 'Database'],
          assignee: 'Mike Johnson',
          dueDate: '2024-01-20',
          createdAt: '2024-01-02T09:30:00Z',
          estimatedHours: 12
        }
      ]
    },
    'progress': { 
      id: 'progress', 
      title: '⚡ In Progress', 
      cards: [
        {
          id: '3',
          title: 'Implement User Authentication',
          description: 'Add login/signup functionality with JWT tokens',
          priority: 'high',
          labels: ['Backend', 'Security'],
          assignee: 'Alex Rodriguez',
          dueDate: '2024-01-18',
          createdAt: '2024-01-03T14:15:00Z',
          estimatedHours: 16
        }
      ]
    },
    'done': { 
      id: 'done', 
      title: '✅ Done', 
      cards: [
        {
          id: '4',
          title: 'Project Setup & Configuration',
          description: 'Initialize React project with Vite, setup ESLint and Prettier',
          priority: 'medium',
          labels: ['Setup', 'DevOps'],
          assignee: 'Emma Wilson',
          dueDate: '2024-01-10',
          createdAt: '2024-01-01T08:00:00Z',
          estimatedHours: 4,
          completedAt: '2024-01-05T16:30:00Z'
        }
      ]
    }
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState('');
  const [draggedCard, setDraggedCard] = useState(null);
  const [draggedOver, setDraggedOver] = useState(null);
  const [showAddCard, setShowAddCard] = useState(null);
  const [newCard, setNewCard] = useState({
    title: '',
    description: '',
    priority: 'medium',
    assignee: '',
    dueDate: '',
    labels: []
  });

  useEffect(() => {
    const saved = localStorage.getItem('kanban-data');
    if (saved) {
      try {
        setColumns(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load saved data');
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('kanban-data', JSON.stringify(columns));
  }, [columns]);

  const addCard = (columnId) => {
    if (!newCard.title.trim()) return;
    
    const card = {
      id: Date.now().toString(),
      ...newCard,
      labels: newCard.labels.filter(l => l.trim()),
      createdAt: new Date().toISOString()
    };

    setColumns(prev => ({
      ...prev,
      [columnId]: {
        ...prev[columnId],
        cards: [...prev[columnId].cards, card]
      }
    }));

    setNewCard({ title: '', description: '', priority: 'medium', assignee: '', dueDate: '', labels: [] });
    setShowAddCard(null);
  };

  const deleteCard = (columnId, cardId) => {
    if (!confirm('Delete this card?')) return;
    
    setColumns(prev => ({
      ...prev,
      [columnId]: {
        ...prev[columnId],
        cards: prev[columnId].cards.filter(c => c.id !== cardId)
      }
    }));
  };

  const handleDragStart = (e, card, columnId) => {
    setDraggedCard({ card, sourceColumn: columnId });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, columnId) => {
    e.preventDefault();
    setDraggedOver(columnId);
  };

  const handleDrop = (e, targetColumnId) => {
    e.preventDefault();
    if (!draggedCard) return;

    const { card, sourceColumn } = draggedCard;
    
    if (sourceColumn === targetColumnId) {
      setDraggedCard(null);
      setDraggedOver(null);
      return;
    }

    const updatedCard = { ...card };
    if (targetColumnId === 'done' && !card.completedAt) {
      updatedCard.completedAt = new Date().toISOString();
    }

    setColumns(prev => ({
      ...prev,
      [sourceColumn]: {
        ...prev[sourceColumn],
        cards: prev[sourceColumn].cards.filter(c => c.id !== card.id)
      },
      [targetColumnId]: {
        ...prev[targetColumnId],
        cards: [...prev[targetColumnId].cards, updatedCard]
      }
    }));

    setDraggedCard(null);
    setDraggedOver(null);
  };

  const filteredColumns = Object.entries(columns).reduce((acc, [key, column]) => {
    acc[key] = {
      ...column,
      cards: column.cards.filter(card => {
        const matchesSearch = card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            card.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            card.assignee.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesPriority = !filterPriority || card.priority === filterPriority;
        return matchesSearch && matchesPriority;
      })
    };
    return acc;
  }, {});

  const getDaysUntilDue = (dueDate) => {
    if (!dueDate) return null;
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const columnStyle = {
    backgroundColor: themeStyles.cardBackground,
    border: `2px solid ${themeStyles.border}`,
    borderRadius: '12px',
    padding: '1.5rem',
    minHeight: '600px',
    width: '350px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
  };

  const cardStyle = {
    backgroundColor: themeStyles.background,
    border: `1px solid ${themeStyles.border}`,
    borderRadius: '8px',
    padding: '1rem',
    marginBottom: '1rem',
    cursor: 'grab',
    transition: 'all 0.2s',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: themeStyles.background,
      color: themeStyles.text,
      padding: '2rem',
      transition: 'all 0.3s'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <Link to="/level3.5" style={{ color: themeStyles.primary, textDecoration: 'none' }}>← Back to Level 3.5</Link>
          <h1 style={{ margin: '0.5rem 0', fontSize: '2.5rem', fontWeight: '700' }}>🚀 Project Kanban Board</h1>
          <p style={{ opacity: 0.8, margin: 0 }}>Manage your development workflow efficiently</p>
        </div>
        <ThemeToggle />
      </div>

      <div style={{ 
        display: 'flex', 
        gap: '1rem', 
        marginBottom: '2rem', 
        flexWrap: 'wrap',
        alignItems: 'center',
        padding: '1rem',
        backgroundColor: themeStyles.cardBackground,
        borderRadius: '8px',
        border: `1px solid ${themeStyles.border}`
      }}>
        <input
          type="text"
          placeholder="🔍 Search cards, assignees, descriptions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '0.75rem 1rem',
            border: `1px solid ${themeStyles.border}`,
            borderRadius: '6px',
            backgroundColor: themeStyles.inputBackground,
            color: themeStyles.text,
            fontSize: '14px',
            width: '300px',
            outline: 'none'
          }}
        />
        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
          style={{
            padding: '0.75rem',
            border: `1px solid ${themeStyles.border}`,
            borderRadius: '6px',
            backgroundColor: themeStyles.inputBackground,
            color: themeStyles.text,
            fontSize: '14px',
            outline: 'none'
          }}
        >
          <option value="">All Priorities</option>
          <option value="high">🔴 High Priority</option>
          <option value="medium">🟡 Medium Priority</option>
          <option value="low">🟢 Low Priority</option>
        </select>
        <div style={{ marginLeft: 'auto', fontSize: '14px', opacity: 0.8 }}>
          Total Cards: {Object.values(columns).reduce((sum, col) => sum + col.cards.length, 0)}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '2rem', overflowX: 'auto', paddingBottom: '2rem' }}>
        {Object.entries(filteredColumns).map(([columnId, column]) => (
          <div
            key={columnId}
            style={{
              ...columnStyle,
              borderColor: draggedOver === columnId ? themeStyles.primary : themeStyles.border,
              backgroundColor: draggedOver === columnId ? themeStyles.primary + '10' : themeStyles.cardBackground
            }}
            onDragOver={(e) => handleDragOver(e, columnId)}
            onDrop={(e) => handleDrop(e, columnId)}
            onDragLeave={() => setDraggedOver(null)}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.3rem', fontWeight: '600' }}>
                {column.title}
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{
                  backgroundColor: statusColors[columnId],
                  color: '#fff',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: '500'
                }}>
                  {column.cards.length}
                </span>
                <button
                  onClick={() => setShowAddCard(columnId)}
                  style={{
                    backgroundColor: themeStyles.primary,
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '0.5rem',
                    cursor: 'pointer',
                    fontSize: '16px',
                    lineHeight: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  +
                </button>
              </div>
            </div>

            {showAddCard === columnId && (
              <div style={{
                backgroundColor: themeStyles.background,
                border: `2px dashed ${themeStyles.primary}`,
                borderRadius: '8px',
                padding: '1rem',
                marginBottom: '1rem'
              }}>
                <input
                  type="text"
                  placeholder="Card title"
                  value={newCard.title}
                  onChange={(e) => setNewCard(prev => ({ ...prev, title: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: `1px solid ${themeStyles.border}`,
                    borderRadius: '4px',
                    backgroundColor: themeStyles.inputBackground,
                    color: themeStyles.text,
                    marginBottom: '0.5rem',
                    outline: 'none'
                  }}
                />
                <textarea
                  placeholder="Description"
                  value={newCard.description}
                  onChange={(e) => setNewCard(prev => ({ ...prev, description: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: `1px solid ${themeStyles.border}`,
                    borderRadius: '4px',
                    backgroundColor: themeStyles.inputBackground,
                    color: themeStyles.text,
                    marginBottom: '0.5rem',
                    minHeight: '60px',
                    resize: 'vertical',
                    outline: 'none'
                  }}
                />
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <select
                    value={newCard.priority}
                    onChange={(e) => setNewCard(prev => ({ ...prev, priority: e.target.value }))}
                    style={{
                      flex: 1,
                      padding: '0.5rem',
                      border: `1px solid ${themeStyles.border}`,
                      borderRadius: '4px',
                      backgroundColor: themeStyles.inputBackground,
                      color: themeStyles.text,
                      outline: 'none'
                    }}
                  >
                    <option value="low">🟢 Low</option>
                    <option value="medium">🟡 Medium</option>
                    <option value="high">🔴 High</option>
                  </select>
                  <input
                    type="date"
                    value={newCard.dueDate}
                    onChange={(e) => setNewCard(prev => ({ ...prev, dueDate: e.target.value }))}
                    style={{
                      flex: 1,
                      padding: '0.5rem',
                      border: `1px solid ${themeStyles.border}`,
                      borderRadius: '4px',
                      backgroundColor: themeStyles.inputBackground,
                      color: themeStyles.text,
                      outline: 'none'
                    }}
                  />
                </div>
                <input
                  type="text"
                  placeholder="Assignee"
                  value={newCard.assignee}
                  onChange={(e) => setNewCard(prev => ({ ...prev, assignee: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: `1px solid ${themeStyles.border}`,
                    borderRadius: '4px',
                    backgroundColor: themeStyles.inputBackground,
                    color: themeStyles.text,
                    marginBottom: '0.5rem',
                    outline: 'none'
                  }}
                />
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => addCard(columnId)}
                    style={{
                      backgroundColor: themeStyles.primary,
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px',
                      padding: '0.5rem 1rem',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    Add Card
                  </button>
                  <button
                    onClick={() => setShowAddCard(null)}
                    style={{
                      backgroundColor: themeStyles.border,
                      color: themeStyles.text,
                      border: 'none',
                      borderRadius: '4px',
                      padding: '0.5rem 1rem',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {column.cards.map(card => {
              const daysUntilDue = getDaysUntilDue(card.dueDate);
              const isOverdue = daysUntilDue !== null && daysUntilDue < 0;
              const isDueSoon = daysUntilDue !== null && daysUntilDue <= 3 && daysUntilDue >= 0;

              return (
                <div
                  key={card.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, card, columnId)}
                  style={{
                    ...cardStyle,
                    opacity: draggedCard?.card.id === card.id ? 0.5 : 1,
                    borderLeft: `4px solid ${priorityColors[card.priority]}`
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.15)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                    <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: '600', lineHeight: '1.3' }}>
                      {card.title}
                    </h4>
                    <div style={{
                      backgroundColor: priorityColors[card.priority],
                      color: '#fff',
                      padding: '0.2rem 0.4rem',
                      borderRadius: '4px',
                      fontSize: '10px',
                      fontWeight: '600',
                      textTransform: 'uppercase'
                    }}>
                      {card.priority}
                    </div>
                  </div>

                  {card.description && (
                    <p style={{ margin: '0 0 0.75rem 0', fontSize: '13px', opacity: 0.8, lineHeight: '1.4' }}>
                      {card.description}
                    </p>
                  )}

                  {card.labels.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', marginBottom: '0.75rem' }}>
                      {card.labels.map((label, index) => (
                        <span
                          key={index}
                          style={{
                            backgroundColor: themeStyles.primary + '20',
                            color: themeStyles.primary,
                            padding: '0.2rem 0.4rem',
                            borderRadius: '12px',
                            fontSize: '11px',
                            fontWeight: '500'
                          }}
                        >
                          {label}
                        </span>
                      ))}
                    </div>
                  )}

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', opacity: 0.7 }}>
                    <div>
                      👤 {card.assignee || 'Unassigned'}
                    </div>
                    {card.dueDate && (
                      <div style={{
                        color: isOverdue ? '#ef4444' : isDueSoon ? '#f59e0b' : 'inherit',
                        fontWeight: isOverdue || isDueSoon ? '600' : 'normal'
                      }}>
                        📅 {new Date(card.dueDate).toLocaleDateString()}
                        {isOverdue && ' (Overdue)'}
                        {isDueSoon && !isOverdue && ` (${daysUntilDue}d left)`}
                      </div>
                    )}
                  </div>

                  {card.estimatedHours && (
                    <div style={{ fontSize: '12px', opacity: 0.7, marginTop: '0.5rem' }}>
                      ⏱️ {card.estimatedHours}h estimated
                    </div>
                  )}

                  {card.completedAt && (
                    <div style={{ fontSize: '12px', opacity: 0.7, marginTop: '0.5rem', color: '#10b981' }}>
                      ✅ Completed: {new Date(card.completedAt).toLocaleDateString()}
                    </div>
                  )}

                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.75rem', gap: '0.5rem' }}>
                    <button
                      onClick={() => deleteCard(columnId, card.id)}
                      style={{
                        backgroundColor: '#ef4444',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '0.25rem 0.5rem',
                        cursor: 'pointer',
                        fontSize: '11px',
                        opacity: 0.8
                      }}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div style={{ 
        marginTop: '2rem', 
        padding: '1.5rem', 
        backgroundColor: themeStyles.cardBackground, 
        borderRadius: '12px',
        border: `1px solid ${themeStyles.border}`
      }}>
        <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.2rem' }}>📊 Project Statistics</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: statusColors.todo }}>  
              {columns.todo.cards.length}
            </div>
            <div style={{ fontSize: '14px', opacity: 0.8 }}>Tasks To Do</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: statusColors.progress }}>
              {columns.progress.cards.length}
            </div>
            <div style={{ fontSize: '14px', opacity: 0.8 }}>In Progress</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: statusColors.done }}>
              {columns.done.cards.length}
            </div>
            <div style={{ fontSize: '14px', opacity: 0.8 }}>Completed</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: priorityColors.high }}>
              {Object.values(columns).reduce((sum, col) => 
                sum + col.cards.filter(card => card.priority === 'high').length, 0
              )}
            </div>
            <div style={{ fontSize: '14px', opacity: 0.8 }}>High Priority</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function MiniProject() {
  return <KanbanBoard />;
}