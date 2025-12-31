import { useState } from "react";

function TextInput() {
  const [text, setText] = useState("");

  return (
    <div style={{ padding: "20px", maxWidth: "800px" }}>
      <input
        type="text"
        value={text}
        onChange={(c) => setText(c.target.value)}
        placeholder="Type something..."
        style={{ width: "100%", padding: "8px" }}
      />

      {/* Display text */}
      <p><strong>Current Text:</strong> {text}</p>

      {/* Character count */}
      <p><strong>Character Count:</strong> {text.length}</p>

      {/* Clear button */}
      <button onClick={() => setText("")}>
        Clear
      </button>
    </div>
  );
}

export default TextInput;
