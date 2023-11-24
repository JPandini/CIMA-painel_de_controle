import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { PresidenteProvider } from './context/PresidenteContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <PresidenteProvider>
        <App />
    </PresidenteProvider>
);

