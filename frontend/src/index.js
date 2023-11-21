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
import LoginPage from './Screens/Auth/LoginPage';
import PostJobPage from './Screens/Client/Job/PostJob';
import ViewYourJobPage from './Screens/Client/Job/ViewYourJobs';


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
        <Route path="/client/postjob" element={<PostJobPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/client/viewyourjobs" element={<ViewYourJobPage />} />

      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);

reportWebVitals();
