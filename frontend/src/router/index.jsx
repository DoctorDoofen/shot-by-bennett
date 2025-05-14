import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import LandingPage from '../components/LandingPage';
import AdminDashboard from '../components/AdminDashboard';  // Import your Admin Dashboard component
import BookingForm from '../components/Booking';
import UserDashboard from '../components/UserDashboard'; // Import your User Dashboard component

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "admin/dashboard",
        element: <AdminDashboard />
      },
      {
        path: "book",
        element: <BookingForm />
      },
      {
        path: "user/dashboard",
        element: <UserDashboard />
      }
    ],
  },
]);
