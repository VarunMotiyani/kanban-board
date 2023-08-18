import React from 'react';
import './App.css'; // Import your global styles
import Board from './components/Board'; // Import your Board component
import './styles/styles.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* You can keep or modify the header content */}
      </header>
      <main>
        <Board /> {/* Render your Board component here */}
      </main>
    </div>
  );
}

export default App;
