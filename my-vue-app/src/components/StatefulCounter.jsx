import { useState } from 'react';

function StatefulCounter() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: '20px', backgroundColor: '#111', color: '#fff', margin: '10px', textAlign: 'center'}}>
      <h3>Stateful Counter</h3>
      <p>Лічильник: {count}</p>
      <button onClick={() => setCount(count + 1)} style={{ 
        padding: '10px', 
        backgroundColor: '#333', 
        color: '#fff', 
        border: '1px solid #555' 
      }}>
        +1
      </button>
    </div>
  );
}

export default StatefulCounter;
