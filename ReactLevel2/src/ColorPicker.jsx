import { useState } from 'react';

export function ColorPicker() {
  const [bgColor, setBgColor] = useState('white');

  return (
    <div
      style={{
        backgroundColor: bgColor,
        padding: '20px',
        border: '2px solid black',
        height: '300px',
        width: '400px',
      }}
    >
      <button onClick={() => setBgColor('red')}>Red</button>
      <button onClick={() => setBgColor('blue')}>Blue</button>
      <button onClick={() => setBgColor('green')}>Green</button>
      <button onClick={() => setBgColor('yellow')}>Yellow</button>
      <button onClick={() => setBgColor('purple')}>Purple</button>
    </div>
  );
}
