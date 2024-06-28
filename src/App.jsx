import './firebaseConfig';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import SignUp from "./components/SignUp.jsx";
import Login from "./components/Login.jsx";
import Profile from "./components/Profile.jsx";
import ServiceListings from './pages/ServiceListings.jsx';
import { AuthProvider } from "./components/AuthProvider.jsx";
import NotificationList from './components/NotificationList';
import MessageForm from './components/MessageForm';
import MessageList from './components/MessageList';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Index />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/service-listings" element={<ServiceListings />} />
          <Route path="/notifications" element={<NotificationList />} />
          <Route path="/messages" element={<MessageForm />} />
          <Route path="/message-list" element={<MessageList />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;