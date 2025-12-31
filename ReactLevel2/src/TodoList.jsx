import { useState } from "react";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input.trim()) {
      console.log("Adding todo:", input);
      setTodos([...todos, input.trim()]);
      setInput('');
    }
  };

  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px" }}>
      <div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a todo..."
          style={{ padding: "8px", marginRight: "8px" }}
        />
        <button onClick={addTodo}>Add</button>
      </div>
      
      <p>Total: {todos.length}</p>
      
      <ul>
        {todos.map((todo, index) => (
          <li key={index} style={{ margin: "8px 0" }}>
            {todo}
            <button onClick={() => deleteTodo(index)} style={{ marginLeft: "8px" }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;