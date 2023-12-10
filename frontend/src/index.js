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
import ViewSpecificJobPage from './Screens/Client/Job/ViewSpecificJob';
import ViewJobProposalsPage from './Screens/Client/Job/ViewJobProposals';
import ViewSpecificProposalPage from './Screens/Client/Job/ViewSpecificProposal';
import CreateGigPage from './Screens/Freelancer/Gig/CreateGig';
import CreateGigPackagesPage from './Screens/Freelancer/Gig/CreateGigPackages';
import CreateShowcasePage from './Screens/Freelancer/Gig/CreateShowcasePage';
import CreateGigOverviewPage from './Screens/Freelancer/Gig/CreateGigOverviewPage';
import ViewGigsPage from './Screens/Client/Gig/ViewGigsPage';
import ViewSpecificGigPage from './Screens/Client/Gig/ViewSpecificGigPage';


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
        <Route path="/job/:id" element={<ViewSpecificJobPage />} />
        <Route path="/job/:id/proposals" element={<ViewJobProposalsPage />} />
        <Route path="/job/:id/proposal/:pid" element={<ViewSpecificProposalPage />} />
        <Route path="/freelancer/postgig" element={<CreateGigPage />} />
        <Route path="/freelancer/createGigPackages" element={<CreateGigPackagesPage />} />
        <Route path="/freelancer/createShowcase" element={<CreateShowcasePage />} />
        <Route path="/freelancer/createGigOverviewPage" element={<CreateGigOverviewPage />} />
        <Route path="/client/viewGigs" element={<ViewGigsPage />} />
        <Route path="/client/viewSpecificGig" element={<ViewSpecificGigPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);

reportWebVitals();
