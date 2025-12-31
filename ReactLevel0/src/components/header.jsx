import { useNavigate } from "react-router-dom";

export function Header() {
  const navigate = useNavigate();

  return (
    <header className="header">
      <h1>Suraj</h1>
      <p>React Developer</p>
      <button onClick={() => navigate("/mini-project")}>
        View Mini Project
      </button>
    </header>
  );
}
