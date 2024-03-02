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
import EditGigPage from './Screens/Freelancer/Gig/EditGig';
import MessagingPage from './Screens/General/Messaging/MessagingPage';
import ManageOrderClientPage from './Screens/Client/Order/ManageOrder';
import OrderDetailsActivityPage from './Screens/Client/Order/OrderDetailsActivity.js';
import OrderDetailsDeliveryPage from './Screens/Client/Order/OrderDetailsDelivery.js';
import ClientHomepage from './Screens/Client/Personal/ClientHomePage.js';
import FreelancerHomepage from './Screens/Freelancer/Personal/FreelancerHomePage.js';
import FreelancerEditProfilePage from './Screens/Freelancer/Personal/FreelancerEditProfile.js';
import ViewSpecificJobFreelancerPage from './Screens/Freelancer/Jobs/ViewSpecificJobFreelancer.js';
import ViewJobsFreelancerPage from './Screens/Freelancer/Jobs/ViewJobsFreelancerPage.js';
import ViewYourProposalsPage from './Screens/Freelancer/Jobs/ViewYourProposals.js';
import ViewSpecificProposalFreelancerPage from './Screens/Freelancer/Jobs/ViewSpecificProposalFreelancer.js';
import SubmitProposalPage from './Screens/Freelancer/Jobs/SubmitProposal.js';
import AdminDashboardPage from './Screens/Admin/AdminDashboardPage.js';
import AdminAdminsPage from './Screens/Admin/AdminAdminsPage.js';
import AdminCustomerSupportPage from './Screens/Admin/AdminCustomerSupportPage.js';
import AdminReportsPage from './Screens/Admin/AdminReportsPage.js';
import AdminTicketsPage from './Screens/Admin/AdminTicketPage.js';
import AdminUsersPage from './Screens/Admin/AdminUsersPage.js';
import AdminLoginPage from './Screens/Admin/AdminLoginPage.js';


// Wrap your App component with BrowserRouter
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
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
        <Route path="/client/manageOrderClientPage" element={<ManageOrderClientPage />} />
        <Route path="/client/orderDetailsActivityPage" element={<OrderDetailsActivityPage />} />
        <Route path="/client/orderDetailsDeliveryPage/:id" element={<OrderDetailsDeliveryPage />} />
        <Route path="/client/home" element={<ClientHomepage />} />
        <Route path="/freelancer/home" element={<FreelancerHomepage />} />
        <Route path="/freelancer/editGig" element={<EditGigPage />} />
        <Route path="/freelancer/editProfilePage" element={<FreelancerEditProfilePage />} />
        <Route path="/freelancer/viewJobs" element={<ViewJobsFreelancerPage />} />
        <Route path="/freelancer/job/:id" element={<ViewSpecificJobFreelancerPage />} />
        <Route path="/freelancer/viewYourProposals" element={<ViewYourProposalsPage />} />
        <Route path="/freelancer/viewSpecificProposal" element={<ViewSpecificProposalFreelancerPage />} />
        <Route path="/freelancer/submitProposalPage/:id" element={<SubmitProposalPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="/admin/admins" element={<AdminAdminsPage />} />
        <Route path="/admin/customersupport" element={<AdminCustomerSupportPage />} />
        <Route path="/admin/reports" element={<AdminReportsPage />} />
        <Route path="/admin/tickets" element={<AdminTicketsPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/users" element={<AdminUsersPage />} />
        <Route path="/general/messaging" element={<MessagingPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);

reportWebVitals();
