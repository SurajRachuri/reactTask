export function Card({ title, content }) {
  const cardStyle = {
    borderRadius: "12px",
    padding: "16px",
    width: "400px",
    backgroundColor: "#ffffff",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
    border: "1px solid #eaeaea",
    margin: "16px auto",
  };

  return (
    <div style={cardStyle}>
      <h3>{title} prop1</h3>
      <p>{content} <b>Prop2</b></p>
    </div>
  );
}