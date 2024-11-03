import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css'; 

if (module.hot) {
  module.hot.accept();
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);
