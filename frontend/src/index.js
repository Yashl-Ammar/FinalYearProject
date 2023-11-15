// Import necessary components and modules
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import JoinAsPage from './Screens/Auth/JoinAsPage';
import { Routes } from 'react-router-dom';
import CreateClientAccountPage from './Screens/Auth/CreateClientAccountPage';
import CreateFreelancerAccountPage from './Screens/Auth/CreateFreelancerAccountPage';

// Wrap your App component with BrowserRouter
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/joinas" element={<JoinAsPage />} />
        <Route path="/createclientaccount" element={<CreateClientAccountPage />} />
        <Route path="/createfreelanceraccount" element={<CreateFreelancerAccountPage />} />

      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);

reportWebVitals();
